import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const HomePage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to the Bank Deposits System
        </Typography>
        <Typography variant="body1" paragraph>
          Here you can find and compare various bank deposits, as well as manage your own deposits.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage; 