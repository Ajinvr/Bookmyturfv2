import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from '../Utils/axiosInstance'; 


const Protectedroute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axiosInstance.post('/api/userCheck', {}, { withCredentials: true });

        setIsAuthenticated(response.data.isAuthenticated);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
  
    checkAuth();
  }, []);

  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default Protectedroute;
