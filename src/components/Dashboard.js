import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';  // Import useRouter hook from Next.js
import CountCalories from './CountCalories';
import WeightTracker from './WeightTracker';
import WeightTrackerBig from './WeightTrackerBig';
import Streak from './Streak';
import styles from '../styles/Dashboard.module.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [showWeightTrackerBig, setShowWeightTrackerBig] = useState(false);
  const router = useRouter();  // Initialize useRouter

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await axios.get('/api/verifySession', { withCredentials: true });
        if (response.data) {
          setUser(response.data);
        } else {
          router.push('/loginPage');  // Redirect to login page if no user data is found
        }
      } catch (error) {
        console.error('Session verification failed:', error);
        router.push('/loginPage');  // Redirect to login page on error
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
        <div className="dashboard-section">
          <CountCalories userId={user.userId} />
        </div>
        <div className="dashboard-section">
          <WeightTracker userId={user.userId} onShowBig={handleShowWeightTrackerBig} />
        </div>
        <div className="dashboard-section">
          <Streak userId={user.userId} />
        </div>
      </div>
      {showWeightTrackerBig && (
        <WeightTrackerBig userId={user.userId} onClose={handleCloseWeightTrackerBig} />
      )}
    </div>
  );
};

export default Dashboard;
