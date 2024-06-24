import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    document.body.classList.add(styles.noScroll);

    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        if (response.data) {
          setUser(response.data);
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Session verification failed:', error);
      }
    };

    verifySession();

   
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [router]);

  return (
    <div className={styles.homeContainer}>
      {}
      <div className={styles.headerImageContainer}>
        <img src="./images/home.jpg" alt="Header" className={styles.headerImage} />
        <div className={styles.headerTitleContainer}>
          <h1 className={styles.headerTitle}>Mit der richtigen Ernährung zum Traumkörper</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
