import { useState } from 'react';
import { Search, Package, Truck, MapPin, UserCheck, CheckCircle, Calendar, Clock } from 'lucide-react';

const TrackingPage = () => {
  const [trackingId, setTrackingId] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock tracking data
  const mockTrackingData = {
    trackingId: 'PX123456789',
    status: 'delivered',
    expectedDelivery: '2024-01-15',
    packageInfo: {
      type: 'Electronics',
      weight: '2.5 lbs',
      dimensions: '12" x 8" x 6"'
    },
    timeline: [
      {
        status: 'Order Placed',
        icon: <Package className="h-6 w-6" />,
        completed: true,
        date: '2024-01-10',
        time: '10:30 AM',
        location: 'New York, NY'
      },
      {
        status: 'In Transit',
        icon: <Truck className="h-6 w-6" />,
        completed: true,
        date: '2024-01-11',
        time: '2:15 PM',
        location: 'Philadelphia, PA'
      },
      {
        status: 'At Destination Hub',
        icon: <MapPin className="h-6 w-6" />,
        completed: true,
        date: '2024-01-14',
        time: '9:45 AM',
        location: 'Los Angeles, CA'
      },
      {
        status: 'Out for Delivery',
        icon: <UserCheck className="h-6 w-6" />,
        completed: true,
        date: '2024-01-15',
        time: '8:00 AM',
        location: 'Los Angeles, CA'
      },
      {
        status: 'Delivered',
        icon: <CheckCircle className="h-6 w-6" />,
        completed: true,
        date: '2024-01-15',
        time: '11:30 AM',
        location: 'Los Angeles, CA',
        proofOfDelivery: 'Signature: John Smith'
      }
    ]
  };

  const handleTrackPackage = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setTrackingResult(mockTrackingData);
      setIsLoading(false);
    }, 1500);
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
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-parcelx-gold focus:border-transparent"
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
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-parcelx-brown"></div>
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

        {/* Tracking Results */}
        {trackingResult && (
          <div className="space-y-8">
            {/* Package Status */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
              {/* Decorative Curves */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-amber-900">
                    Package Status
                  </h2>
                  <p className="text-gray-600">Tracking ID: {trackingResult.trackingId}</p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${getStatusColor(trackingResult.status)}`}>
                    {trackingResult.status.charAt(0).toUpperCase() + trackingResult.status.slice(1)}
                  </div>
                  <div className="flex items-center text-gray-600 mt-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    Expected: {trackingResult.expectedDelivery}
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Package Type</h3>
                  <p className="text-gray-600">{trackingResult.packageInfo.type}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Weight</h3>
                  <p className="text-gray-600">{trackingResult.packageInfo.weight}</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-amber-900 mb-2">Dimensions</h3>
                  <p className="text-gray-600">{trackingResult.packageInfo.dimensions}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
              {/* Decorative Curves */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-yellow-500/10 rounded-br-full"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-amber-500/10 rounded-tl-full"></div>
              <h2 className="text-2xl font-bold text-amber-900 mb-6">
                Delivery Timeline
              </h2>
              <div className="space-y-6">
                {trackingResult.timeline.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      step.completed 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step.completed ? step.icon : <Clock className="h-6 w-6" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className={`text-lg font-semibold ${
                          step.completed ? 'text-amber-900' : 'text-gray-500'
                        }`}>
                          {step.status}
                        </h3>
                        <div className="text-sm text-gray-500">
                          {step.date} at {step.time}
                        </div>
                      </div>
                      <p className="text-gray-600 mt-1">{step.location}</p>
                      {step.proofOfDelivery && (
                        <div className="mt-2 p-2 bg-green-500/10 rounded border-l-4 border-parcelx-green">
                          <p className="text-sm text-green-500 font-medium">
                            Proof of Delivery: {step.proofOfDelivery}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
