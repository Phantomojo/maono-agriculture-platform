import React from 'react';
import { Box, Typography, Button, Card, CardContent, Chip } from '@mui/material';
import {
  PlayArrow as PlayIcon,
  VideoLibrary as VideoIcon,
  Description as TextIcon,
} from '@mui/icons-material';

interface PresentationIndexProps {
  onClose: () => void;
  onStartPresentation: (type: string) => void;
}

const PresentationIndex: React.FC<PresentationIndexProps> = ({ onClose, onStartPresentation }) => {
  return (
    <Box sx={{ p: 4, maxWidth: 1200, mx: 'auto' }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 2, 
          textAlign: 'center',
          background: 'linear-gradient(135deg, #116466 0%, #D9B08C 50%, #FFCB9A 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: '"Space Grotesk", "Inter", sans-serif',
          fontWeight: 800,
        }}
      >
        MAONO Presentation Center
      </Typography>
      
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#D1E8E2' }}>
        Choose your preferred presentation format to showcase MAONO's agricultural intelligence platform.
      </Typography>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Dual Panel Presentation */}
        <Box sx={{ flex: 1 }}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'rgba(44, 53, 49, 0.25)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(217, 176, 140, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 176, 140, 0.1)',
              borderRadius: '16px',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4), 0 0 30px rgba(217, 176, 140, 0.2)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <VideoIcon sx={{ color: '#D9B08C', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ color: '#D9B08C', fontWeight: 600 }}>
                  Dual Panel Presentation
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 3, color: '#D1E8E2', lineHeight: 1.6 }}>
                Professional presentation with synchronized text content and video explanations. 
                Perfect for detailed presentations with speaker video on the right and content on the left.
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Chip 
                  label="Text + Video" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(217, 176, 140, 0.2)', 
                    color: '#D9B08C',
                    mr: 1 
                  }} 
                />
                <Chip 
                  label="Synchronized" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(17, 100, 102, 0.2)', 
                    color: '#116466',
                    mr: 1 
                  }} 
                />
                <Chip 
                  label="Professional" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(217, 176, 140, 0.2)', 
                    color: '#D9B08C' 
                  }} 
                />
              </Box>

              <Button
                variant="contained"
                fullWidth
                startIcon={<PlayIcon />}
                onClick={() => onStartPresentation('dual-panel-presentation')}
                sx={{
                  backgroundColor: '#D9B08C',
                  color: '#010E0E',
                  '&:hover': {
                    backgroundColor: '#E5C4A0',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start Dual Panel Presentation
              </Button>
            </CardContent>
          </Card>
        </Box>

        {/* ORUN Style Presentation */}
        <Box sx={{ flex: 1 }}>
          <Card 
            sx={{ 
              height: '100%',
              background: 'rgba(44, 53, 49, 0.25)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(217, 176, 140, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 176, 140, 0.1)',
              borderRadius: '16px',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 16px 48px rgba(0, 0, 0, 0.4), 0 0 30px rgba(217, 176, 140, 0.2)',
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextIcon sx={{ color: '#D9B08C', mr: 1, fontSize: 28 }} />
                <Typography variant="h6" sx={{ color: '#D9B08C', fontWeight: 600 }}>
                  ORUN Style Presentation
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 3, color: '#D1E8E2', lineHeight: 1.6 }}>
                Interactive presentation with 3D globe visualization and animated content. 
                Features the signature ORUN.IO globe with data visualization and smooth transitions.
              </Typography>

              <Box sx={{ mb: 3 }}>
                <Chip 
                  label="3D Globe" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(217, 176, 140, 0.2)', 
                    color: '#D9B08C',
                    mr: 1 
                  }} 
                />
                <Chip 
                  label="Interactive" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(17, 100, 102, 0.2)', 
                    color: '#116466',
                    mr: 1 
                  }} 
                />
                <Chip 
                  label="Animated" 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(217, 176, 140, 0.2)', 
                    color: '#D9B08C' 
                  }} 
                />
              </Box>

              <Button
                variant="outlined"
                fullWidth
                startIcon={<PlayIcon />}
                onClick={() => onStartPresentation('orun-style-presentation')}
                sx={{
                  borderColor: '#116466',
                  color: '#D1E8E2',
                  '&:hover': {
                    borderColor: '#2A7A7C',
                    backgroundColor: 'rgba(17, 100, 102, 0.1)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease',
                }}
              >
                Start ORUN Style Presentation
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>

      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Button 
          variant="text" 
          onClick={onClose}
          sx={{ 
            color: '#8A9B9B',
            '&:hover': {
              backgroundColor: 'rgba(217, 176, 140, 0.1)',
              color: '#D9B08C',
            }
          }}
        >
          Close Presentation Center
        </Button>
      </Box>
    </Box>
  );
};

export default PresentationIndex;
