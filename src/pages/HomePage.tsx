import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Shield, CreditCard, MapPin, Users } from 'lucide-react';
import { useWeather } from '../contexts/WeatherContext';

const HomePage: React.FC = () => {
  const { currentWeather } = useWeather();

  const weatherStatusClass = () => {
    if (!currentWeather) return 'bg-gray-100';
    
    switch (currentWeather.condition) {
      case 'sunny': return 'bg-accent-50 text-accent-800';
      case 'cloudy': return 'bg-gray-100 text-gray-800';
      case 'rainy': return 'bg-warning-50 text-warning-800';
      case 'stormy': return 'bg-error-50 text-error-800';
      default: return 'bg-gray-100';
    }
  };

  const getWeatherIcon = () => {
    if (!currentWeather) return null;
    
    switch (currentWeather.condition) {
      case 'sunny': return '☀️';
      case 'cloudy': return '☁️';
      case 'rainy': return '🌧️';
      case 'stormy': return '⛈️';
      default: return '🌤️';
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-700 to-primary-900 text-white rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3657154/pexels-photo-3657154.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-fade-in">
              Book Your Perfect Cricket Pitch
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up">
              State-of-the-art cricket turfs available for practice sessions, friendly matches, and tournaments.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link
                to="/booking"
                className="bg-white text-primary-700 hover:bg-gray-100 transition-colors font-semibold px-8 py-3 rounded-lg text-center"
              >
                Book Now
              </Link>
              <a
                href="#facilities"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors font-semibold px-8 py-3 rounded-lg text-center"
              >
                View Facilities
              </a>
            </div>
            
            {currentWeather && (
              <div className={`mt-8 inline-flex items-center rounded-full py-1.5 px-4 ${weatherStatusClass()}`}>
                <span className="text-xl mr-2">{getWeatherIcon()}</span>
                <span className="font-medium">
                  {currentWeather.temperature}°C • {currentWeather.condition.charAt(0).toUpperCase() + currentWeather.condition.slice(1)}
                </span>
                <span className="mx-2">•</span>
                <span>
                  {currentWeather.isPlayable 
                    ? 'Ground open for play' 
                    : 'Ground conditions affected'}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Booking a cricket turf with us is simple and hassle-free. Follow these steps to secure your spot.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Choose Your Date</h3>
            <p className="text-gray-600">
              Select your preferred date from our interactive calendar showing real-time availability.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Pick a Time Slot</h3>
            <p className="text-gray-600">
              Book a 1-hour slot between 6 AM and 10 PM based on your convenience.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
            <div className="bg-primary-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Pay & Confirm</h3>
            <p className="text-gray-600">
              Make a secure payment and receive instant confirmation via SMS and email.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="facilities" className="bg-gray-50 py-16 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">Our Facilities</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide top-notch cricket facilities to ensure you have the best playing experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Professional Cricket Pitch" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Professional Cricket Pitch</h3>
              <p className="text-gray-600 mb-4">
                International standard cricket pitch with perfect bounce and pace for batsmen and bowlers.
              </p>
              <Link to="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
                Book this facility →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/9583339/pexels-photo-9583339.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Practice Nets" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice Nets</h3>
              <p className="text-gray-600 mb-4">
                Multiple practice nets with bowling machines for batsmen to perfect their technique.
              </p>
              <Link to="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
                Book this facility →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 mb-4 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3951353/pexels-photo-3951353.jpeg?auto=compress&cs=tinysrgb&w=1600" 
                  alt="Floodlit Ground" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Floodlit Ground</h3>
              <p className="text-gray-600 mb-4">
                State-of-the-art floodlights for evening matches and practice sessions.
              </p>
              <Link to="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
                Book this facility →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold mb-4">Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transparent pricing with options for different times of the day to suit your schedule.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-primary-50 inline-block px-4 py-1 rounded-full text-primary-700 font-medium text-sm mb-4">
              Standard Hours
            </div>
            <h3 className="text-3xl font-bold mb-2">$30<span className="text-lg font-normal text-gray-500">/hour</span></h3>
            <p className="text-gray-600 mb-6">
              Available from 9 AM to 4 PM on weekdays.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Full ground access
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Basic equipment provided
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Changing rooms
              </li>
            </ul>
            <Link 
              to="/booking" 
              className="block w-full text-center bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors font-semibold px-6 py-3 rounded-lg"
            >
              Book Standard Slot
            </Link>
          </div>
          
          <div className="bg-primary-600 p-8 rounded-xl shadow-md text-white relative transform scale-105">
            <div className="absolute top-0 right-0 bg-secondary-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">
              MOST POPULAR
            </div>
            <div className="bg-white/20 inline-block px-4 py-1 rounded-full text-white font-medium text-sm mb-4">
              Peak Hours
            </div>
            <h3 className="text-3xl font-bold mb-2">$45<span className="text-lg font-normal text-white/80">/hour</span></h3>
            <p className="text-white/80 mb-6">
              Available from 4 PM to 8 PM daily and weekends.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-white">
                <svg className="h-5 w-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Full ground access
              </li>
              <li className="flex items-center text-white">
                <svg className="h-5 w-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Premium equipment
              </li>
              <li className="flex items-center text-white">
                <svg className="h-5 w-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Floodlights included
              </li>
              <li className="flex items-center text-white">
                <svg className="h-5 w-5 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Video recording service
              </li>
            </ul>
            <Link 
              to="/booking" 
              className="block w-full text-center bg-white text-primary-700 hover:bg-gray-100 transition-colors font-semibold px-6 py-3 rounded-lg"
            >
              Book Peak Slot
            </Link>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="bg-primary-50 inline-block px-4 py-1 rounded-full text-primary-700 font-medium text-sm mb-4">
              Off-Peak Hours
            </div>
            <h3 className="text-3xl font-bold mb-2">$25<span className="text-lg font-normal text-gray-500">/hour</span></h3>
            <p className="text-gray-600 mb-6">
              Available from 6 AM to 9 AM and 8 PM to 10 PM.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Full ground access
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Basic equipment provided
              </li>
              <li className="flex items-center text-gray-700">
                <svg className="h-5 w-5 text-primary-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Evening slots include floodlights
              </li>
            </ul>
            <Link 
              to="/booking" 
              className="block w-full text-center bg-white border border-primary-600 text-primary-600 hover:bg-primary-50 transition-colors font-semibold px-6 py-3 rounded-lg"
            >
              Book Off-Peak Slot
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-16 rounded-3xl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold mb-4">What Our Customers Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what cricket enthusiasts have to say about our facilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
                  RM
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Rohit M.</h4>
                  <div className="flex text-yellow-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The booking process was incredibly smooth, and the pitch quality was exceptional. Will definitely be booking again for our team practice sessions."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
                  VP
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Virat P.</h4>
                  <div className="flex text-yellow-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I love the flexibility of booking time slots that work around my schedule. The floodlit evening sessions are perfect after work. Great facilities!"
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
                  SD
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sachin D.</h4>
                  <div className="flex text-yellow-400">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "We organized our corporate cricket tournament here and the staff was extremely helpful. The online booking and payment system made everything hassle-free."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl overflow-hidden">
          <div className="relative px-6 py-16 sm:px-12 lg:px-16">
            <div className="relative max-w-3xl">
              <h2 className="text-3xl font-display font-bold text-white mb-4">
                Ready to Book Your Cricket Turf?
              </h2>
              <p className="text-primary-100 text-lg mb-8">
                Join hundreds of cricket enthusiasts who trust us for their practice and match needs. Book your slot now!
              </p>
              <div className="sm:flex">
                <Link
                  to="/booking"
                  className="block w-full sm:w-auto text-center bg-white text-primary-700 hover:bg-gray-100 transition-colors font-semibold px-8 py-3 rounded-lg mb-4 sm:mb-0 sm:mr-4"
                >
                  Book a Slot
                </Link>
                <Link
                  to="/auth/register"
                  className="block w-full sm:w-auto text-center bg-transparent border-2 border-white text-white hover:bg-white/10 transition-colors font-semibold px-8 py-3 rounded-lg"
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;