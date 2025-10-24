import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, UserPlus, AlertCircle, CheckCircle } from 'lucide-react';
import { connectorService } from '../lib/database';
import { convertFileToBase64, validateFileSize, getFileSizeError } from '../lib/fileUtils';

interface ConnectorFormData {
  fullName: string;
  phoneNumber: string;
  emailId: string;
  panNumber: string;
  aadhaarNumber: string;
  currentAddress: string;
  permanentAddress: string;
  bankAccountNumber: string;
  ifscCode: string;
  idProof: File | null;
  reference: string;
}

interface FormErrors {
  [key: string]: string;
}

const ConnectorRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ConnectorFormData>({
    fullName: '',
    phoneNumber: '',
    emailId: '',
    panNumber: '',
    aadhaarNumber: '',
    currentAddress: '',
    permanentAddress: '',
    bankAccountNumber: '',
    ifscCode: '',
    idProof: null,
    reference: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sameAddress, setSameAddress] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Required field validations
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
    if (!formData.emailId.trim()) newErrors.emailId = 'Email is required';
    if (!formData.panNumber.trim()) newErrors.panNumber = 'PAN number is required';
    if (!formData.aadhaarNumber.trim()) newErrors.aadhaarNumber = 'Aadhaar number is required';
    if (!formData.currentAddress.trim()) newErrors.currentAddress = 'Current address is required';
    if (!formData.permanentAddress.trim()) newErrors.permanentAddress = 'Permanent address is required';
    if (!formData.bankAccountNumber.trim()) newErrors.bankAccountNumber = 'Bank account number is required';
    if (!formData.ifscCode.trim()) newErrors.ifscCode = 'IFSC code is required';
    if (!formData.idProof) newErrors.idProof = 'ID proof is required';

    // Format validations
    const mobileRegex = /^[6-9]\d{9}$/;
    if (formData.phoneNumber && !mobileRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.emailId && !emailRegex.test(formData.emailId)) {
      newErrors.emailId = 'Please enter a valid email address';
    }

    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (formData.panNumber && !panRegex.test(formData.panNumber.toUpperCase())) {
      newErrors.panNumber = 'Please enter a valid PAN number (e.g., ABCDE1234F)';
    }

    const aadhaarRegex = /^\d{12}$/;
    if (formData.aadhaarNumber && !aadhaarRegex.test(formData.aadhaarNumber)) {
      newErrors.aadhaarNumber = 'Please enter a valid 12-digit Aadhaar number';
    }

    const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    if (formData.ifscCode && !ifscRegex.test(formData.ifscCode.toUpperCase())) {
      newErrors.ifscCode = 'Please enter a valid IFSC code';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      // Check file size (500KB limit)
      if (!validateFileSize(file, 500)) {
        setErrors(prev => ({
          ...prev,
          idProof: getFileSizeError(file, 500)
        }));
        return;
      }
    }
    
    setFormData(prev => ({
      ...prev,
      idProof: file
    }));

    if (errors.idProof) {
      setErrors(prev => ({
        ...prev,
        idProof: ''
      }));
    }
  };

  const handleSameAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSameAddress(e.target.checked);
    if (e.target.checked) {
      setFormData(prev => ({
        ...prev,
        permanentAddress: prev.currentAddress
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert file to base64 if present
      let fileData = null;
      if (formData.idProof) {
        fileData = await convertFileToBase64(formData.idProof);
      }

      // Submit to Supabase database
      const connectorData = {
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        email_id: formData.emailId,
        pan_number: formData.panNumber,
        aadhaar_number: formData.aadhaarNumber,
        current_address: formData.currentAddress,
        permanent_address: formData.permanentAddress,
        bank_account_number: formData.bankAccountNumber,
        ifsc_code: formData.ifscCode,
        id_proof: formData.idProof?.name || '',
        id_proof_file: fileData,
        reference: formData.reference,
        status: 'pending_approval' as const
      };

      const result = await connectorService.createRegistration(connectorData);

      navigate('/thank-you', { 
        state: { 
          type: 'connector',
          connectorId: result.id,
          name: formData.fullName 
        } 
      });
    } catch (error) {
      console.error('Error submitting registration:', error);
      alert('There was an error submitting your registration. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Become a Typhoon Fincon Connector</h1>
          <p className="text-lg text-gray-600">Join our network of financial consultants and earn competitive commissions</p>
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">Why Join as a Connector?</h2>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Earn up to 2% commission on successful loan disbursals</li>
              <li>• Comprehensive training and support provided</li>
              <li>• No investment required - just your dedication</li>
              <li>• Work from anywhere with flexible timings</li>
            </ul>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <UserPlus className="h-5 w-5 mr-2 text-blue-600" />
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
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 10-digit phone number"
                    maxLength={10}
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.emailId ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your email address"
                  />
                  {errors.emailId && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.emailId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PAN Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.panNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., ABCDE1234F"
                    maxLength={10}
                    style={{ textTransform: 'uppercase' }}
                  />
                  {errors.panNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.panNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Aadhaar Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="aadhaarNumber"
                    value={formData.aadhaarNumber}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.aadhaarNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter 12-digit Aadhaar number"
                    maxLength={12}
                  />
                  {errors.aadhaarNumber && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.aadhaarNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Reference (Optional)
                  </label>
                  <input
                    type="text"
                    name="reference"
                    value={formData.reference}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Referred by (if any)"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Address Information</h2>
              <div className="space-y-6">
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

                <div className="flex items-center">
                  <input
                    id="sameAddress"
                    type="checkbox"
                    checked={sameAddress}
                    onChange={handleSameAddressChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="sameAddress" className="ml-2 text-sm text-gray-700">
                    Permanent address same as current address
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Permanent Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.permanentAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your permanent address"
                    disabled={sameAddress}
                  />
                  {errors.permanentAddress && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.permanentAddress}
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
                    IFSC Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.ifscCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="e.g., SBIN0001234"
                    maxLength={11}
                    style={{ textTransform: 'uppercase' }}
                  />
                  {errors.ifscCode && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.ifscCode}
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
                  ID Proof Upload <span className="text-red-500">*</span>
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="idProof"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="idProof"
                          type="file"
                          name="idProof"
                          onChange={handleFileChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                      <p className="text-xs text-gray-500">PDF, JPG, PNG up to 500KB</p>
                    {formData.idProof && (
                      <p className="text-sm text-green-600 flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        {formData.idProof.name}
                      </p>
                    )}
                  </div>
                </div>
                {errors.idProof && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.idProof}
                  </p>
                )}
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Terms & Conditions</h3>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• You agree to maintain confidentiality of all customer information</li>
                <li>• Commission will be paid only after successful loan disbursal</li>
                <li>• You must complete mandatory training within 15 days of approval</li>
                <li>• All activities must comply with RBI guidelines and company policies</li>
                <li>• Partnership can be terminated by either party with 30 days notice</li>
              </ul>
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
                {isSubmitting ? 'Submitting Registration...' : 'Submit Registration'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConnectorRegistration;