import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface WeatherIntelligencePresentationProps {
  onClose: () => void;
}

const WeatherIntelligencePresentation: React.FC<WeatherIntelligencePresentationProps> = ({ onClose }) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Weather Intelligence
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        AI-powered weather predictions for better farming decisions.
      </Typography>
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default WeatherIntelligencePresentation;


