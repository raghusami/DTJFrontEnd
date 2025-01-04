import React, { useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,
} from '@mui/material';

const TradingDataPage = () => {
  // Sample data
  const [data] = useState([
    {
      product: 'NRML',
      instrument: 'CRUDEOIL AUG 6300 CE MCX',
      quantity: 1,
      avgPrice: 153.40,
      ltp: 170.00,
      pnl: 1660.00,
      change: 10.82,
    },
    {
      product: 'NRML',
      instrument: 'CRUDEOIL AUG 6300 PE MCX',
      quantity: 1,
      avgPrice: 54.20,
      ltp: 33.20,
      pnl: -2100.00,
      change: -38.75,
    },
    {
      product: 'NRML',
      instrument: 'ASIANPAINT AUG 3100 CE NFO',
      quantity: 200,
      avgPrice: 85.50,
      ltp: 38.05,
      pnl: -9490.00,
      change: -55.50,
    },
    {
      product: 'NRML',
      instrument: 'ASIANPAINT AUG 3100 PE NFO',
      quantity: 200,
      avgPrice: 62.25,
      ltp: 85.70,
      pnl: 4690.00,
      change: 37.67,
    },
  ]);

  const formatPnL = (pnl) => (pnl >= 0 ? `+${pnl.toFixed(2)}` : `${pnl.toFixed(2)}`);
  const formatPercentage = (percentage) => `${percentage.toFixed(2)}%`;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Instrument</TableCell>
            <TableCell align="right">Qty.</TableCell>
            <TableCell align="right">Avg.</TableCell>
            <TableCell align="right">LTP</TableCell>
            <TableCell align="right">P&L</TableCell>
            <TableCell align="right">Chg.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.product}</TableCell>
              <TableCell>{row.instrument}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.avgPrice.toFixed(2)}</TableCell>
              <TableCell align="right">{row.ltp.toFixed(2)}</TableCell>
              <TableCell align="right" style={{ color: row.pnl >= 0 ? 'green' : 'red' }}>
                {formatPnL(row.pnl)}
              </TableCell>
              <TableCell align="right" style={{ color: row.change >= 0 ? 'green' : 'red' }}>
                {formatPercentage(row.change)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={5} align="right"><strong>Total</strong></TableCell>
            <TableCell align="right" style={{ color: 'red' }}>
              {/* Calculate total P&L */}
              {formatPnL(data.reduce((acc, row) => acc + row.pnl, 0))}
            </TableCell>
            <TableCell />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TradingDataPage;
