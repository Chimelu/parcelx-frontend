import { Home, Plane, Zap, Warehouse } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Home className="h-12 w-12 text-yellow-500" />,
      title: "Domestic Delivery",
      description: "Fast and reliable delivery within the United States with same-day and next-day options.",
      features: ["Same-day delivery", "Next-day delivery", "Real-time tracking", "Secure handling"]
    },
    {
      icon: <Plane className="h-12 w-12 text-yellow-500" />,
      title: "International Delivery",
      description: "Global shipping solutions with customs clearance and worldwide delivery coverage.",
      features: ["Global coverage", "Customs clearance", "Express shipping", "Insurance included"]
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-500" />,
      title: "Express Shipping",
      description: "Priority shipping for urgent deliveries with guaranteed time commitments.",
      features: ["Priority handling", "Guaranteed delivery", "Express tracking", "Premium support"]
    },
    {
      icon: <Warehouse className="h-12 w-12 text-yellow-500" />,
      title: "Warehousing & Logistics",
      description: "Complete supply chain solutions including storage, inventory management, and fulfillment.",
      features: ["Secure storage", "Inventory management", "Order fulfillment", "Distribution network"]
    }
  ];

  return (
    <section className="py-16 bg-gray-100 relative">
      {/* Curved Section Divider */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-transparent via-yellow-500 to-transparent rounded-b-full"></div>
      {/* Decorative Curves */}
      <div className="absolute top-0 left-1/5 w-18 h-18 bg-yellow-500/20 rounded-full -translate-y-9"></div>
      <div className="absolute top-0 right-1/5 w-16 h-16 bg-yellow-500/30 rounded-full -translate-y-8"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-slide-in-left">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive courier and logistics solutions tailored to meet your business and personal shipping needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group border border-gray-100 relative overflow-hidden"
            >
              {/* Decorative Curve */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
              <div className="text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-amber-900 mb-3 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-amber-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our logistics experts to discuss your specific shipping requirements and get a personalized quote.
            </p>
            <button className="btn-primary">
              Get Custom Quote
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
