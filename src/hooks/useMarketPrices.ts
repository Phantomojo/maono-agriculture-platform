import { useState, useEffect } from 'react';
import { MarketPrice } from '../types';

// Custom hook following React Native patterns for market prices
export const useMarketPrices = (cropType?: string) => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMarketPrices();
  }, [cropType]);

  const fetchMarketPrices = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with realistic mock data
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      // Mock data for demonstration with realistic agricultural prices
      const mockPrices: MarketPrice[] = [
        {
          id: 'market-1',
          marketName: 'Nairobi Market',
          crop: 'Maize',
          price: 45.50 + (Math.random() * 10 - 5), // Add some variation
          unit: 'kg',
          change: (Math.random() * 5 - 2.5), // Random change between -2.5 and +2.5
          lastUpdated: new Date(),
          coordinates: { latitude: -1.2921, longitude: 36.8219 },
        },
        {
          id: 'market-2',
          marketName: 'Karatina Market',
          crop: 'Wheat',
          price: 38.75 + (Math.random() * 8 - 4),
          unit: 'kg',
          change: (Math.random() * 4 - 2),
          lastUpdated: new Date(),
          coordinates: { latitude: -0.4700, longitude: 37.1300 },
        },
        {
          id: 'market-3',
          marketName: 'Mwea Rice Scheme',
          crop: 'Rice',
          price: 52.30 + (Math.random() * 6 - 3),
          unit: 'kg',
          change: (Math.random() * 3 - 1.5),
          lastUpdated: new Date(),
          coordinates: { latitude: -0.8000, longitude: 37.4000 },
        },
        {
          id: 'market-4',
          marketName: 'Kisumu Market',
          crop: 'Beans',
          price: 65.20 + (Math.random() * 12 - 6),
          unit: 'kg',
          change: (Math.random() * 6 - 3),
          lastUpdated: new Date(),
          coordinates: { latitude: -0.0917, longitude: 34.7680 },
        },
      ];
      
      setPrices(mockPrices);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch market prices');
    } finally {
      setLoading(false);
    }
  };

  const refreshPrices = () => {
    fetchMarketPrices();
  };

  return { prices, loading, error, refreshPrices };
};


