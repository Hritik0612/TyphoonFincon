// Test script to verify Supabase database connection
// Run with: node test-database.js

const { createClient } = require('@supabase/supabase-js');

// Test configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

console.log('🧪 Testing Supabase Database Connection...');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey.substring(0, 20) + '...');

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n📊 Testing database connection...');
    
    // Test customer_applications table
    const { data: customers, error: customerError } = await supabase
      .from('customer_applications')
      .select('count')
      .limit(1);
    
    if (customerError) {
      console.log('❌ Customer applications table error:', customerError.message);
    } else {
      console.log('✅ Customer applications table: Connected');
    }
    
    // Test connector_registrations table
    const { data: connectors, error: connectorError } = await supabase
      .from('connector_registrations')
      .select('count')
      .limit(1);
    
    if (connectorError) {
      console.log('❌ Connector registrations table error:', connectorError.message);
    } else {
      console.log('✅ Connector registrations table: Connected');
    }
    
    // Test admin_users table
    const { data: admins, error: adminError } = await supabase
      .from('admin_users')
      .select('count')
      .limit(1);
    
    if (adminError) {
      console.log('❌ Admin users table error:', adminError.message);
    } else {
      console.log('✅ Admin users table: Connected');
    }
    
    console.log('\n🎉 Database connection test completed!');
    console.log('📝 Next steps:');
    console.log('1. Create your .env file with real Supabase credentials');
    console.log('2. Run the SQL schema in Supabase SQL Editor');
    console.log('3. Test your forms at http://localhost:5173');
    
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('💡 Make sure to:');
    console.log('1. Create a Supabase project');
    console.log('2. Set up your .env file');
    console.log('3. Run the SQL schema');
  }
}

testConnection();
