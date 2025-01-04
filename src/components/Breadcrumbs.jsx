// src/components/Breadcrumbs.js
import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs as MUIBreadcrumbs, Typography, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      <Link component={RouterLink} to="/"  underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit">
       <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" /> Home
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

        return last ? (
          <Typography color="textPrimary" key={to}>
           <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> {value}
          </Typography>
        ) : (
          <Link component={RouterLink} to={to} key={to} underline="hover"
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit">
          <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />  {value}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
