import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/UpdateCaloriesChart.module.css';

const UpdateCaloriesChart = ({ data, userId }) => {
  const COLORS = ["#39CEF3", "#72CA3D", "#FF4906"];
  const BORDER_COLORS = ["Transparent", "Transparent", "Transparent"];
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({ width: 650, height: 400 });

  const totalCalories = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    document.body.classList.add(styles.noScroll);
    setIsClient(true);

    const updateChartDimensions = () => {
      if (window.innerWidth <= 768) {
        setChartDimensions({ width: 300, height: 300 });
      } else {
        setChartDimensions({ width: 650, height: 450 });
      }
    };

    updateChartDimensions();
    window.addEventListener('resize', updateChartDimensions);

    return () => window.removeEventListener('resize', updateChartDimensions);
  }, []);

  const handleUpdateCalories = async () => {
    const macroData = JSON.parse(localStorage.getItem('macroData'));

    try {
      const response = await axios.post('/api/updateCalories', {
        userId,
        calories: macroData.reduce((acc, item) => acc + item.value, 0),
        protein: macroData.find(item => item.name === 'Proteine')?.value || 0,
        fat: macroData.find(item => item.name === 'Fette')?.value || 0,
        carbs: macroData.find(item => item.name === 'Kohlenhydrate')?.value || 0
      });

      console.log('API response:', response.data);

      if (response.status === 200) {
        alert('Kalorienwerte erfolgreich aktualisiert');
        router.push('/dashboard');
      } else {
        alert('Fehler beim Aktualisieren der Kalorienwerte');
      }
    } catch (error) {
      console.error('Fehler beim Aktualisieren der Kalorienwerte:', error);
      alert('Fehler beim Aktualisieren der Kalorienwerte');
    }
  };

  return (
    <div className={`${styles.container} ${styles.backgroundImage}`}>
      <h1>Deine Kalorien</h1>
      <div className={styles.CalCul}>
        {isClient && (
          <PieChart width={chartDimensions.width} height={chartDimensions.height}>
            {}
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={chartDimensions.width / 4} 
              outerRadius={chartDimensions.width / 3.5} 
              fill="#8884d8" 
              labelLine={false} 
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 1.6;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                let grams = 0;
                if (name === 'Proteine' || name === 'Kohlenhydrate') {
                  grams = (totalCalories / 4) * (percent);
                } else {
                  grams = (totalCalories / 9) * (percent);
                }

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#fff"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                    fontSize={window.innerWidth <= 768 ? 12 : 16}
                  >
                    {`${name} ${grams.toFixed(0)}g`}
                  </text>
                );
              }}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={BORDER_COLORS[index % BORDER_COLORS.length]}
                  strokeWidth={10}
                />
              ))}
            </Pie>

            <Pie
              data={[{ name: 'Inner', value: 100 }]}
              cx="50%"
              cy="50%"
              innerRadius={0}
              outerRadius={chartDimensions.width / 2}
              fill="Transparent"
            >
              <Cell strokeWidth={0} />
            </Pie>

            <text x="50%" y="50%" textAnchor="middle" dy={20} fill="#fff" className={styles.totalCaloriesText}>{totalCalories.toFixed(2)} kcl</text>
            <text x="50%" y="50%" textAnchor="middle" dy={-10} fill="#fff" className={styles.totalCaloriesLabel}>Gesamtkalorien</text>
            
            
          </PieChart>
        )}
      </div>
      <button className={styles.button} onClick={handleUpdateCalories}>Kalorien aktualisieren</button>
    </div>
  );
};

export default UpdateCaloriesChart;
