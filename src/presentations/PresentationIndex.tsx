import React from 'react';
import { Box, Typography, Button } from '@mui/material';

interface PresentationIndexProps {
  onClose: () => void;
  onStartPresentation: (type: string) => void;
}

const PresentationIndex: React.FC<PresentationIndexProps> = ({ onClose, onStartPresentation }) => {
  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Presentation Index
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Choose a presentation to view.
      </Typography>
      <Button variant="contained" onClick={() => onStartPresentation('orun-style-presentation')}>
        ORUN Style Presentation
      </Button>
      <Button variant="outlined" onClick={onClose} sx={{ ml: 2 }}>
        Close
      </Button>
    </Box>
  );
};

export default PresentationIndex;