/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "pokemon-app-auth";

function getInitialAuthState() {
  if (typeof window === "undefined") {
    return { user: null, token: null };
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return { user: null, token: null };

  try {
    const parsed = JSON.parse(stored);

    if (!parsed || typeof parsed !== "object") {
      return { user: null, token: null };
    }
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null
    };
  } catch {
    return { user: null, token: null };
  }
}

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getInitialAuthState);

  const login = ({ user, token }) => {
    const payload = { user, token };
    setAuth(payload);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    }
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value = {
    user: auth.user,
    token: auth.token,
    isAuthenticated: !!auth.token,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
