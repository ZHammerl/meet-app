import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';

import './pieChartView.css';

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
    '#B8E1FF',
    '#617788',
    '#94FBAB',
    '#5C0029',
    '#61304B',
  ];

  const renderCustomizedLabel = ({
    x,
    y,
    name,
    percent,
  }) => {
    if (percent > 0) {
      return (
        <text
          x={x}
          y={y}
          dy={-10}
          fontSize="80%"
          fill="black"
          fontWeight="bold"
          textAnchor="end"
          dominantBaseline="central">
          {`${name} ${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
  };

  useEffect(() => {
    setData(() => getData());
  }, [events]);
  return (
    <div className="pie-chart-container">
      <h4 className="pie-chart-title">Events by Topic</h4>
      <ResponsiveContainer
        className="pie-chart-background"
        height={300}>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
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
    </div>
  );
}

export default PieChartView;
