'use client';

import QueryProvider from "./QueryProvider";
import { AuthProvider } from "./AuthProvider";

export default function RootProvider({ children }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
