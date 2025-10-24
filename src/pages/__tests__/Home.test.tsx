import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Home Page', () => {
  test('renders main heading', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText(/Your Financial Success Partner/)).toBeInTheDocument();
  });

  test('displays company logo and name', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Typhoon Fincon')).toBeInTheDocument();
    expect(screen.getByAltText('Typhoon Fincon Logo')).toBeInTheDocument();
  });

  test('renders call-to-action buttons', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Apply for Loan')).toBeInTheDocument();
    expect(screen.getByText('Become a Partner')).toBeInTheDocument();
  });

  test('displays services section', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Our Services')).toBeInTheDocument();
    expect(screen.getByText('Home Loans')).toBeInTheDocument();
    expect(screen.getByText('Vehicle Loans')).toBeInTheDocument();
    expect(screen.getByText('Personal Loans')).toBeInTheDocument();
  });

  test('shows features section', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Why Choose Us?')).toBeInTheDocument();
    expect(screen.getByText('Quick Approval')).toBeInTheDocument();
    expect(screen.getByText('Secure Process')).toBeInTheDocument();
    expect(screen.getByText('Expert Support')).toBeInTheDocument();
  });

  test('displays testimonials', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('What Our Clients Say')).toBeInTheDocument();
    expect(screen.getByText('Rajesh Kumar')).toBeInTheDocument();
    expect(screen.getByText('Priya Sharma')).toBeInTheDocument();
    expect(screen.getByText('Amit Patel')).toBeInTheDocument();
  });

  test('renders contact section', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByText('+91 9833560350')).toBeInTheDocument();
    expect(screen.getByText('info@typhoonfincare.in')).toBeInTheDocument();
  });

  test('shows special offer banner', () => {
    renderWithRouter(<Home />);
    
    expect(screen.getByText(/Special Offer: Get up to 2% off on home loan interest rates/)).toBeInTheDocument();
  });
});

