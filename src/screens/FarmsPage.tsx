import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface FarmsPageProps {
  onBack: () => void;
}

const FarmsPage: React.FC<FarmsPageProps> = ({ onBack }) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Farm Management</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>Comprehensive farm management and optimization tools.</Typography>
      <Button variant="contained" onClick={onBack}>Back to Home</Button>
    </Box>
  );
};

export default FarmsPage;