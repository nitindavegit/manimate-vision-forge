import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface RegisterRequest {
  username: string;
  displayName: string;
  credentialId: string;
  publicKey: string;
  userIdBuffer: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { username, displayName, credentialId, publicKey, userIdBuffer }: RegisterRequest = await req.json();

    console.log('Passkey registration attempt for username:', username);

    // Create user account with a dummy email (since we're using passkeys)
    const dummyEmail = `${username.toLowerCase().replace(/[^a-z0-9]/g, '')}@passkey.local`;
    const dummyPassword = crypto.getRandomValues(new Uint8Array(32)).toString();

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: dummyEmail,
      password: dummyPassword,
      email_confirm: true,
      user_metadata: {
        full_name: displayName,
        username: username,
        auth_method: 'passkey'
      }
    });

    if (authError || !authData.user) {
      console.error('Failed to create user:', authError);
      throw authError;
    }

    console.log('User created successfully:', authData.user.id);

    // Store passkey credential
    const { error: credentialError } = await supabase
      .from('passkey_credentials')
      .insert({
        user_id: authData.user.id,
        credential_id: credentialId,
        public_key: publicKey,
        username: username,
        display_name: displayName,
        counter: 0
      });

    if (credentialError) {
      console.error('Failed to store credential:', credentialError);
      throw credentialError;
    }

    console.log('Passkey credential stored successfully');

    // Create profile entry
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        user_id: authData.user.id,
        full_name: displayName,
        email: dummyEmail
      });

    if (profileError) {
      console.error('Failed to create profile:', profileError);
      // Don't throw here as it's not critical
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        user: { 
          id: authData.user.id, 
          username, 
          displayName 
        } 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    console.error('Passkey registration error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Registration failed' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});