import React, { useState, useEffect, useRef } from 'react';
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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Fade,
  Slide,
  Zoom
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
  Nature as EcoIcon,
  Public as GlobeIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';

interface ORUNStylePresentationProps {
  onClose: () => void;
  onOpenDashboard?: () => void;
}

const ORUNStylePresentation: React.FC<ORUNStylePresentationProps> = ({ onClose, onOpenDashboard }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 'hero',
      title: 'MAONO',
      subtitle: 'The Future of African Agriculture',
      description: 'MAONO is revolutionizing African agriculture through cutting-edge AI technology, real-time data analytics, and smart automation. We empower farmers with intelligent tools that predict weather patterns, optimize crop yields, and connect them to profitable markets — transforming subsistence farming into sustainable, data-driven agriculture.',
      icon: '🌱',
      color: '#7DD3FC',
      background: 'linear-gradient(135deg, #0A0D0F 0%, #1A1F2E 50%, #0A0D0F 100%)',
      videoPlaceholder: 'hero-video.mp4',
      features: [
        '🤖 Offline AI weather predictions (7-14 days ahead)',
        '📊 Real-time market intelligence and pricing', 
        '🌍 Smart marketplace connecting farmers to buyers',
        '📱 Mobile-first design for rural accessibility',
        '🌾 Sustainable farming optimization algorithms',
        '🤝 Community knowledge sharing platform'
      ]
    },
    {
      id: 'problem',
      title: 'The Crisis',
      subtitle: 'African Agriculture at a Crossroads',
      description: 'African agriculture faces a perfect storm of challenges: climate change, market inefficiencies, and lack of access to technology. Smallholder farmers, who produce 80% of Africa\'s food, are trapped in cycles of poverty due to unpredictable weather, poor market access, and limited information. This isn\'t just an agricultural problem — it\'s a food security crisis affecting 1.3 billion people.',
      icon: '⚠️',
      color: '#F87171',
      background: 'linear-gradient(135deg, #1A0F0F 0%, #2E1A1A 50%, #1A0F0F 100%)',
      videoPlaceholder: 'problem-video.mp4',
      stats: [
        { label: 'Crop Losses', value: '60%', description: 'Due to weather unpredictability and climate change' },
        { label: 'Post-Harvest Loss', value: '40%', description: 'Annual food waste worth $4 billion' },
        { label: 'Market Access', value: '30%', description: 'Cost increase due to middlemen and inefficiencies' },
        { label: 'Poverty Rate', value: '70%', description: 'Of African farmers live below poverty line' },
        { label: 'Food Security', value: '250M', description: 'People facing hunger in Africa' },
        { label: 'Technology Gap', value: '90%', description: 'Of farmers lack access to modern agricultural tools' }
      ]
    },
    {
      id: 'solution',
      title: 'The MAONO Revolution',
      subtitle: 'AI-Powered Agricultural Intelligence Platform',
      description: 'MAONO is the world\'s first offline-capable agricultural AI platform designed specifically for African farmers. Our revolutionary technology works primarily offline, using pre-downloaded data and local sensors to provide 7-14 day weather predictions, cached market intelligence, and smart farming recommendations. When connectivity is available, we sync the latest data. We\'re not just building an app — we\'re creating a complete ecosystem that transforms how African agriculture operates.',
      icon: '🤖',
      color: '#6EE7B7',
      background: 'linear-gradient(135deg, #0F1A0F 0%, #1A2E1A 50%, #0F1A0F 100%)',
      videoPlaceholder: 'solution-video.mp4',
      features: [
        '🌦️ Offline AI weather predictions (7-14 days ahead)',
        '📊 Cached market intelligence with periodic sync',
        '🌍 Smart marketplace connecting farmers directly to buyers',
        '📱 Mobile-first design optimized for rural connectivity',
        '🤝 Community knowledge sharing and peer learning platform',
        '🌾 Data-driven crop optimization and yield maximization',
        '💰 Micro-finance integration for equipment and inputs',
        '🎓 Digital agricultural education and training modules'
      ]
    },
    {
      id: 'technology',
      title: 'Revolutionary Technology',
      subtitle: 'World\'s First Offline Agricultural AI',
      description: 'MAONO\'s proprietary technology represents a breakthrough in agricultural AI. Our offline-capable AI engine uses pre-downloaded satellite data, historical weather patterns, and local soil conditions to provide accurate predictions without internet connectivity. When connectivity is available, we sync the latest data. This isn\'t just innovation — it\'s a technological revolution that brings first-world agricultural intelligence to every African farmer.',
      icon: '⚡',
      color: '#7DD3FC',
      background: 'linear-gradient(135deg, #0F0F1A 0%, #1A1A2E 50%, #0F0F1A 100%)',
      videoPlaceholder: 'technology-video.mp4',
      techStack: [
        { name: 'Offline AI Engine', description: 'Works without internet using pre-downloaded data and edge computing', accuracy: '95%' },
        { name: 'Weather Prediction', description: '7-14 day forecasts using historical patterns and local sensors', coverage: '100%' },
        { name: 'Market Intelligence', description: 'Cached pricing data with periodic sync when connected', security: 'Enterprise-grade' },
        { name: 'Mobile Optimization', description: 'Works on basic smartphones with minimal connectivity', accessibility: '95%' },
        { name: 'Data Sync Strategy', description: 'Smart sync when connectivity available, offline-first design', coverage: '100%' },
        { name: 'Blockchain Marketplace', description: 'Secure transactions with offline queuing and sync', security: 'Enterprise-grade' }
      ]
    },
    {
      id: 'market',
      title: 'Massive Market Opportunity',
      subtitle: '$200B African Agriculture Revolution',
      description: 'Africa\'s agricultural sector is the world\'s largest untapped market, worth $200 billion and growing at 15% annually. With 60% of Africa\'s 1.3 billion people working in agriculture, and smartphone penetration reaching 80%, the timing is perfect for a digital agricultural revolution. We\'re not just entering a market — we\'re creating a new category.',
      icon: '💰',
      color: '#FBBF24',
      background: 'linear-gradient(135deg, #1A1A0F 0%, #2E2E1A 50%, #1A1A0F 100%)',
      videoPlaceholder: 'market-video.mp4',
      marketData: [
        { metric: 'Market Size', value: '$200B', description: 'African agriculture market (growing 15% annually)' },
        { metric: 'Workforce', value: '60%', description: 'Of African population (780M people) in agriculture' },
        { metric: 'Mobile Penetration', value: '80%', description: 'Smartphone adoption rate across Africa' },
        { metric: 'Population Growth', value: '1.3B', description: 'By 2050 (doubling current population)' },
        { metric: 'Food Demand', value: '300%', description: 'Increase in food demand by 2050' },
        { metric: 'Digital Gap', value: '90%', description: 'Of farmers lack access to digital tools' }
      ]
    },
    {
      id: 'competitive',
      title: 'Competitive Advantage',
      subtitle: 'Unassailable Market Position',
      description: 'MAONO\'s first-mover advantage, deep market understanding, and proprietary technology create an unassailable competitive moat.',
      icon: '🏆',
      color: '#7DD3FC',
      background: 'linear-gradient(135deg, #0F1A1A 0%, #1A2E2E 50%, #0F1A1A 100%)',
      videoPlaceholder: 'competitive-video.mp4',
      advantages: [
        '🥇 First offline AI weather system in Africa (patent-pending)',
        '🌍 Deep African market expertise and cultural localization',
        '👨‍🌾 Farmer-centric design approach (built by farmers, for farmers)',
        '🤖 Proprietary AI algorithms and proprietary data sets',
        '📱 Mobile-first architecture optimized for rural connectivity',
        '🤝 Community-driven platform with network effects',
        '🛡️ Patent-pending offline AI technology',
        '📊 Exclusive partnerships with African agricultural organizations'
      ]
    },
    {
      id: 'impact',
      title: 'Massive Impact Potential',
      subtitle: 'Transforming Lives & Communities',
      description: 'MAONO\'s impact extends far beyond individual farmers, creating ripple effects that transform entire communities and economies.',
      icon: '📈',
      color: '#6EE7B7',
      background: 'linear-gradient(135deg, #0F1A0F 0%, #1A2E1A 50%, #0F1A0F 100%)',
      videoPlaceholder: 'impact-video.mp4',
      impactMetrics: [
        { metric: 'Yield Increase', value: '30%', description: 'Average crop yield improvement across all crops' },
        { metric: 'Loss Reduction', value: '50%', description: 'Reduction in post-harvest losses (saving $2B annually)' },
        { metric: 'Income Growth', value: '40%', description: 'Average farmer income increase in first year' },
        { metric: 'Food Security', value: '25%', description: 'Improvement in food security for 100M people' },
        { metric: 'Climate Resilience', value: '60%', description: 'Reduction in climate-related crop losses' },
        { metric: 'Market Access', value: '80%', description: 'Increase in direct farmer-to-buyer connections' }
      ]
    },
    {
      id: 'business',
      title: 'Scalable Business Model',
      subtitle: 'Multiple Revenue Streams for Sustainable Growth',
      description: 'MAONO\'s revenue model is designed for sustainability and massive scale, with multiple revenue streams that grow with user adoption. We\'re not just building a product — we\'re creating an entire agricultural ecosystem that generates value for all stakeholders while solving Africa\'s food security crisis.',
      icon: '💼',
      color: '#FBBF24',
      background: 'linear-gradient(135deg, #1A1A0F 0%, #2E2E1A 50%, #1A1A0F 100%)',
      videoPlaceholder: 'business-video.mp4',
      revenueStreams: [
        { source: 'Marketplace Fees', rate: '2-3%', description: 'From all farmer-to-buyer transactions' },
        { source: 'Premium Subscriptions', rate: '$5-20/month', description: 'Advanced analytics and AI insights' },
        { source: 'Financial Services', rate: '10-15%', description: 'Micro-loans, insurance, and credit services' },
        { source: 'Data Licensing', rate: '$1M+', description: 'Anonymized agricultural data to research institutions' },
        { source: 'Equipment Sales', rate: '20-30%', description: 'Commission from agricultural equipment marketplace' },
        { source: 'Government Contracts', rate: '$10M+', description: 'National agricultural digitization programs' }
      ]
    },
    {
      id: 'traction',
      title: 'Proven Market Traction',
      subtitle: 'Validated Demand & Rapid User Adoption',
      description: 'MAONO has demonstrated exceptional market traction with early adopters, validating our solution and proving massive demand. Our user growth, satisfaction rates, and retention metrics demonstrate that we\'ve built something farmers truly need and love.',
      icon: '📊',
      color: '#6EE7B7',
      background: 'linear-gradient(135deg, #0F1A0F 0%, #1A2E1A 50%, #0F1A0F 100%)',
      videoPlaceholder: 'traction-video.mp4',
      tractionData: [
        { metric: 'Early Users', value: '50,000+', description: 'Beta users across 5 African countries' },
        { metric: 'Satisfaction', value: '4.9/5', description: 'User satisfaction rating (highest in agtech)' },
        { metric: 'Growth Rate', value: '400%', description: 'Month-over-month user growth' },
        { metric: 'Retention', value: '98%', description: 'User retention rate (industry-leading)' },
        { metric: 'Revenue Growth', value: '500%', description: 'Year-over-year revenue growth' },
        { metric: 'Market Validation', value: '95%', description: 'Of users would recommend MAONO to other farmers' }
      ]
    },
    {
      id: 'investment',
      title: 'Exceptional Investment Opportunity',
      subtitle: 'Join the $200B African Agricultural Revolution',
      description: 'MAONO represents a once-in-a-generation investment opportunity in the rapidly growing agricultural technology sector. We\'re not just building a company — we\'re creating the infrastructure for Africa\'s agricultural future, with the potential to transform the lives of 780 million farmers and solve global food security challenges.',
      icon: '🚀',
      color: '#F87171',
      background: 'linear-gradient(135deg, #1A0F0F 0%, #2E1A1A 50%, #1A0F0F 100%)',
      videoPlaceholder: 'investment-video.mp4',
      investmentData: [
        { metric: 'Series A', value: '$5M', description: 'Seeking funding for rapid expansion' },
        { metric: 'Projected ARR', value: '$100M', description: 'By 2027 (conservative estimate)' },
        { metric: 'Market Expansion', value: '15+', description: 'African countries by 2025' },
        { metric: 'Team Growth', value: '50+', description: 'Agricultural and tech experts' },
        { metric: 'ROI Potential', value: '10x+', description: 'Conservative return on investment' },
        { metric: 'Exit Strategy', value: 'IPO/Strategic', description: 'Multiple exit opportunities by 2030' }
      ]
    },
    {
      id: 'dashboard',
      title: 'Welcome to MAONO',
      subtitle: 'Your Agricultural Intelligence Platform',
      description: 'You\'ve seen the vision. Now experience the reality. Access your personalized agricultural intelligence dashboard and start transforming your farming operations.',
      icon: '🚀',
      color: '#7DD3FC',
      background: 'linear-gradient(135deg, #0A0D0F 0%, #1A1F2E 50%, #0A0D0F 100%)',
      videoPlaceholder: 'dashboard-demo.mp4',
      dashboardFeatures: [
        '🌦️ Real-time weather intelligence',
        '📊 Market price analytics',
        '🚜 Farm management tools',
        '📱 Mobile-first experience',
        '🤖 AI-powered insights',
        '🌍 Global agricultural network'
      ]
    }
  ];

  // Loading screen simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

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

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Touch navigation functions
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

    if (isLeftSwipe && currentSlide < slides.length - 1) {
      nextSlide();
    }
    if (isRightSwipe && currentSlide > 0) {
      prevSlide();
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

  // Loading screen
  if (isLoading) {
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
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}>
        <Box sx={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 4,
          animation: 'pulse 2s infinite'
        }}>
          <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '2rem' }}>M</Typography>
        </Box>
        
        <Typography variant="h3" sx={{ 
          color: 'white',
          fontWeight: 700,
          mb: 2,
          background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          MAONO
        </Typography>
        
        <Typography variant="h6" sx={{ color: 'text.secondary', mb: 4 }}>
          Initializing Agricultural Intelligence...
        </Typography>
        
        <LinearProgress 
          sx={{ 
            width: 300, 
            height: 4, 
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '& .MuiLinearProgress-bar': {
              background: 'linear-gradient(135deg, #7DD3FC 0%, #6EE7B7 100%)'
            }
          }} 
        />
      </Box>
    );
  }

  return (
    <Box 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: currentSlideData.background,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
      {/* Navigation Dots - Hidden on mobile, shown on desktop */}
      <Box sx={{
        position: 'absolute',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        gap: 1,
        zIndex: 10
      }}>
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: index === currentSlide ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: index === currentSlide ? 'primary.main' : 'rgba(255, 255, 255, 0.6)',
                transform: 'scale(1.2)'
              }
            }}
          />
        ))}
      </Box>

      {/* Slide Counter */}
      <Box sx={{
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: 'white',
        padding: '8px 16px',
        borderRadius: 2,
        fontSize: '0.9rem',
        fontWeight: 600
      }}>
        {currentSlide + 1} / {slides.length}
      </Box>

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
              pr: { md: 4 },
              overflowY: 'auto',
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: currentSlideData.color,
                borderRadius: '3px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: currentSlideData.color + 'CC',
              }
            }}>
              <Fade in timeout={1000}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h1" sx={{ 
                    fontSize: { xs: '2.5rem', md: '4rem' },
                    fontWeight: 800,
                    background: `linear-gradient(135deg, ${currentSlideData.color} 0%, #FFFFFF 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                    lineHeight: 1.1
                  }}>
                    {currentSlideData.title}
                  </Typography>
                  <Typography variant="h4" sx={{ 
                    color: 'text.secondary',
                    fontWeight: 400,
                    mb: 3,
                    fontSize: { xs: '1.5rem', md: '2rem' }
                  }}>
                    {currentSlideData.subtitle}
                  </Typography>
                </Box>
              </Fade>

              <Fade in timeout={1500}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="body1" sx={{ 
                    color: 'text.primary', 
                    lineHeight: 1.6,
                    fontSize: '1.2rem',
                    mb: 3
                  }}>
                    {currentSlideData.description}
                  </Typography>

                  {/* Dynamic content based on slide type */}
                  {currentSlideData.features && (
                    <Box sx={{ 
                      maxHeight: '300px', 
                      overflowY: 'auto',
                      mb: 3,
                      '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '3px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: currentSlideData.color,
                        borderRadius: '3px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: currentSlideData.color + 'CC',
                      }
                    }}>
                      <List>
                        {currentSlideData.features.map((feature, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ color: currentSlideData.color, minWidth: 40 }}>
                              <CheckIcon />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature}
                              sx={{ 
                                '& .MuiListItemText-primary': {
                                  color: 'text.primary',
                                  fontSize: '1.1rem',
                                  lineHeight: 1.5
                                }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {currentSlideData.dashboardFeatures && (
                    <Box sx={{ 
                      maxHeight: '300px', 
                      overflowY: 'auto',
                      mb: 3,
                      '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '3px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: currentSlideData.color,
                        borderRadius: '3px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: currentSlideData.color + 'CC',
                      }
                    }}>
                      <List>
                        {currentSlideData.dashboardFeatures.map((feature, index) => (
                          <ListItem key={index} sx={{ px: 0, py: 1 }}>
                            <ListItemIcon sx={{ color: currentSlideData.color, minWidth: 40 }}>
                              <CheckIcon />
                            </ListItemIcon>
                            <ListItemText 
                              primary={feature}
                              sx={{ 
                                '& .MuiListItemText-primary': {
                                  color: 'text.primary',
                                  fontSize: '1.1rem',
                                  lineHeight: 1.5
                                }
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}

                  {currentSlideData.stats && (
                    <Box sx={{ 
                      maxHeight: '400px', 
                      overflowY: 'auto',
                      mb: 3,
                      '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-track': {
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '3px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background: currentSlideData.color,
                        borderRadius: '3px',
                      },
                      '&::-webkit-scrollbar-thumb:hover': {
                        background: currentSlideData.color + 'CC',
                      }
                    }}>
                      <Grid container spacing={2}>
                        {currentSlideData.stats.map((stat, index) => (
                          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Card sx={{ 
                              background: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid rgba(255, 255, 255, 0.2)',
                              textAlign: 'center',
                              p: 2
                            }}>
                              <Typography variant="h3" sx={{ 
                                color: currentSlideData.color, 
                                fontWeight: 700, 
                                mb: 1 
                              }}>
                                {stat.value}
                              </Typography>
                              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                                {stat.label}
                              </Typography>
                              <Typography variant="caption" sx={{ color: 'text.primary' }}>
                                {stat.description}
                              </Typography>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}

                  {/* Dashboard Call-to-Action Buttons */}
                  {currentSlideData.id === 'dashboard' && (
                    <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap', mt: 4 }}>
                      <Button
                        variant="contained"
                        size="large"
                        onClick={onOpenDashboard}
                        sx={{
                          background: 'linear-gradient(45deg, #7DD3FC, #6EE7B7)',
                          color: 'white',
                          px: 4,
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          '&:hover': {
                            background: 'linear-gradient(45deg, #6EE7B7, #7DD3FC)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 8px 25px rgba(125, 211, 252, 0.4)'
                          }
                        }}
                      >
                        Open Dashboard
                      </Button>
                      
                      <Button
                        variant="outlined"
                        size="large"
                        onClick={onClose}
                        sx={{
                          borderColor: 'primary.main',
                          color: 'primary.main',
                          px: 4,
                          py: 2,
                          fontSize: '1.1rem',
                          fontWeight: 600,
                          '&:hover': {
                            backgroundColor: 'rgba(125, 211, 252, 0.1)',
                            borderColor: 'primary.light'
                          }
                        }}
                      >
                        Explore Platform
                      </Button>
                    </Box>
                  )}
                </Box>
              </Fade>
            </Box>
          </Grid>

          {/* Right Side - Video and Visual Elements */}
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
                background: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(20px)',
                border: '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
                minHeight: { xs: '200px', md: '400px' }
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
                  <Typography variant="h1" sx={{ fontSize: '6rem', mb: 2 }}>
                    {currentSlideData.icon}
                  </Typography>
                  <Typography variant="h6" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                    Video: {currentSlideData.videoPlaceholder}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1, textAlign: 'center' }}>
                    Interactive demonstration
                  </Typography>
                </Box>

                <IconButton 
                  onClick={togglePlay}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 100,
                    height: 100,
                    backgroundColor: `${currentSlideData.color}40`,
                    color: 'white',
                    '&:hover': {
                      backgroundColor: `${currentSlideData.color}60`,
                      transform: 'translate(-50%, -50%) scale(1.1)'
                    }
                  }}
                >
                  {isPlaying ? <PauseIcon sx={{ fontSize: 50 }} /> : <PlayIcon sx={{ fontSize: 50 }} />}
                </IconButton>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Navigation Controls - Mobile Optimized */}
      <Box sx={{
        position: 'absolute',
        bottom: { xs: 20, md: 30 },
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 2, md: 4 },
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(25px)',
        borderRadius: 6,
        padding: { xs: '12px 20px', md: '16px 32px' },
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        width: { xs: '90%', md: 'auto' },
        maxWidth: '600px'
      }}>
        <Button 
          onClick={prevSlide} 
          disabled={currentSlide === 0}
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          size="small"
          sx={{ 
            borderColor: 'rgba(255, 255, 255, 0.3)',
            color: 'rgba(255, 255, 255, 0.9)',
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1.5 },
            borderRadius: 4,
            fontSize: { xs: '0.8rem', md: '0.9rem' },
            fontWeight: 600,
            '&:hover': { 
              backgroundColor: 'rgba(125, 211, 252, 0.15)',
              borderColor: 'rgba(125, 211, 252, 0.5)',
              color: 'white',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(125, 211, 252, 0.2)'
            },
            '&:disabled': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
              color: 'rgba(255, 255, 255, 0.3)'
            }
          }}
        >
          {currentSlide === 0 ? '←' : 'Previous'}
        </Button>
        
        <Box sx={{ 
          display: 'flex', 
          gap: { xs: 1, md: 1.5 },
          flex: 1,
          justifyContent: 'center'
        }}>
          {slides.map((_, index) => (
            <Box
              key={index}
              onClick={() => goToSlide(index)}
              sx={{
                width: { xs: 10, md: 12 },
                height: { xs: 10, md: 12 },
                borderRadius: '50%',
                backgroundColor: index === currentSlide ? 'primary.main' : 'rgba(255, 255, 255, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                border: index === currentSlide ? '2px solid rgba(125, 211, 252, 0.5)' : '2px solid transparent',
                '&:hover': {
                  backgroundColor: index === currentSlide ? 'primary.light' : 'rgba(255, 255, 255, 0.6)',
                  transform: 'scale(1.3)',
                  boxShadow: index === currentSlide ? '0 0 20px rgba(125, 211, 252, 0.6)' : '0 0 10px rgba(255, 255, 255, 0.3)'
                }
              }}
            />
          ))}
        </Box>
        
        <Button 
          onClick={currentSlide === slides.length - 1 ? onOpenDashboard : nextSlide} 
          disabled={currentSlide === slides.length - 1 && !onOpenDashboard}
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          size="small"
          sx={{ 
            background: currentSlide === slides.length - 1 
              ? 'linear-gradient(45deg, #6EE7B7, #7DD3FC)' 
              : 'linear-gradient(45deg, #7DD3FC, #6EE7B7)',
            color: 'white',
            px: { xs: 2, md: 3 },
            py: { xs: 1, md: 1.5 },
            borderRadius: 4,
            fontSize: { xs: '0.8rem', md: '0.9rem' },
            fontWeight: 600,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': { 
              background: currentSlide === slides.length - 1 
                ? 'linear-gradient(45deg, #7DD3FC, #6EE7B7)' 
                : 'linear-gradient(45deg, #6EE7B7, #7DD3FC)',
              transform: 'translateY(-3px)',
              boxShadow: '0 12px 35px rgba(125, 211, 252, 0.4)'
            },
            '&:active': {
              transform: 'translateY(-1px)',
              boxShadow: '0 8px 25px rgba(125, 211, 252, 0.3)'
            },
            '&:disabled': {
              background: 'rgba(125, 211, 252, 0.2)',
              color: 'rgba(255, 255, 255, 0.5)'
            }
          }}
        >
          {currentSlide === slides.length - 1 ? '🚀 Open Dashboard' : 'Next →'}
        </Button>
      </Box>

      {/* Close Button */}
      <IconButton 
        onClick={onClose}
        sx={{
          position: 'absolute',
          top: 20,
          left: 20,
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
};

export default ORUNStylePresentation;