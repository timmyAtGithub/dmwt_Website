import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Link from 'next/link'; // Hinzufügen des Link-Imports
import styles from '../styles/Login.module.css';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        if (response.data) {
          setUser(response.data);
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('No existing session found:', error);
      }
    };

    verifySession();
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [router, setUser]);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password }, { withCredentials: true });
      setUser(response.data.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const navigateToHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginInfo}>
        <h2 className={`${styles.loginHeading} ${styles.cssFont_1}`}>NutriFit</h2>
        <p className={styles.loginText}>Bitte loggen Sie sich ein um fortzufahren.</p>
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginForm}>
          <h1 className={styles.loginTitle}>Login</h1>
          <div className={styles.inputContainer}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.loginInput}
              style={{ borderRadius: '8px 8px 0 0', marginBottom: '10px' }}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.loginInput}
              style={{ borderRadius: '0 0 8px 8px' }}
            />
          </div>
          <button onClick={handleLogin} className={styles.loginButton}>Login</button>
          <Link href="/" legacyBehavior>
            <a className={styles.additionalText} onClick={(navigateToHome) => console.log('Text clicked')}>
              Jetzt Registrieren
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
