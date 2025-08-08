import React, { useState, useEffect } from 'react';
import { 
  User, 
  Download, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut, 
  Calendar,
  TrendingUp,
  Eye,
  Trash2,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Clock,
  DollarSign,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Configuration
  const CONFIG = {
    SUPABASE_URL: 'https://omoxedxrdaqneyemcucl.supabase.co',
    DASHBOARD_WEBHOOK: 'https://miraclesworkflow.app.n8n.cloud/webhook/dashboard',
    LOGOUT_WEBHOOK: 'https://miraclesworkflow.app.n8n.cloud/webhook/auth'
  };

  useEffect(() => {
    checkAuthAndLoadData();
  }, []);

  const checkAuthAndLoadData = async () => {
    try {
      const userData = sessionStorage.getItem('cvfixer_user');
      if (!userData) {
        window.location.href = 'login.html';
        return;
      }

      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Load dashboard data
      await loadDashboardData(parsedUser);
    } catch (error) {
      console.error('Auth check failed:', error);
      setError('Authentication failed. Please login again.');
      setTimeout(() => window.location.href = 'login.html', 2000);
    }
  };

  const loadDashboardData = async (userData) => {
    try {
      setLoading(true);
      const response = await fetch(CONFIG.DASHBOARD_WEBHOOK, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'get_dashboard_data',
          userId: userData.userId,
          sessionToken: userData.sessionToken
        })
      });

      if (!response.ok) {
        throw new Error('Failed to load dashboard data');
      }

      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Dashboard load error:', error);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('cvfixer_user');
    window.location.href = 'index.html';
  };

  const downloadDocument = async (documentId, filename) => {
    try {
      // In a real implementation, you'd make an API call to get a secure download link
      const doc = dashboardData.documents.find(d => d.id === documentId);
      if (doc && doc.file_url) {
        const link = document.createElement('a');
        link.href = doc.file_url;
        link.download = filename;
        link.click();
        
        // Update download count
        setDashboardData(prev => ({
          ...prev,
          documents: prev.documents.map(d => 
            d.id === documentId 
              ? { ...d, download_count: d.download_count + 1 }
              : d
          )
        }));
      }
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'processing': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CVFixerAI
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                {dashboardData?.user?.credits || 0} Credits
              </div>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-lg hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Credits</p>
                <p className="text-3xl font-bold text-green-600">{dashboardData?.user?.credits || 0}</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600">{dashboardData?.stats?.total_orders || 0}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Documents</p>
                <p className="text-3xl font-bold text-purple-600">{dashboardData?.stats?.total_documents || 0}</p>
              </div>
              <FileText className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-3xl font-bold text-orange-600">${dashboardData?.stats?.total_spent || '0.00'}</p>
              </div>
              <DollarSign className="h-8 w-8 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp },
                { id: 'orders', label: 'Orders', icon: Calendar },
                { id: 'documents', label: 'Documents', icon: FileText },
                { id: 'profile', label: 'Profile', icon: User },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Account Overview</h3>
                  <button 
                    onClick={() => window.location.href = 'index.html'}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Create New Resume</span>
                  </button>
                </div>

                {dashboardData?.user?.credits > 0 ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                      <div>
                        <h4 className="text-green-800 font-medium">Ready to optimize!</h4>
                        <p className="text-green-700 text-sm">You have {dashboardData.user.credits} credits available for resume optimization.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <div className="flex items-center">
                      <AlertCircle className="h-5 w-5 text-orange-500 mr-3" />
                      <div>
                        <h4 className="text-orange-800 font-medium">Credits needed</h4>
                        <p className="text-orange-700 text-sm">Purchase credits to optimize your resume and create professional documents.</p>
                      </div>
                    </div>
                  </div>
                )}

                {dashboardData?.stats?.last_order_date && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-blue-800 font-medium mb-2">Recent Activity</h4>
                    <p className="text-blue-700 text-sm">
                      Last order placed on {formatDate(dashboardData.stats.last_order_date)}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Order History</h3>
                
                {dashboardData?.orders?.length > 0 ? (
                  <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Order Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Package
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Date
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {dashboardData.orders.map((order) => (
                          <tr key={order.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">#{order.payment_reference}</div>
                              <div className="text-sm text-gray-500">{order.credits_purchased} credits</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {order.package_type}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              ${order.amount_usd} {order.currency !== 'USD' && `(${order.currency})`}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(order.status)}
                                <span className={`text-sm font-medium capitalize ${
                                  order.status === 'completed' ? 'text-green-600' :
                                  order.status === 'processing' ? 'text-yellow-600' :
                                  'text-red-600'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(order.created_at)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No orders yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating your first resume.</p>
                  </div>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Your Documents</h3>
                
                {dashboardData?.documents?.length > 0 ? (
                  <div className="grid gap-4">
                    {dashboardData.documents.map((doc) => (
                      <div key={doc.id} className="bg-gray-50 rounded-lg p-4 border">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-8 w-8 text-blue-500" />
                            <div>
                              <h4 className="font-medium text-gray-900">{doc.original_filename}</h4>
                              <p className="text-sm text-gray-500">
                                {doc.document_type} • Created {formatDate(doc.created_at)}
                              </p>
                              <p className="text-xs text-gray-400">
                                Downloaded {doc.download_count} times
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => downloadDocument(doc.id, doc.original_filename)}
                              className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 text-sm"
                            >
                              <Download className="h-4 w-4" />
                              <span>Download</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No documents yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Your generated documents will appear here.</p>
                  </div>
                )}
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h3 className="text-lg font-medium text-gray-900">Profile Settings</h3>
                
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        defaultValue={dashboardData?.user?.full_name || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        defaultValue={dashboardData?.user?.email || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                        disabled
                      />
                      <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="tel"
                        defaultValue={dashboardData?.user?.phone || ''}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="font-medium text-gray-900 mb-2">Account Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Member since:</span>
                          <span className="text-gray-900">{formatDate(dashboardData?.user?.created_at)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last login:</span>
                          <span className="text-gray-900">{formatDate(dashboardData?.user?.last_login)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Credits:</span>
                          <span className="text-green-600 font-medium">{dashboardData?.user?.credits || 0}</span>
                        </div>
                      </div>
                    </div>
                    
                    {dashboardData?.user?.credits === 0 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="text-blue-800 font-medium mb-2">Need Credits?</h4>
                        <p className="text-blue-700 text-sm mb-3">
                          Purchase credits to access our full resume optimization service.
                        </p>
                        <button 
                          onClick={() => window.location.href = 'index.html'}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                        >
                          Buy Credits
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button 
                    type="button"
                    className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;