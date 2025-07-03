import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';
import { TextField, Button, Box, Typography, Alert, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(GeneralContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/register`, { name, email, password, role });
      login(res.data.user, res.data.token);
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setError(err.response?.data.message || 'Registration failed');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Register</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <FormControl required>
          <InputLabel>Role</InputLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="freelancer">Freelancer</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained">Register</Button>
      </Box>
    </Box>
  );
};

export default Register;