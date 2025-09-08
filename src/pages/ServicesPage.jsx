import { Home, Plane, Zap, Warehouse, CheckCircle, Clock, Shield, Truck } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: <Home className="h-12 w-12 text-yellow-500" />,
      title: "Domestic Delivery",
      description: "Fast and reliable delivery within the United States with same-day and next-day options.",
      features: [
        "Same-day delivery available",
        "Next-day delivery nationwide",
        "Real-time tracking",
        "Secure handling",
        "Insurance coverage",
        "Proof of delivery"
      ],
      pricing: "Starting at $8.99"
    },
    {
      icon: <Plane className="h-12 w-12 text-yellow-500" />,
      title: "International Delivery",
      description: "Global shipping solutions with customs clearance and worldwide delivery coverage.",
      features: [
        "Global coverage to 200+ countries",
        "Customs clearance included",
        "Express shipping options",
        "Insurance up to $5,000",
        "Duty and tax calculation",
        "Package consolidation"
      ],
      pricing: "Starting at $24.99"
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-500" />,
      title: "Express Shipping",
      description: "Priority shipping for urgent deliveries with guaranteed time commitments.",
      features: [
        "Priority handling",
        "Guaranteed delivery times",
        "Express tracking",
        "Premium customer support",
        "Weekend delivery",
        "Time-specific delivery"
      ],
      pricing: "Starting at $15.99"
    },
    {
      icon: <Warehouse className="h-12 w-12 text-yellow-500" />,
      title: "Warehousing & Logistics",
      description: "Complete supply chain solutions including storage, inventory management, and fulfillment.",
      features: [
        "Secure climate-controlled storage",
        "Inventory management system",
        "Order fulfillment services",
        "Distribution network",
        "Pick and pack services",
        "Returns processing"
      ],
      pricing: "Custom pricing"
    }
  ];

  const benefits = [
    {
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      title: "99.9% Success Rate",
      description: "Industry-leading delivery success rate with comprehensive tracking"
    },
    {
      icon: <Clock className="h-8 w-8 text-yellow-500" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your shipping needs"
    },
    {
      icon: <Shield className="h-8 w-8 text-amber-900" />,
      title: "Secure Handling",
      description: "Advanced security measures and insurance coverage for peace of mind"
    },
    {
      icon: <Truck className="h-8 w-8 text-yellow-500" />,
      title: "Fast Delivery",
      description: "Same-day and next-day delivery options across major metropolitan areas"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Our Services
          </h1>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Comprehensive courier and logistics solutions tailored to meet your business and personal shipping needs.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <section className="py-16 bg-gray-100 relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/4 w-16 h-16 bg-yellow-500/20 rounded-full -translate-y-8"></div>
        <div className="absolute top-0 right-1/4 w-12 h-12 bg-yellow-500/30 rounded-full -translate-y-6"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-gray-100 relative overflow-hidden">
                {/* Decorative Curve */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                <div className="text-center mb-6 relative z-10">
                  <div className="group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-amber-900 mt-4 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="text-xl font-bold text-yellow-500 mb-6">
                    {service.pricing}
                  </div>
                </div>
                
                <div className="space-y-3 mb-8">
                  <h4 className="font-semibold text-amber-900 mb-3">What's Included:</h4>
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full btn-primary">
                  Get Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/3 w-18 h-18 bg-yellow-500/20 rounded-full -translate-y-9"></div>
        <div className="absolute top-0 right-1/3 w-14 h-14 bg-yellow-500/30 rounded-full -translate-y-7"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Why Choose ParcelX Services?
            </h2>
            <p className="text-xl text-gray-600">
              Experience the difference with our comprehensive service benefits
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform duration-300 relative">
                <div className="absolute top-0 right-0 w-12 h-12 bg-yellow-500/20 rounded-bl-full"></div>
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 relative overflow-hidden">
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                  <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-amber-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Comparison */}
      <section className="py-16 bg-gray-100 relative">
        {/* Curved Section Divider */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
        {/* Decorative Curves */}
        <div className="absolute top-0 left-1/5 w-16 h-16 bg-yellow-500/20 rounded-full -translate-y-8"></div>
        <div className="absolute top-0 right-1/5 w-12 h-12 bg-yellow-500/30 rounded-full -translate-y-6"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-amber-900 mb-4">
              Service Comparison
            </h2>
            <p className="text-xl text-gray-600">
              Choose the right service for your shipping needs
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
            {/* Decorative Curves */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-amber-900 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Service</th>
                    <th className="px-6 py-4 text-center">Domestic</th>
                    <th className="px-6 py-4 text-center">International</th>
                    <th className="px-6 py-4 text-center">Express</th>
                    <th className="px-6 py-4 text-center">Warehousing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 font-medium text-amber-900">Delivery Time</td>
                    <td className="px-6 py-4 text-center">1-3 days</td>
                    <td className="px-6 py-4 text-center">3-7 days</td>
                    <td className="px-6 py-4 text-center">Same day</td>
                    <td className="px-6 py-4 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-amber-900">Tracking</td>
                    <td className="px-6 py-4 text-center">✓</td>
                    <td className="px-6 py-4 text-center">✓</td>
                    <td className="px-6 py-4 text-center">✓</td>
                    <td className="px-6 py-4 text-center">✓</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-amber-900">Insurance</td>
                    <td className="px-6 py-4 text-center">$100</td>
                    <td className="px-6 py-4 text-center">$5,000</td>
                    <td className="px-6 py-4 text-center">$500</td>
                    <td className="px-6 py-4 text-center">Custom</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-medium text-amber-900">Support</td>
                    <td className="px-6 py-4 text-center">24/7</td>
                    <td className="px-6 py-4 text-center">24/7</td>
                    <td className="px-6 py-4 text-center">Premium</td>
                    <td className="px-6 py-4 text-center">Dedicated</td>
                  </tr>
                </tbody>
              </table>
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
            Ready to Ship?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Get a personalized quote for your shipping needs and experience the ParcelX difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-primary text-lg px-8 py-4">
              Get Quote Now
            </button>
            <button className="bg-transparent border-2 border-parcelx-gold text-yellow-500 hover:bg-yellow-500 hover:text-amber-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 text-lg">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
