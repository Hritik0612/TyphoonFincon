// Debug environment variables
console.log('🔍 Debugging Environment Variables...');

// Check if .env file exists
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.join(__dirname, '.env');
const envLocalPath = path.join(__dirname, 'env.local');

console.log('Looking for .env files...');
console.log('.env exists:', fs.existsSync(envPath));
console.log('env.local exists:', fs.existsSync(envLocalPath));

if (fs.existsSync(envLocalPath)) {
  console.log('\n📄 Contents of env.local:');
  const content = fs.readFileSync(envLocalPath, 'utf8');
  console.log(content);
}

console.log('\n🌐 Current environment:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('VITE_SUPABASE_URL:', process.env.VITE_SUPABASE_URL);
console.log('VITE_SUPABASE_ANON_KEY:', process.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set');
