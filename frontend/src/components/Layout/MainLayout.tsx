import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Box, Typography } from '@mui/material';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Container component="main" sx={{ flex: 1, py: 4 }}>
        <Outlet /> {/* Рендерит дочерние маршруты */}
      </Container>
      <Box component="footer" sx={{ py: 3, backgroundColor: (theme) => theme.palette.grey[200] }}>
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Bank Deposits. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default MainLayout;