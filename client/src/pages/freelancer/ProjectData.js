import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Typography, Box } from '@mui/material';
import axios from 'axios';

const ProjectData = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).then(res => setProject(res.data));
  }, [id]);

  if (!localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  if (!project) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{project.title}</Typography>
      <Typography><strong>Description:</strong> {project.description}</Typography>
      <Typography><strong>Budget:</strong> ${project.budget}</Typography>
      <Typography><strong>Status:</strong> {project.status}</Typography>
      <Typography><strong>Client:</strong> {project.client.name}</Typography>
    </Box>
  );
};

export default ProjectData;