// src/pages/DashboardPage.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box, Card, Tabs, Tab ,Tooltip } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '../components/Navbar';
import '../styles/DashboardPage.css';
import { SubtitleOne, StyledTab,ThemesColors,HFour,Pentagon,CornerLabel } from '../CommonStyles';
import RadialBarChart from '../chart/RadialBarChart';
import CommonService from '../services/CommonService'; // Import CommonService for API calls
import { ApiController, DashboardApiEndpoints } from '../utils/ApiEndpoints';
import LinearProgress from '@mui/material/LinearProgress';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import CalendarView from '../chart/CalendarView'
import ProfitIndicator from '../components/ProfitIndicator'
import InfoIcon from '@mui/icons-material/Info'; // Import the info icon


const DashboardPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [dashboardData, setDashboardChartData] = useState([]);
  const [performanceMetric, setPerformanceMetric] = useState({});
  const [dataLine, setDataLine] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [cumulativeData, setCumulativeData] = useState([]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getDashboardData = () => {
    CommonService.get(ApiController.dashboard, DashboardApiEndpoints.getUsersDashbaord)
      .then(res => {
        if (res.status === 200) {
          setPerformanceMetric(res.data.responseData.performanceMetric);
          setDashboardChartData(res.data.responseData.dashboardChartData);

            // Map API data to dataLine format
          const lineData = res.data.responseData.dashboardChartData.map(item => ({
            date: item.exitDate,       
            profit: item.profitAndLoss
          }));
          setDataLine(lineData);

          // Map API data to eventData format
          const eventData = res.data.responseData.dashboardChartData.map((item, index) => ({
           // title: `Day ${index + 1}`, 
            start: item.exitDate,     
            profitOrLoss: item.profitAndLoss
          }));
          setEventData(eventData);

          // Map API data to eventData format
          const cumulativeData = res.data.responseData.dashboardChartData.map((item, index) => ({
            date: item.exitDate,       
            profit: item.cumulativeProfitAndLoss
          }));
          setCumulativeData(cumulativeData); 
        }
      })
      .catch(err => {
        console.error(err);
      });
  };

  useEffect(() => {
    getDashboardData();
  }, []);
 
  // Formatting data for the chart
const seriesDataLine = dataLine.map(item => ({
  x: new Date(item.date),  // Converting to Date object
  y: item.profit,
}));
const seriesDataArea = cumulativeData.map(item => ({
  x: new Date(item.date),  // Converting to Date object
  y: item.profit,
}));
// Ensure categories length matches seriesData
const categoriesLine = dataLine.length ? dataLine.map(item => item.date) : []; 

const categoriesArea = cumulativeData.length ? cumulativeData.map(item => item.date) : []; 

const winLossColor = (performanceMetric?.winRate ?? 0) > 60
  ? ThemesColors.tradeSuccessMain    // Green for high score (above 60)
  : (performanceMetric?.winRate ?? 0) > 40
  ? ThemesColors.tradeYellowMain     // Yellow for medium score (41-60)
  : ThemesColors.tradeDangerMain;    // Red for low score (0-40)

const winLossGradientColors = (performanceMetric?.winRate ?? 0) > 60
  ? ThemesColors.tradeSuccessDark900    // Green for high score (above 60)
  : (performanceMetric?.winRate ?? 0) > 40
  ? ThemesColors.tradeYellowdark     // Yellow for medium score (41-60)
  : ThemesColors.tradeDangerDark;    // Red for low score (0-40)

  const dayWinLossColor = (performanceMetric?.dayWinRate ?? 0) > 60
  ? ThemesColors.tradeSuccessMain    // Green for high score (above 60)
  : (performanceMetric?.dayWinRate ?? 0) > 40
  ? ThemesColors.tradeYellowMain     // Yellow for medium score (41-60)
  : ThemesColors.tradeDangerMain;    // Red for low score (0-40)

const dayWinLossGradientColors = (performanceMetric?.dayWinRate ?? 0) > 60
  ? ThemesColors.tradeSuccessDark    // Green for high score (above 60)
  : (performanceMetric?.dayWinRate ?? 0) > 40
  ? ThemesColors.tradeYellowdark     // Yellow for medium score (41-60)
  : ThemesColors.tradeDangerDark;    // Red for low score (0-40)

// Series configuration
const lineSeries = [
  {
    name: 'P/L',
    data: seriesDataLine,
  },
];
const areaSeries = [
  {
    name: 'P/L',
    data: seriesDataArea,
  },
];
const chartData = {
  series: [performanceMetric?.dayWinRate ?? 0],
  options: {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            color: '#1C252E',
            fontSize: '1.5rem',
            offsetY: 10,
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
          },
        },
      },
    },
    colors: [dayWinLossColor],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [dayWinLossGradientColors],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [],
    tooltip: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 200,
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '50%',
              },
            },
          },
        },
      },
    ],
  },
};
const WinLossTrades = {

  series: [performanceMetric?.winRate ?? 0],
  options: {
    chart: {
      type: 'radialBar',
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%',
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: true,
            color: '#1C252E',
            fontSize: '1.5rem',
            offsetY: 10,
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 700,
          },
        },
      },
    },
    colors: [winLossColor],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: [winLossGradientColors],
        inverseColors: false,
        opacityFrom: 0.7,
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: [],
    tooltip: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 200,
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: '50%',
              },
            },
          },
        },
      },
    ],
  },
};

