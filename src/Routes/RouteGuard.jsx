import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ROUTE_PATHS } from './routes.config';
import { useAuth } from '../Context/AuthContext'; // application auth context
import { useDocumentTitle } from '../components/hooks/useDocumentTitle';
import { PageLoader } from '../components/LoadingSpinner';
import { getCurrentToken } from '../api/Api';

// 🛡️ Route Guard Component for authentication and authorization
export const RouteGuard = ({ children, routeConfig }) => {
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth();
  
  // Set document title based on route config
  useDocumentTitle(routeConfig.meta.title);

  // Immediate localStorage token check: if route requires authentication and there's
  // no token present in localStorage, redirect to login right away. This avoids
  // waiting for async profile checks when the user clearly has no token.
  const localToken = typeof window !== 'undefined' ? getCurrentToken() : null;
  if (routeConfig.meta?.requiresAuth && !localToken) {
    const redirectTo = routeConfig.meta.redirectUnauth || ROUTE_PATHS.LOGIN;
    return (
      <Navigate
        to={`${redirectTo}?redirect=${encodeURIComponent(location.pathname)}`}
        replace
      />
    );
  }
  
  // Add meta description
  useEffect(() => {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', routeConfig.meta.description);
    }
  }, [routeConfig.meta.description]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return <PageLoader />;
  }

  // Redirect authenticated users away from auth pages
  if (routeConfig.meta.redirectIfAuth && isAuthenticated) {
    return <Navigate to={routeConfig.meta.redirectIfAuth} replace />;
  }

  // Redirect unauthenticated users from protected routes
  if (routeConfig.meta.requiresAuth && !isAuthenticated) {
    const redirectTo = routeConfig.meta.redirectUnauth || ROUTE_PATHS.LOGIN;
    return (
      <Navigate 
        to={`${redirectTo}?redirect=${encodeURIComponent(location.pathname)}`} 
        replace 
      />
    );
  }

  // Check role-based access (if applicable)
  if (routeConfig.meta.requiredRole && user?.role !== routeConfig.meta.requiredRole) {
    return <Navigate to={ROUTE_PATHS.UNAUTHORIZED} replace />;
  }

  return children;
};

// 🔐 Higher-order component for route protection
export const withRouteGuard = (Component, routeConfig) => {
  return (props) => (
    <RouteGuard routeConfig={routeConfig}>
      <Component {...props} />
    </RouteGuard>
  );
};

// 🚨 Error Boundary for Route Components
import { Component } from 'react';

export class RouteErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Route Error:', error, errorInfo);
    // Log to error reporting service
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              We're sorry, but something unexpected happened.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
