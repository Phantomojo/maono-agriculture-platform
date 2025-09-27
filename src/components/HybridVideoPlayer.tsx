import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

interface HybridVideoPlayerProps {
  videoId: string;
  localVideoUrl: string;
  youtubeVideoId?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const HybridVideoPlayer: React.FC<HybridVideoPlayerProps> = ({
  videoId,
  localVideoUrl,
  youtubeVideoId,
  onPlay,
  onPause,
  onEnded,
  onError,
  autoPlay = false,
  muted = false,
  className,
  style,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [useYouTube, setUseYouTube] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Check if we should use YouTube (if YouTube ID is provided)
  useEffect(() => {
    if (youtubeVideoId && youtubeVideoId !== 'dQw4w9WgXcQ') {
      setUseYouTube(true);
    }
  }, [youtubeVideoId]);

  // YouTube Player Implementation
  useEffect(() => {
    if (useYouTube && youtubeVideoId) {
      // Load YouTube API if not already loaded
      if (!(window as any).YT) {
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
          (window as any).YT.ready(() => {
            initializeYouTubePlayer();
          });
        };
      } else {
        initializeYouTubePlayer();
      }
    }
  }, [useYouTube, youtubeVideoId]);

  const initializeYouTubePlayer = () => {
    if (!youtubeVideoId) return;

    const playerInstance = new (window as any).YT.Player(`youtube-player-${videoId}`, {
      height: '100%',
      width: '100%',
      videoId: youtubeVideoId,
      playerVars: {
        autoplay: autoPlay ? 1 : 0,
        mute: muted ? 1 : 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        fs: 1,
        cc_load_policy: 0,
        playsinline: 1,
      },
      events: {
        onReady: (event: any) => {
          setIsLoading(false);
          setHasError(false);
        },
        onStateChange: (event: any) => {
          switch (event.data) {
            case (window as any).YT.PlayerState.PLAYING:
              onPlay?.();
              break;
            case (window as any).YT.PlayerState.PAUSED:
              onPause?.();
              break;
            case (window as any).YT.PlayerState.ENDED:
              onEnded?.();
              break;
            case (window as any).YT.PlayerState.ERROR:
              setHasError(true);
              setIsLoading(false);
              onError?.('YouTube player error');
              break;
          }
        },
        onError: (event: any) => {
          setHasError(true);
          setIsLoading(false);
          onError?.('YouTube video error');
        },
      },
    });
  };

  // Local Video Implementation
  useEffect(() => {
    if (!useYouTube && videoRef.current) {
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
  }, [useYouTube, onError]);

  const handleRetry = () => {
    setRetryCount(prev => prev + 1);
    setHasError(false);
    setIsLoading(true);
    
    if (useYouTube) {
      // Retry YouTube
      initializeYouTubePlayer();
    } else if (videoRef.current) {
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

  if (hasError) {
    return (
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          backgroundColor: '#000',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
          ...style,
        }}
        className={className}
      >
        <Typography variant="h6" sx={{ color: '#F87171', mb: 1 }}>
          ⚠️ Video Error
        </Typography>
        <Typography variant="body2" sx={{ color: '#D1E8E2', mb: 2, textAlign: 'center' }}>
          {useYouTube ? 'YouTube video failed to load' : 'Local video failed to load'}
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
            Loading {useYouTube ? 'YouTube' : 'video'}...
          </Typography>
        </Box>
      )}

      {/* YouTube Player */}
      {useYouTube && (
        <div
          id={`youtube-player-${videoId}`}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      )}

      {/* Local Video Player */}
      {!useYouTube && (
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
          style={{
            objectFit: 'cover',
            borderRadius: '12px',
          }}
        >
          <source src={localVideoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </Box>
  );
};

export default HybridVideoPlayer;
