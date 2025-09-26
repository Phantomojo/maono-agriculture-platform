import React, { createContext, useContext, useState, ReactNode } from 'react';
import { WeatherData, MarketPrice } from '../types';

interface AgriculturalContextType {
  user: any;
  weatherData: WeatherData[];
  marketPrices: MarketPrice[];
  setUser: (user: any) => void;
  setWeatherData: (data: WeatherData[]) => void;
  setMarketPrices: (prices: MarketPrice[]) => void;
}

const AgriculturalContext = createContext<AgriculturalContextType | undefined>(undefined);

interface AgriculturalProviderProps {
  children: ReactNode;
}

export const AgriculturalProvider: React.FC<AgriculturalProviderProps> = ({ children }) => {
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>([]);

  const value = {
    user,
    weatherData,
    marketPrices,
    setUser,
    setWeatherData,
    setMarketPrices,
  };

  return (
    <AgriculturalContext.Provider value={value}>
      {children}
    </AgriculturalContext.Provider>
  );
};

export const useAgriculturalContext = () => {
  const context = useContext(AgriculturalContext);
  if (context === undefined) {
    throw new Error('useAgriculturalContext must be used within an AgriculturalProvider');
  }
  return context;
};


