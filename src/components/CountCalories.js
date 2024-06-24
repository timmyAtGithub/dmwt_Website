import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/CountCalories.module.css';

const ProgressBar = ({ value, max, label }) => {
  const percentage = (value / max) * 100;

  let barColor;
  if (percentage <= 25) {
    barColor = 'red';
  } else if (percentage <= 50) {
    barColor = 'orange';
  } else if (percentage <= 90) {
    barColor = 'yellow';
  } else if (percentage <= 110) {
    barColor = 'green';
  } else if (percentage <= 130) {
    barColor = 'yellow';
  } else {
    barColor = 'red';
  }

  return (
    <div className={styles.progressBarWrapper}>
      <div className={styles.progressBarContainer}>
        <div className={styles.progressBarInfo}>
          <span className={styles.progressBarValue}>{Math.round(value)}</span>
          <span>{label}</span>
          <span className={styles.progressBarMax}>{Math.round(max)}</span>
        </div>
        <div className={styles.progressBarBackground}>
          <div
            className={styles.progressBarFill}
            style={{
              width: `${percentage > 100 ? 100 : percentage}%`,
              backgroundColor: barColor,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

const CountCalories = ({ userId }) => {
  const [caloriesData, setCaloriesData] = useState(null);
  const [caloriesEatenData, setCaloriesEatenData] = useState(null);

  useEffect(() => {
    if (!userId) {
      console.error('No userId provided');
      return;
    }

    const fetchCaloriesInfo = async () => {
      try {
        
        const response = await axios.get(`/api/caloriesInfo?userId=${userId}&t=${Date.now()}`);
        setCaloriesData(response.data.caloriesData);
        setCaloriesEatenData(response.data.caloriesEatenData);
      } catch (error) {
        console.error('Error fetching calories info:', error);
      }
    };

    fetchCaloriesInfo();
  }, [userId]);

  useEffect(() => {
    const saveDailyCalories = async () => {
      if (caloriesEatenData && caloriesData) {
        const today = new Date().toISOString().split('T')[0];
        
        try {
          await axios.post('/api/saveDailyCalories', {
            userId,
            carbs: caloriesEatenData.carbs,
            protein: caloriesEatenData.protein,
            fat: caloriesEatenData.fat,
            calories: caloriesEatenData.calories,
            date: today,
            maxCarbs: caloriesData.carbs,
            maxProtein: caloriesData.protein,
            maxFat: caloriesData.fat,
            maxCalories: caloriesData.calories
          });
          
        } catch (error) {
          console.error('Error saving daily calories:', error);
        }
      }
    };

    saveDailyCalories();
  }, [caloriesEatenData, caloriesData, userId]);

  if (!caloriesData || !caloriesEatenData) return <p>Loading...</p>;

  return (
    <div className={styles.countCaloriesContainer}>
      <h2 className={styles.h2}>Heute gegessen</h2>
      <ProgressBar
        value={caloriesEatenData.carbs}
        max={caloriesData.carbs / 4}
        label="Carbs"
      />
      <ProgressBar
        value={caloriesEatenData.protein}
        max={caloriesData.protein / 4}
        label="Protein"
      />
      <ProgressBar
        value={caloriesEatenData.fat}
        max={caloriesData.fat / 8}
        label="Fat"
      />
      <ProgressBar
        value={caloriesEatenData.calories}
        max={caloriesData.calories}
        label="Calories"
      />
    </div>
  );
};

export default CountCalories;
