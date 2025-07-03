import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate, useParams } from 'react-router-dom';
import { Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const ProjectApplications = () => {
  const { user, token } = useContext(GeneralContext);
  const { id } = useParams();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    if (user && token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setApplications(res.data));
    }
  }, [user, token, id]);

  const handleAccept = async (appId) => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/applications/${appId}`, { status: 'accepted' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setApplications(applications.map(app => app._id === appId ? { ...app, status: 'accepted' } : app));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'client') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Project Applications</Typography>
      <List>
        {applications.map(app => (
          <ListItem key={app._id} secondaryAction={
            app.status === 'pending' && (
              <Button onClick={() => handleAccept(app._id)}>Accept</Button>
            )
          }>
            <ListItemText primary={app.freelancer.name} secondary={`Proposal: ${app.proposal} | Status: ${app.status}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProjectApplications;