// Device detection utility for responsive design
export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isAndroid: boolean;
  isIOS: boolean;
  screenWidth: number;
  screenHeight: number;
  deviceType: 'mobile' | 'tablet' | 'desktop';
}

export const detectDevice = (): DeviceInfo => {
  const userAgent = navigator.userAgent;
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  
  const isAndroid = /Android/i.test(userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
  const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) || screenWidth <= 768;
  const isTablet = /iPad|Android/i.test(userAgent) && screenWidth > 768 && screenWidth <= 1024;
  const isDesktop = !isMobile && !isTablet;
  
  let deviceType: 'mobile' | 'tablet' | 'desktop' = 'desktop';
  if (isMobile) deviceType = 'mobile';
  else if (isTablet) deviceType = 'tablet';
  
  return {
    isMobile,
    isTablet,
    isDesktop,
    isAndroid,
    isIOS,
    screenWidth,
    screenHeight,
    deviceType
  };
};

export const getMobileStyles = (deviceInfo: DeviceInfo) => {
  if (deviceInfo.isMobile) {
    return {
      // Mobile-specific styles
      headerHeight: '60px',
      buttonHeight: '40px',
      buttonPadding: '8px 16px',
      fontSize: {
        h1: '1.8rem',
        h2: '1.5rem',
        h3: '1.3rem',
        h4: '1.1rem',
        body: '0.9rem',
        small: '0.8rem'
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px'
      },
      navigation: {
        height: '50px',
        padding: '8px 12px',
        fontSize: '0.8rem'
      }
    };
  } else if (deviceInfo.isTablet) {
    return {
      // Tablet-specific styles
      headerHeight: '70px',
      buttonHeight: '44px',
      buttonPadding: '10px 20px',
      fontSize: {
        h1: '2.2rem',
        h2: '1.8rem',
        h3: '1.5rem',
        h4: '1.3rem',
        body: '1rem',
        small: '0.9rem'
      },
      spacing: {
        xs: '6px',
        sm: '10px',
        md: '14px',
        lg: '18px',
        xl: '24px'
      },
      navigation: {
        height: '55px',
        padding: '10px 16px',
        fontSize: '0.9rem'
      }
    };
  } else {
    return {
      // Desktop styles
      headerHeight: '80px',
      buttonHeight: '48px',
      buttonPadding: '12px 24px',
      fontSize: {
        h1: '3.5rem',
        h2: '2.5rem',
        h3: '2rem',
        h4: '1.5rem',
        body: '1rem',
        small: '0.875rem'
      },
      spacing: {
        xs: '8px',
        sm: '12px',
        md: '16px',
        lg: '20px',
        xl: '24px'
      },
      navigation: {
        height: '60px',
        padding: '12px 24px',
        fontSize: '1rem'
      }
    };
  }
};
