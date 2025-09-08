import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-amber-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <MessageCircle className="h-16 w-16 text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            We're here to help! Get in touch with our customer support team for any questions or assistance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-gray-600 mb-8">
                Have questions about our services or need help with your shipment? 
                Our customer support team is ready to assist you 24/7.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                {/* Decorative Curves */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-amber-500/10 rounded-tr-full"></div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      Email Support
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Send us an email and we'll respond within 2 hours
                    </p>
                    <a 
                      href="mailto:support@parcelx.com" 
                      className="text-yellow-500 hover:text-yellow-400 transition-colors"
                    >
                      support@parcelx.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                {/* Decorative Curves */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-500/10 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-amber-500/10 rounded-tl-full"></div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      Phone Support
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Call us for immediate assistance
                    </p>
                    <a 
                      href="tel:1-800-PARCELX" 
                      className="text-yellow-500 hover:text-yellow-400 transition-colors"
                    >
                      1-800-PARCELX (727-2359)
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                {/* Decorative Curves */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-12 h-12 bg-amber-500/10 rounded-tr-full"></div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      Headquarters
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Visit our main office
                    </p>
                    <p className="text-gray-600">
                      123 Logistics Drive<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                {/* Decorative Curves */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-yellow-500/10 rounded-br-full"></div>
                <div className="absolute bottom-0 right-0 w-12 h-12 bg-amber-500/10 rounded-tl-full"></div>
                <div className="flex items-start space-x-4">
                  <div className="bg-yellow-500 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-amber-900" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-900 mb-2">
                      Business Hours
                    </h3>
                    <p className="text-gray-600 mb-2">
                      Customer support available 24/7
                    </p>
                    <p className="text-gray-600">
                      Office Hours: Mon-Fri 8AM-6PM EST
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
            {/* Decorative Curves */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
            <h2 className="text-2xl font-bold text-amber-900 mb-6">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-amber-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-parcelx-gold focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-amber-900 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-parcelx-gold focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-amber-900 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-parcelx-gold focus:border-transparent"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-amber-900 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-parcelx-gold focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="tracking">Package Tracking</option>
                    <option value="delivery">Delivery Issues</option>
                    <option value="billing">Billing Questions</option>
                    <option value="services">Service Information</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-amber-900 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-parcelx-gold focus:border-transparent"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2 py-4"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactPage;
