import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

function PieChartView({ events }) {
  const [data, setData] = useState([]);

  const genres = [
    'React',
    'JavaScript',
    'Node',
    'jQuery',
    'AngularJS',
  ];
  const getData = () => {
    const data = genres.map((genre) => {
      const value = events.filter(({ summary }) =>
        summary.includes(genre)
      ).length;
      return { name: genre, value };
    });
    console.log(data);
    return data;
  };

  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#C74B50',
  ];

  useEffect(() => {
    setData(() => getData());
  }, [events]);
  return (
    <ResponsiveContainer height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => {
            if (percent > 0) {
              return `${name} ${(percent * 100).toFixed(
                0
              )}%`;
            }
          }}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}

export default PieChartView;
