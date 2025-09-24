import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';

function TestScreen({ title, description }) {
  return (
    <Box sx={{ height: '100%', overflow: 'auto', p: 2 }}>
      <Card sx={{ backgroundColor: '#2D2D2D', border: '1px solid #444' }}>
        <CardContent>
          <Typography variant="h4" sx={{ color: '#FFFFFF', fontWeight: 'bold', mb: 2 }}>
            {title}
          </Typography>
          <Typography variant="body1" sx={{ color: '#B0B0B0' }}>
            {description}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TestScreen;
