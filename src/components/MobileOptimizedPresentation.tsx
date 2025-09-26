import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { detectDevice, getMobileStyles, DeviceInfo } from '../utils/deviceDetection';

interface MobileOptimizedPresentationProps {
  title: string;
  slides: React.ReactNode[];
  onClose: () => void;
  currentSlide: number;
  onSlideChange: (slide: number) => void;
}

const MobileOptimizedPresentation: React.FC<MobileOptimizedPresentationProps> = ({
  title,
  slides,
  onClose,
  currentSlide,
  onSlideChange
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
  const [mobileStyles, setMobileStyles] = useState<any>(null);

  useEffect(() => {
    const device = detectDevice();
    setDeviceInfo(device);
    setMobileStyles(getMobileStyles(device));
  }, []);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      onSlideChange(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      onSlideChange(currentSlide - 1);
    }
  };

  if (!deviceInfo || !mobileStyles) {
    return null;
  }

  const isMobileDevice = deviceInfo.isMobile;

  return (
    <Box sx={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: '#0A0D0F',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      {/* Mobile-Optimized Header */}
      <AppBar 
        position="static" 
        elevation={0} 
        sx={{ 
          backgroundColor: 'rgba(10, 13, 15, 0.95)', 
          backdropFilter: 'blur(20px)',
          height: isMobileDevice ? mobileStyles.headerHeight : '80px',
          minHeight: isMobileDevice ? mobileStyles.headerHeight : '80px'
        }}
      >
        <Toolbar sx={{ 
          py: isMobileDevice ? 1 : 2,
          px: isMobileDevice ? 1 : 2,
          minHeight: 'auto !important'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            {/* Mobile Logo - Much Smaller */}
            <Box sx={{
              width: isMobileDevice ? 28 : 40,
              height: isMobileDevice ? 28 : 40,
              borderRadius: isMobileDevice ? 8 : 12,
              background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: isMobileDevice ? 1 : 2,
              boxShadow: '0 2px 8px rgba(0, 212, 255, 0.3)'
            }}>
              <Typography sx={{ 
                color: 'white', 
                fontWeight: 'bold', 
                fontSize: isMobileDevice ? '0.9rem' : '1.2rem' 
              }}>
                M
              </Typography>
            </Box>
            
            {/* Mobile Title - Smaller and Truncated */}
            <Typography 
              variant={isMobileDevice ? 'h6' : 'h5'} 
              sx={{ 
                fontWeight: 700,
                background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-0.02em',
                fontSize: isMobileDevice ? '1rem' : '1.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: isMobileDevice ? '150px' : 'none'
              }}
            >
              {title}
            </Typography>
          </Box>
          
          {/* Mobile Close Button - Smaller */}
          <IconButton 
            onClick={onClose}
            sx={{
              color: 'white',
              p: isMobileDevice ? 0.5 : 1,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            <CloseIcon sx={{ fontSize: isMobileDevice ? '1.2rem' : '1.5rem' }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile-Optimized Content */}
      <Box sx={{ 
        flex: 1, 
        overflow: 'auto',
        p: isMobileDevice ? 1 : 2
      }}>
        {slides[currentSlide]}
      </Box>

      {/* Mobile-Optimized Navigation */}
      <Box sx={{
        position: 'absolute',
        bottom: isMobileDevice ? 10 : 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: isMobileDevice ? 1 : 2,
        backgroundColor: 'rgba(15, 20, 25, 0.9)',
        backdropFilter: 'blur(20px)',
        borderRadius: isMobileDevice ? 2 : 3,
        padding: isMobileDevice ? '8px 12px' : '12px 24px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: isMobileDevice ? '90%' : 'auto',
        maxWidth: isMobileDevice ? '300px' : 'none'
      }}>
        {/* Previous Button - Mobile Optimized */}
        <Button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          variant="outlined"
          size={isMobileDevice ? 'small' : 'medium'}
          sx={{ 
            borderColor: 'primary.main',
            color: 'primary.main',
            minWidth: isMobileDevice ? '60px' : '80px',
            height: isMobileDevice ? mobileStyles.buttonHeight : '40px',
            fontSize: isMobileDevice ? '0.7rem' : '0.8rem',
            '&:hover': { 
              backgroundColor: 'rgba(125, 211, 252, 0.1)' 
            }
          }}
        >
          {isMobileDevice ? '←' : 'Previous'}
        </Button>
        
        {/* Mobile Slide Indicators - Smaller */}
        <Box sx={{ 
          display: 'flex', 
          gap: isMobileDevice ? 0.5 : 1,
          flex: 1,
          justifyContent: 'center'
        }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => onSlideChange(index)}
              sx={{
                width: isMobileDevice ? 8 : 12,
                height: isMobileDevice ? 8 : 12,
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: index === currentSlide ? 'primary.main' : 'rgba(255, 255, 255, 0.5)'
                }
              }}
            />
          ))}
        </Box>
        
        {/* Next Button - Mobile Optimized */}
        <Button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          variant="contained"
          size={isMobileDevice ? 'small' : 'medium'}
          sx={{ 
            background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
            minWidth: isMobileDevice ? '60px' : '80px',
            height: isMobileDevice ? mobileStyles.buttonHeight : '40px',
            fontSize: isMobileDevice ? '0.7rem' : '0.8rem',
            '&:hover': { 
              background: 'linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)' 
            }
          }}
        >
          {isMobileDevice ? '→' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default MobileOptimizedPresentation;
