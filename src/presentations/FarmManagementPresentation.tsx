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
  CardContent
} from '@mui/material';
import { 
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeOff as VolumeOffIcon,
  VolumeUp as VolumeUpIcon,
  Close as CloseIcon,
  CheckCircle as CheckIcon,
  Agriculture as AgricultureIcon,
  Nature as EcoIcon,
  Assessment as AnalyticsIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

interface FarmManagementPresentationProps {
  onClose: () => void;
}

const FarmManagementPresentation: React.FC<FarmManagementPresentationProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const slides = [
    {
      title: "Farm Management Hub",
      subtitle: "Complete Farm Operations Control",
      content: "Manage all aspects of your farming operations from a single platform - from crop planning to harvest tracking, with AI-powered insights for optimal decision making.",
      icon: "🚜",
      color: "#7DD3FC",
      videoPlaceholder: "farm-management-demo.mp4",
      features: [
        "Multi-farm management system",
        "Crop and livestock tracking",
        "Resource optimization",
        "Performance analytics"
      ]
    },
    {
      title: "Crop Health Monitoring",
      subtitle: "AI-Powered Disease Detection",
      content: "Use your smartphone camera to identify crop diseases, pest infestations, and nutrient deficiencies with our advanced AI image recognition system.",
      icon: "🔍",
      color: "#6EE7B7",
      videoPlaceholder: "crop-health-demo.mp4",
      features: [
        "Photo-based disease identification",
        "Pest detection and treatment",
        "Nutrient deficiency analysis",
        "Treatment recommendations"
      ]
    },
    {
      title: "Yield Prediction",
      subtitle: "AI Forecasting Models",
      content: "Get accurate yield predictions using machine learning models that analyze weather patterns, soil conditions, and historical data.",
      icon: "📊",
      color: "#FBBF24",
      videoPlaceholder: "yield-prediction.mp4",
      features: [
        "Machine learning yield models",
        "Weather impact analysis",
        "Soil condition assessment",
        "Harvest timing optimization"
      ]
    },
    {
      title: "Resource Management",
      subtitle: "Optimize Water and Fertilizer",
      content: "Smart resource allocation based on crop needs, weather conditions, and soil analysis to maximize efficiency and minimize waste.",
      icon: "💧",
      color: "#F87171",
      videoPlaceholder: "resource-management.mp4",
      features: [
        "Water usage optimization",
        "Fertilizer scheduling",
        "Soil moisture monitoring",
        "Cost reduction strategies"
      ]
    },
    {
      title: "Financial Tracking",
      subtitle: "Farm Economics Dashboard",
      content: "Track all farm expenses, income, and profitability with detailed financial analytics and cost-benefit analysis for each crop.",
      icon: "💰",
      color: "#7DD3FC",
      videoPlaceholder: "financial-tracking.mp4",
      features: [
        "Expense tracking and categorization",
        "Income and profit analysis",
        "Cost per crop calculations",
        "ROI optimization insights"
      ]
    },
    {
      title: "Community Network",
      subtitle: "Connect with Fellow Farmers",
      content: "Join a network of farmers to share knowledge, best practices, and collaborate on farming techniques and market opportunities.",
      icon: "🤝",
      color: "#6EE7B7",
      videoPlaceholder: "community-network.mp4",
      features: [
        "Farmer community platform",
        "Knowledge sharing forums",
        "Best practice recommendations",
        "Collaborative farming opportunities"
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

  // Mock farm data for demonstration
  const farmData = [
    { name: "Main Farm", area: "5.2 acres", crops: ["Maize", "Beans"], status: "Active" },
    { name: "Vegetable Plot", area: "1.8 acres", crops: ["Tomatoes", "Onions"], status: "Harvesting" },
    { name: "Livestock Area", area: "2.0 acres", crops: ["Pasture"], status: "Grazing" }
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
              Farm Management
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
                  icon={<AgricultureIcon />}
                  label="Multi-Farm" 
                  sx={{ 
                    backgroundColor: `${currentSlideData.color}20`,
                    color: currentSlideData.color,
                    border: `1px solid ${currentSlideData.color}40`
                  }} 
                />
                <Chip 
                  icon={<AnalyticsIcon />}
                  label="AI Analytics" 
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

          {/* Right Side - Video and Farm Data */}
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
                    Interactive farm management demo
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

              {/* Farm Data Cards */}
              <Grid container spacing={2}>
                {farmData.map((farm, index) => (
                  <Grid size={{ xs: 12 }} key={index}>
                    <Card sx={{ 
                      background: 'rgba(15, 20, 25, 0.6)',
                      border: '1px solid rgba(255, 255, 255, 0.1)'
                    }}>
                      <CardContent sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
                            {farm.name}
                          </Typography>
                          <Chip 
                            label={farm.status} 
                            size="small"
                            sx={{ 
                              backgroundColor: farm.status === 'Active' ? '#6EE7B7' : '#FBBF24',
                              color: 'white'
                            }}
                          />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <LocationIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {farm.area}
                          </Typography>
                        </Box>
                        <Typography variant="body2" sx={{ color: 'text.primary' }}>
                          Crops: {farm.crops.join(', ')}
                        </Typography>
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
          {currentSlide === slides.length - 1 ? 'Manage Farms' : 'Next'}
        </Button>
      </Box>
    </Box>
  );
};

export default FarmManagementPresentation;


