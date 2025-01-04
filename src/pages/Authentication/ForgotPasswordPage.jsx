// src/pages/ForgotPasswordPage.js
import React, { useState } from 'react';
import { Typography } from '@mui/material';
import {
  Container,
  Logo,
  Title,
  Subtitle,
  StyledTextField,
  StyledButton,
  StyledLink,
} from '../../CommonStyles';
import logo from '../../Logo.svg';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password recovery email sent to:', email);
  };

  return (
    <Container>
          <img alt="Supabase" src="https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/icons/platforms/ic-supabase.svg" />
      <Title variant="h5">Forgot Password</Title>
      <Subtitle variant="h3">Please enter the email address associated with your account and we'll email you a link to reset your password.</Subtitle>
      <form onSubmit={handleSubmit}>
        <StyledTextField
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <StyledButton variant="contained" color="primary" type="submit">
          Send Recovery Email
        </StyledButton>
      </form>
      <Typography variant="body2" align="center" mt={2}>
        Remember your password?{' '}
        <StyledLink href="/auth/login">Sign in</StyledLink>
      </Typography>
    </Container>
  );
};

export default ForgotPasswordPage;
