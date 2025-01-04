// src/components/Sidebar.js
import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import { Dashboard, Book, Assessment, School, Note, PlayArrow, Add, Menu } from '@mui/icons-material';
import '../styles/Sidebar.css'; // Import CSS
import { Link, useLocation } from 'react-router-dom';
import { GradientTextLogo, StyledAddButton } from '../CommonStyles';

const Sidebar = ({ isSidebarOpen, onToggleSidebar }) => {
  const location = useLocation(); // Get the current route
  const [activeItem, setActiveItem] = React.useState(location.pathname);

  React.useEffect(() => {
    setActiveItem(location.pathname);
  }, [location.pathname]);

  const handleItemClick = (path) => {
    setActiveItem(path);
    if (window.innerWidth <= 768) {
      onToggleSidebar(); // Close sidebar on mobile view when an item is clicked
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <IconButton 
        className="mobile-menu-button"
        onClick={onToggleSidebar}
      >
        <Menu />
      </IconButton>
      <div className={`sidebar ${isSidebarOpen ? 'open' : 'hidden'}`}>
        <div className="sidebar-header">
          DISCIPLINE <GradientTextLogo>TRADE</GradientTextLogo>
        </div>
        <List>
          <ListItem 
            button 
            component={Link}
            to="/" 
            className={activeItem === '/' ? 'list-item active' : 'list-item'}
            onClick={() => handleItemClick('/')}
          >
            <ListItemIcon className="list-item-icon"><Dashboard /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        <ListItem 
            button 
            component={Link}
            to="/daily-journal"
            className={activeItem === '/daily-journal' ? 'list-item active' : 'list-item'}
            onClick={() => handleItemClick('/daily-journal')}
          >
            <ListItemIcon className="list-item-icon"><Book /></ListItemIcon>
            <ListItemText primary="Daily Journal" />
          </ListItem>
          <ListItem 
            button 
            component={Link}
            to="/open-positions"
            className={activeItem === '/open-positions' ? 'list-item active' : 'list-item'}
            onClick={() => handleItemClick('/open-positions')}
          >
            <ListItemIcon className="list-item-icon"><Assessment /></ListItemIcon>
            <ListItemText primary="Open Opsitions" />
          </ListItem>
          <ListItem 
            button 
            component={Link}
            to="/trade-log"
            className={activeItem === '/trade-log' ? 'list-item active' : 'list-item'}
            onClick={() => handleItemClick('/trade-log')}
          >
            <ListItemIcon className="list-item-icon"><School /></ListItemIcon>
            <ListItemText primary="Trade Log" />
          </ListItem>
          <ListItem 
            button 
            component={Link}
            to="/notebook"
            className={activeItem === '/notebook' ? 'list-item active' : 'list-item'}
            onClick={() => handleItemClick('/notebook')}
          >
            <ListItemIcon className="list-item-icon"><Note /></ListItemIcon>
            <ListItemText primary="Notebook" />
          </ListItem>
          <ListItem 
            button 
            component={Link}
            to="/trade-replay"
            className={activeItem === '/trade-replay' ? 'list-item active' : 'list-item'}
            onClick={() => handleItemClick('/trade-replay')}
          >
            <ListItemIcon className="list-item-icon"><PlayArrow /></ListItemIcon>
            <ListItemText primary="Trade Replay" />
          </ListItem>
        </List>
      </div>
    </>
  );
};

export default Sidebar;
