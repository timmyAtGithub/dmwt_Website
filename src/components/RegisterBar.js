import React from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/RegisterBar.module.css';

const RegisterBar = () => {
  const router = useRouter();
  const handleSignUp = () => {
    router.push('/registration');
  };

  return (
    <div className={styles.registerBar}>
      <h2>Werden Sie Mitglied</h2>
      <p>Melden Sie sich jetzt an, um exklusive Vorteile zu genießen!</p>
      <button className={styles.registerButton} onClick={handleSignUp}>
        Registrieren
      </button>
    </div>
  );
};

export default RegisterBar;
