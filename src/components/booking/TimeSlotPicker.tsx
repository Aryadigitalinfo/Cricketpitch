import React from 'react';
import { format, addHours, startOfDay, isBefore } from 'date-fns';
import { Clock, CloudRain } from 'lucide-react';
import { useWeather } from '../../contexts/WeatherContext';

interface TimeSlot {
  time: string;
  timeEnd: string;
  fullTime: Date;
  isBooked: boolean;
  isPastSlot: boolean;
  isPlayable: boolean;
  pricingTier: 'peak' | 'standard' | 'off-peak';
  price: number;
}

interface TimeSlotPickerProps {
  selectedDate: Date;
  selectedSlot: string | null;
  onSelectSlot: (slot: TimeSlot) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedDate,
  selectedSlot,
  onSelectSlot,
}) => {
  const { getWeatherForDate } = useWeather();

  // Generate time slots from 6 AM to 10 PM
  const generateTimeSlots = () => {
    const slots: TimeSlot[] = [];
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
      let pricingTier: 'peak' | 'standard' | 'off-peak' = 'standard';
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

  const getSlotStatusClass = (slot: TimeSlot) => {
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

  const handleSlotSelection = (slot: TimeSlot) => {
    if (slot.isPastSlot || slot.isBooked || !slot.isPlayable) return;
    onSelectSlot(slot);
  };

  const timeSlots = generateTimeSlots();

  return (
    <div>
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
    </div>
  );
};

export default TimeSlotPicker;