-- TyphoonFincon Database Setup
-- Copy and paste this entire script into your Supabase SQL Editor

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS customer_applications CASCADE;
DROP TABLE IF EXISTS connector_registrations CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;

-- Create customer_applications table
CREATE TABLE customer_applications (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    date_of_birth DATE NOT NULL,
    address TEXT NOT NULL,
    employment_status VARCHAR(50) NOT NULL,
    monthly_income DECIMAL(10,2),
    loan_amount DECIMAL(10,2) NOT NULL,
    loan_purpose TEXT NOT NULL,
    bank_account_number VARCHAR(50),
    bank_name VARCHAR(100),
    residential_proof VARCHAR(255),
    residential_proof_file TEXT,
    status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'under_review', 'approved', 'rejected')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create connector_registrations table
CREATE TABLE connector_registrations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company_name VARCHAR(255),
    business_type VARCHAR(100),
    experience_years INTEGER,
    referral_network TEXT,
    id_proof VARCHAR(255),
    id_proof_file TEXT,
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
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'admin',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (username: admin, password: typhoon2025)
INSERT INTO admin_users (username, password_hash, email, role) VALUES 
('admin', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@typhoonfincon.com', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Enable Row Level Security (RLS)
ALTER TABLE customer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE connector_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
CREATE POLICY "Allow public read access on customer_applications" ON customer_applications FOR SELECT USING (true);
CREATE POLICY "Allow public insert on customer_applications" ON customer_applications FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on connector_registrations" ON connector_registrations FOR SELECT USING (true);
CREATE POLICY "Allow public insert on connector_registrations" ON connector_registrations FOR INSERT WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX idx_customer_applications_email ON customer_applications(email);
CREATE INDEX idx_customer_applications_phone ON customer_applications(phone);
CREATE INDEX idx_customer_applications_status ON customer_applications(status);
CREATE INDEX idx_customer_applications_submitted_at ON customer_applications(submitted_at);

CREATE INDEX idx_connector_registrations_email ON connector_registrations(email);
CREATE INDEX idx_connector_registrations_phone ON connector_registrations(phone);
CREATE INDEX idx_connector_registrations_status ON connector_registrations(status);
CREATE INDEX idx_connector_registrations_submitted_at ON connector_registrations(submitted_at);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_customer_applications_updated_at BEFORE UPDATE ON customer_applications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_connector_registrations_updated_at BEFORE UPDATE ON connector_registrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_admin_users_updated_at BEFORE UPDATE ON admin_users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
