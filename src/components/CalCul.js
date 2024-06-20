import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import PuffLoader from "react-spinners/PuffLoader";
import "./CalCul.css";

//BMR Berechnen
const berechnungBMR = (gewicht, groesse, alter, geschlecht) => {
  if (geschlecht === 'Mann') {
    return (10 * gewicht) + (6.25 * groesse) - (5 * alter) + 5;
  } else {
    return (10 * gewicht) + (6.25 * groesse) - (5 * alter) - 161;
  }
};

// TDEE Berechnen
const berechnungTDEE = (bmr, aktivfaktor) => {
  return bmr * aktivfaktor;
};

// Kalorien Berechnen
const kalorienErg = (tdee, gewuenscht) => {
  if (gewuenscht === 'Muskelaufbau') {
    return tdee * 1.15;
  } else {
    return tdee * 0.85;
  }
};

// Werte Berechnen
const teilZuweisung = (tdee, gewuenscht) => {
  let kohlenhydrate, fette, proteine;
  const kalorien = kalorienErg(tdee, gewuenscht);
  if (gewuenscht === 'Muskelaufbau') {
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
  const navigate = useNavigate();

  const handleAddData = () => {
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
    setTimeout(() => {
      setData(macroData);
      setLoading(false); 
      navigate('/chart');
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
        <option value="Muskelaufbau">Muskelaufbau</option>
        <option value="Gewichtsverlust">Gewichtsverlust</option>
      </select>
      <button onClick={handleAddData}>Weiter</button>
    </div>
  );
};


const ChartPage = ({ data }) => {
  const COLORS = ["rgba(210, 4, 45, 0.6)", "rgba(170, 255, 0, 0.6)", "rgba(125, 249, 255, 0.6)"];
  const BORDER_COLORS = ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)", "rgba(0, 0, 255, 1)"];


  const totalCalories = data.reduce((acc, item) => acc + item.value, 0);

  const formatLabel = ({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`;

  return (
    <div className="container">
      <h1>Kalorien</h1>
      <h2>Gesamtkalorien: {totalCalories.toFixed(2)} kcl</h2> 
      <div className="CalCul">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            label={formatLabel}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                stroke={BORDER_COLORS[index % BORDER_COLORS.length]}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`${props.payload.name}: ${value.toFixed(2)} Kalorien`, ""]} /> 
        </PieChart>
      </div>
    </div>
  );
};

const CalCul = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false); 

  useEffect(() => {
    if (loading) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 5000); //loader Zeit

      return () => clearTimeout(timeout); 
    }
  }, [loading]);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<InputPage setData={setData} setLoading={setLoading} />} 
        />
        <Route path="/chart" element={<ChartPage data={data} />} />
      </Routes>

      
      {loading && (
        <div className="loader-overlay">
          <PuffLoader color={"#ffffff"} loading={true} size={150} cssOverride={{}} />
        </div>
      )}
    </Router>
  );
};

export default CalCul;
