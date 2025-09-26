import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface MarketsPageProps {
  onBack: () => void;
}

const MarketsPage: React.FC<MarketsPageProps> = ({ onBack }) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Market Intelligence</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>Real-time market prices and trading opportunities.</Typography>
      <Button variant="contained" onClick={onBack}>Back to Home</Button>
    </Box>
  );
};

export default MarketsPage;