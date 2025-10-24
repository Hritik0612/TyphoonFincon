import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  CreditCard, 
  Home as HomeIcon, 
  Car, 
  GraduationCap,
  Star,
  Phone,
  Mail,
  CheckCircle
} from 'lucide-react';

const Home = () => {
  const services = [
    {
      icon: <HomeIcon className="h-8 w-8 text-blue-600" />,
      title: "Home Loans",
      description: "Competitive rates for your dream home with flexible repayment options."
    },
    {
      icon: <Car className="h-8 w-8 text-blue-600" />,
      title: "Vehicle Loans",
      description: "Quick approval for cars, bikes, and commercial vehicles."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      title: "Personal Loans",
      description: "Unsecured loans for all your personal financial needs."
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      title: "Business Loans",
      description: "Invest in your future with our business financing solutions."
    } 
  ];

  const features = [
    {
      icon: <Clock className="h-6 w-6 text-amber-600" />,
      title: "Quick Approval",
      description: "Fast processing and approval within 24-48 hours"
    },
    {
      icon: <Shield className="h-6 w-6 text-amber-600" />,
      title: "Secure Process",
      description: "100% secure and confidential document handling"
    },
    {
      icon: <Users className="h-6 w-6 text-amber-600" />,
      title: "Expert Support",
      description: "Dedicated relationship managers for personalized service"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Home Loan Customer",
      content: "Excellent service! Got my home loan approved in just 2 days with competitive interest rates.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Personal Loan Customer", 
      content: "Professional team and transparent process. Highly recommend Typhoon Fincon for any financial needs.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Business Loan Customer",
      content: "They helped me expand my business with a tailored loan solution. Great experience overall!",
      rating: 5
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img src="/logo.png" alt="Typhoon Fincon Logo" className="h-10 w-10" />
                <div className="text-2xl font-bold text-white">Typhoon Fincon</div>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Financial <span className="text-amber-400">Success</span> Partner
              </h1>
              <p className="text-xl mb-8 text-blue-100 max-w-lg">
                Get instant loan approvals with competitive rates. We provide comprehensive financial solutions tailored to your needs.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/customer"
                  className="bg-amber-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-amber-600 transition-colors duration-200 text-center"
                >
                  Apply for Loan
                </Link>
                <Link 
                  to="/connector"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors duration-200 text-center"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg" 
                alt="Financial consultation" 
                className="rounded-lg shadow-2xl w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advertisement Banner */}
      <section className="bg-gradient-to-r from-amber-400 to-amber-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg font-semibold">
              🎉 Special Offer: Get up to 2% off on home loan interest rates this month! 
              <Link to="/customer" className="underline ml-2 hover:text-amber-100">Apply Now</Link>
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">About Typhoon Fincon</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With over a decade of experience in financial services, we are committed to providing transparent, 
              reliable, and customer-centric loan solutions across India.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
                alt="Team meeting" 
                className="rounded-lg shadow-lg w-full h-80 object-cover"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Why Choose Us?</h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 bg-amber-100 p-2 rounded-lg">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive financial solutions for all your needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">{service.title}</h3>
                <p className="text-gray-600 text-center">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Don't just take our word for it</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-xl text-blue-100">Ready to start your financial journey? Contact us today!</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Phone className="h-6 w-6 text-amber-400" />
                  <div>
                    <div className="font-semibold">Phone</div>
                    <div className="text-blue-100">+91 9833560350</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Mail className="h-6 w-6 text-amber-400" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-blue-100">info@typhoonfincare.in</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Why Apply With Us?</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-400" />
                    <span className="text-blue-100">Instant loan approval</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-400" />
                    <span className="text-blue-100">Competitive interest rates</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-400" />
                    <span className="text-blue-100">Minimal documentation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-amber-400" />
                    <span className="text-blue-100">24/7 customer support</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white text-gray-900 p-8 rounded-lg">
              <h3 className="text-2xl font-bold mb-6">Quick Contact Form</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Loan Type</label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Home Loan</option>
                    <option>Personal Loan</option>
                    <option>Vehicle Loan</option>
                    <option>Education Loan</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-800 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-900 transition-colors duration-200"
                >
                  Request Callback
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;