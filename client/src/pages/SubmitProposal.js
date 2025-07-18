import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { TextField, Button, Container } from '@material-ui/core';

function SubmitProposal() {
  const { projectId } = useParams();
  const [proposal, setProposal] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [rate, setRate] = useState('');
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/applications`,
        { projectId, proposal, portfolioLink, rate },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      history.push(`/project/${projectId}`);
    } catch (error) {
      console.error('Error submitting proposal:', error);
    }
  };

  return (
    <Container>
      <h1>Submit Proposal</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Proposal"
          value={proposal}
          onChange={(e) => setProposal(e.target.value)}
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <TextField
          label="Portfolio Link"
          value={portfolioLink}
          onChange={(e) => setPortfolioLink(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Rate ($)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">Submit</Button>
      </form>
    </Container>
  );
}

export default SubmitProposal;