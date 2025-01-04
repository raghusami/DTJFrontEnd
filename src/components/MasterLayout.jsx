// src/components/MasterLayout.js
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { Box } from '@mui/material';
import Footer from './Footer';


const MasterLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar onToggleSidebar={handleToggleSidebar} />
      <Box display="flex" flexGrow={1}>
        <Sidebar isSidebarOpen={isSidebarOpen} onToggleSidebar={handleToggleSidebar} />
        <Box
          component="main"
          flexGrow={1}
          marginLeft={isSidebarOpen ? '240px' : '0'}
          transition="margin 0.3s"
          display="flex"
          flexDirection="column"
        >
          <Box padding={2} flexGrow={1}>
           
            <Outlet />
          </Box>
          <Footer />
        </Box>
      </Box>
    </Box>
  );
};

export default MasterLayout;
