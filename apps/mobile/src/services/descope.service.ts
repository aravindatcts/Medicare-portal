import createSdk from '@descope/core-js-sdk';
import { ENV } from '../config/env';

const projectId = ENV.DESCOPE_PROJECT_ID || '';

export const descopeSdk = createSdk({ projectId });

export interface SignUpDetails {
  loginId: string;
  password?: string;
  firstName: string;
  lastName: string;
  subscriberId: string;
  ssn: string;
  dob: string;
}

class DescopeService {
  /**
   * Register a new member with custom health-related attributes.
   */
  async signUp(details: SignUpDetails) {
    if (!projectId) {
      console.warn('DESCOPE_PROJECT_ID is missing. Sign up is disabled.');
      return;
    }

    try {
      const response = await descopeSdk.password.signUp(
        details.loginId,
        details.password || '',
        {
          name: `${details.firstName} ${details.lastName}`,
          email: details.loginId,
          customAttributes: {
            subscriberId: details.subscriberId,
            ssn: details.ssn,
            dob: details.dob,
          }
        }
      );

      if (response.ok && response.data) {
        const { sessionJwt, refreshJwt, user } = response.data as any;
        
        const sToken = sessionJwt || '';
        const rToken = refreshJwt || '';
        
        if (!sToken) {
          throw new Error('Authentication succeeded but no session token was received.');
        }

        // Logic handled in component layer
      } else {
        throw new Error(response.error?.errorMessage || 'Registration failed');
      }

      return response;
    } catch (error) {
      console.error('Descope SignUp Error:', error);
      throw error;
    }
  }

  /**
   * Sign in using loginId (email) and password.
   */
  async signIn(loginId: string, password: string) {
    if (!projectId) {
      // Mock login for development if no project ID
      return {
        ok: true,
        data: {
          sessionJwt: 'mock-session-jwt',
          refreshJwt: 'mock-refresh-jwt',
          user: { loginIds: [loginId], name: 'Mock Member' }
        }
      };
    }

    try {
      const response = await descopeSdk.password.signIn(loginId, password);
      console.log('Descope SignIn Response:', JSON.stringify(response, null, 2));
      
      if (!response.ok) {
        throw new Error(response.error?.errorMessage || 'Sign in failed');
      }
      return response;
    } catch (error) {
      console.error('Descope SignIn Error:', error);
      throw error;
    }
  }

  /**
   * Refresh session using a refresh token.
   */
  async refreshSession(refreshToken: string) {
    try {
      const response = await descopeSdk.refresh(refreshToken);
      if (!response.ok) {
        throw new Error(response.error?.errorMessage || 'Session refresh failed');
      }
      return response;
    } catch (error) {
      console.error('Descope Refresh Error:', error);
      throw error;
    }
  }

  /**
   * Get user details (including custom attributes) after login.
   */
  async me(sessionToken: string) {
    try {
      return await descopeSdk.me(sessionToken);
    } catch (error) {
      console.error('Descope Me Error:', error);
      throw error;
    }
  }

  /**
   * Start OAuth flow (Google, etc.)
   */
  async oauthStart(provider: string, redirectUrl: string) {
    try {
      return await descopeSdk.oauth.start(provider, redirectUrl);
    } catch (error) {
      console.error('Descope OAuth Start ERROR DETAILS:', JSON.stringify(error, null, 2));
      throw error;
    }
  }

  /**
   * Exchange OAuth code for a session.
   */
  async oauthExchange(code: string) {
    try {
      const response = await descopeSdk.oauth.exchange(code);
      if (!response.ok) {
        throw new Error(response.error?.errorMessage || 'OAuth exchange failed');
      }
      return response;
    } catch (error) {
      console.error('Descope OAuth Exchange Error:', error);
      throw error;
    }
  }

  /**
   * Update user custom attributes.
   * NOTE: In a production app, this would be a call to your secure backend, 
   * which would use a Descope Management Key to update the user profile.
   * For this demo, we simulate success and handle persistence in the local AuthStore.
   */
  async updateUser(loginId: string, customAttributes: Record<string, any>) {
    console.log(`[DEMO] Simulating update for user ${loginId}:`, customAttributes);
    
    // Artificial delay to simulate network call
    await new Promise(resolve => setTimeout(resolve, 800));

    return {
      ok: true,
      data: { success: true }
    };
  }
}

export const descopeService = new DescopeService();
