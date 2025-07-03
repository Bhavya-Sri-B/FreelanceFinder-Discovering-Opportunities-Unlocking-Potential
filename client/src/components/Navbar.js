import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  const { user, logout } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
          FreelanceFinder
        </Typography>
        <Box>
          {!user ? (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          ) : (
            <>
              {user.role === 'client' && <Button color="inherit" component={Link} to="/client">Client Dashboard</Button>}
              {user.role === 'freelancer' && <Button color="inherit" component={Link} to="/freelancer">Freelancer Dashboard</Button>}
              {user.role === 'admin' && <Button color="inherit" component={Link} to="/admin">Admin Dashboard</Button>}
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;