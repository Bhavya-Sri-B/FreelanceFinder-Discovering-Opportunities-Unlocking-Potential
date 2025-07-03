import React, { useState, useContext } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate, useNavigate } from 'react-router-dom';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import axios from 'axios';

const NewProject = () => {
  const { user, token } = useContext(GeneralContext);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/projects`, { title, description, budget }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate('/client');
    } catch (err) {
      setError(err.response?.data.message || 'Failed to post project');
    }
  };

  if (!user || user.role !== 'client') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom>Post New Project</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} multiline rows={4} required />
        <TextField label="Budget" type="number" value={budget} onChange={(e) => setBudget(e.target.value)} required />
        <Button type="submit" variant="contained">Post Project</Button>
      </Box>
    </Box>
  );
};

export default NewProject;