import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

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

      // Sitzungstoken und Daten abrufen
      const sessionData = JSON.parse(localStorage.getItem('sessionToken'));
      const macroData = sessionData.macroData;
      const gewicht = sessionData.gewicht;

      // Daten speichern
      await axios.post('/api/saveCaloriesData', {
        userId,
        calories: macroData.reduce((acc, item) => acc + item.value, 0),
        protein: macroData.find(item => item.name === 'Proteine').value,
        fat: macroData.find(item => item.name === 'Fette').value,
        carbs: macroData.find(item => item.name === 'Kohlenhydrate').value
      });

      // Gewicht speichern
      await axios.post('/api/saveWeightData', {
        userId,
        weight: gewicht,
        date: new Date().toISOString()
      });

      alert('Registrierung erfolgreich und Daten gespeichert');
      localStorage.removeItem('sessionToken'); // Sitzungstoken nach Verwendung löschen
      router.push('/loginPage');
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Fehler bei der Registrierung');
    }
  };

  return (
    <div className="container">
      <h1>Registrierung</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Vorname"
        value={vorname}
        onChange={e => setVorname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nachname"
        value={nachname}
        onChange={e => setNachname(e.target.value)}
      />
      <button onClick={handleRegister}>Registrieren</button>
    </div>
  );
};

export default Register;
