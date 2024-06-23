import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useRouter } from 'next/router';
import styles from '../styles/ChartPage.module.css';

const ChartPage = ({ data }) => {
  const COLORS = ["#aa0000", "#aaaa00", "#0000aa"];
  const BORDER_COLORS = ["#000000", "#000000", "#000000"];
  const router = useRouter();

  const totalCalories = data.reduce((acc, item) => acc + item.value, 0);

  const formatLabel = ({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`;

  const navigateToMeals = () => {
    router.push('/meals');
  };

  return (
    <div className={styles.container}>
      <h1>Kalorien</h1>
      <h2>Gesamtkalorien: {totalCalories.toFixed(2)} kcl</h2> 
      <div className={styles.CalCul}>
        <PieChart width={1000} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={true}
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={150}
            labelLine={false} // Optionally disable label lines if they interfere with labels
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
              const RADIAN = Math.PI / 180;
              const radius = 0.9 * innerRadius + 1.2 * outerRadius;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text
                  x={x}
                  y={y}
                  fill="#fff" // Adjust label text color as needed
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
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name, props) => [`${props.payload.name}: ${value.toFixed(2)} Kalorien`, ""]} /> 
        </PieChart>
      </div>
      <button className={styles.button} onClick={navigateToMeals}>Zu den Mahlzeiten</button>
    </div>
  );
};

export default ChartPage;
