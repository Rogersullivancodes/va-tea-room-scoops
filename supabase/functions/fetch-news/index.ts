import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Mock news data generator (in production, you'd connect to real news APIs)
const generateMockNews = () => {
  const sources = ['Virginia Mercury', 'Richmond Times-Dispatch', 'WRIC 8News', 'The Virginian-Pilot', 'Washington Post', 'WTOP News'];
  const categories = ['Legislation', 'Elections', 'Environment', 'Economy', 'Healthcare', 'Education'];
  
  const headlines = [
    "Virginia General Assembly Passes Comprehensive Climate Action Bill",
    "New Polling Shows Tight Race in Virginia's Congressional Districts",
    "Richmond City Council Approves Major Infrastructure Investment",
    "Virginia Department of Education Announces New STEM Initiative",
    "Hampton Roads Transit Authority Unveils Electric Bus Fleet",
    "Governor Signs Historic Renewable Energy Legislation",
    "Virginia Tech Receives Federal Grant for Clean Energy Research",
    "Norfolk City Council Debates Affordable Housing Ordinance",
    "Virginia Beach Mayor Announces Economic Development Initiative",
    "State Legislature Reviews Healthcare Access Expansion Bill"
  ];

  const article = {
    title: headlines[Math.floor(Math.random() * headlines.length)],
    source: sources[Math.floor(Math.random() * sources.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
    published_at: new Date().toISOString(),
    views: Math.floor(Math.random() * 5000) + 100,
    comments: Math.floor(Math.random() * 200) + 10,
    image_url: `https://images.unsplash.com/photo-${1494522358652 + Math.floor(Math.random() * 1000000)}`,
  };

  // Generate appropriate content based on title
  const contents = [
    "Virginia lawmakers reached a bipartisan agreement on significant legislation that promises to reshape policy across the Commonwealth. The bill passed with strong support from both chambers after extensive committee review and public hearings.",
    "Political analysts are closely watching Virginia's competitive electoral landscape as new polling data reveals shifting voter preferences across key demographic groups in suburban and rural districts.",
    "Local government officials announced a major public works initiative designed to modernize infrastructure and improve quality of life for residents while creating new employment opportunities.",
    "Education leaders unveiled ambitious plans to enhance student outcomes through innovative programs and increased funding for schools across Virginia's diverse communities.",
    "Transportation authorities are implementing sustainable solutions to reduce emissions and improve public transit access throughout the Hampton Roads region."
  ];

  article.content = contents[Math.floor(Math.random() * contents.length)];
  article.excerpt = article.content.substring(0, 150) + "...";

  return article;
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting news fetch process...');

    // Generate multiple news articles
    const newsArticles = [];
    for (let i = 0; i < 5; i++) {
      newsArticles.push(generateMockNews());
    }

    console.log(`Generated ${newsArticles.length} news articles`);

    // Insert articles into database
    const { data, error } = await supabase
      .from('news_articles')
      .insert(newsArticles)
      .select();

    if (error) {
      console.error('Error inserting news articles:', error);
      throw error;
    }

    console.log(`Successfully inserted ${data?.length || 0} news articles`);

    // Clean up old articles (keep only latest 50)
    const { error: deleteError } = await supabase
      .from('news_articles')
      .delete()
      .not('id', 'in', `(SELECT id FROM news_articles ORDER BY published_at DESC LIMIT 50)`);

    if (deleteError) {
      console.error('Error cleaning up old articles:', deleteError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully fetched and stored ${data?.length || 0} news articles`,
        articles: data 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in fetch-news function:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
