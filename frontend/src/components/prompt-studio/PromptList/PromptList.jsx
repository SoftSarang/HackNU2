import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { promptsApi } from '../../../api/prompts';
import { useTeam } from '../../../contexts/TeamContext';

const PromptList = () => {
  const navigate = useNavigate();
  const { currentTeam } = useTeam();
  const [prompts, setPrompts] = useState([]);

  useEffect(() => {
    if (currentTeam) {
      loadPrompts();
    }
  }, [currentTeam]);

  const loadPrompts = async () => {
    try {
      const data = await promptsApi.getPrompts({ teamId: currentTeam.id });
      setPrompts(data);
    } catch (error) {
      console.error('Error loading prompts:', error);
    }
  };

  const handleDelete = async (promptId) => {
    try {
      await promptsApi.deletePrompt(promptId);
      loadPrompts();
    } catch (error) {
      console.error('Error deleting prompt:', error);
    }
  };

  const handleShare = async (promptId) => {
    // Implement sharing logic
  };

  const handleCreateNew = () => {
    navigate('/teams/prompts/create');
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
          <Typography variant="h4" component="h1">
            Team Prompts
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateNew}
          >
            Create New Prompt
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Created</TableCell>
                <TableCell>Last Used</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prompts.map((prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell>{prompt.name}</TableCell>
                  <TableCell>{prompt.type}</TableCell>
                  <TableCell>
                    {new Date(prompt.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {prompt.lastUsed
                      ? new Date(prompt.lastUsed).toLocaleDateString()
                      : 'Never'}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handleShare(prompt.id)}
                      size="small"
                    >
                      <ShareIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(prompt.id)}
                      size="small"
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default PromptList;