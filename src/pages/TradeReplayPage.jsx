import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function TradeReplayPage() {
  return (
    <Box sx={{ flexGrow: 1, padding: 2 }} className="container">
      <Grid container spacing={1}>
        {/* First Row - 4 Columns */}
        <Grid item xs={12} sm={3}>
          <Box sx={{ backgroundColor: '#d0d0d0', padding: 2 }}>
            Column 1
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ backgroundColor: '#d0d0d0', padding: 2 }}>
            Column 2
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ backgroundColor: '#d0d0d0', padding: 2 }}>
            Column 3
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          <Box sx={{ backgroundColor: '#d0d0d0', padding: 2 }}>
            Column 4
          </Box>
        </Grid>

        {/* Second Row - 2 Columns with 3/9 ratio */}
        <Grid item xs={12} sm={3}>
          <Box sx={{ backgroundColor: '#d0d0d0', padding: 2 }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: '#b0b0b0', padding: 1 }}>
                  Nested Column 1
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: '#b0b0b0', padding: 1 }}>
                  Nested Column 2
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: '#b0b0b0', padding: 1 }}>
                  Nested Column 3
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>

        {/* Second Row - 2nd Column */}
        <Grid item xs={12} sm={9}>
          <Box sx={{ backgroundColor: '#d0d0d0', padding: 2 }}>
            Column 2 in Second Row (9)
          </Box>
        </Grid>
      </Grid>
    
    </Box>
  );
}

export default TradeReplayPage;
