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

        // Log the fetched dailyCalories to debug
        console.log('Fetched dailyCalories:', dailyCalories);

        // Calculate the streak
        let currentStreak = 0;
        let maxStreak = 0;

        dailyCalories.forEach(entry => {
          const { carbs, protein, fat, calories, maxCarbs, maxProtein, maxFat, maxCalories } = entry;
          const inGreenZone = (value, max) => value >= 0.9 * max && value <= 1.1 * max;

          // Log the values to debug
          console.log(`Date: ${entry.date}`);
          console.log(`Carbs: ${carbs} (Expected: ${maxCarbs ? maxCarbs / 4 * 0.9 : 'N/A'}-${maxCarbs ? maxCarbs / 4 * 1.1 : 'N/A'})`);
          console.log(`Protein: ${protein} (Expected: ${maxProtein ? maxProtein / 4 * 0.9 : 'N/A'}-${maxProtein ? maxProtein / 4 * 1.1 : 'N/A'})`);
          console.log(`Fat: ${fat} (Expected: ${maxFat ? maxFat / 8 * 0.9 : 'N/A'}-${maxFat ? maxFat / 8 * 1.1 : 'N/A'})`);
          console.log(`Calories: ${calories} (Expected: ${maxCalories ? maxCalories * 0.9 : 'N/A'}-${maxCalories ? maxCalories * 1.1 : 'N/A'})`);

          const isCarbsGreen = inGreenZone(carbs, maxCarbs / 4);
          const isProteinGreen = inGreenZone(protein, maxProtein / 4);
          const isFatGreen = inGreenZone(fat, maxFat / 8);
          const isCaloriesGreen = inGreenZone(calories, maxCalories);

          if (isCarbsGreen && isProteinGreen && isFatGreen && isCaloriesGreen) {
            currentStreak += 1;
          } else {
            currentStreak = 0;
          }

          maxStreak = Math.max(maxStreak, currentStreak);
        });

        setStreak(maxStreak);
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
