import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/Streak.module.css';

const Streak = ({ userId }) => {
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const fetchDailyCalories = async () => {
      try {
        const response = await axios.get('/api/getDailyCalories', { params: { userId } });
        const dailyCalories = response.data;


       
        let currentStreak = 0;
        let maxStreak = 0;
        let lastDate = null;
        const currentDate = new Date().setHours(0, 0, 0, 0); 

        dailyCalories.forEach(entry => {
          const entryDate = new Date(entry.date).setHours(0, 0, 0, 0); 

          if (entryDate >= currentDate) {
            return; 
          }

          const { carbs, protein, fat, calories, maxCarbs, maxProtein, maxFat, maxCalories } = entry;
          const inGreenZone = (value, max) => {
            if (!max) return false; 
            return value >= 0.9 * max && value <= 1.1 * max;
          };

         
          

          const isCarbsGreen = inGreenZone(carbs, maxCarbs / 4);
          const isProteinGreen = inGreenZone(protein, maxProtein / 4);
          const isFatGreen = inGreenZone(fat, maxFat / 8);
          const isCaloriesGreen = inGreenZone(calories, maxCalories);

          

          if (isCarbsGreen && isProteinGreen && isFatGreen && isCaloriesGreen) {
            
              currentStreak += 1; 
            
            
          } else {
            currentStreak = 0; 
            lastDate = null;
          }

         
          
        });

        setStreak(currentStreak);
        
      } catch (error) {
        console.error('Error fetching daily calories:', error);
      }
    };

    fetchDailyCalories();
  }, [userId]);

  return (
    <div className={styles.streakContainer}>
      <h2>Streak:</h2>
      <p>{streak} Tage 🔥</p>
    </div>
  );
};

export default Streak;
