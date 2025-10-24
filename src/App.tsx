import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CustomerApplication from './pages/CustomerApplication';
import ConnectorRegistration from './pages/ConnectorRegistration';
import ThankYou from './pages/ThankYou';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Only show navbar on non-admin routes */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/customer" element={<CustomerApplication />} />
            <Route path="/connector" element={<ConnectorRegistration />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </main>
        {/* Only show footer on non-admin routes */}
        <Routes>
          <Route path="/admin/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;