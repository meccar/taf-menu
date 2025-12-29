"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useSession } from "@/lib/hooks/use-session";

interface SessionContextType {
  session: ReturnType<typeof useSession>["session"];
  isLoading: boolean;
  isValid: boolean;
  activateSession: (qrToken: string) => Promise<boolean>;
  clearSession: () => void;
  validateSession: () => Promise<boolean>;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSessionContext() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
}
