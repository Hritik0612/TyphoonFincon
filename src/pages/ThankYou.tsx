import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, TrendingUp, Phone, Mail, Clock } from 'lucide-react';

const ThankYou = () => {
  const location = useLocation();
  const { type, applicationId, connectorId, name } = location.state || {};

  const isCustomer = type === 'customer';
  const isConnector = type === 'connector';

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-green-100 p-4 rounded-full">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Thank You{name ? `, ${name}` : ''}!
          </h1>
          
          {isCustomer && (
            <div className="mb-8">
              <p className="text-xl text-gray-600 mb-4">
                Your loan application has been submitted successfully.
              </p>
              {applicationId && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <h3 className="font-semibold text-blue-900 mb-2">Application Details</h3>
                  <p className="text-sm text-blue-800">
                    <strong>Application ID:</strong> {applicationId}
                  </p>
                  <p className="text-xs text-blue-600 mt-2">
                    Please save this ID for future reference
                  </p>
                </div>
              )}
            </div>
          )}

          {isConnector && (
            <div className="mb-8">
              <p className="text-xl text-gray-600 mb-4">
                Your connector registration has been submitted successfully.
              </p>
              {connectorId && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <h3 className="font-semibold text-green-900 mb-2">Registration Details</h3>
                  <p className="text-sm text-green-800">
                    <strong>Connector ID:</strong> {connectorId}
                  </p>
                  <p className="text-xs text-green-600 mt-2">
                    Please save this ID for future reference
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-center justify-center mb-6">
              <img src="/logo.png" alt="Typhoon Fincon Logo" className="h-10 w-10" />
              <div className="text-xl font-bold text-gray-900 ml-2">Typhoon Fincon</div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              What happens next?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Document Verification</h3>
                <p className="text-sm text-gray-600">
                  Our team will verify your submitted documents within 24 hours
                </p>
              </div>

              <div className="text-center">
                <div className="bg-amber-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-amber-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isCustomer ? 'Credit Assessment' : 'Background Check'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isCustomer 
                    ? 'We will assess your eligibility and loan terms'
                    : 'We will conduct a background verification process'
                  }
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {isCustomer ? 'Loan Approval' : 'Onboarding'}
                </h3>
                <p className="text-sm text-gray-600">
                  {isCustomer 
                    ? 'Get loan approval and fund disbursement'
                    : 'Complete training and start earning commissions'
                  }
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Our team will contact you shortly</h3>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">Response within 24 hours</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">+91 9833560350</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-2" />
                  <span className="text-sm text-gray-600">info@typhoonfincare.in</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">
                {isCustomer ? 'Loan Process Tips' : 'Connector Benefits'}
              </h3>
              <ul className="text-sm text-blue-800 space-y-2 text-left">
                {isCustomer ? (
                  <>
                    <li>• Keep your documents ready for quick verification</li>
                    <li>• Maintain a good credit score for better rates</li>
                    <li>• Respond promptly to our verification calls</li>
                    <li>• Check your email regularly for updates</li>
                  </>
                ) : (
                  <>
                    <li>• Earn up to 2% commission on successful loans</li>
                    <li>• Free training and certification provided</li>
                    <li>• Flexible working hours and location</li>
                    <li>• Ongoing support from our team</li>
                  </>
                )}
              </ul>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-amber-900 mb-3">Need Help?</h3>
              <div className="space-y-3 text-left">
                <div>
                  <p className="text-sm font-medium text-amber-800">Customer Support</p>
                  <p className="text-sm text-amber-700">Mon-Fri: 9:00 AM - 6:00 PM</p>
                  <p className="text-sm text-amber-700">Saturday: 10:00 AM - 4:00 PM</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-800">Email Support</p>
                  <p className="text-sm text-amber-700">info@typhoonfincare.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/"
              className="bg-blue-600 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition-colors duration-200 text-center"
            >
              Back to Home
            </Link>
            {isCustomer ? (
              <Link
                to="/customer"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                Apply for Another Loan
              </Link>
            ) : (
              <a
                href="mailto:info@typhoonfincare.in"
                className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
              >
                Contact Support
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;