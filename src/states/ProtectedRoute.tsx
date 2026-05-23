import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../supabase";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  if (loading) return <p className="text-center mt-8 text-gray-400">Loading...</p>;
  if (!authenticated) return <Navigate to="/" replace />;

  return <>{children}</>;
}

export default ProtectedRoute;