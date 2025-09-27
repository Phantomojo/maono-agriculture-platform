import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
  onError?: (error: string) => void;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// YouTube video IDs (replace with actual video IDs when uploaded)
const YOUTUBE_VIDEOS: Record<string, string> = {
  'maono-intro': 'YOUR_VIDEO_ID_1', // Replace with actual YouTube video ID
  'agricultural-challenges': 'YOUR_VIDEO_ID_2',
  'maono-solution': 'YOUR_VIDEO_ID_3',
  'technology-stack': 'YOUR_VIDEO_ID_4',
  'impact-stories': 'YOUR_VIDEO_ID_5',
  'future-vision': 'YOUR_VIDEO_ID_6',
};

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({
  videoId,
  title,
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
  const [player, setPlayer] = useState<any>(null);

  const youtubeVideoId = YOUTUBE_VIDEOS[videoId];

  useEffect(() => {
    // Load YouTube API if not already loaded
    if (!(window as any).YT) {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        (window as any).YT.ready(() => {
          initializePlayer();
        });
      };
    } else {
      initializePlayer();
    }

    return () => {
      if (player) {
        player.destroy();
      }
    };
  }, [youtubeVideoId]);

  const initializePlayer = () => {
    if (!youtubeVideoId || youtubeVideoId.startsWith('YOUR_VIDEO_ID')) {
      setHasError(true);
      setIsLoading(false);
      onError?.('YouTube video ID not configured');
      return;
    }

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
          setPlayer(event.target);
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

  const handleRetry = () => {
    setHasError(false);
    setIsLoading(true);
    initializePlayer();
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
          {youtubeVideoId.startsWith('YOUR_VIDEO_ID') 
            ? 'YouTube video not configured yet' 
            : 'Failed to load YouTube video'
          }
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
            Loading YouTube video...
          </Typography>
        </Box>
      )}

      {/* YouTube Player */}
      <div
        id={`youtube-player-${videoId}`}
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  );
};

export default YouTubePlayer;
