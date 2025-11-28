import { useState } from 'react';
import { Search, Package, Truck, MapPin, UserCheck, CheckCircle, Calendar, Clock, Users, Mail, Phone, Building2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to get timeline status icon
  const getTimelineStatusIcon = (status) => {
    switch (status) {
      case 'Order Placed':
        return <Package className="h-6 w-6" />;
      case 'In Transit':
        return <Truck className="h-6 w-6" />;
      case 'At Destination Hub':
        return <Building2 className="h-6 w-6" />;
      case 'Out for Delivery':
        return <UserCheck className="h-6 w-6" />;
      case 'Delivered':
        return <CheckCircle className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  // Helper function to get current status from timeline
  const getCurrentStatus = (timeline) => {
    if (!timeline || timeline.length === 0) return 'Order Placed';
    return timeline[timeline.length - 1].status;
  };

  // Helper function to transform API data to frontend format
  const transformApiData = (apiOrder) => {
    const currentStatus = getCurrentStatus(apiOrder.timeline);
    const expectedDeliveryDate = new Date(apiOrder.shipping.expectedDelivery);
    
    // All timeline events are completed since they're in the history
    const timelineLength = apiOrder.timeline ? apiOrder.timeline.length : 0;
    
    return {
      trackingId: apiOrder.trackingId,
      status: currentStatus.toLowerCase().replace(/\s+/g, '-'),
      shippingInfo: {
        from: apiOrder.shipping.from || 'Origin location',
        to: apiOrder.shipping.to || 'Destination location'
      },
      customerInfo: {
        name: apiOrder.customer.name,
        email: apiOrder.customer.email,
        phone: apiOrder.customer.phone,
        address: apiOrder.customer.address
      },
      expectedDelivery: {
        date: expectedDeliveryDate.toISOString().split('T')[0],
        day: expectedDeliveryDate.toLocaleDateString('en-US', { weekday: 'long' }),
        time: 'By 6:00 PM'
      },
      packageInfo: {
        type: apiOrder.package.type,
        weight: apiOrder.package.weight,
        dimensions: apiOrder.package.dimensions
      },
      timeline: (apiOrder.timeline || []).map((event, index) => ({
        status: event.status,
        icon: getTimelineStatusIcon(event.status),
        // All events in timeline are completed (they've already happened)
        completed: true,
        date: new Date(event.date).toISOString().split('T')[0],
        time: event.time || '00:00',
        location: event.location,
        proofOfDelivery: event.proofOfDelivery || null
      }))
    };
  };

  const handleTrackPackage = async (e) => {
    e.preventDefault();
    
    if (!trackingId.trim()) {
      toast.error('Please enter a tracking ID');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(`https://parcelx-backend.vercel.app/api/orders/track/${trackingId.trim().toUpperCase()}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Order not found with this tracking ID');
        } else {
          toast.error('Failed to fetch tracking information');
        }
        setIsLoading(false);
        return;
      }

      const data = await response.json();
      const transformedData = transformApiData(data.order);
      setTrackingResult(transformedData);
      toast.success('Tracking information loaded successfully');
      
    } catch (error) {
      console.error('Tracking error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-500';
      case 'in-transit': return 'text-yellow-500';
      case 'pending': return 'text-gray-500';
      default: return 'text-amber-900';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-amber-900 mb-4">
            Track Your Package
          </h1>
          <p className="text-xl text-gray-600">
            Enter your tracking number to get real-time updates on your shipment
          </p>
        </div>

        {/* Tracking Search */}
        {!trackingResult && (
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 relative overflow-hidden">
            {/* Decorative Curves */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
            <form onSubmit={handleTrackPackage} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter tracking number (e.g., PX123456789)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center justify-center space-x-2 px-8 py-3"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-900"></div>
                    <span>Tracking...</span>
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5" />
                    <span>Track Package</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-8">
            {/* Track Another Package Button */}
            <div className="text-center">
              <button
                onClick={() => {
                  setTrackingResult(null);
                  setTrackingId('');
                }}
                className="btn-secondary flex items-center justify-center space-x-2 mx-auto"
              >
                <Search className="h-4 w-4" />
                <span>Track Another Package</span>
              </button>
            </div>
            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 relative overflow-hidden">
              {/* Decorative Curves */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-6">
                Customer Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-amber-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Customer Name</div>
                      <div className="font-semibold text-amber-900">{trackingResult.customerInfo.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Mail className="h-5 w-5 text-amber-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email Address</div>
                      <div className="font-semibold text-amber-900">{trackingResult.customerInfo.email}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <Phone className="h-5 w-5 text-amber-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Phone Number</div>
                      <div className="font-semibold text-amber-900">{trackingResult.customerInfo.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                      <MapPin className="h-5 w-5 text-amber-900" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Delivery Address</div>
                      <div className="font-semibold text-amber-900">{trackingResult.customerInfo.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Status */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 relative overflow-hidden">
              {/* Decorative Curves */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-amber-900">
                    Package Status
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">Tracking ID: {trackingResult.trackingId}</p>
                </div>
                <div className="text-left sm:text-right">
                  <div className={`text-xl sm:text-2xl font-bold ${getStatusColor(trackingResult.status)}`}>
                    {trackingResult.status.charAt(0).toUpperCase() + trackingResult.status.slice(1)}
                  </div>
                  <div className="flex items-start sm:items-center text-gray-600 mt-2">
                    <Calendar className="h-4 w-4 mr-2 mt-1 sm:mt-0 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-sm sm:text-base">Expected Delivery:</div>
                      <div className="text-xs sm:text-sm">{trackingResult.expectedDelivery.day}, {trackingResult.expectedDelivery.date}</div>
                      <div className="text-xs sm:text-sm text-yellow-600">{trackingResult.expectedDelivery.time}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Route Information */}
              <div className="mb-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-amber-900 mb-3 text-sm sm:text-base flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Shipping Route
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Origin (From)</div>
                    <div className="font-semibold text-amber-900 text-sm sm:text-base">{trackingResult.shippingInfo.from}</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Destination (To)</div>
                    <div className="font-semibold text-amber-900 text-sm sm:text-base">{trackingResult.shippingInfo.to}</div>
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base">Package Type</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{trackingResult.packageInfo.type}</p>
                </div>
                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base">Weight</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{trackingResult.packageInfo.weight}</p>
                </div>
                <div className="bg-gray-100 p-3 sm:p-4 rounded-lg sm:col-span-2 lg:col-span-1">
                  <h3 className="font-semibold text-amber-900 mb-2 text-sm sm:text-base">Dimensions</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{trackingResult.packageInfo.dimensions}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 relative overflow-hidden">
              {/* Decorative Curves */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-500/10 rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-amber-500/10 rounded-tl-full"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-amber-900 mb-6 px-2 sm:px-0">
                Delivery Timeline
              </h2>
              <div className="relative">
                {/* Connecting Line - Green for completed events */}
                {trackingResult.timeline.length > 0 && (
                  <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-green-500"></div>
                )}
                <div className="space-y-6">
                  {trackingResult.timeline.map((step, index) => (
                    <div key={index} className="relative flex items-start space-x-4">
                      {/* Status Icon with Line Connection */}
                      <div className="relative flex-shrink-0">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                          step.completed 
                            ? 'bg-green-500 text-white shadow-lg ring-2 ring-green-200' 
                            : 'bg-gray-200 text-gray-500'
                        }`}>
                          {step.completed ? step.icon : <Clock className="h-6 w-6" />}
                        </div>
                        {/* Connecting line to next item - Green for completed events */}
                        {index < trackingResult.timeline.length - 1 && (
                          <div className={`absolute top-12 left-1/2 transform -translate-x-1/2 w-0.5 h-6 transition-colors duration-300 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`}></div>
                        )}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                          <h3 className={`text-base sm:text-lg font-semibold ${
                            step.completed ? 'text-amber-900' : 'text-gray-500'
                          }`}>
                            {step.status}
                          </h3>
                          <div className="text-xs sm:text-sm text-gray-500">
                            {step.date} at {step.time}
                          </div>
                        </div>
                        {step.location && (
                          <p className="text-sm sm:text-base text-gray-600 mt-1 flex items-center">
                            <MapPin className="h-4 w-4 mr-1.5 text-amber-600 flex-shrink-0" />
                            <span>{step.location}</span>
                          </p>
                        )}
                        
                        {/* Proof of Delivery - Mobile Optimized */}
                        {step.proofOfDelivery && (
                          <div className="mt-3 p-3 bg-green-500/10 rounded-lg border-l-4 border-green-500">
                            <p className="text-xs sm:text-sm text-green-600 font-medium mb-2">
                              Proof of Delivery:
                            </p>
                            <div className="bg-white rounded-lg p-2 shadow-sm">
                              <img 
                                src={step.proofOfDelivery.url} 
                                alt={step.proofOfDelivery.alt}
                                className="w-full max-w-xs sm:max-w-sm rounded border"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'block';
                                }}
                              />
                              <div className="hidden text-xs sm:text-sm text-gray-500 italic">
                                Signature captured: John Smith
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8 relative overflow-hidden">
          {/* Decorative Curves */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
          <h2 className="text-2xl font-bold text-amber-900 mb-4">
            Need Help?
          </h2>
          <p className="text-gray-600 mb-6">
            Can't find your tracking information or have questions about your shipment?
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="btn-primary">
              Contact Support
            </button>
            <button className="btn-secondary">
              Report an Issue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingPage;
