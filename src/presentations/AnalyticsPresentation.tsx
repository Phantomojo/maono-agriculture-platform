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
  Card,
  CardContent,
  LinearProgress as ProgressBar
} from '@mui/material';
import { 
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  TrendingUp as TrendingIcon,
  Assessment as AnalyticsIcon,
  Nature as EcoIcon
} from '@mui/icons-material';

interface AnalyticsPresentationProps {
  onClose: () => void;
}

const AnalyticsPresentation: React.FC<AnalyticsPresentationProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const slides = [
    {
      title: "AI Analytics Dashboard",
      subtitle: "Data-Driven Farming Decisions",
      content: "Transform your farm data into actionable insights with our AI-powered analytics platform that helps you optimize yields, reduce costs, and increase profitability.",
      icon: "📊",
      color: "#7DD3FC",
      videoPlaceholder: "analytics-dashboard.mp4",
      features: [
        "Real-time performance metrics",
        "Predictive analytics and forecasting",
        "Cost-benefit analysis",
        "ROI optimization insights"
      ]
    },
    {
      title: "Yield Analysis",
      subtitle: "Optimize Your Harvest",
      content: "Analyze historical yield data to identify patterns, optimize planting strategies, and predict future harvests with machine learning models.",
      icon: "🌾",
      color: "#6EE7B7",
      videoPlaceholder: "yield-analysis.mp4",
      features: [
        "Historical yield tracking",
        "Seasonal pattern analysis",
        "Crop rotation optimization",
        "Harvest timing predictions"
      ]
    },
    {
      title: "Resource Optimization",
      subtitle: "Maximize Efficiency",
      content: "Optimize water usage, fertilizer application, and other resources based on data analysis to reduce costs while maintaining or improving yields.",
      icon: "💧",
      color: "#FBBF24",
      videoPlaceholder: "resource-optimization.mp4",
      features: [
        "Water usage optimization",
        "Fertilizer efficiency analysis",
        "Energy consumption tracking",
        "Waste reduction strategies"
      ]
    },
    {
      title: "Market Intelligence",
      subtitle: "Strategic Market Analysis",
      content: "Combine your farm data with market trends to make informed decisions about what to plant, when to sell, and how to maximize profits.",
      icon: "📈",
      color: "#F87171",
      videoPlaceholder: "market-intelligence.mp4",
      features: [
        "Market trend analysis",
        "Price prediction models",
        "Optimal selling timing",
        "Crop selection recommendations"
      ]
    },
    {
      title: "Environmental Impact",
      subtitle: "Sustainable Farming Metrics",
      content: "Track and improve your environmental footprint with detailed sustainability metrics, carbon footprint analysis, and eco-friendly farming recommendations.",
      icon: "🌱",
      color: "#6EE7B7",
      videoPlaceholder: "environmental-impact.mp4",
      features: [
        "Carbon footprint tracking",
        "Soil health monitoring",
        "Biodiversity assessment",
        "Sustainability scoring"
      ]
    },
    {
      title: "Financial Analytics",
      subtitle: "Profitability Insights",
      content: "Detailed financial analysis of your farming operations with cost tracking, revenue optimization, and investment planning tools.",
      icon: "💰",
      color: "#7DD3FC",
      videoPlaceholder: "financial-analytics.mp4",
      features: [
        "Profit and loss analysis",
        "Cost per crop calculations",
        "Investment ROI tracking",
        "Financial planning tools"
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

  // Mock analytics data
  const analyticsData = [
    { metric: "Overall Performance", value: 81, color: "#7DD3FC" },
    { metric: "Yield Increase", value: 12, color: "#6EE7B7" },
    { metric: "Water Efficiency", value: 65, color: "#FBBF24" },
    { metric: "Sustainability Score", value: 94, color: "#6EE7B7" }
  ];

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
              AI Analytics
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
                  icon={<AnalyticsIcon />}
                  label="AI-Powered" 
                  sx={{ 
                    backgroundColor: `${currentSlideData.color}20`,
                    color: currentSlideData.color,
                    border: `1px solid ${currentSlideData.color}40`
                  }} 
                />
                <Chip 
                  icon={<TrendingIcon />}
                  label="Predictive" 
                  sx={{ 
                    backgroundColor: `${currentSlideData.color}20`,
                    color: currentSlideData.color,
                    border: `1px solid ${currentSlideData.color}40`
                  }} 
                />
                <Chip 
                  icon={<EcoIcon />}
                  label="Sustainable" 
                  sx={{ 
                    backgroundColor: `${currentSlideData.color}20`,
                    color: currentSlideData.color,
                    border: `1px solid ${currentSlideData.color}40`
                  }} 
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Side - Video and Analytics Data */}
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
                    Interactive analytics demo
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

              {/* Analytics Metrics */}
              <Grid container spacing={2}>
                {analyticsData.map((metric, index) => (
                  <Grid size={{ xs: 6 }} key={index}>
                    <Card sx={{ 
                      background: 'rgba(15, 20, 25, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <CardContent sx={{ textAlign: 'center', py: 2 }}>
                        <Typography variant="h4" sx={{ 
                          color: metric.color, 
                          fontWeight: 700, 
                          mb: 1 
                        }}>
                          {metric.value}%
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                          {metric.metric}
                        </Typography>
                        <ProgressBar 
                          variant="determinate" 
                          value={metric.value} 
                          sx={{ 
                            height: 4, 
                            borderRadius: 2,
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: metric.color
                            }
                          }} 
                        />
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
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
          {currentSlide === slides.length - 1 ? 'View Analytics' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default AnalyticsPresentation;


