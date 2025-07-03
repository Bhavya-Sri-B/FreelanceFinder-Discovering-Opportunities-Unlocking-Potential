import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate } from 'react-router-dom';
import { Typography, Button, Box, List, ListItem, ListItemText, TextField } from '@mui/material';
import axios from 'axios';

const AllProjects = () => {
  const { user, token } = useContext(GeneralContext);
  const [projects, setProjects] = useState([]);
  const [proposal, setProposal] = useState({});

  useEffect(() => {
    if (user && token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setProjects(res.data.filter(p => p.status === 'open')));
    }
  }, [user, token]);

  const handleApply = async (projectId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/apply/${projectId}`, { proposal: proposal[projectId] || '' }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProposal({ ...proposal, [projectId]: '' });
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'freelancer') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Projects</Typography>
      <List>
        {projects.map(project => (
          <ListItem key={project._id} secondaryAction={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                size="small"
                placeholder="Your proposal"
                value={proposal[project._id] || ''}
                onChange={(e) => setProposal({ ...proposal, [project._id]: e.target.value })}
              />
              <Button variant="contained" onClick={() => handleApply(project._id)}>Apply</Button>
            </Box>
          }>
            <ListItemText primary={project.title} secondary={`Budget: $${project.budget} | ${project.description}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AllProjects;