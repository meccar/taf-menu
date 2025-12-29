"use client";

import { useState, useEffect, Suspense } from "react";
import { EntryScreen } from "@/components/entry-screen";
import { MenuScreen } from "@/components/menu-screen";
import { useRouter, useSearchParams } from "next/navigation";
import { useSessionContext } from "@/lib/context/session-context";

function HomeContent() {
  const [mode, setMode] = useState<"menu" | "login" | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { activateSession, isValid } = useSessionContext();

  // Handle QR code token from URL
  useEffect(() => {
    const qrToken = searchParams.get("token");

    if (qrToken) {
      // Activate session with QR token
      activateSession(qrToken).then((success) => {
        if (success) {
          // Remove token from URL for security
          router.replace("/", { scroll: false });
          setMode("menu");
        } else {
          alert(
            "Invalid QR code. Please scan a valid QR code from your table."
          );
        }
      });
    } else if (isValid) {
      // If already has valid session, show menu
      setMode("menu");
    }
  }, [searchParams, activateSession, isValid, router]);

  if (!mode)
    return (
      <EntryScreen
        onSelect={(value) => {
          if (value === "login") router.push("/login");
          else {
            // Check if user has valid session before showing menu
            if (isValid) {
              setMode("menu");
            } else {
              alert(
                "Please scan the QR code at your table to access the menu."
              );
            }
          }
        }}
      />
    );

  // Only show menu if session is valid
  if (!isValid) {
    return (
      <EntryScreen
        onSelect={(value) => {
          if (value === "login") router.push("/login");
          else {
            alert("Please scan the QR code at your table to access the menu.");
          }
        }}
      />
    );
  }

  return <MenuScreen />;
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen">
          <div className="text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <HomeContent />
    </Suspense>
  );
}
