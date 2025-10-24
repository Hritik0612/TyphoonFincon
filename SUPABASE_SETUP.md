# 🚀 Supabase Setup Guide for TyphoonFincon

## 📋 **Quick Setup Steps:**

### **1. Create Supabase Account**
1. Go to [https://supabase.com](https://supabase.com)
2. Sign up for a free account
3. Create a new project
4. Wait for project to be ready (2-3 minutes)

### **2. Get Your Credentials**
1. Go to **Settings** → **API**
2. Copy your:
   - **Project URL** (looks like: `https://xyz.supabase.co`)
   - **Anon Key** (long string starting with `eyJ...`)

### **3. Create Environment File**
1. Create a `.env` file in your project root
2. Add your credentials:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### **4. Create Database Tables**
1. Go to **SQL Editor** in Supabase dashboard
2. Copy the contents of `supabase-schema.sql`
3. Paste and run the SQL commands
4. This creates your database tables

### **5. Test Your Setup**
1. Run your app: `npm run dev`
2. Submit a test application
3. Check Supabase dashboard → **Table Editor** to see data

---

## 🎯 **What You Get:**

### **✅ Real Database**
- PostgreSQL database with web interface
- All customer applications saved permanently
- All connector registrations saved permanently

### **✅ Admin Dashboard**
- View all applications in real-time
- Export data to CSV
- Update application status

### **✅ Data Persistence**
- Data never gets lost
- Works across different browsers
- Professional setup like real companies

---

## 🔧 **Database Tables Created:**

### **customer_applications**
- Stores all loan applications
- Fields: name, email, phone, loan amount, etc.

### **connector_registrations**
- Stores all partner registrations
- Fields: name, email, phone, reference, etc.

### **admin_users**
- Stores admin login credentials
- Default: admin/typhoon2025

---

## 🚨 **Important Notes:**

1. **Never commit `.env` file** - Add it to `.gitignore`
2. **Keep credentials secure** - Don't share your anon key
3. **Free tier limits** - 50,000 rows, 500MB storage
4. **Backup data** - Export regularly for important data

---

## 🆘 **Troubleshooting:**

### **Connection Error?**
- Check your `.env` file has correct credentials
- Verify Supabase project is running
- Check browser console for errors

### **No Data Showing?**
- Check database tables exist
- Verify RLS policies are set correctly
- Check network connection

### **Still Using localStorage?**
- Clear browser cache
- Restart development server
- Check console for errors

---

## 🎉 **You're All Set!**

Your TyphoonFincon app now has:
- ✅ Real database (Supabase)
- ✅ Data persistence
- ✅ Admin dashboard
- ✅ Professional setup

**Happy coding!** 🚀

