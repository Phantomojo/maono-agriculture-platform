// Video compression utilities for better performance

export interface CompressionOptions {
  quality: 'low' | 'medium' | 'high';
  maxWidth: number;
  maxHeight: number;
  bitrate: number;
  format: 'mp4' | 'webm';
}

export const compressionPresets: Record<string, CompressionOptions> = {
  mobile: {
    quality: 'low',
    maxWidth: 640,
    maxHeight: 360,
    bitrate: 500,
    format: 'mp4',
  },
  tablet: {
    quality: 'medium',
    maxWidth: 1280,
    maxHeight: 720,
    bitrate: 1500,
    format: 'mp4',
  },
  desktop: {
    quality: 'high',
    maxWidth: 1920,
    maxHeight: 1080,
    bitrate: 3000,
    format: 'mp4',
  },
};

// Detect device type for appropriate compression
export const getDeviceCompression = (): CompressionOptions => {
  const width = window.innerWidth;
  
  if (width < 768) {
    return compressionPresets.mobile;
  } else if (width < 1024) {
    return compressionPresets.tablet;
  } else {
    return compressionPresets.desktop;
  }
};

// Get optimized video URL based on device
export const getOptimizedVideoUrl = (baseUrl: string, deviceType?: string): string => {
  const compression = deviceType ? compressionPresets[deviceType] : getDeviceCompression();
  
  // For now, return the base URL
  // In production, this would return different URLs based on compression
  return baseUrl;
};

// Video loading strategy based on connection
export const getLoadingStrategy = (): 'eager' | 'lazy' | 'none' => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    
    // Slow connection - lazy load
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'lazy';
    }
    
    // Fast connection - eager load
    if (connection.effectiveType === '4g') {
      return 'eager';
    }
  }
  
  // Default to lazy loading for better performance
  return 'lazy';
};

// Preload strategy based on video importance and size
export const getPreloadStrategy = (videoSize: number, isImportant: boolean = false): 'none' | 'metadata' | 'auto' => {
  if (isImportant && videoSize < 5) {
    return 'auto'; // Important small videos: full preload
  }
  
  if (videoSize > 10) {
    return 'none'; // Large videos: no preload
  }
  
  return 'metadata'; // Default: metadata only
};

// Generate video poster from first frame
export const generateVideoPoster = (videoElement: HTMLVideoElement): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  canvas.width = videoElement.videoWidth;
  canvas.height = videoElement.videoHeight;
  
  ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
  return canvas.toDataURL('image/jpeg', 0.8);
};

// Check if video format is supported
export const isVideoFormatSupported = (format: string): boolean => {
  const video = document.createElement('video');
  return video.canPlayType(`video/${format}`) !== '';
};

// Get best video format for browser
export const getBestVideoFormat = (): string => {
  if (isVideoFormatSupported('webm')) {
    return 'webm';
  }
  if (isVideoFormatSupported('mp4')) {
    return 'mp4';
  }
  return 'mp4'; // Fallback
};

// Video optimization recommendations
export const getOptimizationRecommendations = (videoSize: number, duration: number) => {
  const recommendations: string[] = [];
  
  if (videoSize > 20) {
    recommendations.push('Consider compressing video to reduce file size');
  }
  
  if (duration > 15) {
    recommendations.push('Consider splitting long videos into shorter segments');
  }
  
  if (videoSize > 10 && duration < 5) {
    recommendations.push('High file size for short duration - check compression settings');
  }
  
  return recommendations;
};
