import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import styles from '../styles/WeightTracker.module.css';

// Import the necessary modules from Chart.js
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

// Register the components in ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const WeightTracker = ({ userId, onShowBig }) => {
  const [weights, setWeights] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());

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

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const data = {
    labels: weights.map(w => formatDate(w.date)), // Use formatted dates as labels
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
    <div className={styles.weightTrackerContainer} onClick={onShowBig}>
      <div className={styles.weightTrackerSmall}>
        <h2>Gewicht</h2>
        <div className={styles.chartContainer}>
          <Line data={data} options={{ maintainAspectRatio: false, responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default WeightTracker;
