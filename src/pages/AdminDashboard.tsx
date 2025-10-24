import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Users, Download, Eye, Calendar, Phone, Mail, LogOut, Shield } from 'lucide-react';
import { customerService, connectorService, adminService } from '../lib/database';
import { getFileFromBase64, getMimeTypeFromExtension, getFileExtension } from '../lib/fileUtils';

interface CustomerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  employmentStatus: string;
  monthlyIncome?: number;
  loanAmount: number;
  loanPurpose: string;
  bankAccountNumber: string;
  bankName: string;
  residentialProof: string;
  residentialProofFile?: string; // Base64 file data
  submittedAt: string;
  status: string;
}

interface ConnectorRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  businessType?: string;
  experienceYears?: number;
  referralNetwork?: string;
  idProof: string;
  idProofFile?: string; // Base64 file data
  submittedAt: string;
  status: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [customerApplications, setCustomerApplications] = useState<CustomerApplication[]>([]);
  const [connectorRegistrations, setConnectorRegistrations] = useState<ConnectorRegistration[]>([]);
  const [activeTab, setActiveTab] = useState<'customers' | 'connectors'>('customers');
  const [selectedApplication, setSelectedApplication] = useState<CustomerApplication | null>(null);
  const [selectedConnector, setSelectedConnector] = useState<ConnectorRegistration | null>(null);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      const isAuthenticated = await adminService.checkSession();
      if (!isAuthenticated) {
        navigate('/admin');
        return;
      }

      // Load data from Supabase
      try {
        const customers = await customerService.getAllApplications();
        const connectors = await connectorService.getAllRegistrations();
        
        setCustomerApplications(customers);
        setConnectorRegistrations(connectors);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    await adminService.logout();
    navigate('/admin');
  };

  const handleDeleteApplication = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      try {
        console.log('Deleting application with ID:', id);
        const result = await customerService.deleteApplication(id);
        console.log('Delete result:', result);
        
        // Update the state immediately by filtering out the deleted item
        setCustomerApplications(prev => {
          const filtered = prev.filter(app => app.id !== id);
          console.log('Updated applications:', filtered);
          return filtered;
        });
        
        alert('Application deleted successfully!');
      } catch (error) {
        console.error('Error deleting application:', error);
        alert('Error deleting application. Please try again.');
      }
    }
  };

  const handleDeleteConnector = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this connector registration? This action cannot be undone.')) {
      try {
        console.log('Deleting connector with ID:', id);
        const result = await connectorService.deleteRegistration(id);
        console.log('Delete result:', result);
        
        // Update the state immediately by filtering out the deleted item
        setConnectorRegistrations(prev => {
          const filtered = prev.filter(connector => connector.id !== id);
          console.log('Updated connectors:', filtered);
          return filtered;
        });
        
        alert('Connector registration deleted successfully!');
      } catch (error) {
        console.error('Error deleting connector registration:', error);
        alert('Error deleting connector registration. Please try again.');
      }
    }
  };

  const handleDownloadFile = (base64Data: string, filename: string) => {
    try {
      const extension = getFileExtension(filename);
      const mimeType = getMimeTypeFromExtension(extension);
      const file = getFileFromBase64(base64Data, filename, mimeType);
      
      const url = URL.createObjectURL(file);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
      alert('Error downloading file. Please try again.');
    }
  };

  const exportToCSV = (data: any[], filename: string) => {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const csvContent = [
      headers,
      ...data.map(row => Object.values(row).map(value => `"${value}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(parseFloat(amount));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" alt="Typhoon Fincon Logo" className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Typhoon Fincon</h1>
                <p className="text-sm text-gray-500">Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Shield className="h-4 w-4" />
                <span>Admin Access</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Applications</p>
                <p className="text-2xl font-bold text-gray-900">{customerApplications.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Connector Registrations</p>
                <p className="text-2xl font-bold text-gray-900">{connectorRegistrations.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-amber-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Today's Applications</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customerApplications.filter(app => 
                    new Date(app.submittedAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <Download className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Loan Amount</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(
                    customerApplications.reduce((sum, app) => sum + (app.loanAmount || 0), 0).toString()
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('customers')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'customers'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Customer Applications ({customerApplications.length})
              </button>
              <button
                onClick={() => setActiveTab('connectors')}
                className={`py-4 px-6 text-sm font-medium border-b-2 ${
                  activeTab === 'connectors'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Connector Registrations ({connectorRegistrations.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Export Button */}
            <div className="mb-4 flex justify-end">
              <button
                onClick={() => {
                  if (activeTab === 'customers') {
                    exportToCSV(customerApplications, 'customer-applications.csv');
                  } else {
                    exportToCSV(connectorRegistrations, 'connector-registrations.csv');
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Export to CSV
              </button>
            </div>

            {/* Customer Applications Tab */}
            {activeTab === 'customers' && (
              <div>
                {customerApplications.length === 0 ? (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No customer applications yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Application Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Info
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Loan Amount
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Submitted
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {customerApplications.map((application) => (
                          <tr key={application.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {application.fullName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {application.id}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Status: {application.status}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 flex items-center mb-1">
                                <Phone className="h-4 w-4 mr-1 text-gray-400" />
                                {application.phone}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Mail className="h-4 w-4 mr-1 text-gray-400" />
                                {application.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                {formatCurrency(application.loanAmount)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(application.submittedAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedApplication(application)}
                                  className="text-blue-600 hover:text-blue-900 flex items-center"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleDeleteApplication(application.id)}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                >
                                  <span className="mr-1">🗑️</span>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Connector Registrations Tab */}
            {activeTab === 'connectors' && (
              <div>
                {connectorRegistrations.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No connector registrations yet</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Connector Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Contact Info
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Reference
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Submitted
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {connectorRegistrations.map((connector) => (
                          <tr key={connector.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {connector.fullName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  ID: {connector.id}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Status: {connector.status}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900 flex items-center mb-1">
                                <Phone className="h-4 w-4 mr-1 text-gray-400" />
                                {connector.phone}
                              </div>
                              <div className="text-sm text-gray-500 flex items-center">
                                <Mail className="h-4 w-4 mr-1 text-gray-400" />
                                {connector.email}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {connector.companyName || 'Not provided'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatDate(connector.submittedAt)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => setSelectedConnector(connector)}
                                  className="text-blue-600 hover:text-blue-900 flex items-center"
                                >
                                  <Eye className="h-4 w-4 mr-1" />
                                  View Details
                                </button>
                                <button
                                  onClick={() => handleDeleteConnector(connector.id)}
                                  className="text-red-600 hover:text-red-900 flex items-center"
                                >
                                  <span className="mr-1">🗑️</span>
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Customer Application Detail Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Customer Application Details</h3>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-sm text-gray-900">{selectedApplication.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="text-sm text-gray-900">{selectedApplication.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="text-sm text-gray-900">{selectedApplication.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <p className="text-sm text-gray-900">{selectedApplication.dateOfBirth}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Employment Status</label>
                    <p className="text-sm text-gray-900">{selectedApplication.employmentStatus}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Monthly Income</label>
                    <p className="text-sm text-gray-900">{selectedApplication.monthlyIncome ? `₹${selectedApplication.monthlyIncome.toLocaleString()}` : 'Not provided'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Loan Amount</label>
                    <p className="text-sm text-gray-900 font-semibold">{formatCurrency(selectedApplication.loanAmount.toString())}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Loan Purpose</label>
                    <p className="text-sm text-gray-900">{selectedApplication.loanPurpose}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Account</label>
                    <p className="text-sm text-gray-900">{selectedApplication.bankAccountNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                    <p className="text-sm text-gray-900">{selectedApplication.bankName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <p className="text-sm text-gray-900">{selectedApplication.status}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedApplication.submittedAt)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <p className="text-sm text-gray-900">{selectedApplication.address}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Residential Proof</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{selectedApplication.residentialProof}</p>
                    {selectedApplication.residentialProofFile && (
                      <button
                        onClick={() => handleDownloadFile(selectedApplication.residentialProofFile!, selectedApplication.residentialProof)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connector Detail Modal */}
      {selectedConnector && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">Connector Registration Details</h3>
                <button
                  onClick={() => setSelectedConnector(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  ✕
                </button>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
                    <p className="text-sm text-gray-900">{selectedConnector.fullName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <p className="text-sm text-gray-900">{selectedConnector.phoneNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email ID</label>
                    <p className="text-sm text-gray-900">{selectedConnector.emailId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PAN Number</label>
                    <p className="text-sm text-gray-900">{selectedConnector.panNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Aadhaar Number</label>
                    <p className="text-sm text-gray-900">{selectedConnector.aadhaarNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bank Account</label>
                    <p className="text-sm text-gray-900">{selectedConnector.bankAccountNumber}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">IFSC Code</label>
                    <p className="text-sm text-gray-900">{selectedConnector.ifscCode}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Reference</label>
                    <p className="text-sm text-gray-900">{selectedConnector.reference || 'None'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Submitted At</label>
                    <p className="text-sm text-gray-900">{formatDate(selectedConnector.submittedAt)}</p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Address</label>
                  <p className="text-sm text-gray-900">{selectedConnector.currentAddress}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
                  <p className="text-sm text-gray-900">{selectedConnector.permanentAddress}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">ID Proof</label>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-900">{selectedConnector.idProof}</p>
                    {selectedConnector.idProofFile && (
                      <button
                        onClick={() => handleDownloadFile(selectedConnector.idProofFile!, selectedConnector.idProof)}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium text-blue-600 bg-blue-100 rounded hover:bg-blue-200"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;