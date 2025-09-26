import { useState, useEffect, useCallback } from 'react';
import { WeatherData } from '../types';

// Custom hook following React Native patterns for weather data
export const useWeatherData = (location?: { latitude: number; longitude: number }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with realistic mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Clear'];
      const icons = ['☀️', '⛅', '☁️', '🌦️', '🌤️'];
      const randomIndex = Math.floor(Math.random() * conditions.length);
      
      const weatherData: WeatherData = {
        id: `weather-${Date.now()}`,
        location: location ? `${location.latitude.toFixed(2)}, ${location.longitude.toFixed(2)}` : 'Nairobi, Kenya',
        temperature: Math.floor(Math.random() * 10) + 20, // 20-30°C
        humidity: Math.floor(Math.random() * 30) + 50, // 50-80%
        windSpeed: Math.floor(Math.random() * 15) + 5, // 5-20 km/h
        condition: conditions[randomIndex],
        icon: icons[randomIndex],
        timestamp: new Date(),
        coordinates: location || { latitude: -1.2921, longitude: 36.8219 },
      };
      
      setWeather(weatherData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      fetchWeatherData();
    }
  }, [location, fetchWeatherData]);

  const refreshWeather = () => {
    fetchWeatherData();
  };

  return { weather, loading, error, refreshWeather };
};


