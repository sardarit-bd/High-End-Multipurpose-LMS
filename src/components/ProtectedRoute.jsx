'use client';

import { useAuthContext } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.push("/signin");
    if (!loading && roles && !roles.includes(user?.role))
      router.push("/unauthorized");
  }, [user, loading]);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!user) return null;

  return <>{children}</>;
}
