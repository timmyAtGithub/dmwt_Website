import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css'; // Hinweis: Verwende .module.css

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { email, password }, { withCredentials: true });
      setUser(response.data.user);
      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
    }
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
        </div>
      </div>
    </div>
  );
};

export default Login;
