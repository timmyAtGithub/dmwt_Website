// components/ProtectedRoute.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        if (response.data) {
          router.push('/dashboard');
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Session verification failed:', error);
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>; // Oder ein anderer Ladeindikator
  }

  return children;
};

export default ProtectedRoute;
