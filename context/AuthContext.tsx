"use client";

// AuthContext — real JWT-based authentication state.
// Fetches /api/auth/me on mount to read the sc_session cookie.
// isAuthenticated is false until the fetch resolves (loading: true guard).

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface AuthState {
  isAuthenticated: boolean;
  address: string | null;
  role: string | null;
  loading: boolean;
}

const AuthContext = createContext<AuthState>({
  isAuthenticated: false,
  address: null,
  role: null,
  loading: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    address: null,
    role: null,
    loading: true,
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data: { authenticated: boolean; address?: string; role?: string }) => {
        setState({
          isAuthenticated: data.authenticated === true,
          address: data.address ?? null,
          role: data.role ?? null,
          loading: false,
        });
      })
      .catch(() => {
        setState((s) => ({ ...s, loading: false }));
      });
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
