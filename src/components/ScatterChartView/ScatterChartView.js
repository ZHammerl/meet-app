import React, { PureComponent } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
// import { extractLocations } from '../../api';

export default class ScatterChartView extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <ResponsiveContainer height={300}>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}>
          <CartesianGrid
            stroke="#ccc"
            strokeDasharray="2 2"
          />
          <XAxis
            type="category"
            dataKey="city"
            name="City"
            angle={315}
            stroke="#172815"
            textAnchor="end"
          />
          <YAxis
            allowDecimals={false}
            type="number"
            dataKey="number"
            name="Number of events"
            stroke="#172815"
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter data={data} fill="#172815" />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}
