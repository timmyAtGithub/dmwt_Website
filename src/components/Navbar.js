import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

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
  }, []);

  const handleUserClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await axios.post('/api/logout', {}, { withCredentials: true });
      setUser(null);
      setDropdownVisible(false);
      window.location.reload(); // Optional: Refresh the page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src="/images/Logo.png" alt="Logo" />
      </div>
      <div className={styles.menu}>
        <Link href="/" legacyBehavior>
          <a className={styles.menuItem}>
            <i className="fas fa-home"></i>
          </a>
        </Link>
      </div>
      <div className={styles.userSection} onClick={handleUserClick}>
        {user ? (
          <>
            <span>{user.vorname}</span>
            <img src="/images/profilePic.jpg" alt="User" className={styles.userImage} />
            {dropdownVisible && (
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
    </nav>
  );
};

export default Navbar;
