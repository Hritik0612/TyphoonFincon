@echo off
echo ============================================
echo TyphoonFincon Supabase Setup
echo ============================================
echo.

echo Step 1: Opening Supabase website...
echo Please create an account and new project at:
echo https://supabase.com
echo.
pause

echo Step 2: Getting your credentials...
echo 1. Go to your Supabase project dashboard
echo 2. Click on Settings ^> API
echo 3. Copy your Project URL and anon key
echo.
pause

echo Step 3: Creating .env file...
echo Please manually create a .env file with:
echo.
echo VITE_SUPABASE_URL=https://your-project-id.supabase.co
echo VITE_SUPABASE_ANON_KEY=your-anon-key-here
echo.
echo Replace the values with your actual credentials!
echo.
pause

echo Step 4: Creating database tables...
echo 1. Go to SQL Editor in your Supabase dashboard
echo 2. Copy the contents of supabase-schema.sql
echo 3. Paste and run the SQL commands
echo.
pause

echo Step 5: Testing your setup...
echo 1. Run: npm run dev
echo 2. Submit a test application
echo 3. Check your Supabase dashboard to see the data
echo.
echo ============================================
echo Setup Complete! Your TyphoonFincon app now has a real database!
echo ============================================
pause

