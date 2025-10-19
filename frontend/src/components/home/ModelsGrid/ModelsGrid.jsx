import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';
import Card1 from '../../../assets/images/Card1.jpeg';
import Card2 from '../../../assets/images/Card2.png';
import Card3 from '../../../assets/images/Card3.jpeg';
import Card4 from '../../../assets/images/Card4.png';
import Card5 from '../../../assets/images/Card5.png';

const ModelsGrid = () => {
  const navigate = useNavigate();

  const models = [
    {
      id: 1,
      name: 'Image Generator',
      description: 'Create images from text prompts',
      image: Card1,
      enabled: true,
      route: '/models/image-gen',
    },
    {
      id: 2,
      name: 'Video Generator',
      description: 'Generate short AI videos',
      image: Card2,
      enabled: false,
      route: '/models/video-gen',
    },
    {
      id: 3,
      name: 'Face Swap',
      description: 'Swap faces in videos or images',
      image: Card3,
      enabled: false,
      route: '/models/face-swap',
    },
    {
      id: 4,
      name: 'House Tour',
      description: 'Explore houses with AI-generated tours',
      image: Card4,
      enabled: true,
      route: '/models/3d-tour',
    },
    {
      id: 5,
      name: 'Virtual Tour',
      description: 'Experience immersive virtual tours',
      image: Card5,
      enabled: true,
      route: '/models/virtual-tour',
    },
  ];

  return (
    <Grid container spacing={4} sx={{ 
        padding: 4, 
        marginBottom: '60px'}}>
      {models.map((model) => (
        <Grid item xs={12} sm={6} md={4} key={model.id}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'rgba(18, 18, 18, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(197, 250, 80, 0.2)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 0 20px rgba(197, 250, 80, 0.3)',
              },
              '&.disabled': {
                opacity: 0.5,
                filter: 'grayscale(100%)',
              }
            }} 
            className={!model.enabled ? 'disabled' : ''}
          >
            <CardActionArea
              disabled={!model.enabled}
              onClick={() => model.enabled && model.route && navigate(model.route)}
            >
              <CardMedia
                component="img"
                height="140"
                image={model.image}
                alt={model.name}
              />
              <CardContent>
                <Typography 
                  gutterBottom 
                  variant="h5" 
                  component="div"
                  sx={{
                    color: 'var(--primary-color)',
                    fontWeight: 'bold',
                    textShadow: '0 0 10px rgba(197, 250, 80, 0.3)'
                  }}
                >
                  {model.name}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: '#fff',
                    opacity: 0.8
                  }}
                >
                  {model.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ModelsGrid;