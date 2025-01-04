import React, { useState, useEffect } from 'react';
import { Typography, Grid, Box } from '@mui/material';
import {
  Container,
  Logo,
  Title,
  Subtitle,
  StyledTextField,
  StyledButton,
  StyledDivider,
  StyledLink,
  GradientText,
  SubtitleThree,SubtitleOne
} from '../../CommonStyles';
import logo from '../../Logo.svg';
import CommonService from "../../services/CommonService";
import { AES_EncryptionKey } from "../../helpers/helper";
import CryptoJS from "crypto-js"; // Import CryptoJS correctly

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authErr, setAuthErr] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const keyValue = CryptoJS.enc.Utf8.parse(AES_EncryptionKey);
  const [quoteIndex, setQuoteIndex] = useState(0);

  const quotes = [
    "Discipline is the bridge between goals and accomplishment in trading.",
    "In trading, it's not about how much you make, but how much you don't lose",
    "The best traders are not attached to being right; they are only attached to being profitable",
    "Your biggest opponent in trading is not the market, it's your own emotions.",
    "Consistency in trading is born from a disciplined mind, not a perfect strategy.",
    "Every trade is a learning opportunity, whether it's a win or a loss.",
    "Successful trading is a journey, not a destination. Keep learning and evolving.",
    "In trading, patience is not just a virtue, it's a strategy.",
    "The market rewards those who can wait, not those who can predict.",
    "The secret to trading success is not avoiding losses but managing them wisely.",
    "A trader's greatest weapon is the ability to remain calm in the face of uncertainty.",
    "Trading is 10% strategy, 90% psychology. Master your mind, and the profits will follow",
    "A good trade is one that follows your plan, regardless of the outcome",
    "The market is a reflection of human behavior, understanding yourself is the key to understanding the market",
    "Trade the plan, not the fear.",
  ];  
  useEffect(() => {
    setIsButtonEnabled(username.trim() !== '' && password.trim() !== '');
  }, [username, password]);
  
  useEffect(() => {
    if (username) setUsernameError('');
    if (password) setPasswordError('');
  }, [username, password]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    if (!username) {
      setUsernameError('Please enter your username.');
      valid = false;
    }
    if (!password) {
      setPasswordError('Please enter your password.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const encryptedUserName = CryptoJS.AES.encrypt(username, keyValue, {
      keySize: 192 / 8, iv: keyValue, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7,
    }).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, keyValue, {
      keySize: 192 / 8, iv: keyValue, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7,
    }).toString();

    const LoginRequest = {
      "Username": encryptedUserName,
      "Password": encryptedPassword,
    };

    const loginToken = localStorage.getItem('loginToken');

    CommonService.postWithToken("Authentication", "SignIn", LoginRequest, loginToken).then(res => {
      if (res.status === 200) {
        localStorage.setItem("authUser", res.data.responseData.encToken);
        onLogin();
      }
    }).catch((err) => {
      setAuthErr(true);
      console.log(err);
    });
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 5000); // Change quote every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
      <Grid container>
        {/* Left Side Content */}
        <Grid item xs={1} md={1} />
        <Grid item xs={12} md={4} sx={{marginTop:'34px'}}>
          <Title variant="h3" >Hi, Welcome back</Title>
          <SubtitleThree variant="h6" style={{ marginTop: '20px' }}>
          {quotes[quoteIndex]}
          </SubtitleThree>
          <img
            alt="Dashboard illustration"
            src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/illustrations/illustration-dashboard.webp"
            style={{ width: '80%', marginTop: '20px' }}
          />
          <Box component="ul" style={{ display: 'flex', listStyle: 'none', padding: 0, marginTop: '20px' }}>
            <Box component="li" style={{ marginRight: '10px' }}>
              <a href="/auth/jwt/sign-in" aria-label="Jwt">
                <img alt="Jwt" src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/platforms/ic-jwt.svg" />
              </a>
            </Box>
            <Box component="li" style={{ marginRight: '10px' }}>
              <a href="/auth/firebase/sign-in" aria-label="Firebase">
                <img alt="Firebase" src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/platforms/ic-firebase.svg" />
              </a>
            </Box>
            <Box component="li" style={{ marginRight: '10px' }}>
              <a href="/auth/amplify/sign-in" aria-label="Amplify">
                <img alt="Amplify" src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/platforms/ic-amplify.svg" />
              </a>
            </Box>
            <Box component="li" style={{ marginRight: '10px' }}>
              <a href="/auth/auth0/sign-in" aria-label="Auth0">
                <img alt="Auth0" src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/platforms/ic-auth0.svg" />
              </a>
            </Box>
          </Box>
          <Box sx={{ mb: 4 }}>
          <SubtitleThree variant="h1" component="div" gutterBottom>
            Education <strong style={{ color: '#ff5722' }}> + </strong>
            Trading Plan <strong style={{ color: '#ff5722' }}> + </strong>
            Discipline <strong style={{ color: '#ff5722' }}> + </strong>
            Control <strong style={{ color: '#ff5722' }}> + </strong>
            Risk Management <strong style={{ color: '#ff5722' }}> + </strong>
            Winning Mindset <strong style={{ color: '#ff5722' }}> = </strong>
            <GradientText>Success</GradientText>
          </SubtitleThree>


      </Box>

        </Grid>

        {/* Right Side - Login Form */}
        <Grid item xs={12} md={7}>
          <Container>
          <img alt="Supabase" src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/platforms/ic-supabase.svg" />
            <Title variant="h5">Sign In</Title>
            <Subtitle variant="subtitle1">Sign in to DisciplineTrade platform</Subtitle>
            <form onSubmit={handleSubmit}>
              <StyledTextField
                label="Username"
                variant="outlined"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={Boolean(usernameError)}
                helperText={usernameError}
                size="medium"
              />
              <StyledTextField
                label="Password"
                variant="outlined"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(passwordError)}
                helperText={passwordError}
                size="medium"
              />
              <Typography variant="body2" align="right">
                <StyledLink href="/auth/recover">Forgot password</StyledLink>
              </Typography>
              <StyledButton 
                variant="contained" 
                color="primary" 
                type="submit" 
                disabled={!isButtonEnabled}
              >
                Sign In
              </StyledButton>
            </form>
            <StyledDivider />
            <Typography variant="body2" align="center">
              Don’t have an account?{' '}
              <StyledLink href="/auth/register">Sign up</StyledLink>
            </Typography>
            {authErr && <Typography color="error">Authentication failed. Please check your credentials and try again.</Typography>}
          </Container>
        </Grid>
      </Grid>
  );
};

export default LoginPage;
