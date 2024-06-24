import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateCaloriesChart from '../components/UpdateCaloriesChart';
import styles from '../styles/UpdateCaloriesPage.module.css';

const UpdateCaloriesPage = () => {
  const [user, setUser] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        setUser(response.data);
      } catch (error) {
        console.error('Fehler beim Abrufen der Benutzerdaten:', error);
      }
    };

    const macroData = JSON.parse(localStorage.getItem('macroData'));
    if (macroData) {
      setChartData(macroData);
    }

    fetchData();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <UpdateCaloriesChart data={chartData} userId={user.userId} />
    </div>
  );
};

export default UpdateCaloriesPage;
