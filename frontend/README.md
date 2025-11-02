# Desishub Candidates Assessment - Frontend# React + TypeScript + Vite



Modern React + TypeScript frontend application for the Desishub Candidates Assessment platform.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



## 🚀 Technology StackCurrently, two official plugins are available:



- **Framework**: React 19 + TypeScript- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

- **Build Tool**: Vite 7- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

- **State Management**: Zustand

- **Data Fetching**: TanStack Query (React Query)## React Compiler

- **HTTP Client**: Axios

- **Routing**: React Router DOM v7The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Forms**: React Hook Form + Zod Validation

- **Styling**: Tailwind CSS 4## Expanding the ESLint configuration

- **Charts**: Recharts

- **Package Manager**: npmIf you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:



## 📋 Features```js

export default defineConfig([

### Public Features  globalIgnores(['dist']),

- Landing page with tier information  {

- Multi-step candidate registration form    files: ['**/*.{ts,tsx}'],

- 7-question skill assessment    extends: [

- Form validation      // Other configs...

- Success confirmation page

      // Remove tseslint.configs.recommended and replace with this

### Admin Features (Protected)      tseslint.configs.recommendedTypeChecked,

- Secure login with JWT authentication      // Alternatively, use this for stricter rules

- Analytics dashboard with:      tseslint.configs.strictTypeChecked,

  - Total candidates count      // Optionally, add this for stylistic rules

  - Recent registrations      tseslint.configs.stylisticTypeChecked,

  - Tier distribution pie chart

  - Candidates per tier bar chart      // Other configs...

- Candidates management:    ],

  - List view with search and filters    languageOptions: {

  - Pagination      parserOptions: {

  - Export to CSV        project: ['./tsconfig.node.json', './tsconfig.app.json'],

  - Detailed candidate view        tsconfigRootDir: import.meta.dirname,

  - Delete candidates      },

  - Resend notification emails      // other options...

- Dark mode support    },

- Responsive design  },

])

## 🛠️ Prerequisites```



- Node.js 18+ and npmYou can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

- Backend API running (see backend README)

```js

## ⚙️ Installation// eslint.config.js

import reactX from 'eslint-plugin-react-x'

1. Navigate to the frontend directory:import reactDom from 'eslint-plugin-react-dom'

```bash

cd frontendexport default defineConfig([

```  globalIgnores(['dist']),

  {

2. Install dependencies:    files: ['**/*.{ts,tsx}'],

```bash    extends: [

npm install      // Other configs...

```      // Enable lint rules for React

      reactX.configs['recommended-typescript'],

3. Create environment file:      // Enable lint rules for React DOM

```bash      reactDom.configs.recommended,

cp .env.example .env    ],

```    languageOptions: {

      parserOptions: {

4. Configure environment variables in `.env`:        project: ['./tsconfig.node.json', './tsconfig.app.json'],

```env        tsconfigRootDir: import.meta.dirname,

VITE_API_URL=http://localhost:5000/api      },

```      // other options...

    },

## 🚦 Development  },

])

Start the development server:```

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 🏗️ Build

Create a production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable components
│   ├── ui/             # Generic UI components
│   ├── auth/           # Authentication components
│   ├── candidate/      # Candidate-specific components
│   ├── AdminLayout.tsx # Admin layout wrapper
│   └── theme-provider.tsx
├── hooks/              # Custom React hooks
│   ├── useAuth.ts
│   ├── useCandidates.ts
│   ├── useCandidateStats.ts
│   └── useExportCandidates.ts
├── lib/                # Library configurations
│   ├── axios.ts
│   └── queryClient.ts
├── pages/              # Page components
│   ├── public/         # Public pages
│   └── admin/          # Protected admin pages
├── services/           # API service layer
│   ├── auth.service.ts
│   └── candidate.service.ts
├── stores/             # Zustand stores
│   ├── authStore.ts
│   ├── candidateStore.ts
│   └── uiStore.ts
├── types/              # TypeScript type definitions
│   ├── user.types.ts
│   ├── candidate.types.ts
│   ├── assessment.types.ts
│   └── api.types.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## 🔑 Key Components

### State Management

#### authStore
- User authentication state
- Login/logout actions
- Persisted to localStorage

#### candidateStore
- Candidates list management
- Filters and sorting
- Pagination state

#### uiStore
- Toast notifications
- Modal management
- Loading states

### Custom Hooks

- **useAuth**: Login, register, logout, check authentication
- **useCandidates**: CRUD operations for candidates
- **useCandidateStats**: Fetch statistics and analytics
- **useExportCandidates**: Export candidates to CSV

### UI Components

- **Button**: Customizable button with variants and loading states
- **Input**: Form input with validation and error display
- **Select**: Dropdown select component
- **Modal**: Reusable modal dialog
- **Loading**: Loading spinner
- **Toast**: Notification system
- **EmptyState**: Empty state placeholder

### Candidate Components

- **TierBadge**: Color-coded tier badges
- **CandidateTable**: Data table for candidates
- **CandidateCard**: Card view for individual candidate
- **SearchBar**: Search input with debouncing
- **FilterBar**: Filter controls

## 🎨 Styling

The application uses Tailwind CSS with:
- Custom color scheme
- Dark mode support
- Responsive breakpoints
- Custom animations

## 🔒 Authentication

- JWT tokens stored in HTTP-only cookies
- Protected routes with automatic redirection
- Persistent authentication state
- Automatic token refresh

## 📡 API Integration

All API calls go through:
1. Axios instance with configured interceptors
2. TanStack Query for caching and state management
3. Centralized error handling
4. Loading states

## 🎯 Routes

### Public Routes
- `/` - Home/Landing page
- `/register` - Candidate registration
- `/registration-success` - Registration confirmation

### Admin Routes (Protected)
- `/admin/login` - Admin login
- `/admin/dashboard` - Analytics dashboard
- `/admin/candidates` - Candidates list
- `/admin/candidates/:id` - Candidate details

## 🧪 Testing

Run linting:
```bash
npm run lint
```

## 📦 Build Output

The production build creates:
- Optimized and minified JavaScript bundles
- CSS with Tailwind utilities
- Assets with content hashing
- HTML with injected scripts

## 🚀 Deployment

The application can be deployed to:
- **Vercel** (Recommended)
- **Netlify**
- **Render**
- Any static hosting service

### Vercel Deployment
```bash
npm install -g vercel
vercel
```

### Environment Variables for Production
Make sure to set:
```
VITE_API_URL=<your-production-api-url>
```

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `postcss.config.js` - PostCSS configuration
- `eslint.config.js` - ESLint configuration

## 📝 Development Notes

### Adding New Components
1. Create component in appropriate directory
2. Add TypeScript types
3. Export from index file
4. Document props and usage

### Adding New Pages
1. Create page component in `pages/`
2. Add route in `App.tsx`
3. Add navigation link if needed

### Adding New API Endpoints
1. Add types in `types/`
2. Add service function in `services/`
3. Create custom hook in `hooks/`
4. Use hook in component

## 🐛 Troubleshooting

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf dist .vite`

### API Connection Issues
- Verify `VITE_API_URL` in `.env`
- Check backend is running
- Check CORS configuration

## 📄 License

This project is proprietary software for Desishub.

## 👥 Contributors

- Development Team @ Desishub

---

Built with ❤️ by the Desishub Team
