# Desishub Candidates Assessment Portal

A full-stack web application for **Desishub** (an online tech agency) to register new candidates, assess their self-declared skills, and automatically categorize them into one of six defined skill tiers (Tier 0 to Tier 5).

## 🚀 Features

### Core Features
- ✅ **Candidate Registration** - Name, email, contact information & skill assessment
- ✅ **Automated Skill Assessment** - Intelligent tier assignment based on responses
- ✅ **Admin Dashboard** - View, filter, and sort all registered candidates
- ✅ **Tier-Based Categorization** - 6 skill tiers (Tier 0-5)
- ✅ **MongoDB Integration** - Persistent data storage

### Additional Features
- 🔐 **Admin Authentication** - Secure JWT-based authentication with httpOnly cookies
- 📊 **Analytics Dashboard** - Visual tier distribution charts
- 📥 **CSV Export** - Export candidate data to CSV/Excel
- 🔍 **Advanced Search & Filter** - Search by name/email, filter by tier
- 📱 **Responsive Design** - Mobile-first, works on all devices
- 📧 **Email Notifications** - Automated tier result emails via Resend
- 🌓 **Dark/Light Mode** - Toggle between themes

## 📊 Skill Tier Definitions

| Tier | Level | Description |
|------|-------|-------------|
| **Tier 0** | Beginner | HTML, CSS, basic JavaScript. Basic React/Next.js knowledge. Cannot build CRUD apps. |
| **Tier 1** | CRUD Developer | Can build CRUD apps with Next.js/React, but cannot implement authentication. |
| **Tier 2** | Full-Stack Next.js | Can build authenticated CRUD apps with Next.js. No backend framework knowledge. |
| **Tier 3** | Multi-Framework | Next.js + Express/Hono/Laravel. Can build authenticated APIs. No Golang. |
| **Tier 4** | Advanced Full-Stack | Proficient in Next.js, Express, and Golang. Can build Go APIs. |
| **Tier 5** | Expert | (Reserved for future advanced capabilities) |

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js + Express
- **Language**: TypeScript
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + bcryptjs (httpOnly cookies)
- **Email**: Resend
- **Validation**: Joi & Zod
- **Security**: Helmet, express-rate-limit
- **Export**: json2csv

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **State Management**: Zustand
- **Data Fetching**: TanStack Query (React Query)
- **HTTP Client**: Axios
- **Routing**: React Router DOM
- **UI Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **CSV Export**: react-csv

### DevOps
- **Version Control**: Git/GitHub
- **Linting**: ESLint
- **Formatting**: Prettier
- **Deployment**: (Backend: Render/Railway, Frontend: Vercel/Netlify)

## 📁 Project Structure

```
Desishub-candidates-assessment/
├── backend/
│   ├── src/
│   │   ├── config/         # Database and app configuration
│   │   ├── controllers/    # Route controllers
│   │   ├── middleware/     # Auth, validation, error handling
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic (email, assessment)
│   │   ├── types/          # TypeScript type definitions
│   │   ├── utils/          # Helper functions
│   │   └── server.ts       # Entry point
│   ├── .env.example        # Environment variables template
│   ├── tsconfig.json       # TypeScript configuration
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API integration layer
│   │   ├── stores/         # Zustand stores
│   │   ├── hooks/          # Custom React hooks
│   │   ├── types/          # TypeScript type definitions
│   │   ├── lib/            # Utilities and helpers
│   │   └── assets/         # Images, fonts, etc.
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── vite.config.ts      # Vite configuration
│   └── package.json
│
├── .prettierrc             # Prettier configuration
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Configure environment variables in `.env`:
```env
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/desishub-candidates
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
RESEND_API_KEY=your-resend-api-key
FROM_EMAIL=noreply@yourdomain.com
CLIENT_URL=http://localhost:5173
```

5. Start development server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (if needed):
```bash
echo "VITE_API_URL=http://localhost:3000/api" > .env
```

4. Start development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📝 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register admin
- `POST /api/auth/login` - Admin login
- `POST /api/auth/logout` - Admin logout
- `GET /api/auth/me` - Get current user

### Candidates
- `POST /api/candidates/register` - Register new candidate (public)
- `GET /api/candidates` - Get all candidates (protected)
- `GET /api/candidates/:id` - Get candidate by ID (protected)
- `PUT /api/candidates/:id` - Update candidate (protected)
- `DELETE /api/candidates/:id` - Delete candidate (protected)
- `GET /api/candidates/export` - Export to CSV (protected)
- `GET /api/candidates/stats` - Get statistics (protected)

## 🎨 Theme Support

The application supports both light and dark modes:
- Toggle via theme switcher in the UI
- Persists preference in localStorage
- Respects system preferences by default

## 🔒 Security Features

- JWT authentication with httpOnly cookies
- Password hashing with bcryptjs
- Input validation with Joi/Zod
- Rate limiting
- Helmet security headers
- CORS configuration
- Environment variable protection

## 📧 Email Templates

Email notifications are sent using **Resend** with professional templates:
- Welcome email with tier results
- Assessment details
- Next steps and recommendations

## 🚀 Deployment

### Backend Deployment (Render/Railway)
1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables
4. Deploy

### Frontend Deployment (Vercel/Netlify)
1. Push code to GitHub
2. Connect repository to Vercel/Netlify
3. Set build command: `npm run build`
4. Set output directory: `dist`
5. Deploy

## 🤝 Contributing

This is an assessment project for Desishub candidates. 

## 📄 License

MIT License - See LICENSE file for details

## 👨‍💻 Author

**Anthony Obi**

---

**Made with ❤️ for Desishub**
