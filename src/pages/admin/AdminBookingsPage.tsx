import React from 'react';

const AdminBookingsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingsPage;