// src/layouts/BillerLayout.js

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar'; // reuse Sidebar
import Topbar from '../components/Topbar/Topbar'; // reuse Topbar or customize
import useScreenSize from '../hooks/useScreenSize';
import bannerImage from '../assets/Banner-1.jpg';

const BillerLayout = ({ PageComponent }) => {
  const { isMobile } = useScreenSize();

  const [isSidebarHovered, setIsSidebarHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // mobile open state

  const getSidebarWidth = () => {
    if (isMobile) return '0';
    return isSidebarHovered ? '260px' : '80px';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar desktop */}
      {!isMobile && (
        <div
          onMouseEnter={() => setIsSidebarHovered(true)}
          onMouseLeave={() => setIsSidebarHovered(false)}
          style={{ transition: 'width 0.3s ease' }}
        >
          <Sidebar
            collapsed={!isSidebarHovered}
            role="biller"
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
        </div>
      )}

      {/* Sidebar mobile */}
      {isMobile && (
        <Sidebar
          collapsed={false}
           role="biller"   
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
        <Topbar collapsed={!isMobile && !isSidebarHovered} role='biller'/>
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
          <PageComponent isMobile={isMobile} collapsed={!isSidebarHovered} />
        </div>
      </div>
    </div>
  );
};

export default BillerLayout;
