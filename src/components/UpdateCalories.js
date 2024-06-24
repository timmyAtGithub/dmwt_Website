import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/UpdateCalories.module.css'; 

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
  if (gewuenscht === '2') {
    return tdee * 1.15;
  } else {
    return tdee * 0.85;
  }
};

const teilZuweisung = (tdee, gewuenscht) => {
  let kohlenhydrate, fette, proteine;
  const kalorien = kalorienErg(tdee, gewuenscht);
  if (gewuenscht === '2') {
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

const UpdateCalories = () => {
  const [gewicht, setGewicht] = useState("");
  const [groesse, setGroesse] = useState("");
  const [alter, setAlter] = useState("");
  const [geschlecht, setGeschlecht] = useState("");
  const [aktivitaetslevel, setAktivitaetslevel] = useState("");
  const [ziel, setZiel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]);
  const router = useRouter();

  const handleAddData = async () => {
    const gewichtValue = parseFloat(gewicht);
    const groesseValue = parseFloat(groesse);
    const alterValue = parseInt(alter);

    if (isNaN(gewichtValue) || isNaN(groesseValue) || isNaN(alterValue) || !geschlecht || !aktivitaetslevel || !ziel) {
      alert("Bitte füllen Sie alle Felder korrekt aus.");
      return;
    }

    setIsLoading(true);

    const bmr = berechnungBMR(gewichtValue, groesseValue, alterValue, geschlecht);
    const aktivfaktor = parseFloat(aktivitaetslevel);
    const tdee = berechnungTDEE(bmr, aktivfaktor);
    const daten = teilZuweisung(tdee, ziel);

    setChartData(daten);

    localStorage.setItem('macroData', JSON.stringify(daten));
    localStorage.setItem('gewicht', gewichtValue);

    // Redirect to the UpdateCalories page immediately without a delay
    router.push('/updateCalories');
  };

  return (
    <div className={styles.updateCaloriesContainer}>
      <div className={styles.container}>
        <h1 className={styles.header}>Kalorienrechner</h1>
        <input
          className={styles.formElement}
          type="text"
          placeholder="Gewicht (kg)"
          value={gewicht}
          onChange={e => setGewicht(e.target.value)}
        />
        <input
          className={styles.formElement}
          type="text"
          placeholder="Größe (cm)"
          value={groesse}
          onChange={e => setGroesse(e.target.value)}
        />
        <input
          className={styles.formElement}
          type="text"
          placeholder="Alter"
          value={alter}
          onChange={e => setAlter(e.target.value)}
        />
        <select
          className={styles.formElement}
          value={geschlecht}
          onChange={e => setGeschlecht(e.target.value)}
        >
          <option value="">Geschlecht</option>
          <option value="Mann">Mann</option>
          <option value="Frau">Frau</option>
        </select>
        <select
          className={styles.formElement}
          value={aktivitaetslevel}
          onChange={e => setAktivitaetslevel(e.target.value)}
        >
          <option value="">Aktivitätslevel</option>
          <option value="1.2">Sitzend (wenig oder keine Bewegung)</option>
          <option value="1.375">Leicht aktiv (leichte Bewegung/Sport 1-3 Tage pro Woche)</option>
          <option value="1.55">Mäßig aktiv (mäßige Bewegung/Sport 3-5 Tage pro Woche)</option>
          <option value="1.725">Sehr aktiv (harte Bewegung/Sport 6-7 Tage pro Woche)</option>
          <option value="1.9">Extrem aktiv (sehr harte Bewegung/Sport und körperliche Arbeit)</option>
        </select>
        <select
          className={styles.formElement}
          value={ziel}
          onChange={e => setZiel(e.target.value)}
        >
          <option value="">Ziel</option>
          <option value="2">Muskelaufbau</option>
          <option value="1">Abnehmen</option>
        </select>
        <button className={`${styles.formElement} ${styles.button}`} onClick={handleAddData}>
          Weiter
        </button>
      </div>
    </div>
  );
};

export default UpdateCalories;
