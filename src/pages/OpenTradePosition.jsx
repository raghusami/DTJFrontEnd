import React, { useState,useEffect  } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableSortLabel,
  TableContainer,
  tableCellClasses,
  Paper,
  Tooltip,
  IconButton,
  Container,
  Typography,
  Grid,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Card,
  Box

} from '@mui/material';
import { StyledButton,HFour, StyledTextField, StyledButtonOutlined,CustomBadge, SubtitleOne, ThemesColors, SubtitleThree,SuccessIcon} from '../CommonStyles';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { DatePicker, TimePicker } from '@mui/x-date-pickers/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CommonService from '../services/CommonService'; // Import CommonService for API calls
import { ApiController, UserTradesApiEndpoints } from '../utils/ApiEndpoints';
import Notification from '../components/Notification'; // Import the Notification component
import { Icon } from '@iconify/react';
import RadialBarChart from '../chart/RadialBarChart';
import { styled } from '@mui/material/styles';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: ThemesColors.tradeSuccessDarker,
    color: ThemesColors.tradegrey200,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: 'none', // Remove the bottom border from all cells
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: ThemesColors.tradegrey300,
  },
  '& td, & th': {
    borderBottom: 'none', // Remove the bottom border from all rows
  },
  '&:last-child td, &:last-child th': {
    border: 0, // Hide the last border
  },
}));

