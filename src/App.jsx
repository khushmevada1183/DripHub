import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Context/CartContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import AppRouter from './Routes/AppRouter.jsx';
import { RouteErrorBoundary } from './Routes/RouteGuard.jsx';
import { useAOS } from './animation/aos';
import { Toaster } from 'react-hot-toast';

function App() {
  useAOS();
  
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <RouteErrorBoundary>
            <AppRouter />
          </RouteErrorBoundary>
        </Router>
        <Toaster
          position="top-right"
          toastOptions={{
            // Default duration for all toasts
            duration: 3000,
            // Explicitly set per-type to ensure consistency
            success: { duration: 3000 },
            error: { duration: 3000 },
          }}
        />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
