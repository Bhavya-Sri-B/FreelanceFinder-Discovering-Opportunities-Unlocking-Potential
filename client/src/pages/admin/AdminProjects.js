import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate } from 'react-router-dom';
import { Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const AdminProjects = () => {
  const { user, token } = useContext(GeneralContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user && token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setProjects(res.data));
    }
  }, [user, token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Projects</Typography>
      <List>
        {projects.map(project => (
          <ListItem key={project._id} secondaryAction={
            <Button color="error" onClick={() => handleDelete(project._id)}>Delete</Button>
          }>
            <ListItemText primary={project.title} secondary={`Client: ${project.client.name} | Status: ${project.status}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminProjects;