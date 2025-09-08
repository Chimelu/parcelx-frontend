import { Search, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import hero from '../../public/ParcelXHero.png'

const Hero = () => {
  return (
    <section className="relative text-white overflow-hidden min-h-screen flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 hero-background"
        style={{ 
          backgroundImage: `url(${hero})`,
          backgroundRepeat: 'repeat-y',
          backgroundPosition: 'center top',
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
            <div className="mb-6">
              <Truck className="h-16 w-16 text-yellow-500 mx-auto drop-shadow-lg animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              <span className="inline-block animate-pulse">Fast</span>, 
              <span className="inline-block animate-pulse delay-100"> Reliable</span>, and 
              <span> </span> 
              <span className="inline-block animate-pulse delay-200"> Secure</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-yellow-500 animate-fade-in-up delay-300">
              Courier Services Across America
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto mb-8 animate-fade-in-up delay-500">
              Experience seamless package delivery with real-time tracking, 
              secure handling, and exceptional customer service.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-700">
            <Link 
              to="/tracking" 
              className="btn-primary flex items-center space-x-2 text-lg px-8 py-4 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:rotate-1"
            >
              <Search className="h-5 w-5 animate-pulse" />
              <span>Track Your Parcel</span>
            </Link>
            <Link 
              to="/services" 
              className="btn-secondary text-lg px-8 py-4 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:-rotate-1"
            >
              View Services
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center group animate-fade-in-up delay-1000">
              <div className="text-3xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300">99.9%</div>
              <div className="text-gray-200">Delivery Success Rate</div>
            </div>
            <div className="text-center group animate-fade-in-up delay-1100">
              <div className="text-3xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300">24/7</div>
              <div className="text-gray-200">Customer Support</div>
            </div>
            <div className="text-center group animate-fade-in-up delay-1200">
              <div className="text-3xl font-bold text-yellow-500 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-gray-200">Cities Covered</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
