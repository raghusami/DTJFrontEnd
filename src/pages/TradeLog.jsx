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
import { formatDate,HFour, SubtitleOne, ThemesColors,TradeStatusStyles} from '../CommonStyles';
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
import ProfitIndicator from '../components/ProfitIndicator'

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
    backgroundColor: ThemesColors.secondaryfont,
  },
  '& td, & th': {
    borderBottom: 'none', // Remove the bottom border from all rows
  },
  '&:last-child td, &:last-child th': {
    border: 0, // Hide the last border
  },
}));

const TradeLog = () => {
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
  const chartData = {
    series: [70],
    options: {
      chart: {
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '60%', // Adjust the size of the hollow center
          },
          dataLabels: {
            name: {
              show: false, // Hide the label
            },
            value: {
              show: true, 
              color: ThemesColors.primaryfont, 
              fontSize: '24px', 
              offsetY: 10, 
            },
          },
        },
      },
      colors: [ThemesColors.tradeSuccessMain], 
      labels: [], 
      tooltip: {
        enabled: false, 
      },
    },
  };
  
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
    CommonService.get(ApiController.userTrades, UserTradesApiEndpoints.getUsersClosedPositions)
      .then(res => {
        if (res.status === 200) {
          setTrades(res.data.responseData.userClosePositions);
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
      <Navbar onToggleSidebar={() => { }} title="Trade Log" />
      <Box sx={{ flexGrow: 1, padding: 2 }} className="container"> 
      <Grid container spacing={1} style={{ padding: 20 }}>
        {/* First Row - 4 Columns */}
        <Grid item xs={12} sm={3}>
            <Card elevation={0}  variant="outlined">
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
        <Card elevation={0}  variant="outlined">
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
    <Card elevation={0}  variant="outlined">
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
<Card elevation={0}  variant="outlined">
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
        {/* Second Row - 1 Column */}
        <Grid item xs={12}>
        <Card elevation={0}  variant="outlined">
         <TableContainer  sx={{ maxHeight: 450 }}>
  <Table size="small"  aria-label="simple table">
    <TableHead>
    <TableRow>
    <StyledTableCell align="center"></StyledTableCell>
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
        active={orderBy === 'tradeEntryDate'}
        direction={orderBy === 'tradeEntryDate' ? order : 'asc'}
        onClick={() => handleSortRequest('tradeEntryDate')}
        sx={{
          '&.MuiTableSortLabel-root': { color: ThemesColors.tradegrey300 },
          '&.Mui-active': {
            color: ThemesColors.tradegrey200,
          },
          '& .MuiTableSortLabel-icon': {
            color: ThemesColors.tradegrey200,
          },
        }}
      >
        Open Date
      </TableSortLabel>
            </StyledTableCell>
            <StyledTableCell align="center">Market</StyledTableCell>
            <StyledTableCell align="center">Entry Type</StyledTableCell>
            <StyledTableCell align="center">Qty</StyledTableCell>
            <StyledTableCell align="center">Inventsment</StyledTableCell>
            <StyledTableCell align="center">Net P&L</StyledTableCell>
            <StyledTableCell align="center">Net ROI %</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
    </TableHead>
    <TableBody>
      {sortedData.map((row, index) => (
        <StyledTableRow key={index} sx={{ '&:hover': { backgroundColor: '#f9f9f9' } }}>
         <TableCell align="center">
          <ProfitIndicator profit={row.profitAndLoss} />
          </TableCell>
          <TableCell>{row.symbol}</TableCell>
          <TableCell align="center">   {formatDate(row.tradeEntryDate)}</TableCell>
          <TableCell align="center">{row.marketType}</TableCell>
          <TableCell align="center">{row.tradeType}</TableCell>
          <TableCell align="center">{row.quantity}</TableCell>
          <TableCell align="center">   {row.investmentAmount}</TableCell>
          <TableCell
            align="right"
            style={{ color: row.profitAndLoss >= 0 ? ThemesColors.tradeSuccessDark : ThemesColors.tradeDangerDark }}
          >
            {formatPnL(row.profitAndLoss)}
          </TableCell>
          <TableCell
            align="right"
            style={{ color: row.change >= 0 ? ThemesColors.tradeSuccessDark : ThemesColors.tradeDangerDark }}
          >
            {formatPercentage(row.change)}

          </TableCell>
          <TableCell align="center">    <Box sx={TradeStatusStyles(row.tradeStatus)}>
      {row.tradeStatus}
    </Box></TableCell>

         
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
  </TableContainer>
  </Card>
        </Grid>
      </Grid>
    </Box>
    
    </LocalizationProvider>
  );
};

export default TradeLog;
