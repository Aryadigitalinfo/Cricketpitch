import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Share2, Download, ArrowLeft } from 'lucide-react';

const BookingConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock booking data - in a real app, this would be fetched from an API
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    // Simulate API call to get booking details
    const fetchBooking = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock booking data
        const mockBooking = {
          id: id || '123',
          bookingNumber: 'BK' + Math.floor(100000 + Math.random() * 900000),
          date: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
          timeSlot: '6:00 PM - 7:00 PM',
          facility: 'Main Cricket Ground',
          amount: 45.00,
          status: 'confirmed',
          player: {
            name: 'John Smith',
            email: 'john.smith@example.com',
            phone: '+1234567890',
            teamSize: 11
          },
          paymentMethod: 'Credit Card',
          paymentId: 'PAY' + Math.floor(100000 + Math.random() * 900000),
        };
        
        setBooking(mockBooking);
      } catch (error) {
        console.error('Error fetching booking:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooking();
  }, [id]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-gray-600">Loading booking details...</p>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <div className="bg-error-50 text-error-700 p-4 rounded-lg mb-4">
          <p>Booking not found. Please check the booking ID and try again.</p>
        </div>
        <Link to="/booking" className="text-primary-600 hover:text-primary-700 font-medium">
          Return to Booking Page
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-16 h-16 bg-success-100 rounded-full mb-4">
          <CheckCircle className="h-8 w-8 text-success-600" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-gray-600">
          Your cricket turf has been successfully booked. Check your email for the confirmation.
        </p>
      </div>

      {/* Booking Details Card */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-8">
        <div className="bg-primary-600 px-6 py-4 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Booking #{booking.bookingNumber}</h2>
            <span className="bg-white text-primary-700 px-3 py-1 rounded-full text-sm font-medium">
              {booking.status.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">DATE & TIME</h3>
              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">{formatDate(booking.date)}</p>
                  <p className="text-gray-600">{booking.timeSlot}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">LOCATION</h3>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-600 mr-2 mt-0.5" />
                <div>
                  <p className="font-medium">{booking.facility}</p>
                  <p className="text-gray-600">123 Cricket Avenue, Sports City</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">PLAYER INFORMATION</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Name</p>
                <p className="text-gray-700">{booking.player.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Team Size</p>
                <p className="text-gray-700">{booking.player.teamSize} players</p>
              </div>
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-gray-700">{booking.player.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-gray-700">{booking.player.phone}</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">PAYMENT DETAILS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Amount Paid</p>
                <p className="text-gray-700">${booking.amount.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Payment Method</p>
                <p className="text-gray-700">{booking.paymentMethod}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Payment ID</p>
                <p className="text-gray-700">{booking.paymentId}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Status</p>
                <p className="text-success-600 font-medium">Paid</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 mb-8">
        <button className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="h-5 w-5 mr-2" />
          Download Receipt
        </button>
        <button className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          <Calendar className="h-5 w-5 mr-2" />
          Add to Calendar
        </button>
        <button className="flex-1 flex items-center justify-center bg-white border border-gray-300 text-gray-700 font-medium px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors">
          <Share2 className="h-5 w-5 mr-2" />
          Share
        </button>
      </div>

      {/* Important Information */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold mb-3">Important Information</h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            Please arrive 15 minutes before your scheduled slot for check-in.
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            Bring your own cricket equipment if possible, though basic equipment is available.
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            Free cancellation up to 24 hours before your booking. See our cancellation policy for details.
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            In case of severe weather, we'll contact you about rescheduling options.
          </li>
          <li className="flex items-start">
            <span className="text-primary-600 mr-2">•</span>
            Please follow all ground rules and safety guidelines during your session.
          </li>
        </ul>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Link 
          to="/" 
          className="inline-flex items-center text-gray-700 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
        <Link 
          to="/bookings" 
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          View All Bookings
          <ArrowLeft className="h-4 w-4 ml-2 rotate-180" />
        </Link>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;