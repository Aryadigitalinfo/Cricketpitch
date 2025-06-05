import React, { useState } from 'react';
import { Bell, Menu, User, Search } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminHeader: React.FC = () => {
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 z-10">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search bookings, users..."
              />
            </div>
          </div>

          {/* Right section */}
          <div className="ml-4 flex items-center md:ml-6">
            {/* Notifications */}
            <button className="p-1 text-gray-400 rounded-full hover:text-gray-700 focus:outline-none relative">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-error-500"></span>
            </button>

            {/* Profile dropdown */}
            <div className="ml-3 relative">
              <div className="flex items-center">
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</div>
                  <div className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</div>
                </div>
                <div className="ml-3 flex-shrink-0 bg-primary-100 rounded-full p-1">
                  <User className="h-8 w-8 text-primary-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 py-3 space-y-1">
            <a
              href="/admin"
              className="block px-3 py-2 rounded-md text-base font-medium text-primary-700 bg-primary-50"
            >
              Dashboard
            </a>
            <a
              href="/admin/bookings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
            >
              Bookings
            </a>
            <a
              href="/admin/reports"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
            >
              Reports
            </a>
            <a
              href="/admin/settings"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-700 hover:bg-gray-50"
            >
              Settings
            </a>
          </div>
          
          {/* Search in mobile menu */}
          <div className="px-2 py-4 border-t border-gray-200">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search bookings, users..."
              />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default AdminHeader;