import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CustomerApplication from '../CustomerApplication';

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

describe('CustomerApplication Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    mockNavigate.mockClear();
  });

  test('renders form title and description', () => {
    renderWithRouter(<CustomerApplication />);
    
    expect(screen.getByText('Loan Application')).toBeInTheDocument();
    expect(screen.getByText('Fill out the form below to apply for your loan')).toBeInTheDocument();
  });

  test('renders all form sections', () => {
    renderWithRouter(<CustomerApplication />);
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Address Information')).toBeInTheDocument();
    expect(screen.getByText('Banking Information')).toBeInTheDocument();
    expect(screen.getByText('Loan Information')).toBeInTheDocument();
  });

  test('validates required fields', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerApplication />);
    
    const submitButton = screen.getByText('Submit Application');
    await user.click(submitButton);
    
    expect(screen.getByText('Full name is required')).toBeInTheDocument();
    expect(screen.getByText('Date of birth is required')).toBeInTheDocument();
    expect(screen.getByText('Mobile number is required')).toBeInTheDocument();
    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(screen.getByText('PAN number is required')).toBeInTheDocument();
    expect(screen.getByText('Aadhaar number is required')).toBeInTheDocument();
  });

  test('validates email format', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerApplication />);
    
    const emailInput = screen.getByLabelText(/Email ID/i);
    await user.type(emailInput, 'invalid-email');
    
    const submitButton = screen.getByText('Submit Application');
    await user.click(submitButton);
    
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
  });

  test('validates mobile number format', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerApplication />);
    
    const mobileInput = screen.getByLabelText(/Mobile Number/i);
    await user.type(mobileInput, '1234567890'); // Invalid format
    
    const submitButton = screen.getByText('Submit Application');
    await user.click(submitButton);
    
    expect(screen.getByText('Please enter a valid mobile number')).toBeInTheDocument();
  });

  test('validates PAN number format', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerApplication />);
    
    const panInput = screen.getByLabelText(/PAN Number/i);
    await user.type(panInput, 'invalidpan');
    
    const submitButton = screen.getByText('Submit Application');
    await user.click(submitButton);
    
    expect(screen.getByText('Please enter a valid PAN number (e.g., ABCDE1234F)')).toBeInTheDocument();
  });

  test('validates loan amount minimum', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerApplication />);
    
    const loanAmountInput = screen.getByLabelText(/Loan Amount Required/i);
    await user.type(loanAmountInput, '5000'); // Below minimum
    
    const submitButton = screen.getByText('Submit Application');
    await user.click(submitButton);
    
    expect(screen.getByText('Minimum loan amount is ₹10,000')).toBeInTheDocument();
  });

  test('toggles same address checkbox', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerApplication />);
    
    const currentAddressInput = screen.getByLabelText(/Current Address/i);
    const sameAddressCheckbox = screen.getByLabelText(/Permanent address same as current address/i);
    const permanentAddressInput = screen.getByLabelText(/Permanent Address/i);
    
    await user.type(currentAddressInput, 'Test Current Address');
    await user.click(sameAddressCheckbox);
    
    expect(permanentAddressInput).toHaveValue('Test Current Address');
    expect(permanentAddressInput).toBeDisabled();
  });

  test('submits form with valid data', async () => {
    const user = userEvent.setup();
    renderWithRouter(<CustomerApplication />);
    
    // Fill in valid form data
    await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
    await user.type(screen.getByLabelText(/Date of Birth/i), '1990-01-01');
    await user.type(screen.getByLabelText(/Mobile Number/i), '9876543210');
    await user.type(screen.getByLabelText(/Email ID/i), 'john@example.com');
    await user.type(screen.getByLabelText(/PAN Number/i), 'ABCDE1234F');
    await user.type(screen.getByLabelText(/Aadhaar Number/i), '123456789012');
    await user.type(screen.getByLabelText(/Current Address/i), '123 Test Street');
    await user.type(screen.getByLabelText(/Permanent Address/i), '123 Test Street');
    await user.type(screen.getByLabelText(/Bank Account Number/i), '1234567890');
    await user.type(screen.getByLabelText(/IFSC Code/i), 'SBIN0001234');
    await user.type(screen.getByLabelText(/Loan Amount Required/i), '50000');
    
    // Mock file upload
    const file = new File(['test'], 'test.pdf', { type: 'application/pdf' });
    const fileInput = screen.getByLabelText(/Residential Proof Upload/i);
    await user.upload(fileInput, file);
    
    const submitButton = screen.getByText('Submit Application');
    await user.click(submitButton);
    
    // Wait for navigation
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/thank-you', expect.any(Object));
    });
  });
});

