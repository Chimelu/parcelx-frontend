import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Mail, 
  Package, 
  Truck, 
  Users, 
  BarChart3, 
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle,
  Menu,
  X,
  LogOut,
  Home,
  ArrowLeft,
  History,
  MapPin,
  Building2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isTimelineModalOpen, setIsTimelineModalOpen] = useState(false);
  const [selectedOrderForTimeline, setSelectedOrderForTimeline] = useState(null);
  const [timelineUpdate, setTimelineUpdate] = useState({
    status: '',
    location: '',
    notes: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [orders, setOrders] = useState([]);

  const [newOrder, setNewOrder] = useState({
    customer: '',
    customerEmail: '',
    customerPhone: '',
    from: '',
    to: '',
    packageType: '',
    weight: '',
    dimensions: '',
    value: '',
    expectedDelivery: '',
    specialInstructions: ''
  });

  const getCurrentStatus = (timeline) => {
    if (!timeline || timeline.length === 0) return 'Order Placed';
    return timeline[timeline.length - 1].status;
  };

  // Calculate stats from orders data
  const calculateStats = () => {
    const totalOrders = orders.length;
    
    // Count orders by timeline status
    const statusCounts = {
      'Order Placed': 0,
      'In Transit': 0,
      'At Destination Hub': 0,
      'Out for Delivery': 0,
      'Delivered': 0
    };

    orders.forEach(order => {
      const currentStatus = getCurrentStatus(order.timeline);
      if (statusCounts.hasOwnProperty(currentStatus)) {
        statusCounts[currentStatus]++;
      }
    });

    const uniqueCustomers = new Set(orders.map(order => order.customer)).size;
    const totalRevenue = orders.reduce((sum, order) => {
      const value = parseFloat(order.value?.replace(/[$,]/g, '')) || 0;
      return sum + value;
    }, 0);

    return [
      { label: 'Total Orders', value: totalOrders.toLocaleString(), icon: <Package className="h-6 w-6" />, color: 'bg-blue-500' },
      { label: 'Order Placed', value: statusCounts['Order Placed'].toLocaleString(), icon: <Package className="h-6 w-6" />, color: 'bg-gray-500' },
      { label: 'In Transit', value: statusCounts['In Transit'].toLocaleString(), icon: <Truck className="h-6 w-6" />, color: 'bg-yellow-500' },
      { label: 'At Destination Hub', value: statusCounts['At Destination Hub'].toLocaleString(), icon: <Building2 className="h-6 w-6" />, color: 'bg-purple-500' },
      { label: 'Out for Delivery', value: statusCounts['Out for Delivery'].toLocaleString(), icon: <Truck className="h-6 w-6" />, color: 'bg-orange-500' },
      { label: 'Delivered', value: statusCounts['Delivered'].toLocaleString(), icon: <CheckCircle className="h-6 w-6" />, color: 'bg-green-500' },
      { label: 'Customers', value: uniqueCustomers.toLocaleString(), icon: <Users className="h-6 w-6" />, color: 'bg-indigo-500' },
      { label: 'Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: <BarChart3 className="h-6 w-6" />, color: 'bg-pink-500' }
    ];
  };

  const stats = calculateStats();

  const getTimelineStatusColor = (timeline) => {
    if (!timeline || timeline.length === 0) return 'bg-gray-100 text-gray-800';
    
    const latestEvent = timeline[timeline.length - 1];
    switch (latestEvent.status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'Out for Delivery': return 'bg-blue-100 text-blue-800';
      case 'At Destination Hub': return 'bg-purple-100 text-purple-800';
      case 'In Transit': return 'bg-yellow-100 text-yellow-800';
      case 'Order Placed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTimelineStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="h-4 w-4" />;
      case 'Out for Delivery': return <Truck className="h-4 w-4" />;
      case 'At Destination Hub': return <Building2 className="h-4 w-4" />;
      case 'In Transit': return <Truck className="h-4 w-4" />;
      case 'Order Placed': return <Package className="h-4 w-4" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  // Fetch all orders from API
  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const response = await fetch('https://parcelx-backend.vercel.app/api/orders');
      if (response.ok) {
        const data = await response.json();
        // Transform API data to match local state structure
        const transformedOrders = data.orders.map(order => ({
          id: order.trackingId,
          customer: order.customer.name,
          customerEmail: order.customer.email,
          customerPhone: order.customer.phone,
          from: order.shipping.from,
          to: order.shipping.to,
          date: new Date(order.createdAt).toISOString().split('T')[0],
          packageType: order.package.type,
          weight: order.package.weight,
          dimensions: order.package.dimensions,
          value: order.package.value,
          expectedDelivery: order.shipping.expectedDelivery,
          specialInstructions: order.package.specialInstructions,
          timeline: order.timeline
        }));
        setOrders(transformedOrders);
      } else {
        toast.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Error fetching orders');
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    setIsCreatingOrder(true);
    
    try {
      const orderData = {
        customer: {
          name: newOrder.customer,
          email: newOrder.customerEmail,
          phone: newOrder.customerPhone,
          address: newOrder.from // Using 'from' as customer address for now
        },
        shipping: {
          from: newOrder.from,
          to: newOrder.to,
          expectedDelivery: newOrder.expectedDelivery
        },
        package: {
          type: newOrder.packageType,
          weight: newOrder.weight,
          dimensions: newOrder.dimensions,
          value: newOrder.value,
          specialInstructions: newOrder.specialInstructions
        }
      };

      const response = await fetch('https://parcelx-backend.vercel.app/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const createdOrder = await response.json();
        
        // Transform the created order to match local state structure
        const transformedOrder = {
          id: createdOrder.order.trackingId,
          customer: createdOrder.order.customer.name,
          customerEmail: createdOrder.order.customer.email,
          customerPhone: createdOrder.order.customer.phone,
          from: createdOrder.order.shipping.from,
          to: createdOrder.order.shipping.to,
          date: new Date(createdOrder.order.createdAt).toISOString().split('T')[0],
          packageType: createdOrder.order.package.type,
          weight: createdOrder.order.package.weight,
          dimensions: createdOrder.order.package.dimensions,
          value: createdOrder.order.package.value,
          expectedDelivery: createdOrder.order.shipping.expectedDelivery,
          specialInstructions: createdOrder.order.package.specialInstructions,
          timeline: createdOrder.order.timeline
        };
        
        // Add the created order to local state
        setOrders([...orders, transformedOrder]);
        
        // Reset form
        setNewOrder({ 
          customer: '', 
          customerEmail: '', 
          customerPhone: '', 
          from: '', 
          to: '', 
          packageType: '', 
          weight: '', 
          dimensions: '', 
          value: '', 
          expectedDelivery: '', 
          specialInstructions: '' 
        });
        
        // Switch to orders tab to show the new order
        setActiveTab('orders');
        
        toast.success('Order created successfully!');
      } else {
        const error = await response.json();
        toast.error(`Error creating order: ${error.message}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setIsCreatingOrder(false);
    }
  };


  const handleUpdateOrderField = (orderId, field, value) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, [field]: value } : order
    ));
  };

  const openDeleteModal = (order) => {
    setOrderToDelete(order);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteOrder = async () => {
    if (!orderToDelete) return;
    
    try {
      const response = await fetch(`https://parcelx-backend.vercel.app/api/orders/${orderToDelete.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setOrders(orders.filter(order => order.id !== orderToDelete.id));
        
        // Close any open modals if the deleted order was selected
        if (selectedOrder && selectedOrder.id === orderToDelete.id) {
          setSelectedOrder(null);
          setActiveTab('orders');
        }
        
        toast.success('Order deleted successfully!');
      } else {
        const error = await response.json();
        toast.error(`Error deleting order: ${error.message}`);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order. Please try again.');
    } finally {
      setIsDeleteModalOpen(false);
      setOrderToDelete(null);
    }
  };

  const handleViewOrder = async (order) => {
    try {
      // Fetch full order details from API using tracking ID
      const response = await fetch(`https://parcelx-backend.vercel.app/api/orders/track/${order.id}`);
      if (response.ok) {
        const data = await response.json();
        // Transform API data to match local state structure
        const fullOrder = {
          id: data.order.trackingId,
          customer: data.order.customer.name,
          customerEmail: data.order.customer.email,
          customerPhone: data.order.customer.phone,
          from: data.order.shipping.from,
          to: data.order.shipping.to,
          date: new Date(data.order.createdAt).toISOString().split('T')[0],
          packageType: data.order.package.type,
          weight: data.order.package.weight,
          dimensions: data.order.package.dimensions,
          value: data.order.package.value,
          expectedDelivery: data.order.shipping.expectedDelivery,
          specialInstructions: data.order.package.specialInstructions,
          timeline: data.order.timeline
        };
        setSelectedOrder(fullOrder);
        setActiveTab('view-order');
      } else {
        // Fallback to local order data if API fails
        setSelectedOrder(order);
        setActiveTab('view-order');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      // Fallback to local order data if API fails
      setSelectedOrder(order);
      setActiveTab('view-order');
    }
  };

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const handleUpdateTimeline = async (orderId) => {
    try {
      const response = await fetch(`https://parcelx-backend.vercel.app/api/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: timelineUpdate.status,
          location: timelineUpdate.location,
          notes: timelineUpdate.notes,
          date: timelineUpdate.date
        })
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        // Update local state
        setOrders(orders.map(order => 
          order.id === orderId ? {
            ...order,
            timeline: updatedOrder.order.timeline
          } : order
        ));
        
        toast.success('Timeline updated successfully!');
        setIsTimelineModalOpen(false);
        setTimelineUpdate({ status: '', location: '', notes: '', date: new Date().toISOString().split('T')[0] });
        setSelectedOrderForTimeline(null);
      } else {
        const error = await response.json();
        toast.error(`Error updating timeline: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating timeline:', error);
      toast.error('Failed to update timeline. Please try again.');
    }
  };

  const openTimelineModal = (order) => {
    setSelectedOrderForTimeline(order);
    
    // Get the location and date from the latest timeline event, or use defaults if no timeline
    const latestTimelineEvent = order.timeline && order.timeline.length > 0 
      ? order.timeline[order.timeline.length - 1] 
      : null;
    const currentLocation = latestTimelineEvent ? latestTimelineEvent.location : order.to;
    const currentDate = latestTimelineEvent ? new Date(latestTimelineEvent.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0];
    
    setTimelineUpdate({
      status: getCurrentStatus(order.timeline),
      location: currentLocation,
      notes: '',
      date: currentDate
    });
    setIsTimelineModalOpen(true);
  };

  const handleSaveOrder = async (updatedOrder) => {
    try {
      // Transform the updated order data to match backend structure
      const orderData = {
        customer: {
          name: updatedOrder.customer,
          email: updatedOrder.customerEmail,
          phone: updatedOrder.customerPhone,
          address: updatedOrder.from // Using 'from' as customer address
        },
        shipping: {
          from: updatedOrder.from,
          to: updatedOrder.to,
          expectedDelivery: updatedOrder.expectedDelivery
        },
        package: {
          type: updatedOrder.packageType,
          weight: updatedOrder.weight,
          dimensions: updatedOrder.dimensions,
          value: updatedOrder.value,
          specialInstructions: updatedOrder.specialInstructions
        }
      };

      // Find the order ID from the orders array (since we're using trackingId as ID)
      const orderToUpdate = orders.find(o => o.id === updatedOrder.id);
      if (!orderToUpdate) {
        toast.error('Order not found');
        return;
      }

      // Make API call to update the order
      const response = await fetch(`https://parcelx-backend.vercel.app/api/orders/${orderToUpdate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const result = await response.json();
        
        // Transform the API response back to frontend format
        const transformedOrder = {
          id: result.order.trackingId,
          customer: result.order.customer.name,
          customerEmail: result.order.customer.email,
          customerPhone: result.order.customer.phone,
          from: result.order.shipping.from,
          to: result.order.shipping.to,
          date: new Date(result.order.updatedAt).toISOString().split('T')[0],
          packageType: result.order.package.type,
          weight: result.order.package.weight,
          dimensions: result.order.package.dimensions,
          value: result.order.package.value,
          expectedDelivery: result.order.shipping.expectedDelivery,
          specialInstructions: result.order.package.specialInstructions,
          timeline: result.order.timeline
        };

        // Update local state
        setOrders(orders.map(order => 
          order.id === updatedOrder.id ? transformedOrder : order
        ));
        
        setIsEditModalOpen(false);
        setSelectedOrder(null);
        toast.success('Order updated successfully!');
      } else {
        const error = await response.json();
        toast.error(`Error updating order: ${error.message}`);
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order. Please try again.');
    }
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="h-5 w-5" /> },
    { id: 'add-order', label: 'Add Order', icon: <Plus className="h-5 w-5" /> },
    { id: 'emails', label: 'Send Emails', icon: <Mail className="h-5 w-5" /> }
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fetch orders when component mounts and when switching to orders tab
  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-amber-900 text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/" className="flex items-center space-x-1 sm:space-x-2 hover:text-yellow-500 transition-colors">
                <Home className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="hidden sm:inline">Back to Site</span>
                <span className="sm:hidden">Back</span>
              </Link>
              <div className="h-4 sm:h-6 w-px bg-amber-700"></div>
              <h1 className="text-lg sm:text-2xl font-bold">ParcelX Admin</h1>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block text-sm">
                <div className="font-semibold">Admin User</div>
                {/* <div className="text-amber-200">admin@parcelx.com</div> */}
              </div>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-amber-800 rounded-lg transition-colors"
              >
                <Menu className="h-5 w-5" />
              </button>
              <button className="hidden sm:block p-2 hover:bg-amber-800 rounded-lg transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex relative min-h-screen">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div className={`fixed lg:fixed lg:top-20 lg:left-0 lg:h-[calc(100vh-5rem)] inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="flex items-center justify-between p-4 lg:hidden border-b">
            <h2 className="text-lg font-semibold text-amber-900">Menu</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-4 lg:mt-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-4 lg:px-6 py-3 text-left transition-colors ${
                  activeTab === tab.id
                    ? 'bg-yellow-500 text-amber-900 border-r-4 border-yellow-500'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-amber-900'
                }`}
              >
                {tab.icon}
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-64">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome to your ParcelX admin dashboard</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 lg:w-20 h-16 lg:h-20 bg-yellow-500/10 rounded-bl-full"></div>
                    <div className="absolute bottom-0 left-0 w-12 lg:w-16 h-12 lg:h-16 bg-amber-500/10 rounded-tr-full"></div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-xs lg:text-sm font-medium">{stat.label}</p>
                        <p className="text-xl lg:text-2xl font-bold text-amber-900">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-2 lg:p-3 rounded-full text-white`}>
                        {stat.icon}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Timeline Breakdown */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-amber-900 mb-6">Order Status Breakdown</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  {[
                    { status: 'Order Placed', color: 'bg-gray-500', icon: <Package className="h-5 w-5" /> },
                    { status: 'In Transit', color: 'bg-yellow-500', icon: <Truck className="h-5 w-5" /> },
                    { status: 'At Destination Hub', color: 'bg-purple-500', icon: <Building2 className="h-5 w-5" /> },
                    { status: 'Out for Delivery', color: 'bg-orange-500', icon: <Truck className="h-5 w-5" /> },
                    { status: 'Delivered', color: 'bg-green-500', icon: <CheckCircle className="h-5 w-5" /> }
                  ].map((item, index) => {
                    const count = orders.filter(order => getCurrentStatus(order.timeline) === item.status).length;
                    const percentage = orders.length > 0 ? ((count / orders.length) * 100).toFixed(1) : 0;
                    
                    return (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center text-white mx-auto mb-3`}>
                          {item.icon}
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.status}</h4>
                        <p className="text-2xl font-bold text-amber-900 mb-1">{count}</p>
                        <p className="text-sm text-gray-600">{percentage}%</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 lg:w-20 h-16 lg:h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-12 lg:w-16 h-12 lg:h-16 bg-amber-500/10 rounded-tr-full"></div>
                <h3 className="text-lg lg:text-xl font-bold text-amber-900 mb-4">Recent Orders</h3>
                <div className="space-y-3 lg:space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div 
                      key={order.id} 
                      onClick={() => handleViewOrder(order)}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className={`p-2 rounded-full ${getTimelineStatusColor(order.timeline)}`}>
                          {getTimelineStatusIcon(getCurrentStatus(order.timeline))}
                        </div>
                        <div>
                          <p className="font-semibold text-amber-900 text-sm lg:text-base">{order.id}</p>
                          <p className="text-xs lg:text-sm text-gray-600">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-semibold text-amber-900 text-sm lg:text-base">{getCurrentStatus(order.timeline)}</p>
                        <p className="text-xs lg:text-sm text-gray-600">{order.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-4 lg:space-y-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2">Order Management</h2>
                  <p className="text-gray-600">Manage all customer orders and shipments</p>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button 
                    onClick={() => setActiveTab('add-order')}
                    className="btn-primary flex items-center justify-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Order</span>
                  </button>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 lg:w-20 h-16 lg:h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-12 lg:w-16 h-12 lg:h-16 bg-amber-500/10 rounded-tr-full"></div>
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 lg:h-5 w-4 lg:w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search orders..."
                      className="w-full pl-9 lg:pl-10 pr-4 py-2 lg:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm lg:text-base"
                    />
                  </div>
                  <button className="btn-secondary flex items-center justify-center space-x-2">
                    <Filter className="h-4 w-4" />
                    <span>Filter</span>
                  </button>
                </div>
              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden relative">
                <div className="absolute top-0 right-0 w-16 lg:w-20 h-16 lg:h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-12 lg:w-16 h-12 lg:h-16 bg-amber-500/10 rounded-tr-full"></div>
                
                {isLoadingOrders ? (
                  <div className="p-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-900 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading orders...</p>
                  </div>
                ) : (
                  <>
                    {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-amber-900 text-white">
                      <tr>
                        <th className="px-6 py-4 text-left">Order ID</th>
                        <th className="px-6 py-4 text-left">Customer</th>
                        <th className="px-6 py-4 text-left">Route</th>
                        <th className="px-6 py-4 text-left">Status</th>
                        <th className="px-6 py-4 text-left">Date</th>
                        <th className="px-6 py-4 text-left">Value</th>
                        <th className="px-6 py-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 font-medium text-amber-900">{order.id}</td>
                          <td className="px-6 py-4">{order.customer}</td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={order.from}
                                onChange={(e) => handleUpdateOrderField(order.id, 'from', e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                              />
                              <div className="text-gray-500 text-center">→</div>
                              <input
                                type="text"
                                value={order.to}
                                onChange={(e) => handleUpdateOrderField(order.id, 'to', e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                              />
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTimelineStatusColor(order.timeline)}`}>
                              {getTimelineStatusIcon(getCurrentStatus(order.timeline))}
                              <span>{getCurrentStatus(order.timeline)}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <input
                              type="date"
                              value={order.date}
                              onChange={(e) => handleUpdateOrderField(order.id, 'date', e.target.value)}
                              className="px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-yellow-500 focus:border-transparent"
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold text-amber-900">{order.value}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleViewOrder(order)}
                                className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => openTimelineModal(order)}
                                className="p-1 text-green-600 hover:bg-green-100 rounded"
                                title="Update Timeline"
                              >
                                <History className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleEditOrder(order)}
                                className="p-1 text-yellow-600 hover:bg-yellow-100 rounded"
                                title="Edit Order"
                              >
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => openDeleteModal(order)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
                                title="Delete Order"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-3 p-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                      {/* Header Row */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold text-amber-900 truncate">{order.id}</div>
                          <div className="text-xs text-gray-500">{order.customer}</div>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          {getTimelineStatusIcon(getCurrentStatus(order.timeline))}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTimelineStatusColor(order.timeline)}`}>
                            {getCurrentStatus(order.timeline)}
                          </span>
                        </div>
                      </div>

                      {/* Route Info */}
                      <div className="mb-3">
                        <div className="text-xs text-gray-600 mb-1">Route</div>
                        <div className="text-xs text-gray-800">
                          <div className="truncate">{order.from}</div>
                          <div className="text-center text-amber-600 py-1">↓</div>
                          <div className="truncate">{order.to}</div>
                        </div>
                      </div>

                      {/* Bottom Row */}
                      <div className="flex justify-between items-center">
                        <div className="text-sm font-semibold text-amber-900">{order.value}</div>
                        <div className="flex space-x-1">
                          <button 
                            onClick={() => handleViewOrder(order)}
                            className="p-1.5 text-blue-600 hover:bg-blue-100 rounded"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => openTimelineModal(order)}
                            className="p-1.5 text-green-600 hover:bg-green-100 rounded"
                            title="Update Timeline"
                          >
                            <History className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleEditOrder(order)}
                            className="p-1.5 text-yellow-600 hover:bg-yellow-100 rounded"
                            title="Edit Order"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => openDeleteModal(order)}
                            className="p-1.5 text-red-600 hover:bg-red-100 rounded"
                            title="Delete Order"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Add Order Tab */}
          {activeTab === 'add-order' && (
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2">Add New Order</h2>
                <p className="text-gray-600">Create a new shipping order for a customer</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                <form onSubmit={handleAddOrder} className="space-y-4 lg:space-y-6">
                  {/* Customer Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4">Customer Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-2">
                          Customer Name *
                        </label>
                        <input
                          type="text"
                          value={newOrder.customer}
                          onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="Enter customer name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-2">
                          Customer Email *
                        </label>
                        <input
                          type="email"
                          value={newOrder.customerEmail}
                          onChange={(e) => setNewOrder({...newOrder, customerEmail: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="customer@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-2">
                          Customer Phone *
                        </label>
                        <input
                          type="tel"
                          value={newOrder.customerPhone}
                          onChange={(e) => setNewOrder({...newOrder, customerPhone: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="(555) 123-4567"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4">Shipping Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-2">
                          From Address *
                        </label>
                        <input
                          type="text"
                          value={newOrder.from}
                          onChange={(e) => setNewOrder({...newOrder, from: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="e.g., New York, NY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-2">
                          To Address *
                        </label>
                        <input
                          type="text"
                          value={newOrder.to}
                          onChange={(e) => setNewOrder({...newOrder, to: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="e.g., Los Angeles, CA"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Expected Delivery Date *
                      </label>
                      <input
                        type="date"
                        value={newOrder.expectedDelivery}
                        onChange={(e) => setNewOrder({...newOrder, expectedDelivery: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Package Information */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-semibold text-amber-900 mb-4">Package Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-2">
                          Package Type *
                        </label>
                        <select
                          value={newOrder.packageType}
                          onChange={(e) => setNewOrder({...newOrder, packageType: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        >
                          <option value="">Select package type</option>
                          <option value="Electronics">Electronics</option>
                          <option value="Clothing">Clothing</option>
                          <option value="Documents">Documents</option>
                          <option value="Fragile">Fragile</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-2">
                          Weight *
                        </label>
                        <input
                          type="text"
                          value={newOrder.weight}
                          onChange={(e) => setNewOrder({...newOrder, weight: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="e.g., 2.5 lbs"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-amber-900 mb-2">
                          Dimensions *
                        </label>
                        <input
                          type="text"
                          value={newOrder.dimensions}
                          onChange={(e) => setNewOrder({...newOrder, dimensions: e.target.value})}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                          placeholder="e.g., 12 x 8 x 6 inches"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Package Value *
                      </label>
                      <input
                        type="text"
                        value={newOrder.value}
                        onChange={(e) => setNewOrder({...newOrder, value: e.target.value})}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        placeholder="e.g., $150.00"
                      />
                    </div>
                  </div>

                  {/* Special Instructions */}
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={newOrder.specialInstructions}
                      onChange={(e) => setNewOrder({...newOrder, specialInstructions: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Any special handling instructions or notes..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button 
                      type="submit" 
                      disabled={isCreatingOrder}
                      className="btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isCreatingOrder ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Creating...</span>
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4" />
                          <span>Create Order</span>
                        </>
                      )}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setNewOrder({ 
                        customer: '', 
                        customerEmail: '', 
                        customerPhone: '', 
                        from: '', 
                        to: '', 
                        packageType: '', 
                        weight: '', 
                        dimensions: '', 
                        value: '', 
                        expectedDelivery: '', 
                        specialInstructions: '' 
                      })}
                      className="btn-secondary"
                    >
                      Clear Form
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Send Emails Tab */}
          {activeTab === 'emails' && (
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2">Email Management</h2>
                <p className="text-gray-600">Send emails to customers and manage communications</p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                <form className="space-y-4 lg:space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Recipient Email *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="customer@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Email subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-2">
                      Message *
                    </label>
                    <textarea
                      rows={8}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button type="submit" className="btn-primary flex items-center justify-center space-x-2">
                      <Mail className="h-4 w-4" />
                      <span>Send Email</span>
                    </button>
                    <button type="button" className="btn-secondary">
                      Save Draft
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* View Order Tab */}
          {activeTab === 'view-order' && selectedOrder && (
            <div className="space-y-4 lg:space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2">Order Details</h2>
                  <p className="text-gray-600">Complete information for order {selectedOrder.id}</p>
                </div>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Orders</span>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Order Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                  <h3 className="text-xl font-bold text-amber-900 mb-6">Order Information</h3>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order ID:</span>
                      <span className="font-semibold text-amber-900">{selectedOrder.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Customer:</span>
                      <span className="font-semibold">{selectedOrder.customer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTimelineStatusColor(selectedOrder.timeline)}`}>
                        {getTimelineStatusIcon(getCurrentStatus(selectedOrder.timeline))}
                        <span>{getCurrentStatus(selectedOrder.timeline)}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Date:</span>
                      <span className="font-semibold">{selectedOrder.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expected Delivery:</span>
                      <span className="font-semibold">{selectedOrder.expectedDelivery}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Package Value:</span>
                      <span className="font-semibold text-amber-900">{selectedOrder.value}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                  <h3 className="text-xl font-bold text-amber-900 mb-6">Shipping Information</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <span className="text-gray-600 block mb-2">From Address:</span>
                      <span className="font-semibold">{selectedOrder.from}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 block mb-2">To Address:</span>
                      <span className="font-semibold">{selectedOrder.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Weight:</span>
                      <span className="font-semibold">{selectedOrder.weight}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline History */}
              <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                <h3 className="text-xl font-bold text-amber-900 mb-6">Delivery Timeline</h3>
                
                {selectedOrder.timeline && selectedOrder.timeline.length > 0 ? (
                  <div className="space-y-4">
                    {selectedOrder.timeline.map((event, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className={`p-2 rounded-full ${getTimelineStatusColor([event])}`}>
                          {getTimelineStatusIcon(event.status)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-amber-900">{event.status}</h4>
                            <span className="text-sm text-gray-500">
                              {new Date(event.date).toLocaleDateString()} at {event.time}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-1">
                            <MapPin className="h-4 w-4 inline mr-1" />
                            {event.location}
                          </p>
                          {event.notes && (
                            <p className="text-sm text-gray-500">{event.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No timeline events available</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => handleEditOrder(selectedOrder)}
                  className="btn-primary flex items-center justify-center space-x-2"
                >
                  <Edit className="h-4 w-4" />
                  <span>Edit Order</span>
                </button>
                <button 
                  onClick={() => openTimelineModal(selectedOrder)}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <History className="h-4 w-4" />
                  <span>Update Timeline</span>
                </button>
                <button 
                  onClick={() => openDeleteModal(selectedOrder)}
                  className="btn-secondary flex items-center justify-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Order</span>
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Edit Order Modal */}
      {isEditModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-amber-900">Edit Order</h3>
                <button 
                  onClick={() => setIsEditModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <EditOrderForm 
                order={selectedOrder} 
                onSave={handleSaveOrder}
                onCancel={() => setIsEditModalOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Timeline Update Modal */}
      {isTimelineModalOpen && selectedOrderForTimeline && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-amber-900">Add Timeline Event</h3>
                <button 
                  onClick={() => setIsTimelineModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-gray-600 mt-2">Order: {selectedOrderForTimeline.id}</p>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Timeline Event</label>
                  <select
                    value={timelineUpdate.status}
                    onChange={(e) => setTimelineUpdate({...timelineUpdate, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="Order Placed">Order Placed</option>
                    <option value="In Transit">In Transit</option>
                    <option value="At Destination Hub">At Destination Hub</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-900 mb-2">Date</label>
                  <input
                    type="date"
                    value={timelineUpdate.date}
                    onChange={(e) => setTimelineUpdate({...timelineUpdate, date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Location</label>
                <input
                  type="text"
                  value={timelineUpdate.location}
                  onChange={(e) => setTimelineUpdate({...timelineUpdate, location: e.target.value})}
                  placeholder="Current location"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-amber-900 mb-2">Notes (Optional)</label>
                <textarea
                  rows={3}
                  value={timelineUpdate.notes}
                  onChange={(e) => setTimelineUpdate({...timelineUpdate, notes: e.target.value})}
                  placeholder="Additional notes or updates..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setIsTimelineModalOpen(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpdateTimeline(selectedOrderForTimeline.id)}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <History className="h-4 w-4" />
                  <span>Add Event</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && orderToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-amber-900">Delete Order</h3>
                <button 
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                  <Trash2 className="h-6 w-6 text-red-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Are you sure you want to delete this order?
                </h4>
                <p className="text-gray-600 mb-4">
                  This action cannot be undone. The order <span className="font-semibold text-amber-900">{orderToDelete.id}</span> will be permanently deleted.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left">
                  <div className="text-sm text-gray-600">
                    <div className="flex justify-between mb-1">
                      <span>Customer:</span>
                      <span className="font-semibold">{orderToDelete.customer}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span>Route:</span>
                      <span className="font-semibold">{orderToDelete.from} → {orderToDelete.to}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Status:</span>
                      <span className="font-semibold">{getCurrentStatus(orderToDelete.timeline)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteOrder}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete Order</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
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
    </div>
  );
};

// Edit Order Form Component
const EditOrderForm = ({ order, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    customer: order.customer || '',
    customerEmail: order.customerEmail || '',
    customerPhone: order.customerPhone || '',
    from: order.from || '',
    to: order.to || '',
    packageType: order.packageType || '',
    weight: order.weight || '',
    dimensions: order.dimensions || '',
    value: order.value || '',
    expectedDelivery: order.expectedDelivery || '',
    specialInstructions: order.specialInstructions || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...order, ...formData });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Customer Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-amber-900 mb-4">Customer Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Customer Name *</label>
            <input
              type="text"
              value={formData.customer}
              onChange={(e) => setFormData({...formData, customer: e.target.value})}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Customer Email</label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) => setFormData({...formData, customerEmail: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Customer Phone</label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) => setFormData({...formData, customerPhone: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Shipping Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-amber-900 mb-4">Shipping Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">From Address *</label>
            <input
              type="text"
              value={formData.from}
              onChange={(e) => setFormData({...formData, from: e.target.value})}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">To Address *</label>
            <input
              type="text"
              value={formData.to}
              onChange={(e) => setFormData({...formData, to: e.target.value})}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Expected Delivery</label>
            <input
              type="date"
              value={formData.expectedDelivery}
              onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Package Type</label>
            <select
              value={formData.packageType}
              onChange={(e) => setFormData({...formData, packageType: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Select package type</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Documents">Documents</option>
              <option value="Fragile">Fragile</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>
      </div>

      {/* Package Information */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="text-lg font-semibold text-amber-900 mb-4">Package Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Weight</label>
            <input
              type="text"
              value={formData.weight}
              onChange={(e) => setFormData({...formData, weight: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Dimensions</label>
            <input
              type="text"
              value={formData.dimensions}
              onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-900 mb-2">Value</label>
            <input
              type="text"
              value={formData.value}
              onChange={(e) => setFormData({...formData, value: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-amber-900 mb-2">Special Instructions</label>
          <textarea
            rows={3}
            value={formData.specialInstructions}
            onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            placeholder="Any special handling instructions or notes..."
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <button 
          type="button"
          onClick={onCancel}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button 
          type="submit"
          className="btn-primary flex items-center justify-center space-x-2"
        >
          <CheckCircle className="h-4 w-4" />
          <span>Save Changes</span>
        </button>
      </div>
    </form>
  );
};

export default AdminPage;
