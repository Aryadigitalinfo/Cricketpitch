import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, MapPin, Users, XCircle, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Booking {
  id: string;
  date: Date;
  timeSlot: string;
  facility: string;
  teamSize: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  amount: number;
}

const UserBookingsPage: React.FC = () => {
  // Mock bookings data - in a real app, this would be fetched from an API
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
      timeSlot: '6:00 PM - 7:00 PM',
      facility: 'Main Cricket Ground',
      teamSize: 11,
      status: 'upcoming',
      amount: 45.00
    },
    {
      id: '2',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      timeSlot: '4:00 PM - 5:00 PM',
      facility: 'Practice Nets',
      teamSize: 6,
      status: 'completed',
      amount: 30.00
    },
    {
      id: '3',
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      timeSlot: '7:00 PM - 8:00 PM',
      facility: 'Main Cricket Ground',
      teamSize: 11,
      status: 'cancelled',
      amount: 45.00
    }
  ]);

  const getStatusBadgeClass = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return 'bg-primary-50 text-primary-700 border-primary-200';
      case 'completed':
        return 'bg-success-50 text-success-700 border-success-200';
      case 'cancelled':
        return 'bg-error-50 text-error-700 border-error-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: Booking['status']) => {
    switch (status) {
      case 'upcoming':
        return <Clock className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-display font-bold">My Bookings</h1>
            <Link
              to="/booking"
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
            >
              Book New Slot
            </Link>
          </div>

          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border rounded-lg p-4 sm:p-6 hover:border-primary-200 transition-colors"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                  <div className="flex items-center mb-2 sm:mb-0">
                    <Calendar className="h-5 w-5 text-primary-600 mr-2" />
                    <span className="font-medium">
                      {format(booking.date, 'EEEE, MMMM d, yyyy')}
                    </span>
                  </div>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getStatusBadgeClass(booking.status)}`}>
                    {getStatusIcon(booking.status)}
                    <span className="ml-1.5 text-sm font-medium">
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Time Slot</p>
                      <p className="text-gray-900">{booking.timeSlot}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Facility</p>
                      <p className="text-gray-900">{booking.facility}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-500">Team Size</p>
                      <p className="text-gray-900">{booking.teamSize} players</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="h-5 w-5 flex items-center justify-center text-gray-400 mr-2 mt-0.5">
                      $
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">Amount Paid</p>
                      <p className="text-gray-900">${booking.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {booking.status === 'upcoming' && (
                  <div className="mt-4 pt-4 border-t flex justify-end space-x-4">
                    <button className="text-gray-700 hover:text-gray-900 font-medium">
                      Reschedule
                    </button>
                    <button className="text-error-600 hover:text-error-700 font-medium">
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBookingsPage;