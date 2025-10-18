import React from 'react';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

const HistoryList = () => {
  // This will be replaced with actual API call to fetch history
  const historyItems = [];

  return (
    <Box>
      <Grid container spacing={2}>
        {historyItems.map((item, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {item.title}
                </Typography>
                <Typography color="text.secondary">
                  {item.timestamp}
                </Typography>
                <Typography variant="body2">
                  {item.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
        {historyItems.length === 0 && (
          <Grid item xs={12}>
            <Typography color="text.secondary" align="center">
              No history items yet
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default HistoryList;