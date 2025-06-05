import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CalendarDays, BarChart, Settings, LogOut, BrickWall as CricketBall } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  const { logout } = useAuth();
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Bookings', href: '/admin/bookings', icon: CalendarDays },
    { name: 'Reports', href: '/admin/reports', icon: BarChart },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <Link to="/admin" className="flex items-center space-x-2">
          <CricketBall className="h-6 w-6 text-primary-600" />
          <span className="text-lg font-medium text-gray-900">Admin Panel</span>
        </Link>
      </div>
      
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`
                flex items-center px-4 py-3 text-sm font-medium rounded-md 
                ${isActive(item.href) 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'}
              `}
            >
              <item.icon 
                className={`h-5 w-5 mr-3 ${
                  isActive(item.href) ? 'text-primary-600' : 'text-gray-400'
                }`} 
              />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-primary-700 w-full"
        >
          <LogOut className="h-5 w-5 mr-3 text-gray-400" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;