import { createContext, useContext, useState, useEffect } from 'react';
import * as api from '../api/Api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored authentication on app start
    const checkAuth = async () => {
      try {
        // Use API's isAuthenticated utility
        if (api.isAuthenticated()) {
          // Get user profile from the API
          const response = await api.getUserProfile();
          
          if (response.success) {
            setUser(response.data);
            setIsAuthenticated(true);
          } else {
            // If the token is invalid, clear everything
            api.resetApiClient();
          }
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        // Clear invalid data
        api.resetApiClient();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      // Use the login API function with username and password as shown in the API schema
      const response = await api.login({ username: email, password });
      
      if (response.success) {
        // Consider login successful if we obtained an access token
        const hasToken = !!(response.data?.accessToken || response.data?.access_token);
        if (hasToken) {
          setIsAuthenticated(true);
          // Try to load the profile if available; don't fail login if it errors
          try {
            const profile = await api.getUserProfile();
            if (profile.success) {
              setUser(profile.data);
              return { success: true, user: profile.data };
            }
          } catch (_) {
            // ignore profile errors
          }
          return { success: true };
        }
        return { success: false, error: response.message || 'Login failed' };
      } else {
        return { 
          success: false, 
          error: response.message || 'Login failed' 
        };
      }
    } catch (error) {
      console.error('Login failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    setIsLoading(true);
    try {
      // Use the signup API function with email and password structure from API schema
      const requestData = {
        email: userData.email,
        password: userData.password
      };
      
      const response = await api.signup(requestData);
      
      if (response.success) {
        // Some backends auto-login and return tokens; treat similarly to login
        const hasToken = !!(response.data?.accessToken || response.data?.access_token);
        if (hasToken) {
          setIsAuthenticated(true);
          try {
            const profile = await api.getUserProfile();
            if (profile.success) {
              setUser(profile.data);
              return { success: true, user: profile.data };
            }
          } catch (_) {}
          return { success: true };
        }
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.message || 'Registration failed' 
        };
      }
    } catch (error) {
      console.error('Registration failed:', error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Use the logout API function
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Reset state regardless of API success
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  const updateProfile = async (userData) => {
    try {
      // Use the updateUserProfile API function
      const response = await api.updateUserProfile(userData);
      
      if (response.success) {
        setUser(response.data);
        return { success: true, user: response.data };
      } else {
        return { 
          success: false, 
          error: response.message || 'Profile update failed' 
        };
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      // Using the forgotPassword function from api
      const response = await api.forgotPassword({ email });
      return response;
    } catch (error) {
      console.error('Password reset request failed:', error);
      return { 
        success: false, 
        error: error.message || 'Password reset request failed'
      };
    }
  };

  const resetPassword = async (token, newPassword) => {
    try {
      // Using the resetPassword function from api
      const response = await api.resetPassword({ 
        token, 
        newPassword 
      });
      return response;
    } catch (error) {
      console.error('Password reset failed:', error);
      return { 
        success: false, 
        error: error.message || 'Password reset failed'
      };
    }
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
    forgotPassword,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
