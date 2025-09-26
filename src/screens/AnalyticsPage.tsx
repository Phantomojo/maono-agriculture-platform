import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface AnalyticsPageProps {
  onBack: () => void;
}

const AnalyticsPage: React.FC<AnalyticsPageProps> = ({ onBack }) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Analytics Dashboard</Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>Data-driven insights and performance analytics.</Typography>
      <Button variant="contained" onClick={onBack}>Back to Home</Button>
    </Box>
  );
};

export default AnalyticsPage;