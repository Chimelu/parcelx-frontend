import { Truck, Shield, Clock, Users, Award, Target } from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { number: '500K+', label: 'Packages Delivered' },
    { number: '99.9%', label: 'Success Rate' },
    { number: '50+', label: 'Cities Covered' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8 text-yellow-500" />,
      title: 'Reliability',
      description: 'We deliver on our promises with consistent, dependable service that you can count on.'
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-500" />,
      title: 'Speed',
      description: 'Fast delivery times with real-time tracking to keep you informed every step of the way.'
    },
    {
      icon: <Users className="h-8 w-8 text-yellow-500" />,
      title: 'Customer Focus',
      description: 'Your satisfaction is our priority. We go above and beyond to exceed your expectations.'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: 'Excellence',
      description: 'Continuous improvement and innovation to provide the best courier services in America.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <Truck className="h-16 w-16 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            About ParcelX
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Your trusted partner in courier services, delivering excellence across America since 2020.
          </p>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-16 bg-gray-100 relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/4 w-16 h-16 bg-yellow-500/20 rounded-full -translate-y-8"></div>
        <div className="absolute top-0 right-1/4 w-12 h-12 bg-yellow-500/30 rounded-full -translate-y-6"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-amber-900 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Founded in 2020, ParcelX began with a simple mission: to revolutionize the courier industry 
                by providing fast, reliable, and secure delivery services across America. What started as a 
                small local delivery service has grown into a nationwide network trusted by thousands of customers.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We understand that every package represents something important - whether it's a business 
                document, a personal gift, or a critical shipment. That's why we've built our entire 
                operation around delivering not just packages, but peace of mind.
              </p>
              <p className="text-lg text-gray-600">
                Today, ParcelX continues to innovate with cutting-edge technology, sustainable practices, 
                and an unwavering commitment to customer satisfaction. We're not just delivering packages; 
                we're delivering promises.
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
              {/* Decorative Curves */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
              <div className="text-center relative z-10">
                <Target className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 mb-6">
                  To provide exceptional courier services that connect people and businesses across America 
                  with speed, reliability, and care.
                </p>
                <h3 className="text-2xl font-bold text-amber-900 mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600">
                  To be America's most trusted courier service, setting the standard for excellence 
                  in package delivery and customer service.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/3 w-18 h-18 bg-yellow-500/20 rounded-full -translate-y-9"></div>
        <div className="absolute top-0 right-1/3 w-14 h-14 bg-yellow-500/30 rounded-full -translate-y-7"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              By the Numbers
            </h2>
            <p className="text-xl text-gray-600">
              Our commitment to excellence shows in our performance
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/20 rounded-bl-full"></div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                  <div className="text-4xl font-bold text-yellow-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg text-amber-900 font-semibold">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-100 relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/5 w-16 h-16 bg-yellow-500/20 rounded-full -translate-y-8"></div>
        <div className="absolute top-0 right-1/5 w-12 h-12 bg-yellow-500/30 rounded-full -translate-y-6"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-gray-100 relative overflow-hidden">
                {/* Decorative Curve */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/4 w-14 h-14 bg-yellow-500/20 rounded-full -translate-y-7"></div>
        <div className="absolute top-0 right-1/4 w-10 h-10 bg-yellow-500/30 rounded-full -translate-y-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Our Team
            </h2>
            <p className="text-xl text-gray-600">
              Meet the dedicated professionals behind ParcelX
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/20 rounded-bl-full"></div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                <div className="bg-yellow-500 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Leadership Team
                </h3>
                <p className="text-gray-600">
                  Experienced executives with decades of logistics and customer service expertise.
                </p>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute top-0 left-0 w-12 h-12 bg-yellow-500/20 rounded-br-full"></div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-amber-500/10 rounded-tl-full"></div>
                <div className="bg-yellow-500 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🚚</span>
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Delivery Team
                </h3>
                <p className="text-gray-600">
                  Professional drivers and logistics specialists committed to safe, timely deliveries.
                </p>
              </div>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300 relative">
              <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/20 rounded-bl-full"></div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                <div className="bg-yellow-500 w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl">🎧</span>
                </div>
                <h3 className="text-xl font-semibold text-amber-900 mb-2">
                  Support Team
                </h3>
                <p className="text-gray-600">
                  Customer service experts available 24/7 to assist with all your shipping needs.
                </p>
              </div>
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
          <h2 className="text-3xl font-bold mb-4">
            Ready to Experience ParcelX?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ParcelX for their shipping needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Start Shipping Today
            </button>
            <button className="bg-transparent border-2 border-parcelx-gold text-yellow-500 hover:bg-yellow-500 hover:text-amber-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-lg">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
