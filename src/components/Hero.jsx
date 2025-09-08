import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import hero from '../../public/ParcelXHero.png'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    successRate: 0,
    cities: 0,
    support: '24/7'
  });
  const statsRef = useRef(null);

  // Intersection Observer to trigger animation when stats come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          startCounting();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isVisible]);

  const startCounting = () => {
    // Animate success rate from 0 to 99.9
    const successRateInterval = setInterval(() => {
      setCounts(prev => {
        if (prev.successRate < 99.9) {
          return { ...prev, successRate: prev.successRate + 0.1 };
        } else {
          clearInterval(successRateInterval);
          return { ...prev, successRate: 99.9 };
        }
      });
    }, 20);

    // Animate cities from 0 to 50
    const citiesInterval = setInterval(() => {
      setCounts(prev => {
        if (prev.cities < 50) {
          return { ...prev, cities: prev.cities + 1 };
        } else {
          clearInterval(citiesInterval);
          return { ...prev, cities: 50 };
        }
      });
    }, 40);
  };
  return (
    <section className="relative text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 hero-background"
        style={{ 
          backgroundImage: `url(${hero})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundAttachment: 'scroll'
        }}
      ></div>
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/80 to-amber-900/60"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-32 h-32 border-2 border-yellow-500 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border-2 border-yellow-500 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-2 border-yellow-500 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full">
        <div className="text-center relative z-10">
          {/* Hero Content */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-fade-in-up leading-tight">
              <span className="block text-white mb-2">Premium</span>
              <span className="block text-yellow-500">Logistics Solutions</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-light mb-6 text-gray-200 animate-fade-in-up delay-300 max-w-4xl mx-auto leading-relaxed">
              Delivering excellence across America with precision, reliability, and unmatched service quality
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-10 animate-fade-in-up delay-500 leading-relaxed">
              Trusted by businesses nationwide, we provide comprehensive shipping solutions 
              backed by cutting-edge technology and dedicated customer support.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in-up delay-700">
            <Link 
              to="/tracking" 
              className="bg-yellow-500 hover:bg-yellow-400 text-amber-900 px-10 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-3 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <Search className="h-5 w-5" />
              <span>Track Shipment</span>
            </Link>
            <Link 
              to="/services" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-900 px-10 py-4 rounded-lg font-semibold transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Explore Solutions
            </Link>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-20">
            <div className="text-center group animate-fade-in-up delay-1000">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300 mb-2">
                {counts.successRate.toFixed(1)}%
              </div>
              <div className="text-gray-200 text-lg font-medium">Delivery Success Rate</div>
              <div className="text-gray-400 text-sm mt-1">Industry-leading reliability</div>
            </div>
            <div className="text-center group animate-fade-in-up delay-1100">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300 mb-2">
                {counts.support}
              </div>
              <div className="text-gray-200 text-lg font-medium">Customer Support</div>
              <div className="text-gray-400 text-sm mt-1">Always available</div>
            </div>
            <div className="text-center group animate-fade-in-up delay-1200">
              <div className="text-4xl md:text-5xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300 mb-2">
                {counts.cities}+
              </div>
              <div className="text-gray-200 text-lg font-medium">Cities Covered</div>
              <div className="text-gray-400 text-sm mt-1">Nationwide network</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
