// src/CommonStyles.js
import { fontWeight, styled } from '@mui/system';
import { Box, TextField, Button,Badge,TableCell,TableRow, Typography, Divider, Link ,Tab,tableCellClasses,} from '@mui/material';

const ThemesColors = {
  primary: '#141A21',
  secondary: '#454F5B',
  focus: '#141A21',
  link: '#454F5B',
  lightBackground: '#F5F5F5',
  lightText: '#B0B0B0',
  primaryfont:'#141A21',
  secondaryfont:'#ffffff',
  whiteFont:'#ffffff',

  tradeSuccessLighter:'#D3FCD2',
  tradeSuccessLight:'#77ED8B',
  tradeSuccessMain:'#22C55E',
  tradeSuccessDark:'#118D57',
  tradeSuccessDarker:'#065E49',
  tradeSuccess900:'#00A76F',
  tradeSuccessDark900:'#289867',
  tradeSuccessDark800:'#40a378',
  tradeSuccessDark700:'#58af89',
  tradeSuccessDark600:'#70ba9a',
  tradeSuccessDark500:'#88c6ab',
  tradeSuccessDark400:'#9fd1bb',


  tradeDangerLighter:'#FFE9D5',
  tradeDangersLight:'#FFAC82',
  tradeDangerMain:'#FF5630',
  tradeDangerDark:'#cc4426',
  tradeDangerDarker:'#99331c',
  tradeDangeDark900:'#ff6644',
  tradeDangeDark800:'#ff7759',
  tradeDangeDark700:'#ff886e',
  tradeDangeDark600:'#ff9982',
  tradeDangeDark500:'#ff9982',
  tradeDangeDark400:'#ffbbac',

  tradeYellowMain:'#F59E0B',
  tradeYellowdark:'#d08609',
  tradeYellowdarker:'#e3920a',
  tradeYellowDark900:'#FBBF24',



  tradegrey50:'#FCFDFD',
  tradegrey100:'#F9FAFB',
  tradegrey200:'#F4F6F8',
  tradegrey300:'#DFE3E8',
  tradegrey400:'#C4CDD5',
  tradegrey500:'#919EAB',
  tradegrey600:'#637381',
  tradegrey700:'#454F5B',
  tradegrey800:'#1C252E',
  tradegrey900:'#141A21',
};

export const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  maxWidth: 600,
  margin: 'auto',
  marginTop: theme.spacing(8),
}));

export const Logo = styled('img')(({ theme }) => ({
  width: 100,
  marginBottom: theme.spacing(2),
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: ThemesColors.tradegrey700,
  display: 'flex',
  fontSize: '32px',
  marginTop: '12px',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  marginBottom: '12px',
}));

export const Subtitle = styled(Typography)(({ theme }) => ({
  color: ThemesColors.tradegrey600,
  fontSize: '16px',
  maxWidth: '382px',
  textAlign: 'center',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  lineHeight: '26px',
  marginBottom: theme.spacing(2),
}));
export const SubtitleOne = styled(Typography)(({ theme }) => ({
  color: ThemesColors.tradegrey700,
  fontSize: '0.875rem',
  maxWidth: 'auto',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  lineHeight: '26px',
  marginBottom: theme.spacing(0),
}));

export const SubtitleTwo = styled(Typography)(({ theme }) => ({
  color: ThemesColors.tradegrey700,
  fontSize: '12px',
  maxWidth: 'auto',
  textAlign: 'left',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 500,
  lineHeight: '26px',
  marginBottom: theme.spacing(10),
}));
export const SubtitleThree = styled(Typography)(({ theme }) => ({
  color: ThemesColors.tradegrey700,
  fontSize: '15px',
  maxWidth: 'auto',
  textAlign: 'left',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  lineHeight: '26px',
  marginBottom: theme.spacing(0),
}));
export const SubtitleFour = styled(Typography)(({ theme }) => ({
  color: ThemesColors.tradegrey700,
  fontSize: '16px',
  maxWidth: 'auto',
  textAlign: 'left',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 600,
  lineHeight: '26px',
  marginBottom: theme.spacing(0),
}));
export const HFour = styled(Typography)(({ theme,color }) => ({
  color: color || ThemesColors.tradegrey800, 
  fontSize: '1.5rem',
  maxWidth: 'auto',
  fontFamily: 'Inter, sans-serif',
  fontWeight: 700,
  lineHeight: '1.5',
  marginBottom: theme.spacing(0),
}));
export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: ThemesColors.focus, // Border color on hover
    },
    '&.Mui-focused fieldset': {
      borderColor: ThemesColors.focus, // Border color when focused
    },
  },
  '& .MuiInputLabel-root': {
    color: ThemesColors.label, // Default label color
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: ThemesColors.focus, // Label color when focused
    fontWeight: '600',
  },
}));
export const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
  backgroundColor: ThemesColors.primary,
  '&:hover': {
    backgroundColor: ThemesColors.secondary,
  },
}));
export const StyledButtonOutlined = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderColor: ThemesColors.primary,
  color:ThemesColors.primary,
  width: '100%',
  '&:hover': {
    borderColor: ThemesColors.primary,
    color:ThemesColors.primary,
  },
}));
export const StyledAddButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '60%',
  backgroundColor: ThemesColors.primary,
  marginLeft:'20px',
  '&:hover': {
    backgroundColor: ThemesColors.secondary,
  },
}));
export const StyledDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  fontWeight: 'bold',
  textDecoration: 'none',
  color: ThemesColors.link,
  '&:hover': {
    color: ThemesColors.focus,
  },
}));

