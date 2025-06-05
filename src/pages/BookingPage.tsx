import React, { useState } from 'react';
import { format, addDays, addHours, setHours, startOfDay, getHours, isBefore, isAfter } from 'date-fns';
import { Calendar, ArrowLeft, ArrowRight, Clock, Users, Info, Sun, CloudRain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '../contexts/WeatherContext';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { getWeatherForDate } = useWeather();

  // State for selected date and time slot
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  // State for booking details
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    email: '',
    teamSize: '11',
    notes: '',
  });

  // Generate dates for the calendar
  const generateCalendarDates = () => {
    const today = new Date();
    return Array.from({ length: 14 }, (_, i) => addDays(today, i));
  };

  // Generate time slots from 6 AM to 10 PM
  const generateTimeSlots = () => {
    const slots = [];
    const baseDate = startOfDay(selectedDate);
    
    for (let i = 6; i < 22; i++) {
      const slotTime = addHours(baseDate, i);
      const slotTimeEnd = addHours(baseDate, i + 1);
      
      // Check if slot is in the past
      const isPastSlot = isBefore(slotTime, new Date());
      
      // Get weather data for the time slot
      const weatherData = getWeatherForDate(slotTime);
      const isPlayable = weatherData ? weatherData.isPlayable : true;
      
      // Randomly determine if slot is booked (for demo purposes)
      const isBooked = Math.random() > 0.7;
      
      // Determine slot pricing tier
      let pricingTier = 'standard';
      let price = 30;
      
      if (i >= 16 && i < 20) {
        pricingTier = 'peak';
        price = 45;
      } else if (i < 9 || i >= 20) {
        pricingTier = 'off-peak';
        price = 25;
      }
      
      slots.push({
        time: format(slotTime, 'h:mm a'),
        timeEnd: format(slotTimeEnd, 'h:mm a'),
        fullTime: slotTime,
        isBooked,
        isPastSlot,
        isPlayable,
        pricingTier,
        price,
      });
    }
    
    return slots;
  };

  const getSlotStatusClass = (slot: any) => {
    if (slot.isPastSlot) return 'bg-gray-100 text-gray-400 cursor-not-allowed';
    if (slot.isBooked) return 'bg-gray-100 text-gray-400 cursor-not-allowed';
    if (!slot.isPlayable) return 'bg-warning-50 text-warning-700 cursor-not-allowed';
    if (selectedSlot === slot.time) return 'bg-primary-600 text-white';
    
    switch (slot.pricingTier) {
      case 'peak':
        return 'bg-white border-2 border-primary-600 text-primary-800 hover:bg-primary-50';
      case 'off-peak':
        return 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50';
      default:
        return 'bg-white border border-gray-300 text-gray-800 hover:bg-gray-50';
    }
  };

  const handleSlotSelection = (slot: any) => {
    if (slot.isPastSlot || slot.isBooked || !slot.isPlayable) return;
    setSelectedSlot(slot.time);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (step === 1 && selectedSlot) {
      setStep(2);
    } else if (step === 2) {
      // Simulate booking confirmation
      navigate('/booking/confirmation/123');
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    }
  };

  const calendarDates = generateCalendarDates();
  const timeSlots = generateTimeSlots();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold mb-2">Book Your Cricket Turf</h1>
        <p className="text-gray-600">
          Select your preferred date and time slot for booking
        </p>
      </div>

      {/* Booking Steps */}
      <div className="mb-8">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">Select Slot</div>
            </div>
          </div>
          <div className={`flex-1 h-1 mx-4 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
              step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">Player Details</div>
            </div>
          </div>
          <div className="flex-1 h-1 mx-4 bg-gray-200"></div>
          <div className="flex items-center">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 text-gray-500">
              3
            </div>
            <div className="ml-2">
              <div className="text-sm font-medium">Confirmation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step 1: Date and Time Selection */}
      {step === 1 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-primary-600" />
            Select Date
          </h2>
          
          <div className="flex overflow-x-auto pb-4 mb-6 -mx-2">
            {calendarDates.map((date, index) => (
              <div key={index} className="px-2 flex-shrink-0">
                <button
                  className={`w-20 py-3 rounded-lg border ${
                    format(selectedDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
                      ? 'bg-primary-600 text-white border-primary-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-primary-400'
                  } flex flex-col items-center transition-colors`}
                  onClick={() => setSelectedDate(date)}
                >
                  <span className="text-xs font-medium mb-1">
                    {format(date, 'EEE')}
                  </span>
                  <span className="text-lg font-bold">
                    {format(date, 'd')}
                  </span>
                  <span className="text-xs">
                    {format(date, 'MMM')}
                  </span>
                </button>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-primary-600" />
            Select Time Slot
          </h2>

          <div className="mb-4 flex items-center text-sm font-medium">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-primary-600 rounded-full mr-1"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-white border-2 border-primary-600 rounded-full mr-1"></div>
              <span>Peak ($45)</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-white border border-gray-300 rounded-full mr-1"></div>
              <span>Standard ($30)</span>
            </div>
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-gray-100 rounded-full mr-1"></div>
              <span>Unavailable</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 mb-6">
            {timeSlots.map((slot, index) => (
              <div 
                key={index}
                className={`${getSlotStatusClass(slot)} rounded-lg p-3 cursor-pointer transition-colors`}
                onClick={() => handleSlotSelection(slot)}
              >
                <div className="text-center">
                  <p className="font-medium">{slot.time} - {slot.timeEnd}</p>
                  {!slot.isPastSlot && !slot.isBooked && slot.isPlayable && (
                    <p className="text-sm mt-1">
                      ${slot.price}
                      {slot.pricingTier === 'peak' && <span className="text-xs ml-1">(Peak)</span>}
                      {slot.pricingTier === 'off-peak' && <span className="text-xs ml-1">(Off-peak)</span>}
                    </p>
                  )}
                  {slot.isBooked && <p className="text-xs mt-1">Booked</p>}
                  {!slot.isPlayable && (
                    <div className="flex items-center justify-center text-xs mt-1">
                      <CloudRain className="h-3 w-3 mr-1" />
                      Weather Alert
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div>
              {selectedSlot && (
                <div className="text-gray-700">
                  <span className="font-medium">Selected:</span> {format(selectedDate, 'EEEE, MMMM d')} at {selectedSlot}
                </div>
              )}
            </div>
            <button
              className={`bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors ${
                !selectedSlot ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleContinue}
              disabled={!selectedSlot}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Player Details */}
      {step === 2 && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-600" />
              Player Details
            </h2>
            <p className="text-gray-600 text-sm">
              Please fill in your details to complete the booking
            </p>
          </div>

          <div className="mb-4 p-4 bg-primary-50 rounded-lg">
            <h3 className="font-medium mb-2">Booking Summary</h3>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Date:</span> {format(selectedDate, 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-medium">Time:</span> {selectedSlot}
            </p>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={bookingDetails.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={bookingDetails.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={bookingDetails.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your email address"
                required
              />
            </div>
            
            <div>
              <label htmlFor="teamSize" className="block text-sm font-medium text-gray-700 mb-1">
                Team Size
              </label>
              <select
                id="teamSize"
                name="teamSize"
                value={bookingDetails.teamSize}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="5">5 players (5-a-side)</option>
                <option value="6">6 players (6-a-side)</option>
                <option value="8">8 players (8-a-side)</option>
                <option value="11">11 players (Full team)</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={bookingDetails.notes}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Any specific requirements or information"
              ></textarea>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <button
              className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
              onClick={handleBack}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </button>
            <button
              className={`bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors ${
                !bookingDetails.name || !bookingDetails.phone || !bookingDetails.email ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleContinue}
              disabled={!bookingDetails.name || !bookingDetails.phone || !bookingDetails.email}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}

      {/* Cancellation Policy */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-start">
          <Info className="h-5 w-5 text-gray-500 mt-1 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-semibold mb-2">Cancellation Policy</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Free cancellation up to 24 hours before the booking time.</li>
              <li>• 50% refund for cancellations between 12-24 hours before booking time.</li>
              <li>• No refund for cancellations less than 12 hours before booking time.</li>
              <li>• Full refund in case of severe weather conditions (determined by management).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;