import React, { Component } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

class ScatterChartView extends Component {
  getData = (events, locations) => {
    const data = locations.map((location) => {
      const number = events.filter(
        (event) => event.location === location
      ).length;
      const city = location.split(', ').shift();
      return { city, number };
    });
    return data;
  };

  render() {
    const { events, locations } = this.props;
    return (
      <ResponsiveContainer height={300}>
        <h4 className="ScatterChart-title">
          No. of events in each city
        </h4>
        <ScatterChart
          margin={{
            top: 20,
            right: 20,
            bottom: 10,
            left: 10,
          }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="category"
            dataKey="city"
            name="City"
            angle={270}
          />
          <YAxis
            type="number"
            dataKey="number"
            name="Number of events"
            allowDecimals={false}
          />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter
            data={this.getData(events, locations)}
            fill="#172815"
          />
        </ScatterChart>
      </ResponsiveContainer>
    );
  }
}

export default ScatterChartView;
