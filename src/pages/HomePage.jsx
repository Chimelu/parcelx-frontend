import Hero from '../components/Hero';
import Services from '../components/Services';
import { Shield, Clock, Users, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Services />
      
      {/* Why Choose ParcelX Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-amber-900 mb-6">
              Enterprise-Grade Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Built for businesses that demand reliability, security, and exceptional service quality
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
                  Advanced Security
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Multi-layered security protocols with comprehensive insurance coverage and real-time monitoring.
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
                  Precision Timing
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Guaranteed delivery windows with predictive analytics and optimized routing algorithms.
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
                  Dedicated Support
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Personal account managers and 24/7 technical support for enterprise clients.
                </p>
              </div>
            </div>

            <div className="group hover:scale-105 transition-all duration-300">
              <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
                <div className="bg-gradient-to-br from-yellow-500 to-amber-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-amber-900 mb-4 text-center">
                  Industry Recognition
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  Certified excellence with ISO standards and industry-leading performance metrics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Transform Your Logistics Operations
            </h2>
            <p className="text-xl text-gray-200 mb-12 leading-relaxed">
              Partner with America's most trusted logistics provider and experience 
              the difference that enterprise-grade solutions can make for your business.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <span className="text-lg">No Setup Fees</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <span className="text-lg">Volume Discounts</span>
              </div>
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <span className="text-lg">Custom Solutions</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/services"
                className="bg-yellow-500 hover:bg-yellow-400 text-amber-900 px-10 py-4 rounded-lg font-semibold transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-3"
              >
                <span>Start Your Journey</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                to="/contact"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-amber-900 px-10 py-4 rounded-lg font-semibold transition-all duration-300 text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
