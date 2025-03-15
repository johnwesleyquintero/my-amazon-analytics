
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  isLoading: boolean;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAdmin: false,
  isLoading: true,
};

// Create context with default values
const AuthContext = createContext<AuthContextType>(defaultAuthContext);

/**
 * Hook to access authentication context
 * @returns {AuthContextType} Contains user object, admin status, and loading state
 * 
 * @example
 * const { user, isAdmin } = useAuth();
 */
export const useAuth = () => useContext(AuthContext);

/**
 * Provides authentication context to the application
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped in auth context
 * 
 * Manages user authentication state via Supabase:
 * - Initial session loading
 * - Auth state change subscriptions
 * - Admin role detection based on email
 * 
 * @example
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          setIsLoading(false);
          return;
        }
        
        setUser(session?.user ?? null);
        setIsAdmin(session?.user?.email === "johnwesleyquintero@gmail.com");
        setIsLoading(false);
      } catch (error) {
        console.error("Error getting session:", error);
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setIsAdmin(session?.user?.email === "johnwesleyquintero@gmail.com");
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
