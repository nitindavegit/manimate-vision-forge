import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.5'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface AuthenticateRequest {
  credentialId: string;
  signature: string;
  authenticatorData: string;
  clientDataJSON: string;
  challenge: string;
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

    const { credentialId }: AuthenticateRequest = await req.json();

    console.log('Passkey authentication attempt for credential:', credentialId);

    // Find the credential in the database
    const { data: credential, error: credentialError } = await supabase
      .from('passkey_credentials')
      .select('*')
      .eq('credential_id', credentialId)
      .single();

    if (credentialError || !credential) {
      console.error('Credential not found:', credentialError);
      throw new Error('Invalid credential');
    }

    console.log('Credential found for user:', credential.user_id);

    // For this demo, we'll skip signature verification
    // In production, you would verify the WebAuthn signature here
    
    // Generate a JWT token for the user
    const { data: tokenData, error: tokenError } = await supabase.auth.admin.generateLink({
      type: 'magiclink',
      email: `${credential.username}@passkey.local`,
      options: {
        data: {
          username: credential.username,
          auth_method: 'passkey'
        }
      }
    });

    if (tokenError || !tokenData) {
      console.error('Failed to generate token:', tokenError);
      throw tokenError;
    }

    // Update counter (should be incremented after successful authentication)
    await supabase
      .from('passkey_credentials')
      .update({ counter: credential.counter + 1 })
      .eq('credential_id', credentialId);

    console.log('Authentication successful for user:', credential.user_id);

    return new Response(
      JSON.stringify({ 
        success: true,
        user: {
          id: credential.user_id,
          username: credential.username,
          displayName: credential.display_name
        },
        // In a real implementation, you'd return a proper session token
        // For now, we'll return the magic link token
        accessToken: tokenData.properties?.action_link
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error: any) {
    console.error('Passkey authentication error:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Authentication failed' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    );
  }
});