// Chart configuration
const optionsLine = {
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false, // Hide the toolbar for cleaner UI
    },
  },
  plotOptions: {
    bar: {
      colors: {
        ranges: [
          {
            from: -100000,
            to: 0,
            color: '#FF5630', // Red for negative values
          },
          {
            from: 0.01,
            to: 200000,
            color: '#118D57', // Green for positive values
          },
        ],
      },
      columnWidth: '80%',
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',  // Automatically treat x values as dates
    categories: categoriesLine,
    labels: {
      format: 'dd-MMM',  // Date format as "02-Mar"
      style: {
        colors: '#919EAB', // Text color for the x-axis labels
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value;  // Limit to two decimal places
      },
      style: {
        colors: '#919EAB', // Text color for the y-axis labels
        fontSize: '12px',
      },
    },
    title: {
      text: 'P/L',
      style: {
        color: '#C4CDD5',  // Y-axis title color
      },
    },
  },
  grid: {
    show: false,  // Disable background grid
  },
  fill: {
    type: 'solid',  // Solid fill for the bars
    colors: ['#FF5630', '#118D57'], // Define colors directly if needed
  },
  tooltip: {
    y: {
      formatter: function (value) {
        return value.toFixed(2);  // Limit to two decimal places in tooltips
      },
    },
  },
};


