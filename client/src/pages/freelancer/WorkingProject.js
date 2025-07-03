import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate, useParams } from 'react-router-dom';
import { Typography, TextField, Button, Box } from '@mui/material';
import axios from 'axios';

const WorkingProject = () => {
  const { user, token, socket } = useContext(GeneralContext);
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [submission, setSubmission] = useState('');

  useEffect(() => {
    if (user && token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setProject(res.data));
    }
  }, [user, token, id]);

  useEffect(() => {
    if (socket && project) {
      socket.emit('joinRoom', { projectId: id });
      socket.on('message', (msg) => {
        setMessages(prev => [...prev, msg]);
      });
      return () => socket.off('message');
    }
  }, [socket, project, id]);

  const sendMessage = () => {
    if (message.trim() && socket) {
      socket.emit('sendMessage', { projectId: id, message, sender: user.name });
      setMessage('');
    }
  };

  const handleSubmitWork = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/applications/${id}`, { submission }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSubmission('');
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'freelancer') {
    return <Navigate to="/login" />;
  }

  if (!project) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>{project.title}</Typography>
      <Typography>Status: {project.status}</Typography>
      <Box sx={{ mt: 2, p: 2, border: '1px solid grey', height: 300, overflowY: 'auto' }}>
        {messages.map((msg, idx) => (
          <Typography key={idx}>{msg.sender}: {msg.message} ({new Date(msg.timestamp).toLocaleTimeString()})</Typography>
        ))}
      </Box>
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        <TextField fullWidth value={message} onChange={(e) => setMessage(e.target.value)} />
        <Button variant="contained" onClick={sendMessage}>Send</Button>
      </Box>
      <Box sx={{ mt: 2 }}>
        <TextField
          fullWidth
          label="Submit Work (URL)"
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
        />
        <Button variant="contained" onClick={handleSubmitWork} sx={{ mt: 2 }}>Submit Work</Button>
      </Box>
    </Box>
  );
};

export default WorkingProject;