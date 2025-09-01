<<<<<<< HEAD
# 🏥 Doctors Appointment Platform

A comprehensive full-stack healthcare appointment booking platform built with modern web technologies, featuring real-time video consultations, secure payment processing, and intuitive user management.

<img width="1470" alt="Screenshot 2025-05-27 at 1 18 06 PM" src="https://github.com/user-attachments/assets/a0d3d443-f5e1-433a-85a7-a76a3866858d" />

## 🚀 Features

### 👨‍⚕️ For Doctors
- **Profile Management**: Complete doctor profiles with specializations, experience, and credentials
- **Availability Management**: Set custom working hours and available time slots
- **Appointment Dashboard**: View, manage, and track all appointments
- **Video Consultations**: Integrated video calling for remote consultations
- **Earnings Tracking**: Monitor consultation fees and payout requests
- **Verification System**: Document verification for credential authenticity

### 👥 For Patients
- **Easy Booking**: Browse doctors by specialty and book appointments
- **Flexible Scheduling**: View real-time availability and select preferred time slots
- **Secure Payments**: Multiple pricing tiers with secure payment processing
- **Video Consultations**: Join video calls directly from the platform
- **Appointment History**: Track past and upcoming appointments
- **Profile Management**: Maintain personal health information

### 🔐 For Administrators
- **Doctor Verification**: Review and approve doctor registrations
- **Payment Management**: Handle payout requests and financial oversight
- **Platform Analytics**: Monitor platform usage and performance
- **User Management**: Oversee user accounts and platform activity

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern UI component library
- **Lucide React** - Beautiful icon library

### Backend & Database
- **Prisma** - Type-safe database ORM
- **Neon (PostgreSQL)** - Serverless PostgreSQL database
- **Clerk** - Authentication and user management

### Communication & Media
- **Vonage** - Video calling API for consultations
- **Real-time Updates** - Live appointment status updates

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript Support** - Type safety (via JSConfig)
- **Git** - Version control

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Nagasurya07/-Doctors-Appointment-Platform.git
cd -Doctors-Appointment-Platform
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# Database
DATABASE_URL=your_neon_postgresql_url

# Vonage Video API
VONAGE_PRIVATE_KEY=lib/private.key
NEXT_PUBLIC_VONAGE_APPLICATION_ID=your_vonage_application_id
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# (Optional) Seed the database
npx prisma db seed
```

### 5. Start Development Server
```bash
npm run dev
# or
yarn dev
```

Visit `http://localhost:3000` to see the application running.

## 🏗️ Project Structure

```
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── (main)/                   # Main application pages
│   │   ├── admin/                # Admin dashboard
│   │   ├── appointments/         # Appointment management
│   │   ├── doctor/               # Doctor dashboard
│   │   ├── doctors/              # Doctor listings & profiles
│   │   ├── onboarding/           # User onboarding
│   │   ├── pricing/              # Pricing plans
│   │   └── video-call/           # Video consultation
│   ├── globals.css               # Global styles
│   ├── layout.js                 # Root layout
│   └── page.js                   # Homepage
├── actions/                      # Server actions
│   ├── admin.js                  # Admin operations
│   ├── appointments.js           # Appointment management
│   ├── doctor.js                 # Doctor operations
│   ├── patient.js                # Patient operations
│   └── ...
├── components/                   # Reusable UI components
│   ├── ui/                       # Shadcn UI components
│   ├── appointment-card.jsx
│   ├── header.jsx
│   ├── pricing.jsx
│   └── ...
├── lib/                          # Utility functions
│   ├── prisma.js                 # Database connection
│   ├── schema.js                 # Validation schemas
│   ├── utils.js                  # Helper functions
│   └── ...
├── prisma/                       # Database schema & migrations
│   ├── migrations/
│   └── schema.prisma
├── public/                       # Static assets
└── hooks/                        # Custom React hooks
```

## 🚦 Getting Started

### For Patients
1. **Sign Up**: Create an account using email or social login
2. **Browse Doctors**: Explore doctors by specialty or search
3. **Book Appointment**: Select available time slots and book
4. **Join Video Call**: Connect for your consultation at the scheduled time

### For Doctors
1. **Register**: Sign up and complete profile verification
2. **Set Availability**: Configure your working hours and time slots
3. **Manage Appointments**: View and manage patient bookings
4. **Conduct Consultations**: Use integrated video calling for patient care

### For Administrators
1. **Review Applications**: Verify doctor credentials and approve registrations
2. **Monitor Platform**: Track usage, payments, and user activity
3. **Manage Payouts**: Process doctor payment requests

## 🔧 Configuration

### Clerk Authentication
1. Create a Clerk account at [clerk.dev](https://clerk.dev)
2. Set up your application and get API keys
3. Configure sign-in/sign-up flows and redirects

### Neon Database
1. Create a Neon account at [neon.tech](https://neon.tech)
2. Create a new PostgreSQL database
3. Copy the connection string to your `.env` file

### Vonage Video API
1. Sign up at [vonage.com](https://vonage.com)
2. Create a video API application
3. Download the private key and add to your project

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Update Tailwind configuration in `tailwind.config.js`
- Customize Shadcn components in `components/ui/`

### Business Logic
- Update server actions in the `actions/` directory
- Modify database schema in `prisma/schema.prisma`
- Add new features by creating new pages and components

## 📚 API Routes

The application uses Next.js Server Actions for API functionality:

- **Authentication**: Clerk handles user authentication
- **Appointments**: CRUD operations for booking management
- **Payments**: Integration with payment processing
- **Video Calls**: Vonage API for real-time communication

## 🔒 Security Features

- **Authentication**: Secure user authentication with Clerk
- **Authorization**: Role-based access control (Patient, Doctor, Admin)
- **Data Protection**: Encrypted sensitive information
- **Input Validation**: Server-side validation for all forms
- **HTTPS**: Secure communication protocols

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy with automatic builds on push

### Other Platforms
- **Netlify**: Configure build settings and environment variables
- **Railway**: Deploy with PostgreSQL integration
- **AWS/Google Cloud**: Use container deployment with proper configurations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nagasurya07**
- GitHub: [@Nagasurya07](https://github.com/Nagasurya07)
- Repository: [Doctors Appointment Platform](https://github.com/Nagasurya07/-Doctors-Appointment-Platform)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.dev/) for authentication services
- [Neon](https://neon.tech/) for serverless PostgreSQL
- [Vonage](https://vonage.com/) for video calling API
- [Shadcn/UI](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling

## 📞 Support

For support, email support@yourplatform.com or create an issue in this repository.

---

⭐ **If you find this project helpful, please give it a star!** ⭐

<img width="1470" alt="Screenshot 2025-05-27 at 1 18 06 PM" src="https://github.com/user-attachments/assets/a0d3d443-f5e1-433a-85a7-a76a3866858d" />
