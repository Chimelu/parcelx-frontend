import Hero from '../components/Hero';
import Services from '../components/Services';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Services />
      
      {/* Why Choose ParcelX Section */}
      <section className="py-16 bg-white relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/4 w-16 h-16 bg-yellow-500/20 rounded-full -translate-y-8"></div>
        <div className="absolute top-0 right-1/4 w-12 h-12 bg-yellow-500/30 rounded-full -translate-y-6"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-slide-in-right">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
              Why Choose ParcelX?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We deliver more than packages - we deliver peace of mind with every shipment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/20 rounded-bl-full"></div>
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Same-day and next-day delivery options across major cities with real-time tracking.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute top-0 left-0 w-12 h-12 bg-yellow-500/20 rounded-br-full"></div>
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                Secure Handling
              </h3>
              <p className="text-gray-600">
                Your packages are protected with advanced security measures and insurance coverage.
              </p>
            </div>

            <div className="text-center group hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute bottom-0 right-0 w-12 h-12 bg-yellow-500/20 rounded-tl-full"></div>
              <div className="bg-yellow-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Round-the-clock customer support to assist you with any questions or concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-900 text-white relative overflow-hidden">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/3 w-20 h-20 bg-yellow-500/20 rounded-full -translate-y-10"></div>
        <div className="absolute top-0 right-1/3 w-14 h-14 bg-yellow-500/30 rounded-full -translate-y-7"></div>
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-yellow-500 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-yellow-500 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 border-2 border-yellow-500 rounded-full animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-scale-in relative">
            {/* Decorative Curves */}
            <div className="absolute -top-4 left-1/4 w-8 h-8 bg-yellow-500/30 rounded-full"></div>
            <div className="absolute -top-2 right-1/4 w-6 h-6 bg-yellow-500/40 rounded-full"></div>
            <div className="absolute -bottom-4 left-1/3 w-10 h-10 bg-yellow-500/20 rounded-full"></div>
            
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Ship?
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust ParcelX for their shipping needs.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:rotate-1">
              Get Started Today
            </button>
            <button className="bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-amber-900 px-8 py-4 rounded-lg font-semibold transition-all duration-300 text-lg transform hover:scale-105 hover:shadow-xl hover:-rotate-1">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