const OpenTradePosition = () => {
  const [data, setTrades] = useState([]);
  const [performanceMetric, setperformanceMetric] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setExitFormData] = useState({
    date: new Date(),
    time: new Date(),
    price: '',
  });
  const [errors, setErrors] = useState({
    date: '',
    time: '',
    price: '',
    charges: '',
    quantity: '',
  });
  const [selectedTrade, setSelectedTradeIndex] = useState(null);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('symbol'); 
  const [successMessage, setSuccessMessage] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    severity: 'success',
    message: '',
  });
  
  const formatPnL = (profitAndLoss) => (profitAndLoss >= 0 ? `+${profitAndLoss.toFixed(2)}` : `${profitAndLoss.toFixed(2)}`);
  const formatPercentage = (percentage) => `${percentage.toFixed(2)}%`;

  const renderChangeIcon = (value) =>
    value >= 0 ? (
      <ArrowUpwardIcon fontSize="small" sx={{ color: '#5DC2A8' }} />
    ) : (
      <ArrowDownwardIcon fontSize="small" sx={{ color: '#EC7C7E' }} />
    );
  const handleClickOpen = (tradeId) => {

    const selectedTrade = data.find(trade => trade.tradeID === tradeId);
    setSelectedTradeIndex(selectedTrade);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setExitFormData({ date: new Date(), time: new Date(), price: '',charges: '',quantity: '' });
  };
  const getOpenPositionsTrades = () => {
    CommonService.get(ApiController.userTrades, UserTradesApiEndpoints.getUsersOpenPositions)
      .then(res => {
        if (res.status === 200) {
          setTrades(res.data.responseData.usersOpenPositions);
          setperformanceMetric(res.data.responseData.performanceMetric)
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  useEffect(() => {
    getOpenPositionsTrades();
  }, []); 

  const validateExitDate = (date) => {
    if (!date) {
      setErrors(prev => ({ ...prev, date: 'Exit Date is required.' }));
    } else {
      setErrors(prev => ({ ...prev, date: '' })); // Clear error
    }
  }
  const validateExitPrice = (price) => {
    if (!price || isNaN(price) || price <= 0) {
      setErrors(prev => ({ ...prev, price: 'Exit Price must be a positive number.' }));
    } else {
      setErrors(prev => ({ ...prev, price: '' })); // Clear error
    }
  };
  
  const validateQuantity = (quantity) => {

    if (!quantity || isNaN(quantity) || quantity <= 0) {
      setErrors(prev => ({ ...prev, quantity: 'Exit Quantity must be a positive number.' }));
    }
    else if(quantity > selectedTrade.quantity)
    {
      setErrors(prev => ({ ...prev, quantity: 'Only allowed to sell you buyed quantity' }));
    } 
    else {
      setErrors(prev => ({ ...prev, quantity: '' })); // Clear error
    }
  };
  
  
  useEffect(() => {
    // Check if form is valid
    const isFormValid = !Object.values(errors).some(error => error) &&
                        Object.values(formData).every(value => value !== '' && value !== null);
    setIsButtonEnabled(isFormValid);
  }, [formData, errors]);
 
  const handleSubmit = (e) => {
    e.preventDefault();
  
    // Validate all fields before checking for errors
    validateExitDate(formData.date);
    validateExitPrice(formData.price);
    validateQuantity(formData.quantity);
  
    // Check if any errors exist
    if (Object.values(errors).some(error => error)) {
      return;
    }
  
    const userTrade = {
      tradeID: selectedTrade.tradeID,
      exitDate: formData.date,
      exitPrice: formData.price,
      quantity: formData.quantity,
      brokerCharges : formData.charges,
      exitTime: formData.time ? formData.time.toTimeString().split(' ')[0] : null,
    };
  
    CommonService.postWithToken(ApiController.userTrades, UserTradesApiEndpoints.putUserTrade, userTrade)
      .then(res => {
        if (res.status === 200) {
          setNotification({
            open: true,
            severity: 'success',
            message: 'Your trade has been successfully exited!',
          });
          handleClose();
           getOpenPositionsTrades();
        }
      })
      .catch(err => {
        setNotification({
          open: true,
          severity: 'error',
          message: 'There was an error submitting your form.',
        });
        console.error(err);
      });
  };
  const handleExitDataChange = (e) => {
    const { name, value } = e.target;
    setExitFormData((prevState) => ({ ...prevState, [name]: value }));
  };
  const totalProfitOrLoss = data.reduce((total, row) => total + row.profitAndLoss, 0);

  const handleSortRequest = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedData = [...data].sort((a, b) => {
    if (order === 'asc') {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    }
  });
  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return ( 
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Navbar onToggleSidebar={() => { }} title="Open Positions" />
      <Box sx={{ flexGrow: 1, padding: 2 }} className="container">
      <Grid container spacing={1} style={{ padding: 20 }}>
      
      
            <Grid item xs={12} sm={12}>
            
    <Grid container alignItems="center" spacing={2}>
    <Grid item xs={12} sm={3}>
            <Card elevation={0} variant="outlined">
            <Box sx={{ padding: '10px' }}>
            <SubtitleOne variant="subtitle2">
              Total P&L 
            </SubtitleOne>
            <HFour variant="h4">{performanceMetric?.netProfitAndLoss ?? 0 }</HFour>
            <Box display="flex" alignItems="center" mt={1}>
            <Icon  icon="solar:double-alt-arrow-up-bold-duotone"  width="24px" height="24px" color="#22C55E" />
              <Typography variant="subtitle2" color="success.main" ml={1}>
                +2.6%
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={1}>
                last 7 days
              </Typography>
            </Box>
          </Box>
        </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Card elevation={0} variant="outlined">
            <Box sx={{ padding: '10px' }}>
            <SubtitleOne variant="subtitle2">
              Total Charge 
            </SubtitleOne>
            <HFour variant="h4">{performanceMetric?.totalCharge ?? 0}</HFour>
            <Box display="flex" alignItems="center" mt={1}>
            <Icon  icon="solar:double-alt-arrow-up-bold-duotone"  width="24px" height="24px" color="#22C55E" />
              <Typography variant="subtitle2" color="success.main" ml={1}>
                +2.6%
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={1}>
                last 7 days
              </Typography>
            </Box>
          </Box>
        </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Card elevation={0} variant="outlined">
            <Box sx={{ padding: '10px' }}>
            <SubtitleOne variant="subtitle2">
              Average Win 
            </SubtitleOne>
            <HFour variant="h4">{performanceMetric?.averageWin ?? 0}</HFour>
            <Box display="flex" alignItems="center" mt={1}>
            <Icon  icon="solar:double-alt-arrow-up-bold-duotone"  width="24px" height="24px" color="#22C55E" />
              <Typography variant="subtitle2" color="success.main" ml={1}>
                +2.6%
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={1}>
                last 7 days
              </Typography>
            </Box>
          </Box>
        </Card>
        </Grid>
        <Grid item xs={12} sm={3}>
            <Card elevation={0} variant="outlined">
            <Box sx={{ padding: '10px' }}>
            <SubtitleOne variant="subtitle2">
            Average Loss
            </SubtitleOne>
            <HFour variant="h4">{performanceMetric?.averageLoss ?? 0}</HFour>
            <Box display="flex" alignItems="center" mt={1}>
            <Icon  icon="solar:double-alt-arrow-down-bold-duotone"  width="24px" height="24px" color={ThemesColors.tradeDangerMain} />
              <Typography variant="subtitle2" color="success.main" ml={1}>
                +2.6%
              </Typography>
              <Typography variant="body2" color="textSecondary" ml={1}>
                last 7 days
              </Typography>
            </Box>
          </Box>
        </Card>
        </Grid>
    <Grid item xs={12} sm={12}>
      <SubtitleThree>
        Open Positions -  <CustomBadge color="secondary" badgeContent={data.length}></CustomBadge>
      </SubtitleThree>
    </Grid>
  </Grid>
  <TableContainer  sx={{ maxHeight: 400 }}>
  <Table size="small"  aria-label="simple table">
    <TableHead>
    <TableRow>
            <StyledTableCell align="center">
            <TableSortLabel
        active={orderBy === 'symbol'}
        direction={orderBy === 'symbol' ? order : 'asc'}
        onClick={() => handleSortRequest('symbol')}
        sx={{
          '&.MuiTableSortLabel-root': { color: ThemesColors.tradegrey300 },  // Default color
          '&.Mui-active': {
            color: ThemesColors.tradegrey200,  // Active color
          },
          '& .MuiTableSortLabel-icon': {
            color: ThemesColors.tradegrey200,  // Icon color when active
          },
        }}
      >
        Symbol
      </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">
            <TableSortLabel
        active={orderBy === 'quantity'}
        direction={orderBy === 'quantity' ? order : 'asc'}
        onClick={() => handleSortRequest('quantity')}
        sx={{
          '&.MuiTableSortLabel-root': { color: ThemesColors.tradegrey00 },
          '&.Mui-active': {
            color: ThemesColors.tradegrey600,
          },
          '& .MuiTableSortLabel-icon': {
            color: ThemesColors.tradegrey600,
          },
        }}
      >
        Quantity
      </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">Avg Price</StyledTableCell>
            <StyledTableCell align="center">LTP</StyledTableCell>
            <StyledTableCell align="center">P&L</StyledTableCell>
            <StyledTableCell align="center">Change %</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
    </TableHead>
    <TableBody>
      {sortedData.map((row, index) => (
        <StyledTableRow key={index} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
          <TableCell>{row.symbol}</TableCell>
          <TableCell align="center">{row.quantity}</TableCell>
          <TableCell align="right">{row.entryPrice.toFixed(2)}</TableCell>
          <TableCell align="right">{row.currentPrice.toFixed(2)}</TableCell>
          <TableCell
            align="right"
            style={{ color: row.profitAndLoss >= 0 ? ThemesColors.tradeSuccessMain : ThemesColors.tradeDangerMain }}
          >
            {formatPnL(row.profitAndLoss)}
          </TableCell>
          <TableCell
            align="right"
            style={{ color: row.change >= 0 ? ThemesColors.tradeSuccessMain : ThemesColors.tradeDangerMain }}
          >
            {formatPercentage(row.change)}
          </TableCell>
          <TableCell align="center">
            <IconButton onClick={() => handleClickOpen(row.tradeID)}  fontSize="small" sx={{ color: ThemesColors.primary }}>
              <ExitToAppIcon />
            </IconButton>
          </TableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
  </TableContainer>
  {data.length > 0 && (
  <Grid container justifyContent="flex-end" sx={{ marginTop: 2, marginLeft: -27  }}>
  <Grid item>
    <SubtitleThree variant="h6" sx={{ fontWeight: 'bold', marginLeft: -15 }}>
      Total P&L
    </SubtitleThree>
  </Grid>
  <Grid item>
    <SubtitleThree
      variant="h6"
      sx={{
        fontWeight: 'bold',
        color: totalProfitOrLoss >= 0 ? '#5DC2A8' : '#EC7C7E',
        marginLeft: 1,
      }}
    >
      {formatPnL(totalProfitOrLoss)}
    </SubtitleThree>
  </Grid>

</Grid>
  )}
</Grid>
          </Grid>
     

        {/* Exit Trade Dialog */}
        <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
        <DialogTitle>
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          Exit Trade
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8} textAlign="right">
        {selectedTrade !== null && (
          <Typography
            variant="h6"
            sx={{
              backgroundColor:  selectedTrade.profitAndLoss >= 0 ? '#5DC2A8' : '#EC7C7E',
              borderRadius: '5px',
              padding: '3px 5px',
              color: '#fff',
              fontWeight: 'bold',
              display: 'inline-block',
            }}
          >
          { selectedTrade.symbol}
          </Typography>
        )}
      </Grid>
    </Grid>
  </DialogTitle>
  <DialogContent sx={{ padding: '16px' }}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <DatePicker
          label="Exit Date"
          sx={{ marginTop: '10px' }}
          size="small"
          value={formData.date}
          onChange={(newValue) => {
            setExitFormData((prevState) => ({ ...prevState, date: newValue }));
            validateExitDate(newValue);
          }}
          required
          error={Boolean(errors.date)}
          helperText={errors.date}
          renderInput={(params) => <StyledTextField {...params} fullWidth variant="outlined" />}
          error={!!errors.entryDate}
          helperText={errors.entryDate}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TimePicker
          label="Exit Time"
          sx={{ marginTop: '10px' }}
          size="small"
          value={formData.time}
          onChange={(newValue) => {
            setExitFormData((prevState) => ({ ...prevState, time: newValue }));
          }}
          renderInput={(params) => <StyledTextField {...params} fullWidth variant="outlined" />}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={(e) => {
            handleExitDataChange(e)
            validateQuantity(e.target.value);
        }}
          fullWidth
          variant="outlined"
          required
          error={Boolean(errors.quantity)}
          helperText={errors.quantity}
        
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          label="Exit Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={(e) => {
            handleExitDataChange(e);
            validateExitPrice(e.target.value);
          }}
          fullWidth
          variant="outlined"
          required
          error={Boolean(errors.price)}
          helperText={errors.price}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <StyledTextField
          label="Charges"
          name="charges"
          type="number"
          value={formData.charges}
          onChange={(e) => {
            handleExitDataChange(e);
                    }}
          fullWidth
          variant="outlined"
         
        />
      </Grid>
    </Grid>

  </DialogContent>
  <DialogActions sx={{ padding: '10px' }}>
    <StyledButtonOutlined onClick={handleClose} variant="outlined" sx={{ width: '120px', marginRight: '8px' }} color="primary">
      Cancel
    </StyledButtonOutlined>
    <StyledButton onClick={handleSubmit} variant="contained" sx={{ width: '120px' }} color="primary" disabled={!isButtonEnabled}>
      Submit
    </StyledButton>
  </DialogActions>
  </form>
</Dialog>
      <Notification
        open={notification.open}
        onClose={handleCloseNotification}
        severity={notification.severity}
        message={notification.message}
      />
</Box>
    </LocalizationProvider>
  );
};

export default OpenTradePosition;
