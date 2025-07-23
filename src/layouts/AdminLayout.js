import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Topbar from '../components/Topbar/Topbar';
import useScreenSize from '../hooks/useScreenSize';
import bannerImage from '../assets/Banner-1.jpg';

const AdminLayout = () => {
  const { isMobile, isTablet } = useScreenSize();
  const isMobileOrTablet = isMobile || isTablet;

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getSidebarWidth = () => {
    if (isMobileOrTablet) return '0';
    return isSidebarHovered ? '260px' : '80px';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      {!isMobileOrTablet ? (
        <div
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          style={{ transition: 'width 0.3s ease' }}
        >
          <Sidebar
            collapsed={!isSidebarHovered}
            role="admin"
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
        </div>
      ) : (
        <Sidebar
          collapsed={false}
          role="admin"
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
      )}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          marginLeft: getSidebarWidth(),
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Topbar collapsed={!isMobileOrTablet && !isSidebarHovered} role="admin" />
        <div
          className="dashboard-wrapper"
          style={{
            backgroundImage: `url(${bannerImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            padding: '1rem',
            flex: 1,
          }}
        >
          <Outlet /> {/* Render child route component here */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
