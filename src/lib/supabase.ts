import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types - Updated to match your current form structure
export interface CustomerApplication {
  id?: string
  fullName: string
  email: string
  phone: string
  dateOfBirth: string
  address: string
  employmentStatus: string
  monthlyIncome?: number
  loanAmount: number
  loanPurpose: string
  bankAccountNumber: string
  bankName: string
  residentialProof: string
  residentialProofFile?: string
  status: 'submitted' | 'under_review' | 'approved' | 'rejected'
  submittedAt?: string
}

export interface ConnectorRegistration {
  id?: string
  fullName: string
  email: string
  phone: string
  companyName?: string
  businessType?: string
  experienceYears?: number
  referralNetwork?: string
  idProof: string
  idProofFile?: string
  status: 'pending_approval' | 'approved' | 'rejected'
  submittedAt?: string
}

export interface AdminUser {
  id?: string
  username: string
  password_hash: string
  created_at?: string
}
