import { useState } from 'react';
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
  Settings,
  LogOut,
  Home
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orders, setOrders] = useState([
    {
      id: 'PX123456789',
      customer: 'John Smith',
      from: 'New York, NY',
      to: 'Los Angeles, CA',
      status: 'delivered',
      date: '2024-01-15',
      weight: '2.5 lbs',
      value: '$150.00'
    },
    {
      id: 'PX987654321',
      customer: 'Sarah Johnson',
      from: 'Chicago, IL',
      to: 'Miami, FL',
      status: 'in-transit',
      date: '2024-01-16',
      weight: '1.2 lbs',
      value: '$75.00'
    },
    {
      id: 'PX456789123',
      customer: 'Mike Wilson',
      from: 'Seattle, WA',
      to: 'Boston, MA',
      status: 'pending',
      date: '2024-01-17',
      weight: '3.8 lbs',
      value: '$200.00'
    }
  ]);

  const [newOrder, setNewOrder] = useState({
    customer: '',
    from: '',
    to: '',
    weight: '',
    value: ''
  });

  const stats = [
    { label: 'Total Orders', value: '1,247', icon: <Package className="h-6 w-6" />, color: 'bg-blue-500' },
    { label: 'Active Deliveries', value: '89', icon: <Truck className="h-6 w-6" />, color: 'bg-yellow-500' },
    { label: 'Customers', value: '2,156', icon: <Users className="h-6 w-6" />, color: 'bg-green-500' },
    { label: 'Revenue', value: '$45,678', icon: <BarChart3 className="h-6 w-6" />, color: 'bg-purple-500' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'in-transit': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'in-transit': return <Truck className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const handleAddOrder = (e) => {
    e.preventDefault();
    const order = {
      id: `PX${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      ...newOrder,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };
    setOrders([...orders, order]);
    setNewOrder({ customer: '', from: '', to: '', weight: '', value: '' });
  };

  const handleDeleteOrder = (id) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="h-5 w-5" /> },
    { id: 'orders', label: 'Orders', icon: <Package className="h-5 w-5" /> },
    { id: 'add-order', label: 'Add Order', icon: <Plus className="h-5 w-5" /> },
    { id: 'emails', label: 'Send Emails', icon: <Mail className="h-5 w-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> }
  ];

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <div className="bg-amber-900 text-white shadow-lg">
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
                <div className="text-amber-200">admin@parcelx.com</div>
              </div>
              <button 
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-amber-800 rounded-lg transition-colors"
              >
                <Settings className="h-5 w-5" />
              </button>
              <button className="hidden sm:block p-2 hover:bg-amber-800 rounded-lg transition-colors">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Sidebar */}
        <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
          <div className="flex items-center justify-between p-4 lg:hidden border-b">
            <h2 className="text-lg font-semibold text-amber-900">Menu</h2>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <LogOut className="h-5 w-5" />
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
        <div className="flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 lg:space-y-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-amber-900 mb-2">Dashboard Overview</h2>
                <p className="text-gray-600">Welcome to your ParcelX admin dashboard</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
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

              {/* Recent Orders */}
              <div className="bg-white rounded-2xl shadow-lg p-4 lg:p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 lg:w-20 h-16 lg:h-20 bg-yellow-500/10 rounded-bl-full"></div>
                <div className="absolute bottom-0 left-0 w-12 lg:w-16 h-12 lg:h-16 bg-amber-500/10 rounded-tr-full"></div>
                <h3 className="text-lg lg:text-xl font-bold text-amber-900 mb-4">Recent Orders</h3>
                <div className="space-y-3 lg:space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 lg:p-4 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-3 lg:space-x-4">
                        <div className={`p-2 rounded-full ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                        </div>
                        <div>
                          <p className="font-semibold text-amber-900 text-sm lg:text-base">{order.id}</p>
                          <p className="text-xs lg:text-sm text-gray-600">{order.customer}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right">
                        <p className="font-semibold text-amber-900 text-sm lg:text-base">{order.status}</p>
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
                  <button className="btn-secondary flex items-center justify-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button className="btn-primary flex items-center justify-center space-x-2">
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
                            <div className="text-sm">
                              <div>{order.from}</div>
                              <div className="text-gray-500">→ {order.to}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusIcon(order.status)}
                              <span>{order.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4">{order.date}</td>
                          <td className="px-6 py-4 font-semibold text-amber-900">{order.value}</td>
                          <td className="px-6 py-4">
                            <div className="flex space-x-2">
                              <button className="p-1 text-blue-600 hover:bg-blue-100 rounded">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-yellow-600 hover:bg-yellow-100 rounded">
                                <Edit className="h-4 w-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteOrder(order.id)}
                                className="p-1 text-red-600 hover:bg-red-100 rounded"
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
                <div className="lg:hidden p-4 space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-amber-900 text-sm">{order.id}</p>
                          <p className="text-gray-600 text-sm">{order.customer}</p>
                        </div>
                        <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {getStatusIcon(order.status)}
                          <span>{order.status}</span>
                        </span>
                      </div>
                      <div className="text-sm">
                        <div className="text-gray-600">Route:</div>
                        <div className="font-medium">{order.from} → {order.to}</div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <div className="text-gray-600">Date: {order.date}</div>
                          <div className="font-semibold text-amber-900">Value: {order.value}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-100 rounded">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-yellow-600 hover:bg-yellow-100 rounded">
                            <Edit className="h-4 w-4" />
                          </button>
                          <button 
                            onClick={() => handleDeleteOrder(order.id)}
                            className="p-2 text-red-600 hover:bg-red-100 rounded"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
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
                        Package Weight *
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

                  <div>
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

                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                    <button type="submit" className="btn-primary flex items-center justify-center space-x-2">
                      <Plus className="h-4 w-4" />
                      <span>Create Order</span>
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setNewOrder({ customer: '', from: '', to: '', weight: '', value: '' })}
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

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-amber-900 mb-2">Settings</h2>
                <p className="text-gray-600">Configure your admin dashboard and system preferences</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                  <h3 className="text-xl font-bold text-amber-900 mb-4">Profile Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">Name</label>
                      <input
                        type="text"
                        defaultValue="Admin User"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="admin@parcelx.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <button className="btn-primary">Update Profile</button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-500/10 rounded-bl-full"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-amber-500/10 rounded-tr-full"></div>
                  <h3 className="text-xl font-bold text-amber-900 mb-4">System Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Email Notifications</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Auto-update Tracking</span>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Maintenance Mode</span>
                      <input type="checkbox" className="rounded" />
                    </div>
                    <button className="btn-primary">Save Settings</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
