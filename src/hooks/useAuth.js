import { useAuthContext } from "@/providers/AuthProvider";

export const useAuth = () => {
  const { user, loading, login, register, logout,googleLogin } = useAuthContext();
  return { user, loading, login, register, logout, googleLogin };
};
