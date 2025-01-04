import React, { useState, useEffect } from 'react';
import { Box,Grid,Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import {
  Container,
  Logo,
  Title,
  Subtitle,
  StyledTextField,
  StyledButton,
  StyledDivider,
  StyledLink,
  ValidationItem,
  GradientText,
  ThemesColors,
  SubtitleThree
} from '../../CommonStyles';
import logo from '../../Logo.svg';
import CommonService from "../../services/CommonService";

const SignupPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');
  const [mobileNumberError, setMobileNumberError] = useState('');

  const [authErr, setAuthErr] = useState(false); // Define state for handling authentication errors
  const [successMessage, setSuccessMessage] = useState(''); // Define state for handling success message
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
    // Enable the submit button only if all required fields are filled and no errors exist
    const isFormValid = firstName && lastName && username && email && password && repeatPassword && mobileNumber &&
      !firstNameError && !lastNameError && !usernameError && !emailError && !passwordError && !repeatPasswordError && !mobileNumberError;
    setIsButtonEnabled(isFormValid);
  }, [firstName, lastName, username, email, password, repeatPassword, mobileNumber, firstNameError, lastNameError, usernameError, emailError, passwordError, repeatPasswordError, mobileNumberError]);

  const validateFirstName = (firstName) => {
    if (!firstName.trim()) {
      setFirstNameError('First name is required.');
    } else {
      setFirstNameError('');
    }
  };

  const validateLastName = (lastName) => {
    if (!lastName.trim()) {
      setLastNameError('Last name is required.');
    } else {
      setLastNameError('');
    }
  };

  const validateUsername = (username) => {
    if (!username.trim()) {
      setUsernameError('Username is required.');
    } else {
      setUsernameError('');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must contain at least 8 characters, including uppercase, lowercase, number, and special character.');
    } else {
      setPasswordError('');
    }
  };

  const validateRepeatPassword = (repeatPassword) => {
    if (repeatPassword !== password) {
      setRepeatPasswordError('Passwords do not match.');
    } else {
      setRepeatPasswordError('');
    }
  };

  const validateMobileNumber = (mobileNumber) => {
    const mobileRegex = /^\d{10}$/;
    if (!mobileRegex.test(mobileNumber)) {
      setMobileNumberError('Please enter a valid 10-digit mobile number.');
    } else {
      setMobileNumberError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const TradingUsers = {
      "Username": username,
      "Email": email,
      "PasswordHash": password,
      "FirstName": firstName,
      "LastName": lastName,
      "MobileNo":mobileNumber,
    };
    CommonService.postWithToken("TradingUsers", "PostTradingUser", TradingUsers).then(res => {
      if (res.status === 200) {
        // Show success message and clear form fields
        setSuccessMessage('Signup successful! Please login.');
        clearFormFields();
      }
    }).catch((err) => {
      setAuthErr(true);
      console.log(err);
    });
  };

  const clearFormFields = () => {
    setFirstName('');
    setLastName('');
    setUsername('');
    setEmail('');
    setPassword('');
    setRepeatPassword('');
    setMobileNumber('');
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
        <Grid item xs={12} md={4} sx={{marginTop:'54px'}}>
          <Title variant="h3" >Manage the Trade</Title>
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
        <Grid item xs={12} md={7}>
        <Container style={{ position: 'relative', overflowY: 'auto', marginTop:'auto' }}>
      <img alt="Supabase" src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/platforms/ic-supabase.svg" />
      <Title variant="h5">Welcome to <GradientText>DisciplineTrade</GradientText></Title>
      <Subtitle variant="subtitle1">We help traders become profitable.</Subtitle>
      {successMessage && (
        <Typography variant="body2" color="success.main" align="center" gutterBottom>
          {successMessage}
        </Typography>
      )}
      <form onSubmit={handleSubmit}>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <StyledTextField
            label="First name"
            variant="outlined"
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              validateFirstName(e.target.value);
            }}
            error={Boolean(firstNameError)}
            helperText={firstNameError}
            required
            sx={{ flex: 1, mr: 1 }}
          />
          <StyledTextField
            label="Last name"
            variant="outlined"
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              validateLastName(e.target.value);
            }}
            error={Boolean(lastNameError)}
            helperText={lastNameError}
            required
            sx={{ flex: 1, ml: 1 }}
          />
        </Box>
        <StyledTextField
          label="Username"
          variant="outlined"
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            validateUsername(e.target.value);
          }}
          error={Boolean(usernameError)}
          helperText={usernameError}
          required
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          error={Boolean(emailError)}
          helperText={emailError}
          required
        />
        <Box display="flex" justifyContent="space-between" mb={2}>
          <StyledTextField
            label="Create password"
            variant="outlined"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
            error={Boolean(passwordError)}
            helperText={passwordError}
            required
            sx={{ flex: 1, mr: 1 }}
          />
          <StyledTextField
            label="Repeat password"
            variant="outlined"
            type="password"
            value={repeatPassword}
            onChange={(e) => {
              setRepeatPassword(e.target.value);
              validateRepeatPassword(e.target.value);
            }}
            error={Boolean(repeatPasswordError)}
            helperText={repeatPasswordError}
            required
            sx={{ flex: 1, ml: 1 }}
          />
        </Box>
        <StyledTextField
          label="Mobile number"
          variant="outlined"
          type="text"
          value={mobileNumber}
          onChange={(e) => {
            setMobileNumber(e.target.value);
            validateMobileNumber(e.target.value);
          }}
          error={Boolean(mobileNumberError)}
          helperText={mobileNumberError}
          required
        />
        <Box
          mt={1}
          p={1}
          bgcolor={ThemesColors.lightBackground}
          borderRadius={2}
          display="grid"
          gridTemplateColumns="repeat(auto-fit, minmax(150px, 1fr))"
          gap={1}
        >
          <ValidationItem>
            <CheckIcon color="success" />
            <Typography variant="body2" marginLeft={1}>
              8 Character minimum
            </Typography>
          </ValidationItem>
          <ValidationItem>
            <CheckIcon color="success" />
            <Typography variant="body2" marginLeft={1}>
              1 Special character
            </Typography>
          </ValidationItem>
          <ValidationItem>
            <CheckIcon color="success" />
            <Typography variant="body2" marginLeft={1}>
              1 Number
            </Typography>
          </ValidationItem>
          <ValidationItem>
            <CheckIcon color="success" />
            <Typography variant="body2" marginLeft={1}>
              1 Lowercase
            </Typography>
          </ValidationItem>
          <ValidationItem>
            <CheckIcon color="success" />
            <Typography variant="body2" marginLeft={1}>
              1 Uppercase
            </Typography>
          </ValidationItem>
        </Box>
        {authErr && (
          <Typography variant="body2" color="error.main" align="center" gutterBottom>
            Signup failed! Please try again.
          </Typography>
        )}
        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isButtonEnabled}
          sx={{ mt: 2, width: '100%' }}
        >
          Create account
        </StyledButton>
      </form>

      <StyledDivider />
      <Typography variant="body2" align="center">
        Already have an account? <StyledLink href="/login">Login</StyledLink>
      </Typography>
    </Container>
    </Grid>
    </Grid>
  );
};

export default SignupPage;
