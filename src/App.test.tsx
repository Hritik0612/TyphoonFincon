import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders without crashing', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Typhoon Fincon')).toBeInTheDocument();
  });

  test('renders navbar on main routes', () => {
    renderWithRouter(<App />);
    
    // Should show navbar on home page
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Customer')).toBeInTheDocument();
    expect(screen.getByText('Connector')).toBeInTheDocument();
  });

  test('renders footer on main routes', () => {
    renderWithRouter(<App />);
    
    // Footer should be present
    expect(screen.getByText('© 2025 Typhoon Finance Consultant. All rights reserved.')).toBeInTheDocument();
  });

  test('renders main content area', () => {
    renderWithRouter(<App />);
    
    // Main content should be present
    const mainElement = document.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });
});

