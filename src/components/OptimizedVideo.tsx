import React, { useState, useRef, useEffect } from 'react';
import { Box, CircularProgress, Typography, Button } from '@mui/material';
import { getOptimizedVideoProps, videoConfigs } from '../utils/videoOptimization';

interface OptimizedVideoProps {
  videoId: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
  muted?: boolean;
  autoPlay?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const OptimizedVideo: React.FC<OptimizedVideoProps> = ({
  videoId,
  onPlay,
  onPause,
  onEnded,
  onError,
  muted = false,
  autoPlay = false,
  className,
  style,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const config = videoConfigs.find(v => v.id === videoId);
  const optimizedProps = getOptimizedVideoProps(videoId);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before video comes into view
        threshold: 0.1,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Load video when in view
  useEffect(() => {
    if (isInView && videoRef.current && !hasError) {
      const video = videoRef.current;
      
      const handleCanPlay = () => {
        setIsLoading(false);
        setHasError(false);
      };

      const handleError = () => {
        setIsLoading(false);
        setHasError(true);
        onError?.('Video failed to load');
      };

      const handleLoadStart = () => {
        setIsLoading(true);
        setHasError(false);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('loadstart', handleLoadStart);

      // Load the video
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadstart', handleLoadStart);
      };
    }
  }, [isInView, hasError, onError]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setHasError(false);
    setIsLoading(true);
    
    if (videoRef.current) {
      videoRef.current.load();
    }
  };

  const handlePlay = () => {
    onPlay?.();
  };

  const handlePause = () => {
    onPause?.();
  };

  const handleEnded = () => {
    onEnded?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.('Video playback error');
  };

  if (!config) {
    return (
      <Box sx={{ p: 2, textAlign: 'center' }}>
        <Typography color="error">Video not found: {videoId}</Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        borderRadius: '12px',
        overflow: 'hidden',
        ...style,
      }}
      className={className}
    >
      {/* Loading State */}
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            zIndex: 2,
          }}
        >
          <CircularProgress sx={{ color: '#D9B08C', mb: 2 }} />
          <Typography variant="body2" sx={{ color: '#D1E8E2' }}>
            {isInView ? 'Loading video...' : 'Video will load when needed'}
          </Typography>
        </Box>
      )}

      {/* Error State */}
      {hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 2,
            p: 2,
          }}
        >
          <Typography variant="h6" sx={{ color: '#F87171', mb: 1 }}>
            ⚠️ Video Error
          </Typography>
          <Typography variant="body2" sx={{ color: '#D1E8E2', mb: 2, textAlign: 'center' }}>
            Failed to load video after {retryCount + 1} attempt{retryCount > 0 ? 's' : ''}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={handleRetry}
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
      )}

      {/* Video Element */}
      {isInView && (
        <video
          ref={videoRef}
          width="100%"
          height="100%"
          muted={muted}
          autoPlay={autoPlay}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          onError={handleError}
          {...optimizedProps}
        >
          <source src={config.localPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Placeholder when not in view */}
      {!isInView && (
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
            backgroundColor: 'rgba(17, 100, 102, 0.1)',
            border: '2px dashed rgba(217, 176, 140, 0.3)',
          }}
        >
          <Typography variant="body2" sx={{ color: '#8A9B9B' }}>
            {config.name} - Click to load
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default OptimizedVideo;
