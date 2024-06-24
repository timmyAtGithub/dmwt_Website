import '../styles/globals.css';
import Navbar from '../components/Navbar';
import '../lib/fontawesome';
import { useState, useEffect } from 'react';
import axios from 'axios';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        document.body.classList.add('noScroll');
      } else {
        document.body.classList.remove('noScroll');
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        if (response.data) {
          setUser(response.data);
          document.body.classList.remove('noScroll');
        } else {
          handleResize(); // Initial check if user is not logged in
        }
      } catch (error) {
        console.error('Error verifying session:', error);
      }
    };

    fetchUser();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Clean up event listener
    };
  }, []);

  return (
    <>
      <Navbar user={user} setUser={setUser} />
      <Component {...pageProps} setUser={setUser} />
    </>
  );
}

export default MyApp;
