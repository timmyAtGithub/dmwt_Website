import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faHome, faDumbbell } from '@fortawesome/free-solid-svg-icons';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter(); 

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Session verification failed:', error);
      }
    };

    verifySession();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUser(null);
      window.location.reload();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <div className={styles.logo}>
          {isMobile ? (
            <img src="/images/Logo.png" alt="Logo" />
          ) : (
            <img src="/images/logotext.png" alt="Logo" />
          )}
        </div>
      </div>
      <div className={styles.centerSection}>
        {user && (
          <>
            <Link href="/meals" legacyBehavior>
              <a className={`${styles.menuItem} ${router.pathname === '/meals' ? styles.active : ''}`}>
                <FontAwesomeIcon icon={faUtensils} />
              </a>
            </Link>
            <Link href="/dashboard" legacyBehavior>
              <a className={`${styles.menuItem} ${router.pathname === '/dashboard' ? styles.active : ''}`}>
                <FontAwesomeIcon icon={faHome} />
              </a>
            </Link>
            <Link href="/exercises" legacyBehavior>
              <a className={`${styles.menuItem} ${router.pathname === '/exercises' ? styles.active : ''}`}>
                <FontAwesomeIcon icon={faDumbbell} />
              </a>
            </Link>
          </>
        )}
      </div>
      <div className={styles.rightSection}>
        <div className={styles.userSection} onClick={() => setShowDropdown(!showDropdown)}>
          {user ? (
            <>
              <span>{user.vorname}</span>
              <img src="/images/profilePic.jpg" alt="User" className={styles.userImage} />
              {showDropdown && (
                <div className={styles.dropdown}>
                  <img src="/images/profilePic.jpg" alt="User" className={styles.dropdownImage} />
                  <span>{user.vorname}</span>
                  <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
                </div>
              )}
            </>
          ) : (
            <Link href="/loginPage" legacyBehavior>
              <a className={styles.loginButton}>Login</a>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
