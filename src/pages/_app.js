import '../styles/globals.css';
import Navbar from '../components/Navbar';
import '../lib/fontawesome';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        if (response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error('Error verifying session:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Component {...pageProps} setUser={setUser} />
    </>
  );
}

export default MyApp;
