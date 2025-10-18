import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Card, CardContent, CardMedia, Typography, CardActionArea } from '@mui/material';

const ModelsGrid = () => {
  const navigate = useNavigate();

  const models = [
    {
      id: 1,
      name: 'Image Generator',
      description: 'Create images from text prompts',
      image: '/assets/images/image-gen.jpg',
      enabled: true,
      route: '/models/image-gen',
    },
    {
      id: 2,
      name: 'Video Generator',
      description: 'Generate short AI videos',
      image: '/assets/images/video-gen.jpg',
      enabled: false,
      route: '/models/video-gen',
    },
    {
      id: 3,
      name: 'Face Swap',
      description: 'Swap faces in videos or images',
      image: '/assets/images/face-swap.jpg',
      enabled: false,
      route: '/models/face-swap',
    },
    {
      id: 4,
      name: '3D Tour',
      description: 'AI Virtual Tour Creator (3D)',
      image: '/assets/images/3d-tour.jpg',
      enabled: true,
      route: '/models/3d-tour',
    },
    {
      id: 5,
      name: 'Virtual Tour',
      description: 'Experience immersive virtual tours',
      image: '/assets/images/virtual-tour.jpg',
      enabled: true,
      route: '/models/virtual-tour',
    },
  ];

  return (
    <Grid container spacing={4} sx={{ padding: 4 }}>
      {models.map((model) => (
        <Grid item xs={12} sm={6} md={4} key={model.id}>
          <Card sx={{ height: '100%' }} className={!model.enabled ? 'disabled' : ''}>
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
                <Typography gutterBottom variant="h5" component="div">
                  {model.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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