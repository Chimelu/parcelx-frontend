import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 text-white transition-all duration-300 ${
      isScrolled 
        ? 'bg-amber-900/95 backdrop-blur-md shadow-lg border-b border-amber-800/20' 
        : 'bg-gradient-to-r from-amber-900/80 to-amber-900/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2 sm:py-3 lg:py-2">
          {/* Logo */}
          <Link to="/" className="hover:scale-105 transition-transform duration-300 relative">
            <img 
              src="/logo3.png" 
              alt="ParcelX Logo" 
              className="h-16 sm:h-20 lg:h-24 w-auto object-contain drop-shadow-sm"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className={`relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-amber-800/30 ${isActive('/') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500'}`}>
              <span className="relative z-10">Home</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-lg transition-opacity duration-300 ${isActive('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            </Link>
            <Link to="/about" className={`relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-amber-800/30 ${isActive('/about') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500'}`}>
              <span className="relative z-10">About Us</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-lg transition-opacity duration-300 ${isActive('/about') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            </Link>
            <Link to="/services" className={`relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-amber-800/30 ${isActive('/services') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500'}`}>
              <span className="relative z-10">Services</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-lg transition-opacity duration-300 ${isActive('/services') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            </Link>
            <Link to="/tracking" className={`relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-amber-800/30 ${isActive('/tracking') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500'}`}>
              <span className="relative z-10">Tracking</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-lg transition-opacity duration-300 ${isActive('/tracking') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            </Link>
            <Link to="/contact" className={`relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-amber-800/30 ${isActive('/contact') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500'}`}>
              <span className="relative z-10">Contact</span>
              <div className={`absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-amber-600/20 rounded-lg transition-opacity duration-300 ${isActive('/contact') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></div>
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white hover:text-yellow-500 transition-colors duration-200"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'}`}>
          <nav className="flex flex-col space-y-2 pt-4">
            <Link 
              to="/" 
              className={`px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-2 ${isActive('/') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500 hover:bg-amber-800/30'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-2 ${isActive('/about') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500 hover:bg-amber-800/30'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link 
              to="/services" 
              className={`px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-2 ${isActive('/services') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500 hover:bg-amber-800/30'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Services
            </Link>
            <Link 
              to="/tracking" 
              className={`px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-2 ${isActive('/tracking') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500 hover:bg-amber-800/30'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Tracking
            </Link>
            <Link 
              to="/contact" 
              className={`px-4 py-3 rounded-lg transition-all duration-300 transform hover:translate-x-2 ${isActive('/contact') ? 'text-yellow-500 bg-amber-800/30' : 'hover:text-yellow-500 hover:bg-amber-800/30'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
