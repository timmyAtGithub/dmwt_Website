import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        console.log('Session verified:', response.data);
        setUser(response.data);
      } catch (error) {
        console.error('Session verification failed:', error);
        router.push('/loginPage');
      }
    };

    verifySession();
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to your dashboard, {user.name}</h1>
    </div>
  );
};

export default Dashboard;
