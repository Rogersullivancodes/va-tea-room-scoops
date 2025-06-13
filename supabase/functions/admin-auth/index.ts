
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { email, password } = await req.json()

    // Simple password check for admin user - updated to use "admincfp"
    if (email === 'cfp@crabsfriedpolitically.com' && password === 'admincfp') {
      // Generate session token
      const sessionToken = crypto.randomUUID()
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

      // Get admin user
      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .single()

      if (adminUser) {
        // Create session
        await supabase
          .from('admin_sessions')
          .insert({
            admin_id: adminUser.id,
            session_token: sessionToken,
            expires_at: expiresAt.toISOString()
          })

        // Update last login
        await supabase
          .from('admin_users')
          .update({ last_login: new Date().toISOString() })
          .eq('id', adminUser.id)

        return new Response(
          JSON.stringify({ 
            success: true, 
            sessionToken,
            admin: adminUser 
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    return new Response(
      JSON.stringify({ success: false, error: 'Invalid credentials' }),
      { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
