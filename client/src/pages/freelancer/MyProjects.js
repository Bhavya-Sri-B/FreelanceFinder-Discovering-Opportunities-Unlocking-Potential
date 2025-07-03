import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate, Link } from 'react-router-dom';
import { Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const MyProjects = () => {
  const { user, token } = useContext(GeneralContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user && token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/applications/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setApplications(res.data.filter(app => app.status === 'accepted')));
    }
  }, [user, token]);

  if (!user || user.role !== 'freelancer') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Projects</Typography>
      <List>
        {applications.map(app => (
          <ListItem key={app._id} secondaryAction={
            <Button component={Link} to={`/freelancer/project/${app.project._id}/working`}>Work</Button>
          }>
            <ListItemText primary={app.project.title} secondary={`Status: ${app.project.status}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyProjects;