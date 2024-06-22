import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import { useRouter } from 'next/router';

const ChartPage = ({ data }) => {
  const COLORS = ["rgba(210, 4, 45, 0.6)", "rgba(170, 255, 0, 0.6)", "rgba(125, 249, 255, 0.6)"];
  const BORDER_COLORS = ["rgba(255, 0, 0, 1)", "rgba(0, 255, 0, 1)", "rgba(0, 0, 255, 1)"];
  const router = useRouter();

  const totalCalories = data.reduce((acc, item) => acc + item.value, 0);

  const formatLabel = ({ name, percent }) => `${name} (${(percent * 100).toFixed(2)}%)`;

  const navigateToMeals = () => {
    router.push('/meals');
  };

  return (
    <div className="container">
      <h1>Kalorien</h1>
      <h2>Gesamtkalorien: {totalCalories.toFixed(2)} kcl</h2> 
      <div className="CalCul">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={data}
            cx={200}
            cy={200}
            outerRadius={80}
            label={formatLabel}
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
      <button onClick={navigateToMeals}>Zu den Mahlzeiten</button>
    </div>
  );
};

export default ChartPage;
