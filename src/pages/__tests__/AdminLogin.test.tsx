import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import AdminLogin from '../AdminLogin';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('AdminLogin Component', () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test('renders login form', () => {
    renderWithRouter(<AdminLogin />);
    
    expect(screen.getByText('Admin Login')).toBeInTheDocument();
    expect(screen.getByText('Access the admin dashboard to manage applications')).toBeInTheDocument();
    expect(screen.getByText('Typhoon Fincon')).toBeInTheDocument();
  });

  test('renders username and password fields', () => {
    renderWithRouter(<AdminLogin />);
    
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  test('shows demo credentials', () => {
    renderWithRouter(<AdminLogin />);
    
    expect(screen.getByText('Demo Credentials')).toBeInTheDocument();
    expect(screen.getByText('Username: admin')).toBeInTheDocument();
    expect(screen.getByText('Password: typhoon2025')).toBeInTheDocument();
  });

  test('toggles password visibility', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AdminLogin />);
    
    const passwordInput = screen.getByLabelText('Password');
    const toggleButton = screen.getByRole('button', { name: '' }); // Eye icon button
    
    expect(passwordInput).toHaveAttribute('type', 'password');
    
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');
    
    await user.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('shows error for invalid credentials', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    
    await user.type(usernameInput, 'wronguser');
    await user.type(passwordInput, 'wrongpass');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
  });

  test('logs in successfully with correct credentials', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    
    await user.type(usernameInput, 'admin');
    await user.type(passwordInput, 'typhoon2025');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/admin/dashboard');
    });
    
    // Check if authentication is stored in localStorage
    expect(localStorage.getItem('adminAuthenticated')).toBe('true');
    expect(localStorage.getItem('adminLoginTime')).toBeTruthy();
  });

  test('clears error when user starts typing', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AdminLogin />);
    
    // First, trigger an error
    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
    });
    
    // Then start typing in username field
    const usernameInput = screen.getByLabelText('Username');
    await user.type(usernameInput, 'a');
    
    // Error should be cleared
    expect(screen.queryByText('Invalid username or password')).not.toBeInTheDocument();
  });

  test('shows loading state during login', async () => {
    const user = userEvent.setup();
    renderWithRouter(<AdminLogin />);
    
    const usernameInput = screen.getByLabelText('Username');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: 'Sign in' });
    
    await user.type(usernameInput, 'admin');
    await user.type(passwordInput, 'typhoon2025');
    await user.click(submitButton);
    
    // Should show loading state briefly
    expect(screen.getByText('Signing in...')).toBeInTheDocument();
  });
});
