import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface JudgePresentationProps {
  onClose: () => void;
}

const JudgePresentation: React.FC<JudgePresentationProps> = ({ onClose }) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Judge Presentation
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Investment opportunity and vision overview.
      </Typography>
      <Button variant="contained" onClick={onClose}>
        Close
      </Button>
    </Box>
  );
};

export default JudgePresentation;
