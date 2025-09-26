import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Paper, 
  Grid, 
  IconButton,
  AppBar,
  Toolbar,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { 
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
  Fullscreen as FullscreenIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  TrendingFlat as TrendingFlatIcon,
  Store as StoreIcon,
  LocationOn as LocationIcon,
  Assessment as AnalyticsIcon
} from '@mui/icons-material';

interface MarketIntelligencePresentationProps {
  onClose: () => void;
}

const MarketIntelligencePresentation: React.FC<MarketIntelligencePresentationProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const slides = [
    {
      title: "Smart Marketplace",
      subtitle: "Direct Farmer-to-Buyer Connections",
      content: "Eliminate middlemen and connect directly with buyers through our intelligent marketplace platform that matches supply with demand in real-time.",
      icon: "🏪",
      color: "#7DD3FC",
      videoPlaceholder: "marketplace-demo.mp4",
      features: [
        "Direct farmer-to-buyer connections",
        "Real-time price updates",
        "Quality verification system",
        "Bulk purchasing options"
      ]
    },
    {
      title: "Real-Time Pricing",
      subtitle: "Live Market Intelligence",
      content: "Get instant access to current market prices across multiple markets, with price trends and predictions to help you make informed selling decisions.",
      icon: "📊",
      color: "#6EE7B7",
      videoPlaceholder: "pricing-intelligence.mp4",
      features: [
        "Live price updates from all markets",
        "Price trend analysis",
        "Market comparison tools",
        "Price prediction algorithms"
      ]
    },
    {
      title: "Quality Assurance",
      subtitle: "Verified Standards",
      content: "Our quality verification system ensures buyers get exactly what they pay for, while helping farmers maintain high standards and build reputation.",
      icon: "✅",
      color: "#FBBF24",
      videoPlaceholder: "quality-assurance.mp4",
      features: [
        "Photo-based quality verification",
        "Buyer rating system",
        "Quality certification process",
        "Reputation building tools"
      ]
    },
    {
      title: "Logistics Coordination",
      subtitle: "Seamless Delivery",
      content: "Coordinate transportation and delivery through our integrated logistics system that connects farmers with reliable transport providers.",
      icon: "🚚",
      color: "#F87171",
      videoPlaceholder: "logistics-demo.mp4",
      features: [
        "Transport provider network",
        "Delivery tracking system",
        "Cost optimization",
        "Route planning algorithms"
      ]
    },
    {
      title: "Market Analytics",
      subtitle: "Data-Driven Insights",
      content: "Access comprehensive market analytics to understand demand patterns, seasonal trends, and optimal selling strategies for your crops.",
      icon: "📈",
      color: "#7DD3FC",
      videoPlaceholder: "market-analytics.mp4",
      features: [
        "Demand pattern analysis",
        "Seasonal trend identification",
        "Optimal selling timing",
        "Market opportunity alerts"
      ]
    },
    {
      title: "Financial Integration",
      subtitle: "Seamless Payments",
      content: "Integrated payment processing with escrow services, insurance options, and financial tools to make transactions safe and efficient.",
      icon: "💳",
      color: "#6EE7B7",
      videoPlaceholder: "payment-integration.mp4",
      features: [
        "Secure payment processing",
        "Escrow services",
        "Insurance options",
        "Financial transaction history"
      ]
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const currentSlideData = slides[currentSlide];
  const progress = ((currentSlide + 1) / slides.length) * 100;

  // Mock market data for demonstration
  const marketData = [
    { market: "Nairobi Market", crop: "Maize", price: 44.74, change: -0.9, trend: "down" },
    { market: "Karatina Market", crop: "Wheat", price: 37.59, change: -0.6, trend: "down" },
    { market: "Mwea Rice Scheme", crop: "Rice", price: 51.86, change: 1.0, trend: "up" }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <TrendingUpIcon sx={{ color: '#6EE7B7' }} /> : 
           trend === 'down' ? <TrendingDownIcon sx={{ color: '#F87171' }} /> : 
           <TrendingFlatIcon sx={{ color: '#FBBF24' }} />;
  };

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
      {/* Header */}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: 'rgba(10, 13, 15, 0.9)', backdropFilter: 'blur(20px)' }}>
        <Toolbar sx={{ py: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <Box sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
              boxShadow: '0 4px 16px rgba(125, 211, 252, 0.3)'
            }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.2rem' }}>M</Typography>
            </Box>
            <Typography variant="h5" sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em'
            }}>
              Market Intelligence
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {currentSlide + 1} of {slides.length}
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ 
                width: 100, 
                height: 4, 
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)'
                }
              }} 
            />
            <IconButton onClick={togglePlay} sx={{ color: 'primary.main' }}>
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </IconButton>
            <IconButton onClick={toggleMute} sx={{ color: 'text.secondary' }}>
              {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
            </IconButton>
            <IconButton onClick={onClose} sx={{ color: 'text.secondary' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ flex: 1, display: 'flex', flexDirection: 'column', py: 4 }}>
        <Grid container spacing={4} sx={{ flex: 1 }}>
          {/* Left Side - Content */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center',
              pr: { md: 4 }
            }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h1" sx={{ 
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${currentSlideData.color} 0%, #FFFFFF 100%)`,
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 2
                }}>
                  {currentSlideData.title}
                </Typography>
                <Typography variant="h4" sx={{ 
                  color: 'text.secondary',
                  fontWeight: 400,
                  mb: 3
                }}>
                  {currentSlideData.subtitle}
                </Typography>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="body1" sx={{ 
                  color: 'text.primary', 
                  lineHeight: 1.6,
                  fontSize: '1.1rem',
                  mb: 3
                }}>
                  {currentSlideData.content}
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {currentSlideData.features.map((feature, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <CheckIcon sx={{ color: currentSlideData.color, mt: 0.5, fontSize: 20 }} />
                      <Typography variant="body1" sx={{ color: 'text.primary', lineHeight: 1.6 }}>
                        {feature}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip 
                  icon={<StoreIcon />}
                  label="Direct Sales" 
                  sx={{ 
                    backgroundColor: `${currentSlideData.color}20`,
                    color: currentSlideData.color,
                    border: `1px solid ${currentSlideData.color}40`
                  }} 
                />
                <Chip 
                  icon={<MoneyIcon />}
                  label="Real-Time Pricing" 
                  sx={{ 
                    backgroundColor: `${currentSlideData.color}20`,
                    color: currentSlideData.color,
                    border: `1px solid ${currentSlideData.color}40`
                  }} 
                />
                <Chip 
                  icon={<AnalyticsIcon />}
                  label="Market Analytics" 
                  sx={{ 
                    backgroundColor: `${currentSlideData.color}20`,
                    color: currentSlideData.color,
                    border: `1px solid ${currentSlideData.color}40`
                  }} 
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Video and Market Data */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              gap: 2
            }}>
              {/* Video Placeholder */}
              <Paper sx={{
                flex: 1,
                background: 'rgba(15, 20, 25, 0.8)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, ${currentSlideData.color}20 0%, transparent 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column'
                }}>
                  <Typography variant="h1" sx={{ fontSize: '4rem', mb: 2 }}>
                    {currentSlideData.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Video: {currentSlideData.videoPlaceholder}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
                    Interactive market demo
                  </Typography>
                </Box>

                <IconButton 
                  onClick={togglePlay}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 80,
                    height: 80,
                    backgroundColor: `${currentSlideData.color}40`,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: `${currentSlideData.color}60`,
                      transform: 'translate(-50%, -50%) scale(1.1)'
                    }
                  }}
                >
                  {isPlaying ? <PauseIcon sx={{ fontSize: 40 }} /> : <PlayIcon sx={{ fontSize: 40 }} />}
                </IconButton>
              </Paper>

              {/* Market Data Table */}
              <Paper sx={{ 
                background: 'rgba(15, 20, 25, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 2
              }}>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Market</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Crop</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Price</TableCell>
                        <TableCell sx={{ color: 'text.primary', fontWeight: 600 }}>Change</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {marketData.map((row, index) => (
                        <TableRow key={index}>
                          <TableCell sx={{ color: 'text.primary' }}>{row.market}</TableCell>
                          <TableCell sx={{ color: 'text.primary' }}>{row.crop}</TableCell>
                          <TableCell sx={{ color: 'text.primary' }}>KES {row.price}</TableCell>
                          <TableCell sx={{ 
                            color: row.trend === 'up' ? '#6EE7B7' : row.trend === 'down' ? '#F87171' : '#FBBF24',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}>
                            {getTrendIcon(row.trend)}
                            {row.change > 0 ? '+' : ''}{row.change}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Navigation */}
      <Box sx={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        backgroundColor: 'rgba(15, 20, 25, 0.8)',
        backdropFilter: 'blur(20px)',
        borderRadius: 3,
        padding: '12px 24px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <Button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          variant="outlined"
          sx={{ 
            borderColor: 'primary.main',
            color: 'primary.main',
            '&:hover': { backgroundColor: 'rgba(125, 211, 252, 0.1)' }
          }}
        >
          Previous
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </Box>
        
        <Button 
          onClick={nextSlide} 
          disabled={currentSlide === slides.length - 1}
          variant="contained"
          sx={{ 
            background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
            '&:hover': { background: 'linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)' }
          }}
        >
          {currentSlide === slides.length - 1 ? 'Explore Markets' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default MarketIntelligencePresentation;


