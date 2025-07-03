import React, { useContext, useEffect, useState } from 'react';
import { GeneralContext } from '../../context/GeneralContext';
import { Navigate } from 'react-router-dom';
import { Typography, Button, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const AllUsers = () => {
  const { user, token } = useContext(GeneralContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user && token) {
      axios.get(`${process.env.REACT_APP_API_URL}/api/users/all`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setUsers(res.data));
    }
  }, [user, token]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.filter(u => u._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>All Users</Typography>
      <List>
        {users.map(u => (
          <ListItem key={u._id} secondaryAction={
            <Button color="error" onClick={() => handleDelete(u._id)}>Delete</Button>
          }>
            <ListItemText primary={u.name} secondary={`Role: ${u.role} | Email: ${u.email}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AllUsers;