import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../../Routes/routes.config';
import { useAuth } from '../../Context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      // Call the forgotPassword method from AuthContext
      const response = await forgotPassword(email);
      
      if (response.success) {
        setMessage(response.message || 'Password reset instructions have been sent to your email address.');
      } else {
        setError(response.error || 'Failed to send reset email. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Forgot password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-gradient-to-br from-orange-500 via-red-600 to-purple-500">
      {/* Full page background with decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/90 via-red-600/90 to-purple-500/90">
        {/* Decorative Background Elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-60 h-60 bg-yellow-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-12 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl"></div>
        <div className="absolute top-20 right-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-cyan-300/20 rounded-full blur-2xl"></div>
      </div>

      {/* Content container */}
      <div className="relative h-full w-full flex flex-col sm:flex-row items-center justify-center">
        {/* Reset Password Content - Hidden on mobile, visible on larger screens */}
        <div className="hidden sm:block sm:w-1/2 lg:w-3/5 text-center text-white px-6">
          <div className="max-w-xl mx-auto">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 mx-auto backdrop-blur-sm">
                <svg className="w-14 h-14 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <h2 className="text-4xl font-bold mb-4">Reset Password</h2>
              <p className="text-xl opacity-90">Don't worry, we'll help you get back into your account</p>
            </div>
            
            {/* Floating Security Icons */}
            <div className="flex justify-center space-x-6 mt-12">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M10,17L6,13L7.41,11.59L10,14.17L16.59,7.58L18,9L10,17Z"/>
                </svg>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"/>
                </svg>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6,2C4.89,2 4,2.89 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2H6Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Forgot Password Card */}
        {/* Forgot Password Card */}
        <div className="w-full sm:w-1/2 lg:w-2/5 max-w-md sm:max-w-lg flex justify-center items-center">
          <div className="bg-white w-full rounded-2xl shadow-2xl p-6 sm:p-8 m-[15px] max-h-[calc(100vh-30px)] overflow-y-auto">
          {/* Header Icons */}
          <div className="flex justify-between items-center mb-6">
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <svg className="w-5 sm:w-6 h-5 sm:h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"/>
              </svg>
            </div>
            <div className="flex space-x-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13 14h-2v-4h2m0 8h-2v-2h2M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Forgot Password?</h1>
            <p className="text-gray-600 text-sm sm:text-base">Enter your email address and we'll send you instructions to reset your password.</p>
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-l-red-500 border border-red-200 rounded-lg p-4 mb-6 flex items-center shadow-sm">
              <div className="text-red-500 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-red-700 text-sm sm:text-base">{error}</p>
              </div>
            </div>
          )}

          {message && (
            <div className="bg-green-50 border-l-4 border-l-green-500 border border-green-200 rounded-lg p-4 mb-6 flex items-center shadow-sm">
              <div className="text-green-500 mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-green-700 text-sm sm:text-base">{message}</p>
              </div>
            </div>
          )}

          {/* Reset Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-gray-900 placeholder-gray-400 bg-gray-50 focus:bg-white text-sm"
                placeholder="Enter your email address"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-2 px-6 rounded-xl hover:from-blue-700 hover:to-blue-800 focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold text-base shadow-lg"
            >
              {loading ? 'Sending...' : 'Send Reset Instructions'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link
              to={ROUTE_PATHS.LOGIN}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default ForgotPassword;
