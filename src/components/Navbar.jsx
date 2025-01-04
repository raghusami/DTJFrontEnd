// src/components/Navbar.js
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Menu, MenuItem, Divider } from '@mui/material';
import { Search, Notifications, AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { SubtitleFour,ThemesColors} from '../CommonStyles';

const Navbar = ({ onToggleSidebar, title }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // For redirecting

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    // Clear authentication state here
    // Redirect to login page
    navigate('/login');
  };

  return (
    <AppBar 
      position="fixed" 
      style={{ background: '#ffffff', marginLeft: '240px', width: 'calc(100% - 240px)', boxShadow: 'none' }}
    >
      <Toolbar>
        <SubtitleFour variant="h6" noWrap style={{ flexGrow: 1 }}>
          {title || 'Trade Log'}
        </SubtitleFour>
        <div>
          <IconButton color="inherit">
            <Notifications style={{ color: ThemesColors.tradegrey600 }} />
          </IconButton>
          <IconButton color="inherit" onClick={handleMenuOpen}>
            <AccountCircle style={{ color: ThemesColors.tradegrey600 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                width: 200,
                maxWidth: '100%',
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
