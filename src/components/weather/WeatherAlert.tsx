import React from 'react';
import { Cloud, CloudRain, CloudLightning } from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';

const WeatherAlert: React.FC = () => {
  const { currentWeather } = useWeather();

  if (!currentWeather || currentWeather.isPlayable) {
    return null;
  }

  const getAlertContent = () => {
    switch (currentWeather.condition) {
      case 'rainy':
        return {
          icon: <CloudRain className="h-6 w-6 text-white" />,
          title: 'Rain Alert',
          message: 'Light to moderate rain expected. Some slots may be affected.',
          color: 'bg-warning-600'
        };
      case 'stormy':
        return {
          icon: <CloudLightning className="h-6 w-6 text-white" />,
          title: 'Severe Weather Alert',
          message: 'Thunderstorms expected. Ground closed for safety. Bookings affected will be rescheduled.',
          color: 'bg-error-600'
        };
      default:
        return {
          icon: <Cloud className="h-6 w-6 text-white" />,
          title: 'Weather Advisory',
          message: 'Unfavorable weather conditions may affect play. Check slot availability.',
          color: 'bg-accent-600'
        };
    }
  };

  const { icon, title, message, color } = getAlertContent();

  return (
    <div className={`${color} text-white px-4 py-3`}>
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {icon}
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm">{message}</p>
          </div>
        </div>
        <a 
          href="#" 
          className="text-white text-sm underline hover:no-underline"
          onClick={(e) => {
            e.preventDefault();
            // Implementation for weather details modal would go here
          }}
        >
          View Details
        </a>
      </div>
    </div>
  );
};

export default WeatherAlert;