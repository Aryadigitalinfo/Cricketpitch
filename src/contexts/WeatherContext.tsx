import React, { createContext, useContext, useState, useEffect } from 'react';

interface WeatherData {
  temperature: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy';
  windSpeed: number;
  precipitationChance: number;
  isPlayable: boolean;
}

interface WeatherContextType {
  currentWeather: WeatherData | null;
  forecast: WeatherData[] | null;
  isLoading: boolean;
  error: string | null;
  getWeatherForDate: (date: Date) => WeatherData | null;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<WeatherData[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate fetching weather data
    const fetchWeatherData = async () => {
      setIsLoading(true);
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Generate mock current weather
        const mockCurrentWeather: WeatherData = {
          temperature: 25 + Math.floor(Math.random() * 10),
          condition: ['sunny', 'cloudy', 'rainy', 'stormy'][Math.floor(Math.random() * 4)] as WeatherData['condition'],
          windSpeed: Math.floor(Math.random() * 20),
          precipitationChance: Math.floor(Math.random() * 100),
          isPlayable: Math.random() > 0.2, // 80% chance of playable weather
        };
        
        // Generate mock 7-day forecast
        const mockForecast: WeatherData[] = Array.from({ length: 7 }, (_, i) => {
          const precipChance = Math.floor(Math.random() * 100);
          const isStormy = precipChance > 70;
          return {
            temperature: 20 + Math.floor(Math.random() * 15),
            condition: isStormy ? 'stormy' : precipChance > 40 ? 'rainy' : precipChance > 20 ? 'cloudy' : 'sunny',
            windSpeed: Math.floor(Math.random() * 25),
            precipitationChance: precipChance,
            isPlayable: precipChance < 70 && Math.random() > 0.1,
          };
        });
        
        setCurrentWeather(mockCurrentWeather);
        setForecast(mockForecast);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch weather data:', err);
        setError('Failed to load weather data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
    
    // Refresh weather data every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  const getWeatherForDate = (date: Date): WeatherData | null => {
    if (!forecast) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) return currentWeather;
    if (daysDiff > 0 && daysDiff <= forecast.length) return forecast[daysDiff - 1];
    
    return null;
  };

  return (
    <WeatherContext.Provider value={{
      currentWeather,
      forecast,
      isLoading,
      error,
      getWeatherForDate
    }}>
      {children}
    </WeatherContext.Provider>
  );
};