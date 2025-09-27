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
  videoUrl?: string;
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
      videoUrl: '/videos/agricultural-challenges.mp4',
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
      videoUrl: '/videos/impact-stories.mp4',
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

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying) {
      const slide = slides[currentSlide];
      const duration = slide.duration;
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
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  }, [isPlaying, currentSlide]);

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
      setIsPlaying(false);
      setCurrentSlide(0);
      setProgress(0);
    }
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
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton onClick={handleFullscreen} sx={{ color: '#D1E8E2' }}>
              <FullscreenIcon />
            </IconButton>
            <IconButton onClick={onClose} sx={{ color: '#D1E8E2' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Main Content - Dual Panel Layout */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          height: 'calc(100vh - 140px)',
          overflow: 'hidden',
        }}
      >
        {/* Left Panel - Text Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            p: 3,
            overflowY: 'auto',
            background: 'rgba(44, 53, 49, 0.25)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(217, 176, 140, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 176, 140, 0.1)',
            borderRadius: '16px',
            m: 2,
            mr: 1,
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
            </Box>
          </Fade>
        </Box>

        {/* Right Panel - Video */}
        <Box
          sx={{
            flex: 1,
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
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              onEnded={() => {
                if (currentSlide < slides.length - 1) {
                  handleNextSlide();
                }
              }}
            >
              <source src={currentSlideData.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay Controls */}
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

            {/* Video Controls */}
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
          </Box>

          {/* Video Info */}
          <Box sx={{ mt: 2, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#D9B08C', fontWeight: 600 }}>
              {currentSlideData.title} - Video Presentation
            </Typography>
            <Typography variant="caption" sx={{ color: '#8A9B9B' }}>
              Click to play/pause • Use controls for volume and picture-in-picture
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Bottom Controls */}
      <Box
        sx={{
          p: 2,
          background: 'rgba(1, 14, 14, 0.9)',
          backdropFilter: 'blur(15px)',
          borderTop: '1px solid rgba(217, 176, 140, 0.2)',
        }}
      >
        {/* Progress Bar */}
        <Box sx={{ mb: 2 }}>
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 8,
              borderRadius: 4,
              backgroundColor: 'rgba(44, 53, 49, 0.5)',
              '& .MuiLinearProgress-bar': {
                backgroundColor: '#D9B08C',
                borderRadius: 4,
              },
            }}
          />
          <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#D9B08C', textAlign: 'center' }}>
            Slide {currentSlide + 1} of {slides.length} • {Math.round(progress)}% Complete
          </Typography>
        </Box>

        {/* Controls */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="contained"
            startIcon={isPlaying ? <PauseIcon /> : <PlayIcon />}
            onClick={isPlaying ? handlePause : handlePlay}
            sx={{
              backgroundColor: '#D9B08C',
              color: '#010E0E',
              '&:hover': {
                backgroundColor: '#E5C4A0',
              },
            }}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            variant="outlined"
            startIcon={<StopIcon />}
            onClick={handleStop}
            sx={{
              borderColor: '#116466',
              color: '#D1E8E2',
              '&:hover': {
                borderColor: '#2A7A7C',
                backgroundColor: 'rgba(17, 100, 102, 0.1)',
              },
            }}
          >
            Stop
          </Button>
        </Box>

        {/* Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handlePrevSlide}
            disabled={currentSlide === 0}
            sx={{
              borderColor: '#116466',
              color: '#D1E8E2',
              '&:hover': {
                borderColor: '#2A7A7C',
                backgroundColor: 'rgba(17, 100, 102, 0.1)',
              },
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleNextSlide}
            disabled={currentSlide === slides.length - 1}
            sx={{
              backgroundColor: '#D9B08C',
              color: '#010E0E',
              '&:hover': {
                backgroundColor: '#E5C4A0',
              },
            }}
          >
            Next
          </Button>
        </Box>

        {/* Slide Navigation */}
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
          {slides.map((_, index) => (
            <Chip
              key={index}
              label={index + 1}
              size="small"
              onClick={() => {
                setCurrentSlide(index);
                setProgress(0);
              }}
              sx={{
                backgroundColor: index === currentSlide ? '#D9B08C' : 'rgba(44, 53, 49, 0.5)',
                color: index === currentSlide ? '#010E0E' : '#D1E8E2',
                '&:hover': {
                  backgroundColor: index === currentSlide ? '#E5C4A0' : 'rgba(17, 100, 102, 0.3)',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DualPanelPresentation;
