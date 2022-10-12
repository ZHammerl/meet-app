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
import './scatterChartView.css';

export default class ScatterChartView extends PureComponent {
  render() {
    const { data } = this.props;
    return (
      <div className="scatter-chart-container">
        <h4 className="scatter-chart-title">
          Events by City
        </h4>
        <ResponsiveContainer
          className="scatterchart-responsive"
          height={250}>
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
              stroke="black"
              textAnchor="end"
              minTickGap={0}
            />
            <YAxis
              allowDecimals={false}
              type="number"
              dataKey="number"
              name="Number of events"
              stroke="black"
            />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={data} fill="#B8E1FF" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
    );
  }
}
