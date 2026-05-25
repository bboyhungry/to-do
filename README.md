# Check List

A minimalist to-do web application built with React and TypeScript.

## Tech Stack

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [React Router v7](https://reactrouter.com/)
- [Supabase](https://supabase.com/) — authentication (Google OAuth + Magic Link)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project
- A running instance of the backend

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.development` file at the root with the following:

```
VITE_API_URL=your_backend_url
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

### Running Locally

```bash
npm run dev
```

## Deployment

Deployed on [Vercel](https://vercel.com/). Every push to `main` triggers an automatic production deployment.
