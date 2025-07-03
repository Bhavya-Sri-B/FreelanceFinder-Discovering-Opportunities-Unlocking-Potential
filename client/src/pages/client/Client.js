import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate, Link } from 'react-router-dom';
import { Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const Client = () => {
  const { user, token } = useContext(GeneralContext);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    if (user && token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setProjects(res.data.filter(p => p.client._id === user.id)));
    }
  }, [user, token]);

  if (!user || user.role !== 'client') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Client Dashboard</Typography>
      <Button variant="contained" component={Link} to="/client/new-project" sx={{ mb: 2 }}>Post New Project</Button>
      <Typography variant="h6">My Projects</Typography>
      <List>
        {projects.map(project => (
          <ListItem key={project._id} secondaryAction={
            <Button component={Link} to={`/client/project/${project._id}/applications`}>View Applications</Button>
          }>
            <ListItemText primary={project.title} secondary={`Status: ${project.status} | Budget: $${project.budget}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Client;