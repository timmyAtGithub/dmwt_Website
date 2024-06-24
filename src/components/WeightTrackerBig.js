import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../styles/WeightTrackerBig.module.css';


import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeightTrackerBig = ({ userId, onClose }) => {
  const [weight, setWeight] = useState('');
  const [weights, setWeights] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isExpanding, setIsExpanding] = useState(true);
  const [isShrinking, setIsShrinking] = useState(false);

  useEffect(() => {
    fetchWeights();
  }, [year]);

  const fetchWeights = async () => {
    try {
      const response = await axios.get('/api/fetchWeight', { params: { userId, year } });
      setWeights(response.data);
    } catch (error) {
      console.error('Error fetching weights:', error);
    }
  };

  const handleAddWeight = async () => {
    if (weight === '') {
      alert('Bitte Gewicht eingeben.');
      return;
    }
    try {
      await axios.post('/api/saveWeightData', {
        userId,
        weight: parseFloat(weight),
        date: new Date().toISOString(),
      });
      setWeight('');
      fetchWeights();
    } catch (error) {
      console.error('Error saving weight:', error);
    }
  };

  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClose = () => {
    setIsShrinking(true);
    setTimeout(onClose, 300); 
  };

  const data = {
    labels: weights.map(w => formatDate(w.date)),
    datasets: [
      {
        label: 'Gewicht',
        data: weights.map(w => w.weight),
        fill: false,
        backgroundColor: '#845ED7',
        borderColor: '#845ED7',
      },
    ],
  };

  return (
    <div className={styles.weightTrackerBigOverlay}>
      <div
        className={`${styles.weightTrackerBigContainer} ${isExpanding ? styles.expand : ''} ${isShrinking ? styles.shrink : ''}`}
        onClick={e => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={handleClose}>×</button>
        <div className={styles.weightChart}>
          <h2>Gewicht</h2>
          <Line data={data} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
        <div className={styles.weightInputForm}>
          <input
            type="number"
            placeholder="Gewicht in kg"
            value={weight}
            onChange={e => setWeight(e.target.value)}
          />
          <button onClick={handleAddWeight}>Hinzufügen</button>
        </div>
      </div>
    </div>
  );
};

export default WeightTrackerBig;
