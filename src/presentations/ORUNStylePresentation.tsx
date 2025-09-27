import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardContent,
  IconButton,
  Paper,
  Fade,
  LinearProgress,
  Chip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Fullscreen as FullscreenIcon,
  Close as CloseIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

// Declare THREE types for TypeScript
declare global {
  interface Window {
    THREE: any;
  }
}

interface ORUNStylePresentationProps {
  onClose: () => void;
  onOpenDashboard: () => void;
}

interface Slide {
  id: string;
  title: string;
  content: string;
  image?: string;
  duration: number;
}

const ORUNStylePresentation: React.FC<ORUNStylePresentationProps> = ({ onClose, onOpenDashboard }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [globeLoaded, setGlobeLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<any>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const progressRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const slides: Slide[] = [
    {
      id: 'intro',
      title: 'Welcome to MAONO',
      content: 'Revolutionizing Agriculture with AI-Powered Intelligence',
      duration: 5000,
    },
    {
      id: 'globe',
      title: 'Global Agricultural Network',
      content: 'Connecting farmers worldwide through advanced technology',
      duration: 8000,
    },
    {
      id: 'ai',
      title: 'AI-Powered Insights',
      content: 'Machine learning algorithms providing real-time agricultural recommendations',
      duration: 6000,
    },
    {
      id: 'weather',
      title: 'Weather Intelligence',
      content: 'Advanced weather prediction and climate analysis for optimal farming',
      duration: 7000,
    },
    {
      id: 'market',
      title: 'Market Intelligence',
      content: 'Real-time market data and pricing for maximum crop value',
      duration: 6000,
    },
    {
      id: 'community',
      title: 'Global Community',
      content: 'Connect with farmers, experts, and agricultural communities worldwide',
      duration: 5000,
    },
  ];

  // Load Three.js dynamically
  useEffect(() => {
    const loadThreeJS = () => {
      if (window.THREE) {
        setGlobeLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = () => {
        setGlobeLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadThreeJS();
  }, []);

  // Initialize Globe
  useEffect(() => {
    if (!globeLoaded || !containerRef.current) return;

    const initGlobe = () => {
      if (!window.THREE || globeRef.current) return;

      const scene = new window.THREE.Scene();
      const camera = new window.THREE.PerspectiveCamera(75, containerRef.current!.clientWidth / containerRef.current!.clientHeight, 0.1, 1000);
      const renderer = new window.THREE.WebGLRenderer({ antialias: true, alpha: true });
      
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setClearColor(0x000000, 0);
      containerRef.current!.appendChild(renderer.domElement);

      // Create globe
      const geometry = new window.THREE.SphereGeometry(2, 64, 64);
      const material = new window.THREE.MeshPhongMaterial({
        color: 0x116466,
        transparent: true,
        opacity: 0.8,
        wireframe: true,
      });
      const globe = new window.THREE.Mesh(geometry, material);
      scene.add(globe);

      // Add atmosphere
      const atmosphereGeometry = new window.THREE.SphereGeometry(2.1, 64, 64);
      const atmosphereMaterial = new window.THREE.MeshPhongMaterial({
        color: 0x116466,
        transparent: true,
        opacity: 0.1,
      });
      const atmosphere = new window.THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      scene.add(atmosphere);

      // Add lighting
      const ambientLight = new window.THREE.AmbientLight(0x404040, 0.6);
      scene.add(ambientLight);
      const directionalLight = new window.THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);

      // Add data points
      const dataPoints: any[] = [];
      for (let i = 0; i < 100; i++) {
        const phi = Math.acos(-1 + (2 * i) / 100);
        const theta = Math.sqrt(100 * Math.PI) * phi;
        const x = 2.1 * Math.sin(phi) * Math.cos(theta);
        const y = 2.1 * Math.cos(phi);
        const z = 2.1 * Math.sin(phi) * Math.sin(theta);
        
        const pointGeometry = new window.THREE.SphereGeometry(0.02, 8, 8);
        const pointMaterial = new window.THREE.MeshBasicMaterial({ color: 0xD9B08C });
        const point = new window.THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(x, y, z);
        scene.add(point);
        dataPoints.push(point);
      }

      // Animation
      const animate = () => {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.005;
        atmosphere.rotation.y += 0.003;
        dataPoints.forEach((point, index) => {
          point.rotation.y += 0.001 * (index % 3 + 1);
        });
        renderer.render(scene, camera);
      };
      animate();

      globeRef.current = { scene, camera, renderer, globe, atmosphere, dataPoints };
    };

    initGlobe();

    return () => {
      if (globeRef.current && globeRef.current.renderer) {
        containerRef.current?.removeChild(globeRef.current.renderer.domElement);
        globeRef.current.renderer.dispose();
        globeRef.current = null;
      }
    };
  }, [globeLoaded]);

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
      }}
    >
      {/* Header */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          p: 2,
          background: 'rgba(1, 14, 14, 0.8)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(217, 176, 140, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ color: '#D9B08C', fontWeight: 600 }}>
            MAONO Agricultural Intelligence
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

      {/* Main Content */}
      <Box
        sx={{
          display: 'flex',
          height: '100vh',
          pt: 8,
        }}
      >
        {/* Left Side - Content */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            pr: { md: 4 },
            overflowY: 'auto',
            background: 'rgba(44, 53, 49, 0.25)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(217, 176, 140, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(217, 176, 140, 0.1)',
            borderRadius: '16px',
            p: 4,
            m: 2,
          }}
        >
          <Fade in={true} timeout={1000}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  mb: 4,
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
              <Typography
                variant="h5"
                sx={{
                  mb: 6,
                  color: '#D1E8E2',
                  lineHeight: 1.6,
                  fontWeight: 400,
                }}
              >
                {currentSlideData.content}
              </Typography>

              {/* Progress Bar */}
              <Box sx={{ mb: 4 }}>
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
                <Typography variant="caption" sx={{ mt: 1, display: 'block', color: '#D9B08C' }}>
                  Slide {currentSlide + 1} of {slides.length}
                </Typography>
              </Box>

              {/* Controls */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
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
              <Box sx={{ display: 'flex', gap: 2 }}>
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
            </Box>
          </Fade>
        </Box>

        {/* Right Side - Globe */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            background: 'rgba(44, 53, 49, 0.25)',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(217, 176, 140, 0.2)',
            borderRadius: '16px',
            m: 2,
            minHeight: '400px',
          }}
        >
          <Box
            ref={containerRef}
            sx={{
              width: '100%',
              height: '100%',
              minHeight: '400px',
              position: 'relative',
            }}
          />
          {!globeLoaded && (
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <LinearProgress sx={{ mb: 2, width: 200 }} />
              <Typography variant="body2" sx={{ color: '#D9B08C' }}>
                Loading 3D Globe...
              </Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Bottom Navigation */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 2,
          background: 'rgba(1, 14, 14, 0.8)',
          backdropFilter: 'blur(10px)',
          borderTop: '1px solid rgba(217, 176, 140, 0.2)',
        }}
      >
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

export default ORUNStylePresentation;