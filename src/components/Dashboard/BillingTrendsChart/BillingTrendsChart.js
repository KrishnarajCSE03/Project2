import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import './BillingTrendsChart.css';

const data = [
  { month: 'Jan', revenue: 3200 },
  { month: 'Feb', revenue: 4500 },
  { month: 'Mar', revenue: 3800 },
  { month: 'Apr', revenue: 5100 },
  { month: 'May', revenue: 6100 },
  { month: 'Jun', revenue: 7200 },
  { month: 'Jul', revenue: 6900 },
];

const BillingTrendsChart = () => {
  return (
    <div className="chart-container">
      <h3>Billing Trends</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip formatter={(value) => `$${value}`} />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#4caf50" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BillingTrendsChart;
