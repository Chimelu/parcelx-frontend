import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-amber-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <img 
                src="/logo3.png" 
                alt="ParcelX Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
            <p className="text-gray-300 mb-4">
              Fast, reliable, and secure courier services across America. 
              Your trusted partner for all shipping needs.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-yellow-500" />
                <span>support@parcelx.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm mt-2">
              <Phone className="h-4 w-4 text-yellow-500" />
              <span>1-800-PARCELX</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-yellow-500 transition-colors">About Us</a></li>
              <li><a href="/services" className="text-gray-300 hover:text-yellow-500 transition-colors">Services</a></li>
              <li><a href="/tracking" className="text-gray-300 hover:text-yellow-500 transition-colors">Track Package</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-yellow-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><span className="text-gray-300">Domestic Delivery</span></li>
              <li><span className="text-gray-300">International Shipping</span></li>
              <li><span className="text-gray-300">Express Delivery</span></li>
              <li><span className="text-gray-300">Warehousing</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 ParcelX. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
