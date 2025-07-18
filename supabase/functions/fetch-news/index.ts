import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.43/deno-dom-wasm.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// News sources configuration
const NEWS_SOURCES = {
  "rivers_casino": "https://www.riverscasino.com/portsmouth/",
  "wtkr": "https://WTKR.com/",
  "wvec": "https://WVEC.TV/",
  "virginian_pilot": "https://www.pilotonline.com/",
  "richmond_times_dispatch": "https://richmond.com/",
  "daily_press": "https://www.dailypress.com/",
  "va_lis_bill_search": "https://lis.virginia.gov/bill-search/",
  "va_general_assembly": "https://virginiageneralassembly.gov/virginiaLegislature.php/includes/index.php",
  "va_governor_office": "https://www.governor.virginia.gov/",
  "ballotpedia_2025_spotlight": "https://news.ballotpedia.org/2025/05/20/virginia-2025-elections-spotlight-part-1/",
  "ballotpedia_va_elections": "https://ballotpedia.org/Virginia_elections,_2025",
  "virginiagrassroots_elections": "https://www.virginiagrassroots.org/election2025-table.php",
  "va_elections_candidates": "https://www.elections.virginia.gov/casting-a-ballot/candidate-list/",
  "va_elections_voterinfo": "https://vote.elections.virginia.gov/VoterInformation",
  "c_span": "https://www.c-span.org/",
}

const COLLEGE_NEWS_SOURCES = {
  "vcu": "https://news.vcu.edu/",
  "univ_richmond": "https://news.richmond.edu/",
  "tcc_portsmouth": "https://news.tcc.edu/",
  "nsu": "https://www.nsu.edu/news/",
  "odu": "https://www.odu.edu/news/",
  "hampton_univ": "https://news.hamptonu.edu/",
}

// Filter keywords for relevance
const POLITICAL_KEYWORDS = ["politics", "election", "campaign", "legislature", "senate", "house of delegates", "bill", "law", "governor", "democrat", "republican", "vote", "policy", "political", "council", "mayor", "congress", "ballot", "candidates"]
const GOVERNMENT_KEYWORDS = ["government", "statehouse", "capitol", "agency", "department", "public service", "official", "administration", "bureau", "budget", "tax", "regulation", "city council", "board of supervisors", "commissioners", "federal", "state", "local", "public hearing", "ordinance"]
const VIRGINIA_KEYWORDS = ["virginia", "va", "commonwealth"]
const RICHMOND_KEYWORDS = ["richmond", "capital city", "richmond city"]
const WEATHER_KEYWORDS = ["weather", "forecast", "hurricane", "storm", "tropical", "advisory", "warning", "tempest"]

const ALL_RELEVANT_KEYWORDS = [...POLITICAL_KEYWORDS, ...GOVERNMENT_KEYWORDS, ...VIRGINIA_KEYWORDS, ...RICHMOND_KEYWORDS].map(k => k.toLowerCase())

// Utility functions
const sanitizeTitle = (text: string): string => {
  return text.replace(/[^\w\s-]/g, '').trim().substring(0, 200)
}

const isRelevantContent = (text: string): boolean => {
  const textLower = text.toLowerCase()
  return ALL_RELEVANT_KEYWORDS.some(keyword => textLower.includes(keyword))
}

