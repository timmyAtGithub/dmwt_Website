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
        let lastDate = null;
        const currentDate = new Date().setHours(0, 0, 0, 0); // Set current date to midnight for accurate comparison

        dailyCalories.forEach(entry => {
          const entryDate = new Date(entry.date).setHours(0, 0, 0, 0); // Set entry date to midnight

          if (entryDate >= currentDate) {
            return; // Ignore current and future dates
          }

          const { carbs, protein, fat, calories, maxCarbs, maxProtein, maxFat, maxCalories } = entry;
          const inGreenZone = (value, max) => {
            if (!max) return false; // Ensure max is not null or undefined
            return value >= 0.9 * max && value <= 1.1 * max;
          };

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

          console.log(`isCarbsGreen: ${isCarbsGreen}, isProteinGreen: ${isProteinGreen}, isFatGreen: ${isFatGreen}, isCaloriesGreen: ${isCaloriesGreen}`);

          if (isCarbsGreen && isProteinGreen && isFatGreen && isCaloriesGreen) {
            if (lastDate && (entryDate - lastDate !== 86400000)) { // Check if the date difference is 1 day (86400000 ms)
              currentStreak = 0; // Reset current streak if days are not consecutive
            }
            currentStreak += 1;
            lastDate = entryDate; // Update the last date to the current entry's date
          } else {
            currentStreak = 0; // Reset current streak if any of the values are not in the green zone
            lastDate = null;
          }

          
          console.log(`Current Streak: ${currentStreak}}`); // Log current and max streak
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
