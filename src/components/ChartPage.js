import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useRouter } from 'next/router';
import styles from '../styles/ChartPage.module.css';

const ChartPage = ({ data }) => {
  const COLORS = ["#e9967a", "#d2b48c", "#00a0aa"];
  const BORDER_COLORS = ["#333", "#333", "#333"];
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  const totalCalories = data.reduce((acc, item) => acc + item.value, 0);

  useEffect(() => {
    setIsClient(true); // Marking component as client-side rendered
  }, []);

  const navigateToMeals = () => {
    router.push('/meals');
  };

  return (
    <div className={styles.container}>
      <h1>Kalorien</h1>
      <div className={styles.CalCul}>
        {isClient && ( // Render chart only on client side to avoid SSR issues
          <PieChart width={650} height={400}>
            {/* Outer Pie */}
            <Pie
              data={data}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={100} // Inner radius of the outer ring
              outerRadius={150} // Outer radius of the outer ring
              fill="#8884d8" // Color of the outer ring
              labelLine={false} // Optional: Disable label lines if they interfere
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    fill="#fff"
                    textAnchor={x > cx ? "start" : "end"}
                    dominantBaseline="central"
                  >
                    {`${name} ${(percent * 100).toFixed(2)}%`}
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
              outerRadius={100} 
              fill="#333" 
            >
              <Cell strokeWidth={0} /> 
            </Pie>

            <text x="50%" y="50%" textAnchor="middle" dy={20} className={styles.totalCaloriesText}>{totalCalories.toFixed(2)} kcl</text>
            <text x="50%" y="50%" textAnchor="middle" dy={-10} className={styles.totalCaloriesLabel}>Gesamtkalorien</text>
            
            <Tooltip formatter={(value, name, props) => [`${props.payload.name}: ${value.toFixed(2)} Kalorien`, ""]} /> 
          </PieChart>
        )}
      </div>
      <button className={styles.button} onClick={navigateToMeals}>Zu den Mahlzeiten</button>
    </div>
  );
};

export default ChartPage;
