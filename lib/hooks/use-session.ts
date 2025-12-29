"use client";

import { useState, useEffect, useCallback } from "react";

interface SessionData {
  sessionToken: string;
  expiresAt: number;
  table?: string;
}

const SESSION_STORAGE_KEY = "restaurant_session";

/**
 * Hook to manage restaurant session (for QR code access control)
 */
export function useSession() {
  const [session, setSession] = useState<SessionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_STORAGE_KEY);
      if (stored) {
        const sessionData = JSON.parse(stored) as SessionData;
        // Check if session is still valid (not expired)
        if (sessionData.expiresAt > Date.now()) {
          setSession(sessionData);
        } else {
          // Session expired, remove it
          localStorage.removeItem(SESSION_STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error("Error loading session:", error);
      localStorage.removeItem(SESSION_STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Activate a session using a QR code token
   */
  const activateSession = useCallback(
    async (qrToken: string): Promise<boolean> => {
      try {
        const response = await fetch("/api/session/activate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qrToken }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to activate session");
        }

        const data = await response.json();
        const sessionData: SessionData = {
          sessionToken: data.sessionToken,
          expiresAt: data.expiresAt,
          table: data.table,
        };

        // Store in localStorage
        localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionData));
        setSession(sessionData);
        return true;
      } catch (error) {
        console.error("Error activating session:", error);
        return false;
      }
    },
    []
  );

  /**
   * Clear the current session
   */
  const clearSession = useCallback(() => {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    setSession(null);
  }, []);

  /**
   * Check if current session is valid
   */
  const isValid = useCallback((): boolean => {
    if (!session) return false;
    return session.expiresAt > Date.now();
  }, [session]);

  /**
   * Validate session with server
   */
  const validateSession = useCallback(async (): Promise<boolean> => {
    if (!session) return false;

    try {
      const response = await fetch("/api/session/validate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionToken: session.sessionToken,
          expiresAt: session.expiresAt,
        }),
      });

      if (!response.ok) {
        clearSession();
        return false;
      }

      const data = await response.json();
      if (!data.valid) {
        clearSession();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error validating session:", error);
      // On error, check local expiry as fallback
      return isValid();
    }
  }, [session, isValid, clearSession]);

  return {
    session,
    isLoading,
    isValid: isValid(),
    activateSession,
    clearSession,
    validateSession,
  };
}
