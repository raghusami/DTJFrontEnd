// src/components/Footer.js
import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        padding: 2,
        backgroundColor: '#f5f5f5',
        textAlign: 'center',
        borderTop: '1px solid #ddd',
        marginTop: 'auto',
      }}
    >
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} Disciplin Trade. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
