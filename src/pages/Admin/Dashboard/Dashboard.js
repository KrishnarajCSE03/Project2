import React from 'react';
import DashboardCards from '../../../components/Dashboard/DashboardCards/DashboardCards';
import BillingTrendsChart from '../../../components/Dashboard/BillingTrendsChart/BillingTrendsChart';
import RecentInvoicesTable from '../../../components/Dashboard/RecentInvoicesTable/RecentInvoicesTable';
const Dashboard = () => {
  return (
    <div>
        <h2 style={{ marginBottom: '1rem' }}>Admin Dashboard</h2>
      <DashboardCards />
      <BillingTrendsChart/>
      <RecentInvoicesTable/>
      {/* More dashboard sections will go here */}
    </div>
  );
};

export default Dashboard;
