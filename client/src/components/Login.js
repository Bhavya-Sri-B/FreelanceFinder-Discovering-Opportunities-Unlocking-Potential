import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/login`, { email, password });
      login(res.data.user, res.data.token);
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setError(err.response?.data.message || 'Login failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="contained">Login</Button>
      </Box>
    </Box>
  );
};

export default Login;