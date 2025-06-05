import React from 'react';
import { Users } from 'lucide-react';

interface BookingFormProps {
  bookingDetails: {
    name: string;
    phone: string;
    email: string;
    teamSize: string;
    notes: string;
  };
  selectedDate: Date;
  selectedSlot: string | null;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  bookingDetails,
  selectedDate,
  selectedSlot,
  onInputChange
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div>
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
          <span className="font-medium">Date:</span> {formatDate(selectedDate)}
        </p>
        <p className="text-gray-700 text-sm">
          <span className="font-medium">Time:</span> {selectedSlot}
        </p>
      </div>

      <div className="space-y-4">
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
              onChange={onInputChange}
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
              onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
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
            onChange={onInputChange}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Any specific requirements or information"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;