import React, { useState } from 'react';
import { useRouter } from 'next/router';
import crypto from 'crypto';

const berechnungBMR = (gewicht, groesse, alter, geschlecht) => {
  if (geschlecht === 'Mann') {
    return (10 * gewicht) + (6.25 * groesse) - (5 * alter) + 5;
  } else {
    return (10 * gewicht) + (6.25 * groesse) - (5 * alter) - 161;
  }
};

const berechnungTDEE = (bmr, aktivfaktor) => {
  return bmr * aktivfaktor;
};

const kalorienErg = (tdee, gewuenscht) => {
  if (gewuenscht === 2) {
    return tdee * 1.15;
  } else {
    return tdee * 0.85;
  }
};

const teilZuweisung = (tdee, gewuenscht) => {
  let kohlenhydrate, fette, proteine;
  const kalorien = kalorienErg(tdee, gewuenscht);
  if (gewuenscht === 2) {
    kohlenhydrate = kalorien * 0.50;
    fette = kalorien * 0.20;
    proteine = kalorien * 0.30;
  } else {
    kohlenhydrate = kalorien * 0.45;
    fette = kalorien * 0.20;
    proteine = kalorien * 0.35;
  }
  return [
    { name: "Kohlenhydrate", value: kohlenhydrate },
    { name: "Fette", value: fette },
    { name: "Proteine", value: proteine }
  ];
};

const InputPage = ({ setData, setLoading }) => {
  const [gewicht, setGewicht] = useState("");
  const [groesse, setGroesse] = useState("");
  const [alter, setAlter] = useState("");
  const [geschlecht, setGeschlecht] = useState("");
  const [aktivitaetslevel, setAktivitaetslevel] = useState("");
  const [ziel, setZiel] = useState("");
  const router = useRouter();

  const handleAddData = async () => {
    const gewichtValue = parseFloat(gewicht);
    const groesseValue = parseFloat(groesse);
    const alterValue = parseInt(alter);

    if (
      isNaN(gewichtValue) || isNaN(groesseValue) || isNaN(alterValue) ||
      !geschlecht || !aktivitaetslevel || !ziel
    ) {
      alert("Bitte alle Felder korrekt ausfüllen!");
      return;
    }

    let aktivfaktor;
    switch (aktivitaetslevel) {
      case 'Sitzend (wenig oder keine Bewegung)':
        aktivfaktor = 1.2;
        break;
      case 'Leicht aktiv (leichte Bewegung/Sport 1-3 Tage pro Woche)':
        aktivfaktor = 1.375;
        break;
      case 'Mäßig aktiv (mäßige Bewegung/Sport 3-5 Tage pro Woche)':
        aktivfaktor = 1.55;
        break;
      case 'Sehr aktiv (harte Bewegung/Sport 6-7 Tage pro Woche)':
        aktivfaktor = 1.725;
        break;
      case 'Extrem aktiv (sehr harte Bewegung/Sport und körperliche Arbeit)':
        aktivfaktor = 1.9;
        break;
      default:
        aktivfaktor = 1.2;
    }

    const bmr = berechnungBMR(gewichtValue, groesseValue, alterValue, geschlecht);
    const tdee = berechnungTDEE(bmr, aktivfaktor);
    const macroData = teilZuweisung(tdee, ziel);

    setLoading(true);
    setTimeout(async () => {
      try {
        const sessionToken = crypto.randomBytes(64).toString('hex');
        const sessionData = { token: sessionToken, macroData };

        localStorage.setItem('sessionToken', JSON.stringify(sessionData));

        setData(macroData);
        setLoading(false);
        router.push('/chart');
      } catch (error) {
        console.error('Error saving session data:', error);
        setLoading(false);
        alert('Fehler beim Speichern der Daten');
      }
    }, 5000);
  };

  return (
    <div className="container">
      <h1>Gib hier dein Daten für den Kalorienrechner ein</h1>
      <input
        type="text"
        placeholder="Gewicht (kg)"
        value={gewicht}
        onChange={e => setGewicht(e.target.value)}
      />
      <input
        type="text"
        placeholder="Größe (cm)"
        value={groesse}
        onChange={e => setGroesse(e.target.value)}
      />
      <input
        type="text"
        placeholder="Alter"
        value={alter}
        onChange={e => setAlter(e.target.value)}
      />
      <select value={geschlecht} onChange={e => setGeschlecht(e.target.value)}>
        <option value="">Geschlecht</option>
        <option value="Mann">Mann</option>
        <option value="Frau">Frau</option>
      </select>
      <select value={aktivitaetslevel} onChange={e => setAktivitaetslevel(e.target.value)}>
        <option value="">Aktivitätslevel</option>
        <option value="Sitzend (wenig oder keine Bewegung)">
          Sitzend (wenig oder keine Bewegung)
        </option>
        <option value="Leicht aktiv (leichte Bewegung/Sport 1-3 Tage pro Woche)">
          Leicht aktiv (leichte Bewegung/Sport 1-3 Tage pro Woche)
        </option>
        <option value="Mäßig aktiv (mäßige Bewegung/Sport 3-5 Tage pro Woche)">
          Mäßig aktiv (mäßige Bewegung/Sport 3-5 Tage pro Woche)
        </option>
        <option value="Sehr aktiv (harte Bewegung/Sport 6-7 Tage pro Woche)">
          Sehr aktiv (harte Bewegung/Sport 6-7 Tage pro Woche)
        </option>
        <option value="Extrem aktiv (sehr harte Bewegung/Sport und körperliche Arbeit)">
          Extrem aktiv (sehr harte Bewegung/Sport und körperliche Arbeit)
        </option>
      </select>
      <select value={ziel} onChange={e => setZiel(e.target.value)}>
        <option value="">Ziel</option>
        <option value="2">Muskelaufbau</option>
        <option value="1">Gewichtsverlust</option>
      </select>
      <button onClick={handleAddData}>Weiter</button>
    </div>
  );
};

export default InputPage;
