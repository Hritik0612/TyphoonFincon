import { supabase, CustomerApplication, ConnectorRegistration } from './supabase'

// Check if Supabase is properly configured
const isSupabaseConfigured = () => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return url && key && !url.includes('your-project') && !key.includes('your-anon-key');
};

// Customer Application Functions
export const customerService = {
  // Create a new customer application
  async createApplication(data: Omit<CustomerApplication, 'id' | 'submittedAt'>) {
    // If Supabase is not configured, use localStorage as fallback
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using localStorage fallback');
      const application = {
        id: Date.now().toString(),
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        employmentStatus: data.employmentStatus,
        monthlyIncome: data.monthlyIncome,
        loanAmount: data.loanAmount,
        loanPurpose: data.loanPurpose,
        bankAccountNumber: data.bankAccountNumber,
        bankName: data.bankName,
        residentialProof: data.residentialProof,
        residentialProofFile: data.residentialProofFile || null,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };
      
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('customerApplications') || '[]');
      existing.push(application);
      localStorage.setItem('customerApplications', JSON.stringify(existing));
      
      return application;
    }

    // Use Supabase if configured
    const { data: result, error } = await supabase
      .from('customer_applications')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        date_of_birth: data.dateOfBirth,
        address: data.address,
        employment_status: data.employmentStatus,
        monthly_income: data.monthlyIncome,
        loan_amount: data.loanAmount,
        loan_purpose: data.loanPurpose,
        bank_account_number: data.bankAccountNumber,
        bank_name: data.bankName,
        residential_proof: data.residentialProof,
        residential_proof_file: data.residentialProofFile,
        status: 'submitted'
      }])
      .select()

    if (error) {
      console.error('Error creating customer application:', error)
      throw new Error('Failed to submit application')
    }

    return result[0]
  },

  // Get all customer applications
  async getAllApplications() {
    // If Supabase is not configured, use localStorage as fallback
    if (!isSupabaseConfigured()) {
      const data = JSON.parse(localStorage.getItem('customerApplications') || '[]');
      return data.sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    }

    // Use Supabase if configured
    const { data, error } = await supabase
      .from('customer_applications')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (error) {
      console.error('Error fetching applications:', error)
      throw new Error('Failed to fetch applications')
    }

    // Transform snake_case to camelCase for frontend compatibility
    return data?.map(item => ({
      id: item.id,
      fullName: item.full_name,
      email: item.email,
      phone: item.phone,
      dateOfBirth: item.date_of_birth,
      address: item.address,
      employmentStatus: item.employment_status,
      monthlyIncome: item.monthly_income,
      loanAmount: item.loan_amount,
      loanPurpose: item.loan_purpose,
      bankAccountNumber: item.bank_account_number,
      bankName: item.bank_name,
      residentialProof: item.residential_proof,
      residentialProofFile: item.residential_proof_file,
      submittedAt: item.submitted_at,
      status: item.status
    })) || []
  },

  // Update application status
  async updateStatus(id: string, status: CustomerApplication['status']) {
    const { data, error } = await supabase
      .from('customer_applications')
      .update({ status })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating status:', error)
      throw new Error('Failed to update status')
    }

    return data[0]
  },

  // Delete application
  async deleteApplication(id: string) {
    console.log('Delete application called with ID:', id);
    console.log('Supabase configured:', isSupabaseConfigured());
    
    if (!isSupabaseConfigured()) {
      console.log('Using localStorage fallback for delete');
      const data = JSON.parse(localStorage.getItem('customerApplications') || '[]');
      const filtered = data.filter((app: any) => app.id !== id);
      localStorage.setItem('customerApplications', JSON.stringify(filtered));
      console.log('localStorage updated, new length:', filtered.length);
      return { success: true };
    }

    console.log('Using Supabase for delete');
    const { error } = await supabase
      .from('customer_applications')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting application:', error)
      throw new Error('Failed to delete application')
    }

    console.log('Supabase delete successful');
    return { success: true }
  }
}

