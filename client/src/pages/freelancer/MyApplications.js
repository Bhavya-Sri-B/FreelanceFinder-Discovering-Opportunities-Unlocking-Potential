import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate } from 'react-router-dom';
import { Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const MyApplications = () => {
  const { user, token } = useContext(GeneralContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user && token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/applications/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setApplications(res.data));
    }
  }, [user, token]);

  if (!user || user.role !== 'freelancer') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>My Applications</Typography>
      <List>
        {applications.map(app => (
          <ListItem key={app._id}>
            <ListItemText primary={app.project.title} secondary={`Proposal: ${app.proposal} | Status: ${app.status}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default MyApplications;