import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useRouter } from 'next/router';
import styles from '../styles/ChartPage.module.css';

const ChartPage = ({ data }) => {
  const COLORS = ["#39CEF3", "#72CA3D", "#FF4906"];
  const BORDER_COLORS = ["Transparent", "Transparent", "Transparent"];
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [chartDimensions, setChartDimensions] = useState({ width: 650, height: 400 });

  const totalCalories = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    document.body.classList.add(styles.noScroll);
    setIsClient(true); // Marking component as client-side rendered

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

  const navigateToMeals = () => {
    router.push('/meals');
  };

  return (
    <div className={`${styles.container} ${styles.backgroundImage}`}>
      <h1>Deine Kalorien</h1>
      <div className={styles.CalCul}>
        {isClient && ( // Render chart only on client side to avoid SSR issues
          <PieChart width={chartDimensions.width} height={chartDimensions.height}>
            {/* Outer Pie */}
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={chartDimensions.width / 4} // Inner radius of the outer ring
              outerRadius={chartDimensions.width / 3.5} // Outer radius of the outer ring
              fill="#8884d8" // Color of the outer ring
              labelLine={false} // Optional: Disable label lines if they interfere
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
      <button className={styles.button} onClick={navigateToMeals}>Zu den Mahlzeiten</button>
    </div>
  );
};

export default ChartPage;
