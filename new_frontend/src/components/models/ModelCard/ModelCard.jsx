import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

const ModelCard = ({ model, onClick }) => {
  const { name, description, image, enabled } = model;

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: enabled ? 'pointer' : 'default',
        opacity: enabled ? 1 : 0.6,
      }}
      onClick={enabled ? onClick : undefined}
    >
      <CardMedia
        component="img"
        height="140"
        image={image || '/default-model.jpg'}
        alt={name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        {!enabled && (
          <Box
            sx={{
              mt: 2,
              p: 1,
              bgcolor: 'grey.100',
              borderRadius: 1,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Coming Soon
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ModelCard;