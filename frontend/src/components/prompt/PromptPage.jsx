import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  IconButton,
  Grid,
  Snackbar,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from '@mui/material';
import {
  AutoFixHigh as SparkleIcon,
  Add as AddIcon,
  Share as ShareIcon,
  Image as ImageIcon,
  Videocam as VideoIcon,
} from '@mui/icons-material';
import { MODELS, ALL_MODELS, generateContent } from '../../api/higgsfield-ai';
import api from '../../services/api';
import { AuthContext } from '../../contexts/AuthContext';

const PromptPage = () => {
  const { user, loading } = useContext(AuthContext);
  const [prompt, setPrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS.textToImage[0].id);
  const [selectedCategory, setSelectedCategory] = useState('textToImage');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [teams, setTeams] = useState([]);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const selectedModelInfo = ALL_MODELS.find((model) => model.id === selectedModel);

  // Загрузка команд пользователя
  useEffect(() => {
    const fetchTeams = async () => {
      if (!user) return;
      try {
        const response = await api.get('/api/teams');
        setTeams(response.data);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setSnackbar({
          open: true,
          message: 'Failed to load teams',
          severity: 'error',
        });
      }
    };
    if (!loading) fetchTeams();
  }, [user, loading]);

 const handleSubmit = async () => {
  if (!prompt.trim()) {
    setSnackbar({
      open: true,
      message: 'Prompt cannot be empty',
      severity: 'error',
    });
    return;
  }

  setIsLoading(true);
  try {
    const params = {
      aspect_ratio: '4:3',
    };

    const result = await generateContent(selectedModel, prompt, params);

    // Сериализуем parameters в строку JSON
    const promptData = {
      text: prompt,
      parameters: JSON.stringify({
        modelId: selectedModel,
        modelType: selectedModelInfo.category,
        result: result,
        jobId: result.jobId,
        timestamp: new Date().toISOString(),
      }),
      team_id: selectedTeam || null,
    };

    await api.post('/api/prompts/', promptData);
    setGeneratedResult(result);

    setSnackbar({
      open: true,
      message: 'Content generated and saved to database!',
      severity: 'success',
    });
  } catch (error) {
    console.error('Generation or save error:', error);
    setSnackbar({
      open: true,
      message: error.response?.data?.detail || error.message || 'Failed to generate or save content',
      severity: 'error',
    });
  } finally {
    setIsLoading(false);
  }
};

  const handleShare = async () => {
    if (!generatedResult) {
      setSnackbar({
        open: true,
        message: 'No generated content to share',
        severity: 'error',
      });
      return;
    }

    if (!selectedTeam) {
      setSnackbar({
        open: true,
        message: 'Please select a team to share with',
        severity: 'error',
      });
      return;
    }

    try {
      await api.post('/api/prompts', {
        text: prompt,
        parameters: {
          modelId: selectedModel,
          modelType: selectedModelInfo.category,
          result: generatedResult,
          jobId: generatedResult.jobId,
          timestamp: new Date().toISOString(),
        },
        team_id: selectedTeam,
      });

      setSnackbar({
        open: true,
        message: 'Successfully shared with team!',
        severity: 'success',
      });
    } catch (error) {
      console.error('Share error:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.detail || error.message || 'Failed to share with team',
        severity: 'error',
      });
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper
          sx={{
            p: 4,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: 4,
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4 }}>
            HIGGSFIELD SOUL
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="category-select-label">Category</InputLabel>
                    <Select
                      labelId="category-select-label"
                      value={selectedCategory}
                      onChange={(e) => {
                        const newCategory = e.target.value;
                        setSelectedCategory(newCategory);
                        setSelectedModel(MODELS[newCategory][0].id);
                      }}
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    >
                      <MenuItem value="textToImage">Text to Image</MenuItem>
                      <MenuItem value="textToVideo">Text to Video</MenuItem>
                      <MenuItem value="imageToVideo">Image to Video</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="model-select-label">Select Model</InputLabel>
                    <Select
                      labelId="model-select-label"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    >
                      {MODELS[selectedCategory].map((model) => (
                        <MenuItem key={model.id} value={model.id}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {model.type === 'image' ? <ImageIcon /> : <VideoIcon />}
                            <div>
                              <Typography>{model.name}</Typography>
                              <Typography variant="caption" color="text.secondary">
                                {model.description}
                              </Typography>
                            </div>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={4}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel id="team-select-label">Select Team (Optional)</InputLabel>
                    <Select
                      labelId="team-select-label"
                      value={selectedTeam}
                      onChange={(e) => setSelectedTeam(e.target.value)}
                      sx={{
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.2)',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: 'rgba(255, 255, 255, 0.3)',
                        },
                      }}
                    >
                      <MenuItem value="">No Team</MenuItem>
                      {teams.map((team) => (
                        <MenuItem key={team.id} value={team.id}>
                          {team.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <TextField
                fullWidth
                multiline
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe what you want to ${selectedModelInfo?.type === 'image' ? 'create' : 'animate'}...`}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    '& fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.2)',
                    },
                    '&:hover fieldset': {
                      borderColor: 'rgba(255, 255, 255, 0.3)',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleShare}
                  disabled={!generatedResult || isLoading || !selectedTeam}
                  startIcon={<ShareIcon />}
                >
                  Share with Team
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!prompt.trim() || isLoading}
                  sx={{
                    background: 'linear-gradient(45deg, #84cc16 30%, #059669 90%)',
                    color: 'black',
                    fontWeight: 'bold',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #84cc16 10%, #059669 70%)',
                    },
                    position: 'relative',
                    minWidth: '150px',
                  }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress
                        size={24}
                        sx={{
                          color: 'black',
                          position: 'absolute',
                          left: '50%',
                          marginLeft: '-12px',
                        }}
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <SparkleIcon sx={{ mr: 1 }} />
                      Generate
                    </>
                  )}
                </Button>
              </Box>
            </Grid>

            {generatedResult && (
              <Grid item xs={12}>
                <Paper
                  sx={{
                    p: 3,
                    mt: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="h6">
                      Generated {selectedModelInfo.type === 'image' ? 'Image' : 'Video'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Job ID: {generatedResult.jobId}
                    </Typography>
                  </Box>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Model: {selectedModelInfo.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Prompt: "{prompt}"
                    </Typography>
                  </Box>

                  {selectedModelInfo.type === 'image' ? (
                    <Box
                      component="img"
                      src={generatedResult.result.raw.url}
                      alt="Generated content"
                      onError={(e) => {
                        console.error('Image loading error:', e);
                        console.log('Image URL:', generatedResult.result.raw.url);
                      }}
                      sx={{
                        width: '100%',
                        maxWidth: '512px',
                        height: 'auto',
                        borderRadius: 2,
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  ) : (
                    <Box
                      component="video"
                      controls
                      autoPlay
                      loop
                      sx={{
                        width: '100%',
                        maxWidth: '512px',
                        borderRadius: 2,
                        display: 'block',
                        margin: '0 auto',
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      }}
                    >
                      <source src={generatedResult.result.raw.url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </Box>
                  )}

                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" color="text.secondary">
                      Generated at: {new Date().toLocaleString()}
                    </Typography>
                    <Button
                      variant="text"
                      size="small"
                      href={generatedResult.result.raw.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open in new tab
                    </Button>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PromptPage;