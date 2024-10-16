import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { setCookie, eraseCookie,getCookie } from '../lib/cookies';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = getCookie('cat_user_id') ? Number(getCookie('cat_user_id')) : 0;
    const token = getCookie('cat_user_token');
    const username = getCookie('cat_user_username') ?? '';
    const email = getCookie('cat_user_email') ?? '';
    if (token) {
      setUser({ id, token, username, email  });
    }
    setLoading(false);
  }, []);

  const login = (user: User) => {

    if(user.token === undefined || user.token == null || user.token.length === 0){
      return logout();
    };

    setCookie('cat_user_id', String(user.id), 3600000);
    setCookie('cat_user_token', user.token, 3600000);
    setCookie('cat_user_username', user.username ?? '', 3600000);
    setCookie('cat_user_email', user.email ?? '', 3600000);
    setUser(user);
  };

  const logout = () => {
    eraseCookie('cat_user_id');
    eraseCookie('cat_user_token');
    eraseCookie('cat_user_username');
    eraseCookie('cat_user_email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
