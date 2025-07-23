// src/components/Sidebar/Sidebar.js

import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import {
  FaTachometerAlt, FaFileInvoice, FaBoxOpen, FaChartPie,
  FaCog, FaBars, FaSignOutAlt, FaReceipt
} from 'react-icons/fa';

import { FiRepeat } from 'react-icons/fi';
import { Link, useLocation } from 'react-router-dom';
import profile from '../../assets/profile.png';
import Swal from 'sweetalert2';

import API from '../../config/api'; // make sure this is your axios instance
const Sidebar = ({ isOpen, setIsOpen, collapsed = false, role = 'admin' }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



const handleLogout = () => {
  Swal.fire({
    title: 'Logout?',
    text: 'You will be logged out!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, logout'
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');

        if (token) {
          await API.post(
            '/auth/logout',
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          );
        }

        localStorage.clear();
        sessionStorage.clear();

        Swal.fire('Logged out!', '', 'success');
        setTimeout(() => (window.location.href = '/'), 1200);
      } catch (err) {
        console.error('Logout error:', err);
        Swal.fire('Error!', 'Failed to log out. Please try again.', 'error');
      }
    }
  });
};

  const toggleMobileSidebar = () => {
    if (isMobile) {
      setIsOpen?.(!isOpen);
    }
  };

  const menuItems = {
    admin: [
      { label: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
      { label: 'Invoice', path: '/admin/invoice', icon: <FaFileInvoice /> },
      { label: 'Petty Cash Book', path: '/admin/expenses', icon: <FaReceipt /> },
      { label: 'Products', path: '/admin/products', icon: <FaBoxOpen /> },
      { label: 'Summary', path: '/admin/summary', icon: <FaChartPie /> },
      { label: 'Settings', path: '/admin/settings', icon: <FaCog /> },
    ],
    biller: [
      { label: 'Create Bill', path: '/biller/create-bill', icon: <FaFileInvoice /> },
      { label: 'Product', path: '/biller/products', icon: <FaBoxOpen /> },
      { label: 'Transactions', path: '/biller/transactions', icon: <FiRepeat /> },
      { label: 'Petty Cash Book', path: '/biller/Expenses', icon: <FaReceipt /> },
      { label: 'Settings', path: '/biller/settings', icon: <FaCog /> },
    ]
  };

  return (
    <>
      <div
        className={`sidebar ${collapsed ? 'collapsed' : ''} ${isMobile && isOpen ? 'open' : ''}`}
        onMouseEnter={() => !isMobile && setIsOpen?.(true)}
        onMouseLeave={() => !isMobile && setIsOpen?.(false)}
      >
        <div className="sidebar-toggle" onClick={toggleMobileSidebar}>
          <FaBars />
        </div>

        <div className="sidebar-user">
          <img src={profile} alt="User Avatar" className="user-avatar" />
          {!collapsed && (
            <div className="user-info">
              <p>Welcome,</p>
              <h4>{role === 'admin' ? 'Admin' : 'Biller'}</h4>
            </div>
          )}
        </div>

        <nav className="menu">
          {menuItems[role].map(item => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
              data-tooltip={item.label}
            >
              <span className="icon">{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
          <div className="menu-item logout-item" onClick={handleLogout} data-tooltip="Logout">
            <FaSignOutAlt className="icon" />
            {!collapsed && <span>Logout</span>}
          </div>
        </nav>
      </div>

      {isMobile && isOpen && (
        <div className="sidebar-backdrop" onClick={() => setIsOpen(false)} />
      )}
    </>
  );
};

export default Sidebar;
