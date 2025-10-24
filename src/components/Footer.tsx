import React from 'react';
import { TrendingUp, Phone, Mail, MapPin, Clock } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo.png" alt="Typhoon Fincon Logo" className="h-8 w-8" />
              <div className="text-xl font-bold">
                Typhoon Fincon
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted financial partner providing comprehensive loan solutions and financial consultancy services. We help you achieve your financial goals with expertise and transparency.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-amber-400" />
                <span className="text-sm">+91 9833560350</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-amber-400" />
                <span className="text-sm">info@typhoonfincare.in</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-amber-400" />
                <span className="text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="/customer" className="text-gray-300 hover:text-amber-400 transition-colors">Apply for Loan</a></li>
              <li><a href="/connector" className="text-gray-300 hover:text-amber-400 transition-colors">Become a Partner</a></li>
              <li><a href="/#about" className="text-gray-300 hover:text-amber-400 transition-colors">About Us</a></li>
              <li><a href="/#services" className="text-gray-300 hover:text-amber-400 transition-colors">Services</a></li>
            </ul>
          </div>

          {/* Office Hours */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-amber-400">Office Hours</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-gray-300">Saturday: 10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-gray-300">Sunday: Closed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2025 Typhoon Finance Consultant. All rights reserved.
            </p>
            <div className="text-sm text-gray-400 mt-4 md:mt-0">
              <span className="mr-4">Privacy Policy</span>
              <span className="mr-4">Terms of Service</span>
              <span>Disclaimer</span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-xs text-gray-500 text-center">
              <strong>Disclaimer:</strong> All loans are subject to credit approval. Interest rates and terms may vary based on creditworthiness and other factors. 
              Please read all terms and conditions carefully before applying. Typhoon Fincare is a registered financial consultant and intermediary service.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;