import React from 'react';
import { format, addDays } from 'date-fns';
import { Calendar } from 'lucide-react';

interface DatePickerProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  numberOfDays?: number;
}

const DatePicker: React.FC<DatePickerProps> = ({
  selectedDate,
  onSelectDate,
  numberOfDays = 14
}) => {
  // Generate dates for the calendar
  const generateCalendarDates = () => {
    const today = new Date();
    return Array.from({ length: numberOfDays }, (_, i) => addDays(today, i));
  };

  const calendarDates = generateCalendarDates();

  return (
    <div>
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
              onClick={() => onSelectDate(date)}
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
    </div>
  );
};

export default DatePicker;