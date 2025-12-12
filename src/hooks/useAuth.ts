'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { apiClient } from '@/lib/api';
import type { User, LoginCredentials, RegisterData, AuthContextType } from '@/types';

// Contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personalizado para usar el contexto de autenticación
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

// Componente proveedor de autenticación
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Cargar usuario desde el token al inicializar
  useEffect(() => {
    loadUserFromToken();
  }, []);

  const loadUserFromToken = async () => {
    try {
      setIsLoading(true);
      const currentToken = apiClient.getCurrentToken();
      
      if (!currentToken) {
        setIsLoading(false);
        return;
      }

      setToken(currentToken);
      
      // Decodificar token para obtener información del usuario
      const payload = parseJWT(currentToken);
      if (payload && payload.userId && payload.email && payload.role) {
        setUser({
          id: payload.userId,
          email: payload.email,
          name: payload.name || '',
          role: payload.role,
          created_at: '',
          updated_at: '',
        });
      }
    } catch (error) {
      console.error('Error cargando usuario desde token:', error);
      logout();
    } finally {
      setIsLoading(false);
    }
  };

  // Función de login
  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiClient.login(credentials);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        router.push('/dashboard');
      } else {
        throw new Error(response.error || 'Error en el login');
      }
    } catch (error: any) {
      console.error('Error en login:', error);
      throw new Error(error.message || 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  // Función de registro
  const register = async (data: RegisterData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await apiClient.register(data);
      
      if (response.success && response.data) {
        setUser(response.data.user);
        setToken(response.data.token);
        router.push('/dashboard');
      } else {
        throw new Error(response.error || 'Error en el registro');
      }
    } catch (error: any) {
      console.error('Error en registro:', error);
      throw new Error(error.message || 'Error al registrarse');
    } finally {
      setIsLoading(false);
    }
  };

  // Función de logout
  const logout = async (): Promise<void> => {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Error en logout:', error);
    } finally {
      setUser(null);
      setToken(null);
      router.push('/login');
    }
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated: !!user && !!token,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Función auxiliar para decodificar JWT
function parseJWT(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decodificando JWT:', error);
    return null;
  }
}

// Hook para verificar si el usuario está autenticado
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  return { isAuthenticated, isLoading };
}

// Hook para verificar roles específicos
export function useRequireRole(requiredRoles: string[]) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
        return;
      }

      if (!requiredRoles.includes(user.role)) {
        router.push('/dashboard');
        return;
      }
    }
  }, [user, isLoading, router, requiredRoles]);

  return { user, isLoading, hasPermission: user ? requiredRoles.includes(user.role) : false };
}

// Hook para obtener información del usuario
export function useUser() {
  const { user } = useAuth();
  
  return {
    user,
    isDoctor: user?.role === 'doctor',
    isAdmin: user?.role === 'admin',
    userId: user?.id,
    userEmail: user?.email,
    userName: user?.name,
    userRole: user?.role,
  };
}