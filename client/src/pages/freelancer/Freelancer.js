import React, { useContext } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate, Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const Freelancer = () => {
  const { user } = useContext(GeneralContext);

  if (!user || user.role !== 'freelancer') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Freelancer Dashboard</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" component={Link} to="/freelancer/projects">Browse Projects</Button>
        <Button variant="contained" component={Link} to="/freelancer/my-projects">My Projects</Button>
        <Button variant="contained" component={Link} to="/freelancer/my-applications">My Applications</Button>
      </Box>
    </Box>
  );
};

export default Freelancer;