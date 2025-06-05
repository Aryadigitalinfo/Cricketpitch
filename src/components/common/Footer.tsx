import React from 'react';
import { Link } from 'react-router-dom';
import { BrickWall as CricketBall, Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <CricketBall className="h-8 w-8 text-primary-400" />
              <span className="font-display font-bold text-xl">CricketPitch</span>
            </Link>
            <p className="text-gray-400 mb-6">
              Premium cricket turf booking platform. Book your slot for practice, matches, or events with ease.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/booking" className="text-gray-400 hover:text-white transition-colors">
                  Book a Turf
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <span className="font-medium">Monday - Friday:</span> 6:00 AM - 10:00 PM
              </li>
              <li className="text-gray-400">
                <span className="font-medium">Saturday - Sunday:</span> 6:00 AM - 10:00 PM
              </li>
              <li className="text-gray-400">
                <span className="font-medium">Public Holidays:</span> 8:00 AM - 8:00 PM
              </li>
            </ul>
            <p className="mt-4 text-gray-400">
              <span className="text-yellow-400">Note:</span> Hours may vary during seasonal tournaments and maintenance periods.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-400 mr-2 mt-0.5" />
                <span className="text-gray-400">123 Cricket Avenue, Stadium District, Sports City, 12345</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary-400 mr-2" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary-400 mr-2" />
                <a href="mailto:info@cricketpitch.com" className="text-gray-400 hover:text-white transition-colors">
                  info@cricketpitch.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} CricketPitch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;