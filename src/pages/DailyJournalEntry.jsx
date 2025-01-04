import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Breadcrumbs from '../components/Breadcrumbs';
import { Box, MenuItem, Container, Typography, Grid, Paper, Divider} from '@mui/material';
import { StyledButton, StyledTextField, StyledButtonOutlined } from '../CommonStyles';
import { DatePicker, TimePicker } from '@mui/x-date-pickers/';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import CommonService from '../services/CommonService'; // Import CommonService for API calls
import Notification from '../components/Notification'; // Import the Notification component
import { ApiController, ApiEndpoints } from '../utils/ApiEndpoints';


const marketType = ['Stock', 'Option', 'Future', 'Commodity'];
const tradeType = ['Call Options', 'Put Options', 'Long', 'Short'];

const DailyJournalEntry = () => {
  const [formData, setFormData] = useState({
    entryDate: new Date(),
    symbol: '',
    tradeType: '',
    marketType: '',
    entryPrice: '',
    quantity: '',
    tradeEntryTime: new Date(),
  });

  const [showDescriptions, setShowDescriptions] = useState(false);

  const [errors, setErrors] = useState({
    entryDate: '',
    symbol: '',
    tradeType: '',
    marketType: '',
    entryPrice: '',
    quantity: '',
  });

  const [authErr, setAuthErr] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [notification, setNotification] = useState({
    open: false,
    severity: 'success',
    message: '',
  });

  useEffect(() => {
    const isFormValid = !Object.values(errors).some(error => error) &&
                        Object.values(formData).every(value => value !== '' && value !== null);
    setIsButtonEnabled(isFormValid);
  }, [formData, errors]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateEntryDate = (date) => {
    if (!date) {
      setErrors(prev => ({ ...prev, entryDate: 'Entry Date is required.' }));
    } else {
      setErrors(prev => ({ ...prev, entryDate: '' }));
    }
  };

  const validateSymbol = (symbol) => {
    if (!symbol.trim()) {
      setErrors(prev => ({ ...prev, symbol: 'Symbol is required.' }));
    } else {
      setErrors(prev => ({ ...prev, symbol: '' }));
    }
  };

  const validateTradeType = (tradeType) => {
    if (!tradeType) {
      setErrors(prev => ({ ...prev, tradeType: 'Trade Type is required.' }));
    } else {
      setErrors(prev => ({ ...prev, tradeType: '' }));
    }
  };

  const validateMarketType = (marketType) => {
    if (!marketType) {
      setErrors(prev => ({ ...prev, marketType: 'Market Type is required.' }));
    } else {
      setErrors(prev => ({ ...prev, marketType: '' }));
    }
  };

  const validateEntryPrice = (price) => {
    if (!price || isNaN(price) || price <= 0) {
      setErrors(prev => ({ ...prev, entryPrice: 'Entry Price must be a positive number.' }));
    } else {
      setErrors(prev => ({ ...prev, entryPrice: '' }));
    }
  };

  const validateQuantity = (quantity) => {
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      setErrors(prev => ({ ...prev, quantity: 'Quantity must be a positive number.' }));
    } else {
      setErrors(prev => ({ ...prev, quantity: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateEntryDate(formData.entryDate);
    validateSymbol(formData.symbol);
    validateTradeType(formData.tradeType);
    validateMarketType(formData.marketType);
    validateEntryPrice(formData.entryPrice);
    validateQuantity(formData.quantity);

    if (Object.values(errors).some(error => error)) {
      return;
    }

    const userTrade = {
      entryDate: formData.entryDate,
      symbol: formData.symbol,
      tradeType: formData.tradeType,
      marketType: formData.marketType,
      entryPrice: formData.entryPrice,
      quantity: formData.quantity,
      entryTime: formData.tradeEntryTime ? formData.tradeEntryTime.toTimeString().split(' ')[0] : null,
    };
    console.log(userTrade);
    CommonService.postWithToken(ApiController.userTrades, ApiEndpoints.postUserTrade, userTrade)
      .then(res => {
        if (res.status === 200) {
        setNotification({
        open: true,
        severity: 'success',
        message: 'Your trade has been successfully recorded!',
      });
          clearFormFields();
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

  const clearFormFields = () => {
    setFormData({
      entryDate: new Date(),
      symbol: '',
      tradeType: '',
      marketType: '',
      entryPrice: '',
      quantity: '',
      tradeEntryTime: new Date(),
    });
    setErrors({
      entryDate: '',
      symbol: '',
      tradeType: '',
      marketType: '',
      entryPrice: '',
      quantity: '',
    });
  };
  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };
  return (
    <>
      <Navbar onToggleSidebar={() => { /* Define how to toggle the sidebar */ }} title="Daily Journal" />
      <Container maxWidth={false} className="container" sx={{ padding: '16px 24px' }}>
          <Paper style={{ padding: 20 }} elevation={0} variant="outlined">
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {successMessage && (
                <Typography variant="body2" color="success.main" align="center" gutterBottom>
                  {successMessage}
                </Typography>
              )}
              {authErr && (
                <Typography variant="body2" color="error.main" align="center" gutterBottom>
                  An error occurred while submitting the form. Please try again.
                </Typography>
              )}
              {/* Left Column with Form Fields */}
              <Grid item xs={12} sm={5}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <DatePicker
                        label="Entry Date"
                        value={formData.entryDate}
                        required
                        sx={{ marginTop: '16px' }}
                        size="small"
                        onChange={(date) => {
                          setFormData({ ...formData, entryDate: date });
                          validateEntryDate(date);
                        }}
                        renderInput={(params) => (
                          <StyledTextField
                            {...params}
                            fullWidth
                            size="small"
                            error={Boolean(errors.entryDate)}
                            helperText={errors.entryDate}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TimePicker
                        label="Trade Entry Time"
                        value={formData.tradeEntryTime}
                        onChange={(time) => setFormData({ ...formData, tradeEntryTime: time })}
                        sx={{ marginTop: '16px' }}
                        size="small"
                        renderInput={(params) => (
                          <StyledTextField
                            {...params}
                            fullWidth
                            required
                            error={Boolean(errors.entryDate)}
                            helperText={errors.entryDate}
                          />
                        )}
                      />
                    </Grid>
                  </Grid>
                </LocalizationProvider>

                <StyledTextField
                  select
                  fullWidth
                  label="Market Type"
                  name="marketType"
                  value={formData.marketType}
                  onChange={(e) => {
                    handleInputChange(e);
                    validateMarketType(e.target.value);
                  }}
                  required
                  size="small"
                  sx={{ marginTop: '24px' }}
                  error={Boolean(errors.marketType)}
                  helperText={errors.marketType}
                >
                  {marketType.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </StyledTextField>

                <StyledTextField
                  select
                  fullWidth
                  label="Trade Type"
                  name="tradeType"
                  value={formData.tradeType}
                  onChange={(e) => {
                    handleInputChange(e);
                    validateTradeType(e.target.value);
                  }}
                  required
                  size="small"
                  sx={{ marginTop: '10px' }}
                  error={Boolean(errors.tradeType)}
                  helperText={errors.tradeType}
                >
                  {tradeType.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </StyledTextField>

                <StyledTextField
                  fullWidth
                  label="Symbol"
                  name="symbol"
                  value={formData.symbol}
                  onChange={(e) => {
                    handleInputChange(e);
                    validateSymbol(e.target.value);
                  }}
                  required
                  size="small"
                  sx={{ marginTop: '10px' }}
                  error={Boolean(errors.symbol)}
                  helperText={errors.symbol}
                />

                <StyledTextField
                  fullWidth
                  label="Entry Price"
                  name="entryPrice"
                  type="number"
                  value={formData.entryPrice}
                  onChange={(e) => {
                    handleInputChange(e);
                    validateEntryPrice(e.target.value);
                  }}
                  required
                  size="small"
                  sx={{ marginTop: '10px' }}
                  error={Boolean(errors.entryPrice)}
                  helperText={errors.entryPrice}
                />

                <StyledTextField
                  fullWidth
                  label="Quantity"
                  name="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => {
                    handleInputChange(e);
                    validateQuantity(e.target.value);
                  }}
                  required
                  size="small"
                  sx={{ marginTop: '10px' }}
                  error={Boolean(errors.quantity)}
                  helperText={errors.quantity}
                />
              </Grid>

              {/* Center Vertical Line */}
              <Grid item xs={12} sm={2}>
                <Divider orientation="vertical" sx={{ height: '100%' }} />
              </Grid>

              {/* Right Column with Descriptions */}
              <Grid item xs={12} sm={5}>
                <Box>
                  <StyledButtonOutlined
                    variant="outlined"
                    onClick={() => setShowDescriptions(!showDescriptions)}
                    sx={{ width: '200px' }}
                  >
                    {showDescriptions ? 'Hide Descriptions' : 'Show Descriptions'}
                  </StyledButtonOutlined>

                  {showDescriptions && (
                    <>
                      <Typography variant="h6" sx={{ marginTop: '16px' }}>Field Descriptions</Typography>
                      <Typography variant="body2" sx={{ marginTop: '16px' }}>
                        <strong>Entry Date:</strong> The date you made the trade.
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: '8px' }}>
                        <strong>Trade Entry Time:</strong> Time when the trade was executed.
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: '8px' }}>
                        <strong>Market Type:</strong> Market category:
                        <ul>
                          <li><strong>Stock:</strong> Shares of a company.</li>
                          <li><strong>Option:</strong> Options contracts.</li>
                          <li><strong>Future:</strong> Futures contracts.</li>
                          <li><strong>Commodity:</strong> Physical goods like gold or oil.</li>
                        </ul>
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: '8px' }}>
                        <strong>Trade Type:</strong> Type of trade:
                        <ul>
                          <li><strong>Buy:</strong> Purchase asset.</li>
                          <li><strong>Sell:</strong> Sell asset you own.</li>
                          <li><strong>Short:</strong> Sell asset you don’t own.</li>
                          <li><strong>Cover:</strong> Buy back a shorted asset.</li>
                        </ul>
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: '8px' }}>
                        <strong>Symbol:</strong> The ticker symbol of the asset you're trading.
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: '8px' }}>
                        <strong>Entry Price:</strong> Price at which the trade was made.
                      </Typography>
                      <Typography variant="body2" sx={{ marginTop: '8px' }}>
                        <strong>Quantity:</strong> Number of units traded.
                      </Typography>
                    </>
                  )}
                </Box>
              </Grid>
            </Grid>

            {/* Bottom Divider and Buttons */}
            <Divider sx={{ margin: '16px 0' }} />
            <Box display="flex" justifyContent="flex-left" gap={2}>
              <StyledButton
                variant="contained"
                color="primary"
                type="submit"
                sx={{ width: '120px' }}
                disabled={!isButtonEnabled}
              >
                Submit
              </StyledButton>
              <StyledButtonOutlined
                variant="outlined"
                onClick={() => {
                  clearFormFields();
                  setSuccessMessage(''); // Clear success message on cancel
                }}
                sx={{ width: '120px' }}
              >
                Cancel
              </StyledButtonOutlined>
            </Box>
          </form>
          <Notification
        open={notification.open}
        onClose={handleClose}
        severity={notification.severity}
        message={notification.message}
      />
        </Paper>
      </Container>
    </>
  );
};

export default DailyJournalEntry;
