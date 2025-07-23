import React, { useState, useEffect } from 'react';
import './Topbar.css';
import {
  FaBars, FaTachometerAlt, FaFileInvoice, FaBoxOpen,
  FaChartPie, FaCog, FaSignOutAlt, FaReceipt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useScreenSize from '../../hooks/useScreenSize';
import logo from "../../assets/logo.png";
import Swal from 'sweetalert2';

const Topbar = ({ collapsed, role = 'admin', onToggleSidebar }) => {
  const { isMobile, isTablet, isDesktop } = useScreenSize();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTopbar, setShowTopbar] = useState(true);
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    setShowTopbar(false);
    setShowDropdown(false);

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        Swal.fire({
          title: 'Logged out!',
          text: 'You have been successfully logged out.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });
        setTimeout(() => {
          window.location.href = '/';
        }, 1600);
      } else {
        setShowTopbar(true);
      }
    });
  };

  const menuItems = {
    admin: [
      { label: 'Dashboard', path: '/admin', icon: <FaTachometerAlt /> },
      { label: 'Invoice', path: '/admin/invoice', icon: <FaFileInvoice /> },
      { label: 'Products', path: '/admin/products', icon: <FaBoxOpen /> },
      { label: 'Petty Cash Book', path: '/admin/Expenses', icon: <FaReceipt /> },
      { label: 'Summary', path: '/admin/summary', icon: <FaChartPie /> },
      { label: 'Settings', path: '/admin/settings', icon: <FaCog /> },
    ],
    biller: [
      { label: 'Create Bill', path: '/biller/create-bill', icon: <FaFileInvoice /> },
      { label: 'Product', path: '/biller/products', icon: <FaBoxOpen /> },
      { label: 'Invoices', path: '/biller/invoices', icon: <FaReceipt /> },
      { label: 'Petty Cash Book', path: '/biller/Expenses', icon: <FaReceipt /> },
      { label: 'Settings', path: '/biller/settings', icon: <FaCog /> },
    ],
  };

  return (
    <>
      {showTopbar && (
        <>
          <div className="topbar">
            <div className="topbar-left">
              {(isMobile || isTablet) && (
                <FaBars
                  className="menu-icon"
                  onClick={() => {
                    setShowDropdown(prev => !prev);
                    onToggleSidebar?.();
                  }}
                />
              )}

              {(isTablet || isDesktop) && (
                <div className="store-info">
                  <img src={logo} alt="Logo" className="store-logo" />
                  <span className="store-name">Bakers Delight</span>
                </div>
              )}

              {isMobile && (
                <span className="topbar-title">
                  {role === 'admin' ? 'Admin Panel' : 'Biller Panel'}
                </span>
              )}
            </div>

            <div className="datetime-display">
              {dateTime.toLocaleDateString(undefined, {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}{' '}
              |{' '}
              {dateTime.toLocaleTimeString(undefined, {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })}
            </div>
          </div>

          {isMobile && (
            <div className="mobile-store-header">
              <img src={logo} alt="Logo" className="store-logo" />
              <span className="store-name">Bakers Delight</span>
            </div>
          )}
        </>
      )}

      {/* Mobile Dropdown menu */}
      {(isMobile || isTablet) && showDropdown && (
        <div className="mobile-dropdown">
          {menuItems[role].map(item => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => {
                setShowDropdown(false);
                onToggleSidebar?.();
              }}
            >
              {item.icon} {item.label}
            </Link>
          ))}

          <div className="menu-item logout-item" onClick={handleLogout}>
            <FaSignOutAlt className="icon" />
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
