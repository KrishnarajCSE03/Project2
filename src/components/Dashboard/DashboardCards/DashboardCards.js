import React from 'react';
import './DashboardCards.css';
import { FaDollarSign, FaFileInvoice, FaClock, FaHourglassHalf } from 'react-icons/fa';

const cardData = [
  {
    id: 1,
    title: 'Revenue This Month',
    value: '$12,400',
    icon: <FaDollarSign />,
    color: '#4caf50',
  },
  {
    id: 2,
    title: 'Total Invoices',
    value: '38',
    icon: <FaFileInvoice />,
    color: '#2196f3',
  },
  {
    id: 3,
    title: 'Pending Payments',
    value: '7',
    icon: <FaHourglassHalf />,
    color: '#ff9800',
  },
  {
    id: 4,
    title: 'Billable Hours',
    value: '102 hrs',
    icon: <FaClock />,
    color: '#9c27b0',
  },
];

const DashboardCards = () => {
  return (
    <div className="dashboard-cards">
      {cardData.map((card) => (
        <div className="dashboard-card" key={card.id}>
          <div className="card-icon" style={{ backgroundColor: card.color }}>
            {card.icon}
          </div>
          <div className="card-details">
            <p className="card-title">{card.title}</p>
            <h3 className="card-value">{card.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
