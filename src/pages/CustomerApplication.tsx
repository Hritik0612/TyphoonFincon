import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import { customerService } from '../lib/database';
import { convertFileToBase64, validateFileSize, getFileSizeError } from '../lib/fileUtils';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  currentAddress: string;
  employmentStatus: string;
  monthlyIncome: string;
  loanAmount: string;
  loanPurpose: string;
  bankAccountNumber: string;
  bankName: string;
  residentialProof: File | null;
}

interface FormErrors {
  [key: string]: string;
}

const CustomerApplication = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    currentAddress: '',
    employmentStatus: '',
    monthlyIncome: '',
    loanAmount: '',
    loanPurpose: '',
    bankAccountNumber: '',
    bankName: '',
    residentialProof: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Validate file size
      if (!validateFileSize(file)) {
        setErrors(prev => ({
          ...prev,
          residentialProof: getFileSizeError(file)
        }));
        return;
      }
    }

    setFormData(prev => ({
      ...prev,
      residentialProof: file
    }));

    if (errors.residentialProof) {
      setErrors(prev => ({
        ...prev,
        residentialProof: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.currentAddress.trim()) newErrors.currentAddress = 'Current address is required';
    if (!formData.employmentStatus) newErrors.employmentStatus = 'Employment status is required';
    if (!formData.loanAmount.trim()) newErrors.loanAmount = 'Loan amount is required';
    if (!formData.loanPurpose.trim()) newErrors.loanPurpose = 'Loan purpose is required';
    if (!formData.bankAccountNumber.trim()) newErrors.bankAccountNumber = 'Bank account number is required';
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.residentialProof) newErrors.residentialProof = 'Residential proof is required';

    // Format validations
    const phoneRegex = /^[6-9]\d{9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Numeric validations
    if (formData.monthlyIncome && isNaN(parseFloat(formData.monthlyIncome))) {
      newErrors.monthlyIncome = 'Please enter a valid monthly income';
    }

    const loanAmount = parseFloat(formData.loanAmount);
    if (formData.loanAmount && (isNaN(loanAmount) || loanAmount < 10000)) {
      newErrors.loanAmount = 'Minimum loan amount is ₹10,000';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert file to base64 if present
      let residentialProofFile = null;
      if (formData.residentialProof) {
        residentialProofFile = await convertFileToBase64(formData.residentialProof);
      }

      // Prepare application data for database
      const applicationData = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        dateOfBirth: formData.dateOfBirth,
        address: formData.currentAddress,
        employmentStatus: formData.employmentStatus,
        monthlyIncome: formData.monthlyIncome ? parseFloat(formData.monthlyIncome) : undefined,
        loanAmount: parseFloat(formData.loanAmount),
        loanPurpose: formData.loanPurpose,
        bankAccountNumber: formData.bankAccountNumber,
        bankName: formData.bankName,
        residentialProof: formData.residentialProof?.name || '',
        residentialProofFile: residentialProofFile,
        status: 'submitted' as const
      };

      // Submit to database using customerService
      const result = await customerService.createApplication(applicationData);

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      navigate('/thank-you', { 
        state: { 
          type: 'customer',
          applicationId: result.id,
          name: formData.fullName 
        } 
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Loan Application</h1>
          <p className="text-lg text-gray-600">Fill out the form below to apply for your loan</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.fullName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    max={new Date(Date.now() - 18*365*24*60*60*1000).toISOString().split('T')[0]}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.dateOfBirth}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Address Information</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="currentAddress"
                  value={formData.currentAddress}
                  onChange={handleChange}
                  rows={3}
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.currentAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your current address"
                />
                {errors.currentAddress && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.currentAddress}
                  </p>
                )}
              </div>
            </div>

            {/* Employment Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Employment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employment Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="employmentStatus"
                    value={formData.employmentStatus}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.employmentStatus ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select employment status</option>
                    <option value="employed">Employed</option>
                    <option value="self-employed">Self-Employed</option>
                    <option value="business">Business Owner</option>
                    <option value="retired">Retired</option>
                    <option value="unemployed">Unemployed</option>
                  </select>
                  {errors.employmentStatus && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.employmentStatus}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Monthly Income (₹)
                  </label>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.monthlyIncome ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter monthly income"
                    min="0"
                  />
                  {errors.monthlyIncome && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.monthlyIncome}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Loan Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Loan Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Amount Required (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="loanAmount"
                    value={formData.loanAmount}
                    onChange={handleChange}
                    min="10000"
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.loanAmount ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter loan amount (minimum ₹10,000)"
                  />
                  {errors.loanAmount && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.loanAmount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loan Purpose <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="loanPurpose"
                    value={formData.loanPurpose}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.loanPurpose ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter loan purpose"
                  />
                  {errors.loanPurpose && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.loanPurpose}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Banking Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Banking Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Account Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.bankAccountNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter bank account number"
                  />
                  {errors.bankAccountNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.bankAccountNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bank Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.bankName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter bank name"
                  />
                  {errors.bankName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.bankName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Document Upload */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Document Upload</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Residential Proof <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="residentialProof"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="residentialProof"
                          type="file"
                          name="residentialProof"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 500KB</p>
                    {formData.residentialProof && (
                      <p className="text-sm text-green-600 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {formData.residentialProof.name}
                      </p>
                    )}
                  </div>
                </div>
                {errors.residentialProof && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.residentialProof}
                  </p>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-6 rounded-md text-white font-semibold transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerApplication;
