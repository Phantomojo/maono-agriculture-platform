import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface WeatherPageProps {
  onBack: () => void;
}

const WeatherPage: React.FC<WeatherPageProps> = ({ onBack }) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Weather Intelligence</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>AI-powered weather predictions for better farming decisions.</Typography>
      <Button variant="contained" onClick={onBack}>Back to Home</Button>
    </Box>
  );
};

export default WeatherPage;