// Chart configuration for area chart with gradient background
const optionsArea = {
  chart: {
    type: 'area',  // Change chart type to 'area'
    height: 350,
    toolbar: {
      show: false,  // Hide the toolbar for a cleaner UI
    },
  },
  stroke: {
    curve: 'smooth',  // Smooth curve for the area chart
    width: 2,         // Set line thickness
  },
  dataLabels: {
    enabled: false,  // Disable data labels
  },
  xaxis: {
    type: 'datetime',  // Automatically treat x values as dates
    categories: categoriesArea,
    labels: {
      format: 'dd-MMM',  // Date format as "02-Mar"
      style: {
        colors: '#919EAB',  // Text color for the x-axis labels
        fontSize: '12px',
      },
    },
  },
  yaxis: {
    labels: {
      formatter: function (value) {
        return value;  // Limit to two decimal places
      },
      style: {
        colors: '#919EAB',  // Text color for the y-axis labels
        fontSize: '12px',
      },
    },
    title: {
      text: 'P/L',
      style: {
        color: '#C4CDD5',  // Y-axis title color
      },
    },
  },
  grid: {
    show: false,  // Disable background grid for a cleaner look
  },
  fill: {
    type: 'gradient',  // Apply gradient fill to the area
    gradient: {
      shade: 'dark',
      type: 'vertical',
      gradientToColors: ['#22C55E', '#FF5630'],  // Green for positive, Red for negative
      stops: [0, 100],  // Gradient stops from top to bottom
      opacityFrom: 0.7,  // Initial opacity of the gradient
      opacityTo: 0.2,    // Final opacity of the gradient
    },
  },
  colors: areaSeries.map(point => point.y >= 0 ? '#FF5630' : '#00A76F'),  // Green for positive, Red for negative
  tooltip: {
    y: {
      formatter: function (value) {
        return value;  // Limit to two decimal places in tooltips
      },
    },
  },
};
  return (
    <>
      <Navbar title="Dashboard" />
      <Box sx={{ flexGrow: 1, padding: 2 }} className="container">
        <Grid container spacing={2}>
          {/* First Row */}
          <Grid item xs={12} sm={6} md={2}>
            <Card elevation={0} variant="outlined">
              <Box sx={{ padding: '10px' }}>
                <SubtitleOne variant="subtitle2">Net P&L
                <Tooltip title="This is the net profit and loss for the selected period.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>

                </SubtitleOne>
                <HFour 
                color={performanceMetric?.netProfitAndLoss >= 0 ? ThemesColors.tradeSuccessDark : ThemesColors.tradeDangerMain} 
                mt={1}
              >
                {performanceMetric?.netProfitAndLoss ?? 0}
              </HFour>               
               <Box display="flex" alignItems="center" mt={1}>
                  <ProfitIndicator profit={performanceMetric?.netProfitAndLoss ?? 0}/>
                  <Typography variant="subtitle2" color="success.main" ml={1}>+2.6%</Typography>
                  <Typography variant="body2" color="textSecondary" ml={1}>last 7 days</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card elevation={0} variant="outlined">
              <Box sx={{ padding: '10px' }}>
                <SubtitleOne variant="subtitle2">Profit Factor
                <Tooltip title="Profit Factor is the ratio of gross profit to gross loss. It measures profitability.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>
                </SubtitleOne>
                <HFour mt={1}>{performanceMetric?.profitFactor ?? 0} </HFour>
                <Box display="flex" alignItems="center" mt={1}>
                 <ProfitIndicator profit={performanceMetric?.profitFactor ?? 0}/>
                  <Typography variant="subtitle2" color="success.main" ml={1}>+2.6%</Typography>
                  <Typography variant="body2" color="textSecondary" ml={1}>last 7 days</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card elevation={0} variant="outlined">
              <Box sx={{ padding: '10px' }}>
                <SubtitleOne variant="subtitle2">Average Win
                <Tooltip title="Average Win Amount is the average profit from winning trades.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>
                </SubtitleOne>
                <HFour  mt={1}>{performanceMetric?.averageWin ?? 0}</HFour>
                <Box display="flex" alignItems="center" mt={1}>
                 <ProfitIndicator profit={performanceMetric?.averageWin ?? 0}/>
                  <Typography variant="subtitle2" color="success.main" ml={1}>+2.6%</Typography>
                  <Typography variant="body2" color="textSecondary" ml={1}>last 7 days</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card elevation={0} variant="outlined">
              <Box sx={{ padding: '10px' }}>
                <SubtitleOne variant="subtitle2">Average Loss
                <Tooltip title="Average Loss Amount is the average loss from losing trades.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>
                </SubtitleOne>
                <HFour mt={1}>{performanceMetric?.averageLoss ?? 0}</HFour>
                <Box display="flex" alignItems="center" mt={1}>
                  <ProfitIndicator profit={performanceMetric?.averageLoss ?? 0}/>
                   <Typography variant="subtitle2" color="success.main" ml={1}>+2.6%</Typography>
                  <Typography variant="body2" color="textSecondary" ml={1}>last 7 days</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card elevation={0} variant="outlined">
              <Box sx={{ padding: '10px' }}>
                <SubtitleOne variant="subtitle2">Max Drawdown
                <Tooltip title="Max Drawdown is the maximum observed loss from a peak to a trough before a new peak is achieved.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>
                </SubtitleOne>
                <HFour 
                 color={performanceMetric?.maxDrawDown >= 0 ? ThemesColors.tradeSuccessDark : ThemesColors.tradeDangerMain} 
                 mt={1}>{performanceMetric?.maxDrawDown ?? 0}</HFour>
                <Box display="flex" alignItems="center" mt={1}>
                <ProfitIndicator profit={performanceMetric?.maxDrawDown ?? 0}/>
                  <Typography variant="subtitle2" color="success.main" ml={1}>+2.6%</Typography>
                  <Typography variant="body2" color="textSecondary" ml={1}>last 7 days</Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
          <Card elevation={0} variant="outlined">
            <Box sx={{ padding: '10px' }}>
              <SubtitleOne variant="subtitle2">Broker Charges
              <Tooltip title="Broker Charges are the fees paid to the broker for executing trades on your behalf.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>
              </SubtitleOne>
              <HFour  mt={1}>{performanceMetric?.totalCharge ?? 0}</HFour>
              <Box display="flex" alignItems="center" mt={1}>
                <ProfitIndicator profit={performanceMetric?.totalCharge ?? 0}/>
                <Typography variant="subtitle2" color="success.main" ml={1}>+2.6%</Typography>
                <Typography variant="body2" color="textSecondary" ml={1}>last 7 days</Typography>
              </Box>
            </Box>
          </Card>
        </Grid>
          {/* Second Row */}
          <Grid item xs={12} md={2}>
            <Card elevation={0} variant="outlined">
              <Box sx={{ padding: '10px' }}>
                <SubtitleOne variant="subtitle2">Day Win %
                <Tooltip title="Displays the percentage of winning trades relative to losing trades, as well as the total number of winning and losing trades.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>
                </SubtitleOne>
                <Box display="flex" alignItems="center" mt={2}>
                  <RadialBarChart
                    series={chartData.series}
                    options={chartData.options}
                    width={180}
                    height={180}
                  />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="flex-start" mt={4}>
                {/* Win Section */}
                <Box display="flex" alignItems="center" mr={2}>
                  <Icon icon="solar:double-alt-arrow-up-bold-duotone" width="24px" height="24px" color={ThemesColors.tradeDangerDark} />
                  <Typography variant="subtitle2" color={ThemesColors.tradeSuccessDark} ml={1} sx={{ fontSize: '15px', fontWeight: 'bold' }}  >
                    {performanceMetric?.winningDays ?? 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" ml={1}>Win</Typography>
                </Box>

                {/* Loss Section */}
                <Box display="flex" alignItems="center">
                  <Icon icon="solar:double-alt-arrow-up-bold-duotone" width="24px" height="24px" color={ThemesColors.tradeDangerDark} />
                   <Typography variant="subtitle2" color={ThemesColors.tradeDangerDark}  ml={1} sx={{ fontSize: '15px', fontWeight: 'bold' }}  >
                    {performanceMetric?.losingDays ?? 0}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" ml={1}>Loss</Typography>
                </Box>
              </Box>

              </Box>
            </Card>
          </Grid>
         
          <Grid item xs={12} md={4}>
            <Card elevation={0} variant="outlined">
            <Box sx={{ padding: '10px' }}>
                <SubtitleOne variant="subtitle2">Daily Net P&L
                <Tooltip title="Displays the daily net profit and loss along with a radial bar chart representation.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>
                </SubtitleOne>
                <Box display="flex" alignItems="center" mt={1}>
                 <ResponsiveContainer width="100%" height={250}>
                          <RadialBarChart options={optionsLine} series={lineSeries} type="bar"/>

                  </ResponsiveContainer>
                </Box>
              </Box>
            </Card>
          </Grid>
            <Grid item xs={12} md={4}>
            <Card elevation={0} variant="outlined">
            <Box sx={{ padding: '10px' }}>
                <SubtitleOne variant="subtitle2">Daily Cumulative P&L
                <Tooltip title="Displays the daily cumulative profit and loss with an area chart representation.">
                <InfoIcon 
                sx={{ 
                  marginLeft: '8px', 
                  cursor: 'pointer', 
                  fontSize: '10px', 
                  color: ThemesColors.tradegrey400
                }} 
                />
              </Tooltip>
                </SubtitleOne>
                <Box display="flex" alignItems="center" mt={1}>
                 <ResponsiveContainer width="100%" height={250}>
                  <RadialBarChart options={optionsArea} series={areaSeries} type="area"/> 

                  </ResponsiveContainer>
                </Box>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={2}>
          <Card elevation={0} variant="outlined">
            <Box sx={{ padding: '10px' }}>
              <SubtitleOne variant="subtitle2">Trade Win - {performanceMetric?.totalTrades ?? 0}
              <Tooltip title="Displays the percentage of winning trades relative to losing trades, as well as the total number of winning and losing trades.">
              <InfoIcon 
              sx={{ 
                marginLeft: '8px', 
                cursor: 'pointer', 
                fontSize: '10px', 
                color: ThemesColors.tradegrey400
              }} 
              />
            </Tooltip>
              </SubtitleOne>
              <Box display="flex" alignItems="center" mt={2}>
                <RadialBarChart
                  series={WinLossTrades.series}
                  options={WinLossTrades.options}
                  width={180}
                  height={180}
                />
              </Box>
              <Box display="flex" alignItems="center" justifyContent="flex-start" mt={4}>
              {/* Win Section */}
              <Box display="flex" alignItems="center" mr={2}>
                <Icon icon="solar:double-alt-arrow-up-bold-duotone" width="24px" height="24px" color={ThemesColors.tradeSuccessDark} />
                <Typography variant="subtitle2" color={ThemesColors.tradeSuccessDark} ml={1} sx={{ fontSize: '15px', fontWeight: 'bold' }}  >
                  {performanceMetric?.winningTrades ?? 0}
                </Typography>
                <Typography variant="body2" color="textSecondary" ml={1}>Win</Typography>
              </Box>

              {/* Loss Section */}
              <Box display="flex" alignItems="center">
                <Icon icon="solar:double-alt-arrow-up-bold-duotone" width="24px" height="24px" color={ThemesColors.tradeDangerDark} />
                 <Typography variant="subtitle2" color={ThemesColors.tradeDangerDark}  ml={1} sx={{ fontSize: '15px', fontWeight: 'bold' }}  >
                  {performanceMetric?.losingTrades ?? 0}
                </Typography>
                <Typography variant="body2" color="textSecondary" ml={1}>Loss</Typography>
              </Box>
            </Box>

            </Box>
          </Card>
        </Grid>
       
    <Grid item xs={12} md={3}>
      <Card elevation={0} variant="outlined">
        <Box sx={{ padding: '10px' }}>
          <SubtitleOne variant="subtitle2">
           Discipline Trade  Score
            <Tooltip title="Displays the daily cumulative profit and loss with an area chart representation.">
              <InfoIcon
                sx={{
                  marginLeft: '8px',
                  cursor: 'pointer',
                  fontSize: '10px',
                  color: '#999',
                }}
              />
            </Tooltip>
          </SubtitleOne>
          <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '240px',  // Adjusted height to ensure it's centered
        position: 'relative',
        overflow: 'visible',  // Ensure content around the pentagon is not clipped
      }}
    >
      <Pentagon score={performanceMetric?.tradingScore ?? 0}>
        <Typography
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.3em',  // Score text size
            fontWeight: 'bold',
            color: '#fff',
            whiteSpace: 'nowrap',
          }}
        >
          {performanceMetric?.tradingScore ?? 0} 
        </Typography>
      </Pentagon>
      <CornerLabel
          sx={{
            top: '35px',  // Positioned outside the top corner
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          Win%
        </CornerLabel>
        <CornerLabel
          sx={{
            top: '40%',  // Adjusted for right side
            right: '15px',  // Positioned outside the right side
            transform: 'translateY(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          Profit Factor
        </CornerLabel>

        <CornerLabel
          sx={{
            bottom: '35px',  // Positioned outside the bottom
            left: '35%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          P&L
        </CornerLabel>
        <CornerLabel
          sx={{
            bottom: '40px',  // Positioned outside the bottom
            right: '0%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          Avg Win/Loss
        </CornerLabel>
        <CornerLabel
          sx={{
            top: '48%',
            left: '20px',  // Positioned outside the left side
            transform: 'translateY(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          Drawdown
        </CornerLabel>
        
    </Box>
    </Box>
      </Card>
    </Grid>
    <Grid item xs={12} md={6}>
    <Card elevation={0} variant="outlined">
   
      <CalendarView events={eventData} />
   
   
   </Card>
      
 </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardPage;
