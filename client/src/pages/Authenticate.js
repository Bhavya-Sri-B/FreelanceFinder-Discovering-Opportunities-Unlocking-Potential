import React, { useContext } from 'react';
import { GeneralContext } from '../context/GeneralContext';
import { Navigate } from 'react-router-dom';
import { Typography, Box } from '@mui/material';

const Authenticate = () => {
  const { user } = useContext(GeneralContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4">Welcome, {user.name}</Typography>
      <Typography variant="h6">You are logged in as a {user.role}</Typography>
    </Box>
  );
};

export default Authenticate;