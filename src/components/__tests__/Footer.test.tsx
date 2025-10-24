import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  test('renders Typhoon Fincon branding', () => {
    render(<Footer />);
    
    expect(screen.getByText('Typhoon Fincon')).toBeInTheDocument();
    expect(screen.getByAltText('Typhoon Fincon Logo')).toBeInTheDocument();
  });

  test('displays contact information', () => {
    render(<Footer />);
    
    expect(screen.getByText('+91 9833560350')).toBeInTheDocument();
    expect(screen.getByText('info@typhoonfincare.in')).toBeInTheDocument();
    expect(screen.getByText('Mumbai, Maharashtra, India')).toBeInTheDocument();
  });

  test('renders quick links section', () => {
    render(<Footer />);
    
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Apply for Loan')).toBeInTheDocument();
    expect(screen.getByText('Become a Partner')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  test('displays office hours', () => {
    render(<Footer />);
    
    expect(screen.getByText('Office Hours')).toBeInTheDocument();
    expect(screen.getByText('Mon - Fri: 9:00 AM - 6:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Saturday: 10:00 AM - 4:00 PM')).toBeInTheDocument();
    expect(screen.getByText('Sunday: Closed')).toBeInTheDocument();
  });

  test('shows copyright information', () => {
    render(<Footer />);
    
    expect(screen.getByText('© 2025 Typhoon Finance Consultant. All rights reserved.')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
    expect(screen.getByText('Disclaimer')).toBeInTheDocument();
  });

  test('displays disclaimer text', () => {
    render(<Footer />);
    
    expect(screen.getByText(/All loans are subject to credit approval/)).toBeInTheDocument();
    expect(screen.getByText(/Typhoon Fincare is a registered financial consultant/)).toBeInTheDocument();
  });
});

