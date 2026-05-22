import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

const getApiBase = () => {
  // If an explicit API URL is configured (e.g. on Netlify targeting a separate backend), use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  // In production (Vercel): use co-located /api endpoint
  if (import.meta.env.PROD || window.location.hostname !== 'localhost') {
    return '/api'; 
  }
  // Development default: use local Express server
  return 'http://localhost:3001/api';
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
    // Mock login for prototype
    const mockUser = {
      id: 'mock-id',
      email: email || 'admin@example.com',
      role: 'admin',
      fullName: 'Mock Admin',
      avatarUrl: null
    };

    localStorage.setItem('auth_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAdmin(true);

    return { error: null };
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
