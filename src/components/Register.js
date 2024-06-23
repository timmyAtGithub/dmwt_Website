import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Register.module.css'; // Separate CSS module for styling

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register', { email, password, vorname, nachname });
      const userId = response.data.userId;

      // Session token and data retrieval
      const sessionData = JSON.parse(localStorage.getItem('sessionToken'));
      const macroData = sessionData.macroData;
      const gewicht = sessionData.gewicht;

      // Save calorie data
      await axios.post('/api/saveCaloriesData', {
        userId,
        calories: macroData.reduce((acc, item) => acc + item.value, 0),
        protein: macroData.find(item => item.name === 'Proteine').value,
        fat: macroData.find(item => item.name === 'Fette').value,
        carbs: macroData.find(item => item.name === 'Kohlenhydrate').value
      });

      // Save weight data
      await axios.post('/api/saveWeightData', {
        userId,
        weight: gewicht,
        date: new Date().toISOString()
      });

      alert('Registrierung erfolgreich und Daten gespeichert');
      localStorage.removeItem('sessionToken'); // Remove session token after use
      router.push('/loginPage');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Fehler bei der Registrierung');
    }
  };
  useEffect(() => {
    document.body.classList.add(styles.noScroll);
   
  }, []);

  return (
    <div className={styles.backgroundbody} style={{ overflow: 'hidden' }}>
      <div className={styles.container}>
        <h1>Registriere dich JETZT!</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Vorname"
          value={vorname}
          onChange={e => setVorname(e.target.value)}
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Nachname"
          value={nachname}
          onChange={e => setNachname(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleRegister} className={styles.button}>Registrieren</button>
      </div>
    </div>
  );
};

export default Register;
