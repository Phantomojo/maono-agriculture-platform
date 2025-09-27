// Video optimization utilities for better performance

export interface VideoConfig {
  id: string;
  name: string;
  localPath: string;
  cloudinaryUrl?: string;
  youtubeUrl?: string;
  optimizedUrl?: string;
  size: number; // in MB
  duration: number; // in seconds
}

// Video configurations with optimization options
export const videoConfigs: VideoConfig[] = [
  {
    id: 'maono-intro',
    name: 'Welcome to MAONO',
    localPath: '/videos/maono-intro.mp4',
    size: 16.5,
    duration: 8,
  },
  {
    id: 'agricultural-challenges',
    name: 'The Challenge',
    localPath: '/videos/agricultural-challenges.mp4',
    size: 4.0,
    duration: 10,
  },
  {
    id: 'maono-solution',
    name: 'The MAONO Solution',
    localPath: '/videos/maono-solution.mp4',
    size: 8.6,
    duration: 12,
  },
  {
    id: 'technology-stack',
    name: 'Cutting-Edge Technology',
    localPath: '/videos/technology-stack.mp4',
    size: 4.3,
    duration: 10,
  },
  {
    id: 'impact-stories',
    name: 'Proven Impact',
    localPath: '/videos/impact-stories.mp4',
    size: 12.6,
    duration: 12,
  },
  {
    id: 'future-vision',
    name: 'The Future of Agriculture',
    localPath: '/videos/future-vision.mp4',
    size: 16.4,
    duration: 10,
  },
];

// Get optimized video URL based on available hosting
export const getOptimizedVideoUrl = (videoId: string): string => {
  const config = videoConfigs.find(v => v.id === videoId);
  if (!config) return '';

  // Priority order: Cloudinary > YouTube > Local
  if (config.cloudinaryUrl) {
    return config.cloudinaryUrl;
  }
  
  if (config.youtubeUrl) {
    return config.youtubeUrl;
  }
  
  // Fallback to local with optimization
  return config.localPath;
};

// Video optimization settings
export const videoOptimization = {
  // Preload strategy based on video size
  getPreloadStrategy: (size: number): 'none' | 'metadata' | 'auto' => {
    if (size > 10) return 'metadata'; // Large videos: only metadata
    if (size > 5) return 'metadata';  // Medium videos: metadata
    return 'auto'; // Small videos: full preload
  },
  
  // Lazy loading threshold
  getLazyLoadThreshold: (size: number): number => {
    if (size > 10) return 1000; // Large videos: load 1s before needed
    if (size > 5) return 500;    // Medium videos: load 0.5s before
    return 200; // Small videos: load 0.2s before
  },
  
  // Quality settings based on connection
  getQualitySettings: (connectionType: 'slow' | 'fast' = 'fast') => {
    if (connectionType === 'slow') {
      return {
        maxWidth: 720,
        maxHeight: 480,
        bitrate: 1000,
      };
    }
    return {
      maxWidth: 1920,
      maxHeight: 1080,
      bitrate: 5000,
    };
  }
};

// Detect user's connection speed
export const detectConnectionSpeed = (): 'slow' | 'fast' => {
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      return 'slow';
    }
  }
  return 'fast';
};

// Generate optimized video element props
export const getOptimizedVideoProps = (videoId: string) => {
  const config = videoConfigs.find(v => v.id === videoId);
  if (!config) return {};

  const connectionSpeed = detectConnectionSpeed();
  const preload = videoOptimization.getPreloadStrategy(config.size);
  
  return {
    preload,
    loading: 'lazy' as const,
    poster: config.localPath.replace('.mp4', '-poster.jpg'),
    style: {
      objectFit: 'cover' as const,
      borderRadius: '12px',
    },
  };
};
