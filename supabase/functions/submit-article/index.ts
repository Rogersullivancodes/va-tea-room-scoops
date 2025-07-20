import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    if (req.method !== 'POST') {
      return new Response(
        JSON.stringify({ error: 'Method not allowed' }),
        { 
          status: 405, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    const {
      title,
      content,
      excerpt,
      category,
      author_name,
      author_email,
      featured_image_url,
      meta_description,
      tags
    } = await req.json();

    // Validate required fields
    if (!title || !content || !author_name || !author_email) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          details: 'Title, content, author name, and author email are required'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Generate a unique author ID for guest submissions
    const authorId = crypto.randomUUID();

    // Create the article
    const { data: article, error: articleError } = await supabase
      .from('articles')
      .insert([{
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt?.trim() || content.substring(0, 200) + '...',
        category: category || 'politics',
        author_id: authorId,
        featured_image_url: featured_image_url?.trim() || null,
        meta_description: meta_description?.trim() || excerpt?.trim() || content.substring(0, 160) + '...',
        tags: tags || [],
        status: 'published', // Auto-publish for now, can be changed to 'pending' for moderation
        published_at: new Date().toISOString(),
        credits_required: 0,
        is_premium: false,
        views: 0,
        likes: 0
      }])
      .select()
      .single();

    if (articleError) {
      console.error('Error creating article:', articleError);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to create article',
          details: articleError.message 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      );
    }

    // Store author information separately for guest submissions
    const authorData = {
      article_id: article.id,
      name: author_name.trim(),
      email: author_email.trim(),
      submission_date: new Date().toISOString()
    };

    console.log('Article created successfully:', {
      id: article.id,
      title: article.title,
      author: author_name,
      category: article.category
    });

    return new Response(
      JSON.stringify({
        success: true,
        article: {
          id: article.id,
          title: article.title,
          category: article.category,
          published_at: article.published_at
        },
        message: 'Article submitted successfully and is now live!'
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Error in submit-article function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
})