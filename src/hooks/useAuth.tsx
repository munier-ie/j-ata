import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const getApiBase = () => {
  // Check if we're in production (Vercel)
  if (import.meta.env.PROD || window.location.hostname !== 'localhost') {
    return '/api'; // Production: use Vercel serverless functions
  }
  // Development: use local Express server
  return import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
};

const API_BASE = getApiBase();

interface AuthUser {
  id: string;
  email: string;
  role: string;
  fullName: string | null;
  avatarUrl: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
        setIsAdmin(parsed.role === 'admin' || parsed.role === 'moderator');
      } catch (e) {
        // Invalid stored data, clear it
        localStorage.removeItem('auth_user');
      }
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    try {
      const response = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error || 'Login failed' };
      }

      // Store user in localStorage
      localStorage.setItem('auth_user', JSON.stringify(data.user));
      setUser(data.user);
      setIsAdmin(data.user.role === 'admin' || data.user.role === 'moderator');

      return { error: null };
    } catch (error) {
      console.error('Login error:', error);
      return { error: 'Network error. Please try again.' };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('auth_user');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
