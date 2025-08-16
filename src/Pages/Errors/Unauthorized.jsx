import { Link } from 'react-router-dom';
import { ROUTE_PATHS } from '../../Routes/routes.config';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-red-600 mb-4">401</h1>
          <div className="text-6xl mb-6">🔒</div>
        </div>
        
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Access Denied
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          You don't have permission to access this page. 
          Please log in with the appropriate account or contact support.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to={ROUTE_PATHS.LOGIN}
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Login
          </Link>
          
          <Link
            to={ROUTE_PATHS.HOME}
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
