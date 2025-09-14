import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE_PATHS, ROUTES_CONFIG } from './routes.config';
import { RouteGuard } from './RouteGuard';
import { PageLoader } from '../components/LoadingSpinner';
import { MainLayout, AuthLayout, CheckoutLayout, AccountLayout, ErrorLayout } from '../Layouts/index.jsx';

// 🎯 Lazy load components for better performance
const LazyComponents = {
  // Main Pages
  Home: lazy(() => import('../Pages/Home/Home')),
  Products: lazy(() => import('../Pages/Products/Products')),
  ProductDetails: lazy(() => import('../Pages/ProductDetails/ProductDetails')),
  // Categories removed
  Deals: lazy(() => import('../Pages/Deals/Deals')),
  Search: lazy(() => import('../Pages/Deals/Deals')), // Placeholder
  
  // Authentication Pages
  Login: lazy(() => import('../Pages/Auth/Login')),
  SignUp: lazy(() => import('../Pages/Auth/SignUp')),
  ForgotPassword: lazy(() => import('../Pages/Auth/ForgotPassword')),
  
  // Shopping Pages
  Cart: lazy(() => import('../Pages/Cart/Cart')),
  Checkout: lazy(() => import('../Pages/Cart/Cart')), // Placeholder
  CheckoutSuccess: lazy(() => import('../Pages/Cart/Cart')), // Placeholder
  Wishlist: lazy(() => import('../Pages/Wishlist/Wishlist.jsx')),
  
  // Account Pages
  Account: lazy(() => import('../Pages/Account/Account')),
  Profile: lazy(() => import('../Pages/Account/Account')), // Placeholder
  Orders: lazy(() => import('../Pages/Account/Account')), // Placeholder
  OrderDetails: lazy(() => import('../Pages/Account/Account')), // Placeholder
  Addresses: lazy(() => import('../Pages/Account/Account')), // Placeholder
  Settings: lazy(() => import('../Pages/Settings/Settings.jsx')),
  
  // Error Pages
  NotFound: lazy(() => import('../Pages/Errors/NotFound')),
  Unauthorized: lazy(() => import('../Pages/Errors/Unauthorized')),
  ServerError: lazy(() => import('../Pages/Errors/ServerError')),
};

// Layout mapping
const LayoutComponents = {
  MainLayout,
  AuthLayout,
  CheckoutLayout,
  AccountLayout,
  ErrorLayout
};

// 🛡️ Route wrapper with lazy loading and correct layout
const LazyRoute = ({ componentName, routeConfig }) => {
  const Component = LazyComponents[componentName];
  const Layout = LayoutComponents[routeConfig.layout] || MainLayout;
  
  if (!Component) {
    console.warn(`Component ${componentName} not found in LazyComponents`);
    return <div>Component not found</div>;
  }

  return (
    <Layout>
      <RouteGuard routeConfig={routeConfig}>
        <Suspense fallback={<PageLoader />}>
          <Component />
        </Suspense>
      </RouteGuard>
    </Layout>
  );
};

// 🔀 Main Router Component
export const AppRouter = () => {
  return (
    <Routes>
      {/* Dynamic routes from configuration */}
      {ROUTES_CONFIG.map((routeConfig) => (
        <Route
          key={routeConfig.path}
          path={routeConfig.path}
          element={
            <LazyRoute
              componentName={routeConfig.component}
              routeConfig={routeConfig}
            />
          }
        />
      ))}
      
      {/* Redirect routes */}
      <Route path="/profile" element={<Navigate to={ROUTE_PATHS.PROFILE} replace />} />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={<Navigate to={ROUTE_PATHS.NOT_FOUND} replace />} />
    </Routes>
  );
};

export default AppRouter;
