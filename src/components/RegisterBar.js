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
      <h2>Werde JETZT Mitglied!</h2>
      <p>Melden dich jetzt an, um exklusive Vorteile zu genießen!</p>
      <button className={styles.registerButton} onClick={handleSignUp}>
        Registrieren
      </button>
    </div>
  );
};

export default RegisterBar;
