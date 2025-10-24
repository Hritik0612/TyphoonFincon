# 🚀 Quick Supabase Setup for TyphoonFincon

## ⚡ **5-Minute Setup:**

### **1. Create Supabase Account**
- Go to: https://supabase.com
- Click "Start your project"
- Sign up with GitHub/Google
- Create new project
- Wait 2-3 minutes for setup

### **2. Get Your Credentials**
- Go to **Settings** → **API**
- Copy **Project URL** (looks like: `https://xyz.supabase.co`)
- Copy **anon key** (long string starting with `eyJ...`)

### **3. Create .env File**
Create a file called `.env` in your project folder with:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### **4. Create Database Tables**
- Go to **SQL Editor** in Supabase
- Copy contents from `supabase-schema.sql`
- Paste and click **Run**
- Tables will be created automatically

### **5. Test Your App**
- Run: `npm run dev`
- Go to: http://localhost:5173
- Submit a test application
- Check Supabase dashboard to see data!

---

## 🎯 **What You Get:**
- ✅ Real PostgreSQL database
- ✅ All applications saved permanently
- ✅ Admin dashboard shows real data
- ✅ No more lost applications
- ✅ Professional setup

---

## 🆘 **Need Help?**
- Run: `setup-supabase.bat` for guided setup
- Check browser console for errors
- Verify `.env` file has correct credentials

**Your TyphoonFincon app will have a real database in 5 minutes!** 🚀

