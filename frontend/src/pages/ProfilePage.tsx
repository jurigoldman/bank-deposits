import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          User Profile
        </Typography>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            User Information
          </Typography>
          {user ? (
            <>
              <Typography variant="body1">
                Email: {user.email}
              </Typography>
              <Typography variant="body1">
                Role: {user.role}
              </Typography>
            </>
          ) : (
            <Typography variant="body1" color="error">
              User information is not available
            </Typography>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default ProfilePage; 