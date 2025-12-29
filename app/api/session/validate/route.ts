import { NextRequest, NextResponse } from "next/server";
import { isSessionExpired } from "@/lib/session-token";

/**
 * POST /api/session/validate
 * Validates if a session token is still valid
 * Requires: sessionToken and expiresAt in request body
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionToken, expiresAt } = body;

    if (!sessionToken || !expiresAt) {
      return NextResponse.json(
        { error: "Session token and expiry are required" },
        { status: 400 }
      );
    }

    // Check if session is expired
    if (isSessionExpired(expiresAt)) {
      return NextResponse.json(
        { valid: false, error: "Session has expired" },
        { status: 401 }
      );
    }

    // Optionally validate against database
    // For now, we'll just check expiry
    // In production, you might want to check if the session was invalidated

    return NextResponse.json({
      valid: true,
      expiresAt,
    });
  } catch (error) {
    console.error("Error validating session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
