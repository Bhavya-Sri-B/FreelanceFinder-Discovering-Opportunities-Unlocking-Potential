import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" gutterBottom>Welcome to FreelanceFinder</Typography>
      <Typography variant="h5" gutterBottom>Discover opportunities, unlock potential</Typography>
      <Box sx={{ mt: 4 }}>
        <Button variant="contained" component={Link} to="/login" sx={{ mr: 2 }}>Login</Button>
        <Button variant="outlined" component={Link} to="/register">Register</Button>
      </Box>
    </Box>
  );
};

export default Landing;