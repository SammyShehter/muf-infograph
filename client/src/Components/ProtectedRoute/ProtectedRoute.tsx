import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../../Context/AuthContext';

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AuthContext);
  useEffect(() => {
    console.log('xxxxxxxxx');
    
  }, []) 
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
