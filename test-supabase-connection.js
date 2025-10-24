// Test Supabase connection
console.log('🧪 Testing Supabase Connection...');

// Check environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://rkhjzqjkdrjuvcuojwkz.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJraGp6cWprZHJqdXZjdW9qd2t6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEyNzc5MjUsImV4cCI6MjA3Njg1MzkyNX0.I0sv0gyboaETkZ8_zc4pM3Vv8ZuEzD7AiT820VGk3bc';

console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey.substring(0, 20) + '...');

// Test if we can connect
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n📊 Testing database connection...');
    
    // Test customer_applications table
    const { data, error } = await supabase
      .from('customer_applications')
      .select('count')
      .limit(1);
    
    if (error) {
      console.log('❌ Error:', error.message);
      console.log('💡 Make sure you have run the SQL schema in Supabase!');
    } else {
      console.log('✅ Customer applications table: Connected');
    }
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
  }
}

testConnection();
