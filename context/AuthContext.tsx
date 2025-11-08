"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { apiRequest } from "@/lib/api";

interface AuthContextType {
  user: any | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Load token on startup
  useEffect(() => {
    const stored = localStorage.getItem("auth");
    if (stored) {
      const { access, user } = JSON.parse(stored);
      setToken(access);
      setUser(user);
    }
  }, []);

  // Login
  // const login = async (email: string, password: string) => {
  //   const data = await apiRequest("/signin/", "POST", { email, password });
  //   const userData = parseJwt(data.access); // extract user info from JWT if encoded
  //   localStorage.setItem("auth", JSON.stringify({ ...data, user: userData }));
  //   setToken(data.access);
  //   setUser(userData);
  // };
  const login = async (email: string, password: string) => {
    const data = await apiRequest("/signin/", "POST", { email, password });

    // data now includes: access, refresh, email, first_name, last_name
    const userData = {
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
    };

    localStorage.setItem("auth", JSON.stringify({ ...data, user: userData }));
    setToken(data.access);
    setUser(userData);
  };

  // Register
  const register = async (payload: any) => {
    await apiRequest("/signup/", "POST", payload);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("auth");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};

// helper to decode JWT
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch {
    return null;
  }
}
