import React, { useState, useRef } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

interface VercelBlobVideoProps {
  src: string;
  poster?: string;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
  onError?: (error: any) => void;
  style?: React.CSSProperties;
}

const VercelBlobVideo: React.FC<VercelBlobVideoProps> = ({
  src,
  poster,
  onLoadStart,
  onCanPlay,
  onError,
  style
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleLoadStart = () => {
    setIsLoading(true);
    setHasError(false);
    onLoadStart?.();
  };

  const handleCanPlay = () => {
    setIsLoading(false);
    onCanPlay?.();
  };

  const handleError = (error: any) => {
    setIsLoading(false);
    setHasError(true);
    onError?.(error);
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2
          }}
        >
          <CircularProgress sx={{ color: '#D9B08C' }} />
          <Typography variant="body2" sx={{ color: '#D1E8E2' }}>
            Loading video...
          </Typography>
        </Box>
      )}
      
      {hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            textAlign: 'center',
            color: '#D1E8E2'
          }}
        >
          <Typography variant="body2" color="error">
            Failed to load video
          </Typography>
        </Box>
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        onLoadStart={handleLoadStart}
        onCanPlay={handleCanPlay}
        onError={handleError}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '12px',
          ...style
        }}
        controls
        preload="metadata"
      />
    </Box>
  );
};

export default VercelBlobVideo;
