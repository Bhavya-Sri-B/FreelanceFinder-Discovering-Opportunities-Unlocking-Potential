import React, { useContext } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate, Link } from 'react-router-dom';
import { Typography, Button, Box } from '@mui/material';

const Admin = () => {
  const { user } = useContext(GeneralContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant="contained" component={Link} to="/admin/users">Manage Users</Button>
        <Button variant="contained" component={Link} to="/admin/projects">Manage Projects</Button>
        <Button variant="contained" component={Link} to="/admin/applications">Manage Applications</Button>
      </Box>
    </Box>
  );
};

export default Admin;