# UFAM Campus Navigator

Web application for navigating the Federal University of Amazonas (UFAM) campus with interactive mapping, street view, trail exploration, and crime reporting features.

## Technologies

- React 18.2.0
- Vite 5.1.4
- Tailwind CSS 3.4.4
- Mapbox GL 3.7.0
- Supabase (PostgreSQL)
- React Hook Form
- Zod validation

## Setup

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## Project Structure

src/
  components/   - UI components
  pages/        - Page components
  lib/          - Utilities and MCP integration
  integrations/ - Supabase client and types
  hooks/        - Custom React hooks
  context/      - React context providers
  constants/    - Application constants
  types/        - Type definitions
  config/       - Configuration files

## Environment

Create .env file with:
```
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key
VITE_MAPBOX_TOKEN=your_token
```

## Scripts

- npm run dev       - Start development server
- npm run build     - Build for production
- npm run preview   - Preview production build
- npm run lint      - Run ESLint
