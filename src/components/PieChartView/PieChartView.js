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
    return data;
  };

  const COLORS = [
    '#B8E1FF',
    '#617788',
    '#94FBAB',
    '#5C0029',
    '#61304B',
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    name,
    percent,
  }) => {
    const radius =
      innerRadius + (outerRadius - innerRadius) * 0.5;
    const cos = Math.cos(-RADIAN * midAngle);
    const x = cx + 1.5 * radius * cos;
    const y =
      cy + 1.5 * radius * Math.sin(-midAngle * RADIAN);
    if (percent > 0) {
      return (
        <text
          x={x}
          y={y}
          dy={10}
          fontSize="80%"
          fill="black"
          fontWeight="bold"
          textAnchor={x > cx ? 'start' : 'end'}
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
            labelLine={true}
            label={renderCustomizedLabel}
            innerRadius={70}
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
