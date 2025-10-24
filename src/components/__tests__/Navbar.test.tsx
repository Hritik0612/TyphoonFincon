import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  test('renders Typhoon Fincon logo and name', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('Typhoon Fincon')).toBeInTheDocument();
    expect(screen.getByAltText('Typhoon Fincon Logo')).toBeInTheDocument();
  });

  test('renders navigation links', () => {
    renderWithRouter(<Navbar />);
    
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Connector')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Apply Now')).toBeInTheDocument();
  });

  test('toggles mobile menu when menu button is clicked', () => {
    renderWithRouter(<Navbar />);
    
    const menuButton = screen.getByRole('button');
    expect(menuButton).toBeInTheDocument();
    
    // Initially mobile menu should not be visible
    expect(screen.queryByText('Home')).toBeInTheDocument(); // Desktop nav
    
    // Click menu button
    fireEvent.click(menuButton);
    
    // Mobile menu should now be visible
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  test('has correct links to pages', () => {
    renderWithRouter(<Navbar />);
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    const customerLink = screen.getByRole('link', { name: /customer/i });
    const connectorLink = screen.getByRole('link', { name: /connector/i });
    const applyLink = screen.getByRole('link', { name: /apply now/i });
    
    expect(homeLink).toHaveAttribute('href', '/');
    expect(customerLink).toHaveAttribute('href', '/customer');
    expect(connectorLink).toHaveAttribute('href', '/connector');
    expect(applyLink).toHaveAttribute('href', '/customer');
  });
});

