export const ENV = {
    API_BASE_URL: import.meta.env.VITE_API_URL,
    SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
} as const;