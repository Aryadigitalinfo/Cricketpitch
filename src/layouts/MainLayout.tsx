import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import WeatherAlert from '../components/weather/WeatherAlert';
import { useWeather } from '../contexts/WeatherContext';

const MainLayout: React.FC = () => {
  const { currentWeather, isLoading } = useWeather();
  const showWeatherAlert = !isLoading && currentWeather && !currentWeather.isPlayable;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow">
        {showWeatherAlert && <WeatherAlert />}
        <div className="container mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;