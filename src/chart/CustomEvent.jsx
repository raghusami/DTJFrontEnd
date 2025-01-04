import React from 'react';
import { Box, Typography } from '@mui/material';
import { ThemesColors } from '../CommonStyles';

export const CustomEvent = ({ info }) => {
  const { profitOrLoss } = info.event.extendedProps;
  let backgroundColor;
  let fontColor = '#FFFFFF';
  if (profitOrLoss > 20000) {
    backgroundColor = ThemesColors.tradeSuccessDarker;
  } else if (profitOrLoss > 15000 && profitOrLoss <= 20000) {
    backgroundColor = ThemesColors.tradeSuccessDark; 
  } else if (profitOrLoss > 10000 && profitOrLoss <= 15000) {
    backgroundColor = ThemesColors.tradeSuccessDark900; 
  } else if (profitOrLoss > 5000 && profitOrLoss <= 10000) {
    backgroundColor = ThemesColors.tradeSuccessDark700; 
  } else if (profitOrLoss > 0 && profitOrLoss <= 5000) {
    backgroundColor = ThemesColors.tradeSuccessDark500; 
  } else if (profitOrLoss < 0 && profitOrLoss >= -2000) {
    backgroundColor = ThemesColors.tradeDangeDark600;
  } else if (profitOrLoss < -2000 && profitOrLoss >= -5000) {
    backgroundColor = ThemesColors.tradeDangeDark800;
  } else if (profitOrLoss < -5000 && profitOrLoss >= -10000) {
    backgroundColor = ThemesColors.tradeDangerMain;
  } else if (profitOrLoss < -10000 && profitOrLoss >= -100000) {
    backgroundColor = ThemesColors.tradeDangerDark;
  }
  
  return (
    <Box
      sx={{
        backgroundColor,
        padding: '3px',
        color: fontColor,
        borderRadius: '4px',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center', 
        textAlign: 'center', 
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    >
      <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#919EAB' }}> 
        {info.event.title}
      </Typography>
      <Typography variant="caption" sx={{ fontWeight: 'bold', marginTop: '2px' }}> 
        P/L: {profitOrLoss}
      </Typography>
    </Box>
  );
};
