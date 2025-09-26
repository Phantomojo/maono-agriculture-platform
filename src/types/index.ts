// MAONO Agricultural Platform Types
// Based on React Native patterns and agricultural data structures

export interface WeatherData {
  id: string;
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  condition: string;
  icon: string;
  timestamp: Date;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface MarketPrice {
  id: string;
  marketName: string;
  crop: string;
  price: number;
  unit: string;
  change: number;
  lastUpdated: Date;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface CropData {
  id: string;
  name: string;
  type: string;
  yield: number;
  area: number;
  plantingDate: Date;
  harvestDate?: Date;
  status: 'planted' | 'growing' | 'ready' | 'harvested';
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface Farm {
  id: string;
  name: string;
  owner: string;
  area: number;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  crops: CropData[];
  weatherStations: WeatherData[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'buyer' | 'analyst' | 'admin';
  farms: Farm[];
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
  units: 'metric' | 'imperial';
}

export interface AgriculturalContextType {
  user: User | null;
  weatherData: WeatherData[];
  marketPrices: MarketPrice[];
  farms: Farm[];
  loading: {
    weather: boolean;
    markets: boolean;
    farms: boolean;
  };
  error: string | null;
  actions: {
    setUser: (user: User | null) => void;
    setWeatherData: (data: WeatherData[]) => void;
    setMarketPrices: (prices: MarketPrice[]) => void;
    setFarms: (farms: Farm[]) => void;
    setLoading: (loading: Partial<AgriculturalContextType['loading']>) => void;
    setError: (error: string | null) => void;
  };
}

// Component Props Types
export interface WeatherCardProps {
  weatherData: WeatherData;
  onPress?: () => void;
  loading?: boolean;
  refreshing?: boolean;
}

export interface MarketPriceCardProps {
  marketPrice: MarketPrice;
  onPress?: () => void;
  loading?: boolean;
  refreshing?: boolean;
}

export interface CropCardProps {
  crop: CropData;
  onPress?: () => void;
}

export interface FarmMapProps {
  farms: Farm[];
  selectedFarm?: Farm;
  onFarmSelect?: (farm: Farm) => void;
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  Weather: undefined;
  Markets: undefined;
  Farms: undefined;
  Profile: undefined;
  FarmDetail: { farmId: string };
  WeatherDetail: { weatherId: string };
  MarketDetail: { marketId: string };
};

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}


