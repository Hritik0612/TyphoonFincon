-- TyphoonFincon Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Create customer_applications table
CREATE TABLE customer_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    date_of_birth DATE NOT NULL,
    mobile_number VARCHAR(10) NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    pan_number VARCHAR(10) NOT NULL,
    aadhaar_number VARCHAR(12) NOT NULL,
    current_address TEXT NOT NULL,
    permanent_address TEXT NOT NULL,
    residential_proof VARCHAR(255) NOT NULL,
    bank_account_number VARCHAR(20) NOT NULL,
    ifsc_code VARCHAR(11) NOT NULL,
    loan_amount DECIMAL(15,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create connector_registrations table
CREATE TABLE connector_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    phone_number VARCHAR(10) NOT NULL,
    email_id VARCHAR(255) NOT NULL,
    pan_number VARCHAR(10) NOT NULL,
    aadhaar_number VARCHAR(12) NOT NULL,
    current_address TEXT NOT NULL,
    permanent_address TEXT NOT NULL,
    bank_account_number VARCHAR(20) NOT NULL,
    ifsc_code VARCHAR(11) NOT NULL,
    id_proof VARCHAR(255) NOT NULL,
    reference VARCHAR(255),
    status VARCHAR(20) DEFAULT 'pending_approval' CHECK (status IN ('pending_approval', 'approved', 'rejected')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create admin_users table
CREATE TABLE admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: typhoon2025)
INSERT INTO admin_users (username, password_hash) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- Enable Row Level Security (RLS)
ALTER TABLE customer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE connector_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
-- In production, create proper authentication policies
CREATE POLICY "Allow public read access on customer_applications" ON customer_applications FOR SELECT USING (true);
CREATE POLICY "Allow public insert on customer_applications" ON customer_applications FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on connector_registrations" ON connector_registrations FOR SELECT USING (true);
CREATE POLICY "Allow public insert on connector_registrations" ON connector_registrations FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_customer_applications_email ON customer_applications(email_id);
CREATE INDEX idx_customer_applications_mobile ON customer_applications(mobile_number);
CREATE INDEX idx_customer_applications_status ON customer_applications(status);
CREATE INDEX idx_customer_applications_submitted_at ON customer_applications(submitted_at);

CREATE INDEX idx_connector_registrations_email ON connector_registrations(email_id);
CREATE INDEX idx_connector_registrations_phone ON connector_registrations(phone_number);
CREATE INDEX idx_connector_registrations_status ON connector_registrations(status);
CREATE INDEX idx_connector_registrations_submitted_at ON connector_registrations(submitted_at);