// Connector Registration Functions
export const connectorService = {
  // Create a new connector registration
  async createRegistration(data: Omit<ConnectorRegistration, 'id' | 'submittedAt'>) {
    // If Supabase is not configured, use localStorage as fallback
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using localStorage fallback');
      const registration = {
        id: Date.now().toString(),
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        companyName: data.companyName,
        businessType: data.businessType,
        experienceYears: data.experienceYears,
        referralNetwork: data.referralNetwork,
        idProof: data.idProof,
        idProofFile: data.idProofFile || null,
        submittedAt: new Date().toISOString(),
        status: 'pending_approval'
      };
      
      // Save to localStorage
      const existing = JSON.parse(localStorage.getItem('connectorRegistrations') || '[]');
      existing.push(registration);
      localStorage.setItem('connectorRegistrations', JSON.stringify(existing));
      
      return registration;
    }

    // Use Supabase if configured
    const { data: result, error } = await supabase
      .from('connector_registrations')
      .insert([{
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        company_name: data.companyName,
        business_type: data.businessType,
        experience_years: data.experienceYears,
        referral_network: data.referralNetwork,
        id_proof: data.idProof,
        id_proof_file: data.idProofFile,
        status: 'pending_approval'
      }])
      .select()

    if (error) {
      console.error('Error creating connector registration:', error)
      throw new Error('Failed to submit registration')
    }

    return result[0]
  },

  // Get all connector registrations
  async getAllRegistrations() {
    // If Supabase is not configured, use localStorage as fallback
    if (!isSupabaseConfigured()) {
      const data = JSON.parse(localStorage.getItem('connectorRegistrations') || '[]');
      return data.sort((a: any, b: any) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
    }

    // Use Supabase if configured
    const { data, error } = await supabase
      .from('connector_registrations')
      .select('*')
      .order('submitted_at', { ascending: false })

    if (error) {
      console.error('Error fetching registrations:', error)
      throw new Error('Failed to fetch registrations')
    }

    // Transform snake_case to camelCase for frontend compatibility
    return data?.map(item => ({
      id: item.id,
      fullName: item.full_name,
      email: item.email,
      phone: item.phone,
      companyName: item.company_name,
      businessType: item.business_type,
      experienceYears: item.experience_years,
      referralNetwork: item.referral_network,
      idProof: item.id_proof,
      idProofFile: item.id_proof_file,
      submittedAt: item.submitted_at,
      status: item.status
    })) || []
  },

  // Update registration status
  async updateStatus(id: string, status: ConnectorRegistration['status']) {
    const { data, error } = await supabase
      .from('connector_registrations')
      .update({ status })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating status:', error)
      throw new Error('Failed to update status')
    }

    return data[0]
  },

  // Delete registration
  async deleteRegistration(id: string) {
    if (!isSupabaseConfigured()) {
      const data = JSON.parse(localStorage.getItem('connectorRegistrations') || '[]');
      const filtered = data.filter((reg: any) => reg.id !== id);
      localStorage.setItem('connectorRegistrations', JSON.stringify(filtered));
      return { success: true };
    }

    const { error } = await supabase
      .from('connector_registrations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting registration:', error)
      throw new Error('Failed to delete registration')
    }

    return { success: true }
  }
}

// Admin Authentication Functions
export const adminService = {
  // Verify admin credentials
  async verifyAdmin(username: string, password: string) {
    // For demo purposes, using hardcoded credentials
    // In production, use Supabase Auth or hash passwords properly
    const ADMIN_CREDENTIALS = {
      username: 'admin',
      password: 'typhoon2025'
    }

    return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password
  },

  // Create admin session
  async createSession() {
    const sessionData = {
      authenticated: true,
      loginTime: new Date().toISOString(),
      username: 'admin'
    }
    
    localStorage.setItem('adminSession', JSON.stringify(sessionData))
    return sessionData
  },

  // Check if admin is authenticated
  async checkSession() {
    const sessionData = localStorage.getItem('adminSession')
    if (!sessionData) return false

    try {
      const session = JSON.parse(sessionData)
      return session.authenticated === true
    } catch {
      return false
    }
  },

  // Logout admin
  async logout() {
    localStorage.removeItem('adminSession')
  }
}
