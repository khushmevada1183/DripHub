import { BrowserRouter as Router } from 'react-router-dom';
import { CartProvider } from './Context/CartContext.jsx';
import { AuthProvider } from './Context/AuthContext.jsx';
import AppRouter from './Routes/AppRouter.jsx';
import { RouteErrorBoundary } from './Routes/RouteGuard.jsx';
import { useAOS } from './animation/aos';

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
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
