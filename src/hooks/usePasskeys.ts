import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// Check if WebAuthn is supported
const isWebAuthnSupported = () => {
  return window.PublicKeyCredential && 
         navigator.credentials && 
         navigator.credentials.create &&
         navigator.credentials.get;
};

// Convert ArrayBuffer to Base64URL
const arrayBufferToBase64Url = (buffer: ArrayBuffer): string => {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

// Convert Base64URL to ArrayBuffer
const base64UrlToArrayBuffer = (base64url: string): ArrayBuffer => {
  const padding = '='.repeat((4 - base64url.length % 4) % 4);
  const base64 = (base64url + padding).replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(base64);
  const buffer = new ArrayBuffer(binary.length);
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return buffer;
};

// Generate a random challenge
const generateChallenge = (): ArrayBuffer => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return array.buffer;
};

export const usePasskeys = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const register = useCallback(async (username: string, displayName: string) => {
    if (!isWebAuthnSupported()) {
      toast({
        title: "Passkeys not supported",
        description: "Your browser doesn't support passkeys. Please use a modern browser.",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      // Generate registration options
      const challenge = generateChallenge();
      const userId = crypto.getRandomValues(new Uint8Array(64));

      const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
        challenge,
        rp: {
          name: "Manimate",
          id: window.location.hostname,
        },
        user: {
          id: userId,
          name: username,
          displayName: displayName,
        },
        pubKeyCredParams: [
          { alg: -7, type: "public-key" }, // ES256
          { alg: -257, type: "public-key" }, // RS256
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
        attestation: "direct",
      };

      // Create credential
      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      }) as PublicKeyCredential;

      if (!credential) {
        throw new Error('Failed to create passkey');
      }

      const response = credential.response as AuthenticatorAttestationResponse;

      // Store credential info via our backend edge function
      const credentialData = {
        credential_id: arrayBufferToBase64Url(credential.rawId),
        public_key: arrayBufferToBase64Url(response.getPublicKey()!),
        username,
        displayName,
        userIdBuffer: arrayBufferToBase64Url(userId),
      };

      // Call our passkey registration edge function
      const { data: registrationResult, error: registrationError } = await supabase.functions.invoke(
        'passkey-register',
        {
          body: credentialData
        }
      );

      if (registrationError || !registrationResult?.success) {
        throw new Error(registrationResult?.error || 'Registration failed');
      }

      // Store the credential ID in localStorage for future authentication
      localStorage.setItem('passkey_credential_id', credentialData.credential_id);
      localStorage.setItem('passkey_username', username);

      toast({
        title: "Passkey registered!",
        description: "Your passkey has been successfully registered.",
      });

      return true;
    } catch (error: any) {
      console.error('Passkey registration error:', error);
      toast({
        title: "Registration failed",
        description: error.message || "Failed to register passkey.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const authenticate = useCallback(async () => {
    if (!isWebAuthnSupported()) {
      toast({
        title: "Passkeys not supported",
        description: "Your browser doesn't support passkeys. Please use a modern browser.",
        variant: "destructive",
      });
      return false;
    }

    const credentialId = localStorage.getItem('passkey_credential_id');
    const username = localStorage.getItem('passkey_username');

    if (!credentialId || !username) {
      toast({
        title: "No passkey found",
        description: "Please register a passkey first.",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);
    try {
      const challenge = generateChallenge();

      const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
        challenge,
        allowCredentials: [{
          id: base64UrlToArrayBuffer(credentialId),
          type: 'public-key',
        }],
        userVerification: 'required',
        timeout: 60000,
      };

      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      }) as PublicKeyCredential;

      if (!credential) {
        throw new Error('Authentication failed');
      }

      const response = credential.response as AuthenticatorAssertionResponse;

      // Call our passkey authentication edge function
      const { data: authResult, error: authError } = await supabase.functions.invoke(
        'passkey-authenticate',
        {
          body: {
            credentialId,
            signature: arrayBufferToBase64Url(response.signature),
            authenticatorData: arrayBufferToBase64Url(response.authenticatorData),
            clientDataJSON: arrayBufferToBase64Url(response.clientDataJSON),
            challenge: arrayBufferToBase64Url(challenge)
          }
        }
      );

      if (authError || !authResult?.success) {
        throw new Error(authResult?.error || 'Authentication failed');
      }

      toast({
        title: "Authentication successful!",
        description: "You have been successfully authenticated with your passkey.",
      });

      return true;
    } catch (error: any) {
      console.error('Passkey authentication error:', error);
      toast({
        title: "Authentication failed",
        description: error.message || "Failed to authenticate with passkey.",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const isSupported = isWebAuthnSupported();

  return {
    register,
    authenticate,
    isLoading,
    isSupported,
  };
};