import React from 'react';
import './RecentInvoicesTable.css';

const invoices = [
  { id: 'INV-001', client: 'Acme Corp', amount: 1200, status: 'Paid', dueDate: '2025-07-01' },
  { id: 'INV-002', client: 'Globex Ltd', amount: 850, status: 'Pending', dueDate: '2025-07-10' },
  { id: 'INV-003', client: 'Soylent Inc', amount: 2200, status: 'Overdue', dueDate: '2025-06-15' },
  { id: 'INV-004', client: 'Initech', amount: 3400, status: 'Paid', dueDate: '2025-07-05' },
];

const RecentInvoicesTable = () => {
  return (
    <div className="invoices-table-container">
      <h3>Recent Invoices</h3>
      <div className="table-wrapper">
        <table className="invoices-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <td>{invoice.id}</td>
                <td>{invoice.client}</td>
                <td>${invoice.amount.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                    {invoice.status}
                  </span>
                </td>
                <td>{invoice.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentInvoicesTable;