const fetchPageContent = async (url: string): Promise<string | null> => {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    
    const response = await fetch(url, { 
      headers,
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    
    return await response.text()
  } catch (error) {
    console.error(`Error fetching ${url}:`, error)
    return null
  }
}

const scrapeNewsSource = async (sourceName: string, url: string): Promise<any[]> => {
  console.log(`Scraping ${sourceName} (${url})...`)
  
  const htmlContent = await fetchPageContent(url)
  if (!htmlContent) return []

  const doc = new DOMParser().parseFromString(htmlContent, "text/html")
  if (!doc) return []

  const articles: any[] = []
  
  // Look for article elements with common patterns
  const articleSelectors = [
    'article',
    '[class*="article"]',
    '[class*="news"]',
    '[class*="post"]',
    '[class*="story"]',
    '[class*="item"]'
  ]
  
  let articleElements: Element[] = []
  for (const selector of articleSelectors) {
    const elements = Array.from(doc.querySelectorAll(selector))
    if (elements.length > 0) {
      articleElements = elements.slice(0, 10) // Limit to 10 articles per source
      break
    }
  }
  
  // Fallback to headline/title links if no articles found
  if (articleElements.length === 0) {
    articleElements = Array.from(doc.querySelectorAll('a[href]')).slice(0, 20)
  }

  for (const element of articleElements) {
    try {
      // Extract title
      const titleElement = element.querySelector('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="headline"]') || element
      const title = titleElement?.textContent?.trim() || 'No Title'
      
      // Extract link
      let link = element.getAttribute('href') || 
                 element.querySelector('a')?.getAttribute('href') || 
                 url
      
      if (link && !link.startsWith('http')) {
        try {
          link = new URL(link, url).href
        } catch {
          continue // Skip invalid URLs
        }
      }
      
      // Extract content/excerpt
      const contentElement = element.querySelector('p, [class*="excerpt"], [class*="summary"], [class*="description"]')
      const content = contentElement?.textContent?.trim() || ''
      
      const combinedText = `${title} ${content}`.toLowerCase()
      
      // Check relevance
      if (isRelevantContent(combinedText) && title.length > 10) {
        const article = {
          title: sanitizeTitle(title),
          content: content.substring(0, 1000) + (content.length > 1000 ? '...' : ''),
          excerpt: content.substring(0, 200) + (content.length > 200 ? '...' : ''),
          source: sourceName,
          url: link,
          category: 'politics',
          published_at: new Date().toISOString(),
          image_url: extractImageUrl(element, url),
          views: Math.floor(Math.random() * 1000) + 50,
          comments: Math.floor(Math.random() * 50) + 5
        }
        
        articles.push(article)
      }
    } catch (error) {
      console.error(`Error processing article from ${sourceName}:`, error)
    }
  }
  
  console.log(`Found ${articles.length} relevant articles from ${sourceName}`)
  return articles
}

const extractImageUrl = (element: Element, baseUrl: string): string | null => {
  const imgElement = element.querySelector('img')
  if (imgElement) {
    const src = imgElement.getAttribute('src') || imgElement.getAttribute('data-src')
    if (src) {
      try {
        return new URL(src, baseUrl).href
      } catch {
        return null
      }
    }
  }
  return `https://images.unsplash.com/photo-${1600000000000 + Math.floor(Math.random() * 100000000)}?w=400&h=300&fit=crop`
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Starting comprehensive news fetch process...');

    const allArticles: any[] = []

    // Priority 1: Political news sources (TV, newspapers, government) - randomized
    console.log('Scraping priority political news sources...')
    const politicalSources = Object.entries(NEWS_SOURCES)
    const shuffledPoliticalSources = politicalSources.sort(() => Math.random() - 0.5)
    
    for (const [name, url] of shuffledPoliticalSources) {
      try {
        const articles = await scrapeNewsSource(name, url)
        // Mark as priority political content
        articles.forEach(article => {
          article.priority = 1
          article.category = 'politics'
        })
        allArticles.push(...articles)
        
        // Faster rate limiting for priority sources - 1 second
        await new Promise(resolve => setTimeout(resolve, 1000))
      } catch (error) {
        console.error(`Error scraping ${name}:`, error)
      }
    }

    // Priority 2: College news sources (last in rotation) - randomized
    console.log('Scraping college news sources...')
    const collegeSources = Object.entries(COLLEGE_NEWS_SOURCES)
    const shuffledCollegeSources = collegeSources.sort(() => Math.random() - 0.5)
    
    for (const [name, url] of shuffledCollegeSources) {
      try {
        const articles = await scrapeNewsSource(name, url)
        // Mark as lower priority college content
        articles.forEach(article => {
          article.priority = 2
          article.category = 'education'
        })
        allArticles.push(...articles)
        
        // Slower rate limiting for college sources
        await new Promise(resolve => setTimeout(resolve, 2000))
      } catch (error) {
        console.error(`Error scraping ${name}:`, error)
      }
    }

    console.log(`Scraped ${allArticles.length} total articles`)

    if (allArticles.length === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'No articles found during scraping'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Remove duplicates based on title similarity
    const uniqueArticles = allArticles.filter((article, index, arr) => 
      arr.findIndex(a => a.title.toLowerCase() === article.title.toLowerCase()) === index
    )

    // Sort by priority (political news first, college news last) then randomize within priority
    uniqueArticles.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority // Lower number = higher priority
      }
      return Math.random() - 0.5 // Randomize within same priority
    })

    console.log(`${uniqueArticles.length} unique articles after deduplication`)

    // Insert articles into database in batches
    const batchSize = 10
    const insertedArticles = []
    
    for (let i = 0; i < uniqueArticles.length; i += batchSize) {
      const batch = uniqueArticles.slice(i, i + batchSize)
      
      const { data, error } = await supabase
        .from('news_articles')
        .insert(batch)
        .select()

      if (error) {
        console.error('Error inserting batch:', error)
        continue
      }

      if (data) {
        insertedArticles.push(...data)
      }
    }

    console.log(`Successfully inserted ${insertedArticles.length} news articles`)

    // Clean up old articles (keep only latest 100)
    const { error: deleteError } = await supabase
      .rpc('delete_old_news_articles', { keep_count: 100 })

    if (deleteError) {
      console.error('Error cleaning up old articles:', deleteError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Successfully fetched and stored ${insertedArticles.length} news articles`,
        articles: insertedArticles,
        stats: {
          total_scraped: allArticles.length,
          unique_articles: uniqueArticles.length,
          inserted: insertedArticles.length
        }
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