export const ValidationItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  mb: theme.spacing(1),
  fontSize: '0.875rem',
  color: ThemesColors.lightText,
}));

export const GradientText = styled('span')(({ theme }) => ({
  background: 'linear-gradient(90deg, #065E49 0%, #22C55E 100%)',
  paddingLeft: '4px',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));
export const GradientTextLogo = styled('span')(({ theme }) => ({
  background: 'linear-gradient(90deg, #118D57 0%, #D3FCD2 100%)',
  paddingLeft: '4px',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
}));

// Styled Tab component
export const StyledTab = styled(Tab)(({ theme }) => ({
  textTransform: 'none',
  color: ThemesColors.primary, // Default color for inactive tabs
  '&.Mui-selected': {
    color: ThemesColors.secondary, // Color for active tab
    backgroundcolor:ThemesColors.primary,
  },
  '&.MuiTab-root': {
    fontSize: '14px', // Adjust text size
    fontWeight: 600,  // Adjust text weight
  }
}));

export const CustomBadge = styled(Badge)(({ theme }) => ({
  '.MuiBadge-dot': {
    backgroundColor: ThemesColors.tradegrey600, // Your custom secondary color
  },
  '.MuiBadge-standard': {
    backgroundColor: ThemesColors.tradegrey600, // Your custom secondary color
  },
}));

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: ThemesColors.tradegrey300,
    color: ThemesColors.tradegrey600,
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    borderBottom: 'none', // Remove the bottom border from all cells
  },
}));

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); 
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};
export const TradeStatusStyles = (status) => {
  switch (status) {
    case 'Win':
      return {
        backgroundColor: '#118D57',
        color: '#ffffff',
        border: '2px solid #118D57',
        borderRadius: '10px',
        width:'60px',
        fontWeight: 'bold',
      };
    case 'Loss':
      return {
        backgroundColor: '#cc4426',
        color: '#ffffff',
        width:'60px',
        border: '2px solid #cc4426',
        borderRadius: '10px',
        fontWeight: 'bold',
      };
    default:
      return {
        backgroundColor: 'grey',
        color: '#ffffff',
        border: '2px solid grey',
        borderRadius: '4px',
      };
  }
};

// Pentagon styled component
export const Pentagon = styled(Box)(({ score  }) => ({
  position: 'relative',
  width: '127.5px',  // Pentagon width
  height: '120px',   // Pentagon height
  background: score >= 70
  ? 'linear-gradient(90deg, #22C55E 0%, #065E49 100%)'  // Green for high score
  : score >= 40
  ? 'linear-gradient(90deg, #FBBF24 0%, #F59E0B 100%)'  // Yellow for medium score
  : 'linear-gradient(90deg, #EF4444 0%, #DC2626 100%)',  // Red for low score
  clipPath: 'polygon(50% 0, 100% 38%, 81% 100%, 19% 100%, 0 38%)',  // Pentagon shape
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',  // 3D shadow effect
  transform: 'rotate(-5deg)',  // Rotate the pentagon by 45 deg
}));

// Corner label styled component
export const CornerLabel = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  fontWeight: 'bold',
  color: ThemesColors.tradegrey500,
  fontSize: '10px',  // Smaller text size for labels
  zIndex: 1,  // Ensure labels appear on top of pentagon
}));

export { ThemesColors };
