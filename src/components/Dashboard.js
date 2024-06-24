import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import CountCalories from './CountCalories';
import WeightTracker from './WeightTracker';
import WeightTrackerBig from './WeightTrackerBig';
import Streak from './Streak';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showWeightTrackerBig, setShowWeightTrackerBig] = useState(false);
  const router = useRouter();

  useEffect(() => {

    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        if (response.data) {
          setUser(response.data);
        } else {
          router.push('/loginPage');
        }
      } catch (error) {
        console.error('Session verification failed:', error);
        router.push('/loginPage');
      }
    };

    const reloaded = localStorage.getItem('reloaded');
    if (!reloaded) {
      localStorage.setItem('reloaded', 'true');
      window.location.reload();
    } else {
      verifySession();
    }

    return () => {
      localStorage.removeItem('reloaded');
      document.body.classList.remove(styles.noScroll); // Entfernen Sie die Klasse beim Verlassen der Komponente
    };
  }, [router]);

  const handleShowWeightTrackerBig = () => {
    setShowWeightTrackerBig(true);
  };

  const handleCloseWeightTrackerBig = () => {
    setShowWeightTrackerBig(false);
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className={styles.dashboardContainer}>
      <h1>Hallo {user.vorname}</h1>
      <div className={styles.dashboardContent}>
        <div className={styles.dashboardSection}>
          <Streak userId={user.userId} />
          
        </div>
        <div className={styles.dashboardSection}>
          <CountCalories userId={user.userId} />
          
        </div>
        <div className={styles.dashboardSection}>
          <WeightTracker userId={user.userId} onShowBig={handleShowWeightTrackerBig} />
        </div>
        
      </div>
      {showWeightTrackerBig && (
        <div className={styles.weightTrackerBigOverlay}>
          <div className={styles.weightTrackerBigContainer}>
            <WeightTrackerBig userId={user.userId} onClose={handleCloseWeightTrackerBig} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
