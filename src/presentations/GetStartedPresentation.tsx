import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface GetStartedPresentationProps {
  onClose: () => void;
}

const GetStartedPresentation: React.FC<GetStartedPresentationProps> = ({ onClose }) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Get Started with MAONO
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Welcome to the future of agriculture.
      </Typography>
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default GetStartedPresentation;


