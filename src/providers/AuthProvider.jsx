'use client';

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/apiClient";
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load user from cookie session
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/user/me");
        setUser(data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (payload) => {
   try {
      await api.post("/auth/login", payload); // cookie set in response
      const { data } = await api.get("/user/me");
      setUser(data.data);
      router.push("/dashboard");
   } catch (err) {
    setLoading(false);
    toast.error(err.response?.data?.message || "Invalid credentials");
   }
  };

  const googleLogin = async () => {
   try {
      window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
      const { data } = await api.get("/user/me");
      setUser(data.data);
      router.push("/dashboard");
   } catch (err) {
    setLoading(false);
    toast.error(err.response?.data?.message || "Invalid credentials");
   }
  };

  const register = async (payload) => {
    await api.post("/user/register", payload);
    router.push("/login");
  };

  const logout = async () => {
    await api.post("/auth/logout");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, googleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
