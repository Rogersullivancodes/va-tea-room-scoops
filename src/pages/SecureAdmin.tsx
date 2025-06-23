
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SecureAdmin: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the correct admin login route
    navigate('/admin-login', { replace: true });
  }, [navigate]);

  return null; // Don't render anything while redirecting
};

export default SecureAdmin;
