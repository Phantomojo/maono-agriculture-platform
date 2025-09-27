import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Paper,
  Fade,
  LinearProgress,
  Chip,
  useMediaQuery,
  useTheme,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Fullscreen as FullscreenIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
  VolumeUp as VolumeIcon,
  VolumeOff as VolumeOffIcon,
  PictureInPicture as PictureInPictureIcon,
} from '@mui/icons-material';

interface DualPanelPresentationProps {
  onClose: () => void;
  onOpenDashboard: () => void;
}

interface PresentationSlide {
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  bulletPoints: string[];
  videoUrl?: string | null;
  videoPoster?: string;
  duration: number;
  keyPoints?: string[];
  callToAction?: string;
}

const DualPanelPresentation: React.FC<DualPanelPresentationProps> = ({ onClose, onOpenDashboard }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const slides: PresentationSlide[] = [
    {
      id: 'intro',
      title: 'Welcome to MAONO',
      subtitle: 'Revolutionizing Agriculture with AI-Powered Intelligence',
      content: 'MAONO (Swahili for "vision") is transforming African agriculture through cutting-edge technology, connecting farmers with AI-powered insights, real-time market data, and a global agricultural community.',
      bulletPoints: [
        'AI-powered weather predictions with 95% accuracy',
        'Real-time market intelligence and pricing',
        'Smart farming tools and crop monitoring',
        'Global farmer community and knowledge sharing',
        'Financial services and micro-loan integration'
      ],
      keyPoints: [
        '50K+ Active Farmers',
        '15+ Countries',
        '40% Yield Increase',
        '95% Accuracy Rate'
      ],
      videoUrl: '/videos/maono-intro.mp4',
      videoPoster: '/images/maono-intro-poster.jpg',
      duration: 8000,
      callToAction: 'Join the Agricultural Revolution'
    },
    {
      id: 'problem',
      title: 'The Challenge',
      subtitle: 'African Agriculture Faces Critical Issues',
      content: 'Smallholder farmers across Africa struggle with unpredictable weather, limited market access, lack of modern farming techniques, and financial constraints that prevent them from maximizing their potential.',
      bulletPoints: [
        'Unpredictable weather patterns affecting crop yields',
        'Limited access to real-time market information',
        'Lack of modern farming techniques and technology',
        'Financial barriers preventing growth and investment',
        'Isolation from agricultural knowledge and best practices'
      ],
      keyPoints: [
        '60% of African workforce in agriculture',
        '70% of food production by smallholders',
        'Only 4% of arable land irrigated',
        'Post-harvest losses up to 30%'
      ],
      videoUrl: null, // Video not available yet
      videoPoster: '/images/challenges-poster.jpg',
      duration: 10000,
      callToAction: 'See How MAONO Solves These Problems'
    },
    {
      id: 'solution',
      title: 'The MAONO Solution',
      subtitle: 'AI-Powered Agricultural Intelligence Platform',
      content: 'MAONO leverages artificial intelligence, satellite data, and mobile technology to provide farmers with actionable insights, market connections, and the tools they need to succeed.',
      bulletPoints: [
        'AI weather predictions and planting recommendations',
        'Real-time market prices and buyer connections',
        'Crop health monitoring and disease detection',
        'Financial services and micro-loan access',
        'Community platform for knowledge sharing'
      ],
      keyPoints: [
        '95% Weather Prediction Accuracy',
        'Real-time Market Data',
        'AI Disease Detection',
        'Mobile-First Design'
      ],
      videoUrl: '/videos/maono-solution.mp4',
      videoPoster: '/images/solution-poster.jpg',
      duration: 12000,
      callToAction: 'Experience the Future of Farming'
    },
    {
      id: 'technology',
      title: 'Cutting-Edge Technology',
      subtitle: 'Advanced AI and Data Science',
      content: 'MAONO combines machine learning algorithms, satellite imagery, weather station data, and mobile technology to deliver precise agricultural insights and recommendations.',
      bulletPoints: [
        'Machine learning algorithms for weather prediction',
        'Satellite imagery analysis for crop monitoring',
        'IoT sensor integration for real-time data',
        'Mobile app with offline capabilities',
        'Blockchain for transparent transactions'
      ],
      keyPoints: [
        'Machine Learning AI',
        'Satellite Data Integration',
        'IoT Sensor Networks',
        'Blockchain Technology'
      ],
      videoUrl: '/videos/technology-stack.mp4',
      videoPoster: '/images/technology-poster.jpg',
      duration: 10000,
      callToAction: 'Explore Our Technology'
    },
    {
      id: 'impact',
      title: 'Proven Impact',
      subtitle: 'Transforming Lives and Communities',
      content: 'MAONO has already helped thousands of farmers increase their yields, improve their income, and build sustainable agricultural practices across Africa.',
      bulletPoints: [
        '40% average increase in crop yields',
        '60% improvement in market access',
        '50% reduction in post-harvest losses',
        '80% of users report increased income',
        '95% user satisfaction rate'
      ],
      keyPoints: [
        '40% Yield Increase',
        '60% Better Market Access',
        '50% Less Post-Harvest Loss',
        '80% Income Improvement'
      ],
      videoUrl: null, // Video not available yet
      videoPoster: '/images/impact-poster.jpg',
      duration: 12000,
      callToAction: 'Join Our Success Stories'
    },
    {
      id: 'future',
      title: 'The Future of Agriculture',
      subtitle: 'Scaling Across Africa and Beyond',
      content: 'MAONO is expanding rapidly, with plans to reach 1 million farmers across Africa by 2026, creating a sustainable agricultural ecosystem that benefits everyone.',
      bulletPoints: [
        'Expansion to 25+ African countries',
        'Integration with government agricultural programs',
        'Partnerships with international organizations',
        'Development of new AI capabilities',
        'Creation of agricultural data marketplace'
      ],
      keyPoints: [
        '1M Farmers by 2026',
        '25+ Countries',
        'Government Partnerships',
        'Data Marketplace'
      ],
      videoUrl: '/videos/future-vision.mp4',
      videoPoster: '/images/future-poster.jpg',
      duration: 10000,
      callToAction: 'Be Part of the Future'
    }
  ];

  // Auto-play functionality - only for slides without videos
  useEffect(() => {
    const currentSlideData = slides[currentSlide];
    
    // Only use timer for slides without videos
    if (isPlaying && !currentSlideData.videoUrl) {
      const duration = currentSlideData.duration;
      const interval = 50;
      const increment = (interval / duration) * 100;

      progressRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + increment;
          if (newProgress >= 100) {
            handleNextSlide();
            return 0;
          }
          return newProgress;
        });
      }, interval);

      return () => {
        if (progressRef.current) {
          clearInterval(progressRef.current);
        }
      };
    } else {
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    }
  }, [isPlaying, currentSlide]);

  // Video synchronization
  useEffect(() => {
    if (videoRef.current && currentSlideData.videoUrl) {
      setIsVideoLoading(true);
      setVideoError(null);
      
      if (isPlaying) {
        videoRef.current.currentTime = 0; // Reset video to beginning
        videoRef.current.load(); // Reload video to ensure it's ready
        
        // Wait for video to be ready before playing
        const playVideo = () => {
          if (videoRef.current && videoRef.current.readyState >= 2) {
            videoRef.current.play().catch(error => {
              console.error('Video play error:', error);
              setVideoError('Failed to play video');
              setIsVideoLoading(false);
            });
          } else {
            // Wait a bit more for video to load
            setTimeout(playVideo, 100);
          }
        };
        
        playVideo();
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
    // Reset progress when slide changes
    setProgress(0);
  }, [isPlaying, currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          event.preventDefault();
          handlePrevSlide();
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          event.preventDefault();
          handleNextSlide();
          break;
        case 'End':
          event.preventDefault();
          if (currentSlide === slides.length - 1) {
            handleFinishPresentation();
          } else {
            setCurrentSlide(slides.length - 1);
            setProgress(0);
          }
          break;
        case 'Escape':
          event.preventDefault();
          onClose();
          break;
        case 'Enter':
          event.preventDefault();
          if (isPlaying) {
            handlePause();
          } else {
            handlePlay();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, isPlaying]);

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNextSlide();
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
  };

  // Mouse wheel navigation
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      handleNextSlide();
    } else if (e.deltaY < 0) {
      handlePrevSlide();
    }
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentSlide(0);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  const handleNextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
      setProgress(0);
    } else {
      // Auto-advance to dashboard after last slide
      handleFinishPresentation();
    }
  };

  const handleFinishPresentation = () => {
    setIsPlaying(false);
    setCurrentSlide(0);
    setProgress(0);
    // Mark presentation as seen and open dashboard
    localStorage.setItem('maono-presentation-seen', 'true');
    onOpenDashboard();
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      setProgress(0);
    }
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleVideoToggle = () => {
    if (videoRef.current) {
      if (isVideoMuted) {
        videoRef.current.muted = false;
        setIsVideoMuted(false);
      } else {
        videoRef.current.muted = true;
        setIsVideoMuted(true);
      }
    }
  };

  const handlePictureInPicture = () => {
    if (videoRef.current && document.pictureInPictureEnabled) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        videoRef.current.requestPictureInPicture();
      }
    }
  };

  const currentSlideData = slides[currentSlide];

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#010E0E',
        color: '#D1E8E2',
        zIndex: 9999,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onWheel={handleWheel}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 10,
          p: 2,
          background: 'rgba(1, 14, 14, 0.9)',
          backdropFilter: 'blur(15px)',
          borderBottom: '1px solid rgba(217, 176, 140, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#D9B08C', fontWeight: 600 }}>
            MAONO Agricultural Intelligence - Dual Panel Presentation
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography variant="caption" sx={{ color: '#8A9B9B', mr: 2, display: { xs: 'none', sm: 'block' } }}>
              ← → Navigate • Space Play/Pause • End Finish • Esc Close
            </Typography>
            <IconButton onClick={handleFullscreen} sx={{ color: '#D1E8E2' }}>
              <FullscreenIcon />
            </IconButton>
            <IconButton onClick={onClose} sx={{ color: '#D1E8E2' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Main Content - Full Width Layout */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          height: 'calc(100vh - 140px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Left Panel - Text Content (Full Width) */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 4,
            overflowY: 'auto',
            background: 'rgba(44, 53, 49, 0.25)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(217, 176, 140, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 176, 140, 0.1)',
            borderRadius: '16px',
            m: 2,
            mr: 1,
            position: 'relative',
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box>
              {/* Slide Title */}
              <Typography
                variant="h3"
                sx={{
                  mb: 2,
                  background: 'linear-gradient(135deg, #116466 0%, #D9B08C 50%, #FFCB9A 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: '"Space Grotesk", "Inter", sans-serif',
                  fontWeight: 800,
                }}
              >
                {currentSlideData.title}
              </Typography>

              {/* Subtitle */}
              {currentSlideData.subtitle && (
                <Typography
                  variant="h5"
                  sx={{
                    mb: 4,
                    color: '#D9B08C',
                    fontWeight: 600,
                  }}
                >
                  {currentSlideData.subtitle}
                </Typography>
              )}

              {/* Main Content */}
              <Typography
                variant="body1"
                sx={{
                  mb: 4,
                  color: '#D1E8E2',
                  lineHeight: 1.8,
                  fontSize: '1.1rem',
                }}
              >
                {currentSlideData.content}
              </Typography>

              {/* Bullet Points */}
              <Card sx={{ mb: 4, background: 'rgba(17, 100, 102, 0.1)', border: '1px solid rgba(217, 176, 140, 0.2)' }}>
                <CardContent>
                  <Typography variant="h6" sx={{ mb: 2, color: '#D9B08C', fontWeight: 600 }}>
                    Key Features:
                  </Typography>
                  <List dense>
                    {currentSlideData.bulletPoints.map((point, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              backgroundColor: '#D9B08C',
                            }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          primary={point}
                          sx={{
                            '& .MuiListItemText-primary': {
                              color: '#D1E8E2',
                              fontSize: '0.95rem',
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>

              {/* Key Points */}
              {currentSlideData.keyPoints && (
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2, color: '#D9B08C', fontWeight: 600 }}>
                    Impact Metrics:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {currentSlideData.keyPoints.map((point, index) => (
                      <Chip
                        key={index}
                        label={point}
                        sx={{
                          backgroundColor: 'rgba(217, 176, 140, 0.2)',
                          color: '#D9B08C',
                          border: '1px solid rgba(217, 176, 140, 0.3)',
                          fontWeight: 600,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {/* Call to Action */}
              {currentSlideData.callToAction && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#D9B08C',
                      fontWeight: 600,
                      fontStyle: 'italic',
                    }}
                  >
                    {currentSlideData.callToAction}
                  </Typography>
                </Box>
              )}

              {/* Finish Presentation Button - Only on last slide */}
              {currentSlide === slides.length - 1 && (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleFinishPresentation}
                    sx={{
                      backgroundColor: '#D9B08C',
                      color: '#010E0E',
                      px: 4,
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '12px',
                      textTransform: 'none',
                      boxShadow: '0 4px 20px rgba(217, 176, 140, 0.3)',
                      '&:hover': {
                        backgroundColor: '#E5C4A0',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 6px 25px rgba(217, 176, 140, 0.4)',
                      },
                      transition: 'all 0.3s ease',
                    }}
                  >
                    🚀 Enter MAONO Dashboard
                  </Button>
                </Box>
              )}
            </Box>
          </Fade>
        </Box>

        {/* Corner Navigation Buttons */}
        <IconButton
          onClick={handlePrevSlide}
          disabled={currentSlide === 0}
          sx={{
            position: 'absolute',
            top: '50%',
            left: 20,
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(17, 100, 102, 0.8)',
            color: '#D1E8E2',
            width: 50,
            height: 50,
            '&:hover': {
              backgroundColor: 'rgba(17, 100, 102, 1)',
            },
            '&:disabled': {
              backgroundColor: 'rgba(44, 53, 49, 0.5)',
              color: '#8A9B9B',
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <IconButton
          onClick={handleNextSlide}
          disabled={currentSlide === slides.length - 1}
          sx={{
            position: 'absolute',
            top: '50%',
            right: 20,
            transform: 'translateY(-50%)',
            backgroundColor: 'rgba(17, 100, 102, 0.8)',
            color: '#D1E8E2',
            width: 50,
            height: 50,
            '&:hover': {
              backgroundColor: 'rgba(17, 100, 102, 1)',
            },
            '&:disabled': {
              backgroundColor: 'rgba(44, 53, 49, 0.5)',
              color: '#8A9B9B',
            },
          }}
        >
          <ArrowForwardIcon />
        </IconButton>

        {/* Right Panel - Video (Smaller) */}
        <Box
          sx={{
            width: '400px',
            display: 'flex',
            flexDirection: 'column',
            p: 2,
            background: 'rgba(44, 53, 49, 0.25)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(217, 176, 140, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 176, 140, 0.1)',
            borderRadius: '16px',
            m: 2,
            ml: 1,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Video Container */}
          <Box
            sx={{
              flex: 1,
              position: 'relative',
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#000',
            }}
          >
            {currentSlideData.videoUrl ? (
              <video
                ref={videoRef}
                width="100%"
                height="100%"
                poster={currentSlideData.videoPoster}
                muted={isVideoMuted}
                style={{
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
                onLoadStart={() => setIsVideoLoading(true)}
                onCanPlay={() => setIsVideoLoading(false)}
                onPlay={() => {
                  setIsVideoPlaying(true);
                  setIsVideoLoading(false);
                }}
                onPause={() => setIsVideoPlaying(false)}
                onError={(e) => {
                  console.error('Video error:', e);
                  setVideoError('Video failed to load');
                  setIsVideoLoading(false);
                }}
                onTimeUpdate={() => {
                  if (videoRef.current) {
                    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
                    setProgress(progress);
                  }
                }}
                onEnded={() => {
                  if (currentSlide < slides.length - 1) {
                    handleNextSlide();
                  } else {
                    handleFinishPresentation();
                  }
                }}
              >
                <source src={currentSlideData.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(17, 100, 102, 0.1)',
                  borderRadius: '12px',
                  border: '2px dashed rgba(217, 176, 140, 0.3)',
                  p: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: '#D9B08C',
                    fontWeight: 600,
                    mb: 2,
                    textAlign: 'center',
                  }}
                >
                  📹 Video Coming Soon
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#D1E8E2',
                    textAlign: 'center',
                    opacity: 0.8,
                  }}
                >
                  This slide's video is being prepared and will be available soon.
                </Typography>
              </Box>
            )}

            {/* Video Loading State */}
            {currentSlideData.videoUrl && isVideoLoading && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                  borderRadius: '12px',
                }}
              >
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress sx={{ color: '#D9B08C', mb: 2 }} />
                  <Typography variant="body2" sx={{ color: '#D1E8E2' }}>
                    Loading video...
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Video Error State */}
            {currentSlideData.videoUrl && videoError && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  borderRadius: '12px',
                }}
              >
                <Box sx={{ textAlign: 'center', p: 2 }}>
                  <Typography variant="h6" sx={{ color: '#F87171', mb: 1 }}>
                    ⚠️ Video Error
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#D1E8E2', mb: 2 }}>
                    {videoError}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      setVideoError(null);
                      if (videoRef.current) {
                        videoRef.current.load();
                      }
                    }}
                    sx={{
                      backgroundColor: '#D9B08C',
                      color: '#010E0E',
                      '&:hover': {
                        backgroundColor: '#E5C4A0',
                      },
                    }}
                  >
                    Retry
                  </Button>
                </Box>
              </Box>
            )}

            {/* Video Overlay Controls - Only show when video exists and not loading/error */}
            {currentSlideData.videoUrl && !isVideoLoading && !videoError && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.3) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isVideoPlaying ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 1,
                  },
                }}
              >
                <IconButton
                  onClick={isVideoPlaying ? handlePause : handlePlay}
                  sx={{
                    backgroundColor: 'rgba(217, 176, 140, 0.9)',
                    color: '#010E0E',
                    width: 80,
                    height: 80,
                    '&:hover': {
                      backgroundColor: 'rgba(217, 176, 140, 1)',
                    },
                  }}
                >
                  {isVideoPlaying ? <PauseIcon sx={{ fontSize: 40 }} /> : <PlayIcon sx={{ fontSize: 40 }} />}
                </IconButton>
              </Box>
            )}

            {/* Video Controls - Only show when video exists */}
            {currentSlideData.videoUrl && (
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 16,
                  right: 16,
                  display: 'flex',
                  gap: 1,
                  opacity: 0.8,
                }}
              >
                <IconButton
                  onClick={handleVideoToggle}
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#D1E8E2',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    },
                  }}
                >
                  {isVideoMuted ? <VolumeOffIcon /> : <VolumeIcon />}
                </IconButton>
                <IconButton
                  onClick={handlePictureInPicture}
                  sx={{
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: '#D1E8E2',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    },
                  }}
                >
                  <PictureInPictureIcon />
                </IconButton>
              </Box>
            )}
          </Box>

          {/* Video Info */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#D9B08C', fontWeight: 600 }}>
              {currentSlideData.title} - {currentSlideData.videoUrl ? 'Video Presentation' : 'Content Presentation'}
            </Typography>
            <Typography variant="caption" sx={{ color: '#8A9B9B' }}>
              {currentSlideData.videoUrl 
                ? 'Click to play/pause • Use controls for volume and picture-in-picture'
                : 'Text content with detailed information and key points'
              }
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Slide Progress Indicator */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 1,
          backgroundColor: 'rgba(1, 14, 14, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          p: 1,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setProgress(0);
            }}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: index === currentSlide ? '#D9B08C' : 'rgba(217, 176, 140, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: index === currentSlide ? '#E5C4A0' : 'rgba(217, 176, 140, 0.5)',
                transform: 'scale(1.2)',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DualPanelPresentation;
