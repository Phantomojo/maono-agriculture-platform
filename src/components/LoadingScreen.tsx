import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing MAONO...');
  const globeRef = useRef<HTMLDivElement>(null);
  const threeRef = useRef<any>(null);

  const loadingSteps = [
    { text: 'Initializing MAONO...', duration: 1000 },
    { text: 'Loading AI Models...', duration: 1500 },
    { text: 'Connecting to Satellite Data...', duration: 2000 },
    { text: 'Syncing Weather Stations...', duration: 1500 },
    { text: 'Preparing Agricultural Intelligence...', duration: 2000 },
    { text: 'Ready to Transform Agriculture!', duration: 1000 },
  ];

  // Initialize ORUN Globe
  useEffect(() => {
    const initGlobe = async () => {
      try {
        // Dynamically load Three.js
        const THREE = await import('three');
        
        if (!globeRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(300, 300);
        renderer.setClearColor(0x000000, 0);
        globeRef.current.appendChild(renderer.domElement);

        // Create Earth globe with proper textures
        const geometry = new THREE.SphereGeometry(1, 64, 64);
        
        // Create Earth material with realistic colors and textures
        const earthMaterial = new THREE.MeshPhongMaterial({
          color: 0x4A90E2, // Ocean blue base
          transparent: true,
          opacity: 0.9,
          shininess: 100,
          specular: 0x111111,
        });
        const globe = new THREE.Mesh(geometry, earthMaterial);
        scene.add(globe);

        // Add continent overlay
        const continentGeometry = new THREE.SphereGeometry(1.001, 64, 64);
        const continentMaterial = new THREE.MeshPhongMaterial({
          color: 0x2D5016, // Forest green for continents
          transparent: true,
          opacity: 0.8,
        });
        const continents = new THREE.Mesh(continentGeometry, continentMaterial);
        scene.add(continents);

        // Add atmosphere
        const atmosphereGeometry = new THREE.SphereGeometry(1.1, 32, 32);
        const atmosphereMaterial = new THREE.MeshPhongMaterial({
          color: 0x87CEEB, // Sky blue atmosphere
          transparent: true,
          opacity: 0.2,
          side: THREE.BackSide,
        });
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        scene.add(atmosphere);

        // Add city lights
        const cityLightsGeometry = new THREE.BufferGeometry();
        const cityLightsCount = 20;
        const cityPositions = new Float32Array(cityLightsCount * 3);
        
        for (let i = 0; i < cityLightsCount; i++) {
          const phi = Math.acos(1 - 2 * Math.random());
          const theta = 2 * Math.PI * Math.random();
          const radius = 1.01;
          
          cityPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
          cityPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
          cityPositions[i * 3 + 2] = radius * Math.cos(phi);
        }
        
        cityLightsGeometry.setAttribute('position', new THREE.BufferAttribute(cityPositions, 3));
        const cityLightsMaterial = new THREE.PointsMaterial({
          color: 0xFFFF99,
          size: 0.02,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: false,
        });
        const cityLights = new THREE.Points(cityLightsGeometry, cityLightsMaterial);
        scene.add(cityLights);

        // Realistic lighting
        const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 1.2);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        // Add rim lighting for depth
        const rimLight = new THREE.DirectionalLight(0x87CEEB, 0.3);
        rimLight.position.set(-3, -2, -3);
        scene.add(rimLight);

        camera.position.z = 3;

        // Earth-like animation
        const animate = () => {
          requestAnimationFrame(animate);
          globe.rotation.y += 0.003;
          continents.rotation.y += 0.003;
          atmosphere.rotation.y += 0.002;
          cityLights.rotation.y += 0.003;
          renderer.render(scene, camera);
        };
        animate();

        threeRef.current = { scene, camera, renderer, globe, continents, atmosphere, cityLights };
      } catch (error) {
        console.log('Three.js not available, using fallback visualization');
      }
    };

    initGlobe();

    return () => {
      if (threeRef.current && globeRef.current) {
        globeRef.current.removeChild(threeRef.current.renderer.domElement);
        threeRef.current.renderer.dispose();
      }
    };
  }, []);

  useEffect(() => {
    let currentStep = 0;
    let currentProgress = 0;
    const totalSteps = loadingSteps.length;
    const totalDuration = loadingSteps.reduce((sum, step) => sum + step.duration, 0);
    const progressIncrement = 100 / totalDuration;

    const interval = setInterval(() => {
      currentProgress += progressIncrement;
      setProgress(Math.min(currentProgress, 100));

      // Update text based on progress
      const stepProgress = (currentProgress / 100) * totalSteps;
      const currentStepIndex = Math.floor(stepProgress);
      
      if (currentStepIndex < totalSteps && currentStepIndex !== currentStep) {
        currentStep = currentStepIndex;
        setLoadingText(loadingSteps[currentStep].text);
      }

      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#010E0E',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    >
      {/* Background Pattern */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `
            radial-gradient(circle at 20% 80%, rgba(217, 176, 140, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(17, 100, 102, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(209, 232, 226, 0.05) 0%, transparent 50%)
          `,
          opacity: 0.6,
        }}
      />

      {/* Central Content */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
          textAlign: 'center',
          px: 4,
        }}
      >
        {/* 3D Globe Container */}
        <Box
          ref={globeRef}
          sx={{
            width: '300px',
            height: '300px',
            mb: 4,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
        {/* MAONO Logo/Title */}
        <Typography
          variant="h2"
          sx={{
            color: '#D9B08C',
            fontWeight: 700,
            mb: 2,
            textShadow: '0 0 20px rgba(217, 176, 140, 0.3)',
            background: 'linear-gradient(135deg, #D9B08C 0%, #E5C4A0 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          MAONO
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: '#D1E8E2',
            mb: 4,
            opacity: 0.9,
            fontWeight: 300,
          }}
        >
          Agricultural Intelligence Platform
        </Typography>

        {/* Loading Spinner */}
        <Box sx={{ position: 'relative', mb: 4 }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={80}
            thickness={4}
            sx={{
              color: '#D9B08C',
              '& .MuiCircularProgress-circle': {
                strokeLinecap: 'round',
              },
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#D9B08C',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            {Math.round(progress)}%
          </Box>
        </Box>

        {/* Loading Text */}
        <Typography
          variant="body1"
          sx={{
            color: '#D1E8E2',
            mb: 2,
            minHeight: '24px',
            transition: 'all 0.3s ease',
          }}
        >
          {loadingText}
        </Typography>

        {/* Progress Bar */}
        <Box
          sx={{
            width: '300px',
            height: '4px',
            backgroundColor: 'rgba(217, 176, 140, 0.2)',
            borderRadius: '2px',
            overflow: 'hidden',
            mb: 2,
          }}
        >
          <Box
            sx={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #D9B08C 0%, #E5C4A0 100%)',
              borderRadius: '2px',
              transition: 'width 0.3s ease',
              boxShadow: '0 0 10px rgba(217, 176, 140, 0.3)',
            }}
          />
        </Box>

        {/* Subtitle */}
        <Typography
          variant="caption"
          sx={{
            color: '#8A9B9B',
            opacity: 0.8,
            maxWidth: '400px',
            lineHeight: 1.5,
          }}
        >
          Connecting farmers with AI-powered insights, real-time market data, and a global agricultural community.
        </Typography>
      </Box>

      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(217, 176, 140, 0.1), rgba(17, 100, 102, 0.1))',
          animation: 'float 3s ease-in-out infinite',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-20px)' },
          },
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          right: '15%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, rgba(17, 100, 102, 0.1), rgba(209, 232, 226, 0.1))',
          animation: 'float 2.5s ease-in-out infinite reverse',
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px)' },
            '50%': { transform: 'translateY(-15px)' },
          },
        }}
      />
    </Box>
  );
};

export default LoadingScreen;
