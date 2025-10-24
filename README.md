# 🚀 TyphoonFincon - Complete Loan Application System

A modern, full-stack loan application system built with React, TypeScript, and Supabase. This system handles customer loan applications, connector registrations, and provides a comprehensive admin dashboard.

## ✨ Features

### 🏠 **Customer Portal**
- **Loan Application Form** - Complete application with file uploads
- **Real-time Validation** - Form validation with instant feedback
- **File Upload Support** - PDF, JPG, PNG documents (up to 500KB)
- **Responsive Design** - Works on all devices

### 🤝 **Connector Portal**
- **Partner Registration** - Business partner onboarding
- **Document Verification** - ID proof and business documents
- **Experience Tracking** - Years of experience and referral network

### 👨‍💼 **Admin Dashboard**
- **Application Management** - View all customer applications
- **Connector Management** - Manage partner registrations
- **Document Downloads** - Download submitted documents
- **Delete Functionality** - Remove applications and registrations
- **Real-time Updates** - Instant data refresh

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Routing**: React Router DOM
- **File Handling**: Base64 encoding
- **Deployment**: GitHub Pages, Vercel, Netlify

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/Hritik0612/TyphoonFincon.git
cd TyphoonFincon
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Set Up Supabase Database
1. Create a new Supabase project
2. Run the SQL schema from `SUPABASE-SETUP-SQL.sql`
3. Update your `.env` file with credentials

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` to see your application!

## 📱 Application URLs

- **Home**: `/` - Landing page
- **Customer Application**: `/customer` - Loan application form
- **Connector Registration**: `/connector` - Partner registration
- **Admin Login**: `/admin` - Admin authentication
- **Admin Dashboard**: `/admin/dashboard` - Management interface

## 🔐 Admin Access

- **Username**: `admin`
- **Password**: `typhoon2025`

## 🗄️ Database Schema

### Customer Applications
- Personal information (name, email, phone, address)
- Financial details (income, loan amount, purpose)
- Employment status
- Bank information
- Document uploads

### Connector Registrations
- Business information (company, type, experience)
- Contact details
- Referral network
- ID verification documents

## 🚀 Deployment Options

### GitHub Pages (Automatic)
1. Push to `master` branch
2. GitHub Actions automatically builds and deploys
3. Available at: `https://hritik0612.github.io/TyphoonFincon`

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Automatic deployments on every push
3. Custom domain support for `typhoonfincon.com`

### Netlify
1. Connect repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests

### Project Structure
```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── lib/                # Database and utility functions
└── main.tsx           # Application entry point
```

## 🐛 Troubleshooting

### Common Issues
1. **Port already in use**: Vite will automatically find another port
2. **Supabase connection**: Check your environment variables
3. **File uploads**: Ensure files are under 500KB
4. **Admin access**: Use the correct credentials

### Debug Mode
- Check browser console for detailed error messages
- Verify Supabase connection in Network tab
- Ensure all environment variables are set

## 📄 License

MIT License - Feel free to use this project for your own applications!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support or questions, please open an issue on GitHub.

---

**Built with ❤️ for TyphoonFincon** 🚀