import { NextRequest, NextResponse } from "next/server";
import {
  decodeQRCodeToken,
  generateSessionToken,
  getSessionExpiry,
} from "@/lib/session-token";

/**
 * POST /api/session/activate
 * Activates a session for a customer who scanned the QR code
 * Requires: qrToken in request body
 * Returns: sessionToken and expiry timestamp
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qrToken } = body;

    if (!qrToken) {
      return NextResponse.json(
        { error: "QR token is required" },
        { status: 400 }
      );
    }

    // Verify the QR code token
    const decoded = decodeQRCodeToken(qrToken);
    if (!decoded) {
      return NextResponse.json(
        { error: "Invalid QR code token" },
        { status: 401 }
      );
    }

    // Optional: Check if QR token is too old (e.g., older than 24 hours)
    const qrAge = Date.now() - decoded.timestamp;
    const maxQRAge = 24 * 60 * 60 * 1000; // 24 hours
    if (qrAge > maxQRAge) {
      return NextResponse.json(
        { error: "QR code has expired. Please scan a fresh QR code." },
        { status: 401 }
      );
    }

    // Generate a new session token
    const sessionToken = generateSessionToken();
    const expiry = getSessionExpiry();

    return NextResponse.json({
      sessionToken,
      expiresAt: expiry,
      table: decoded.table,
    });
  } catch (error) {
    console.error("Error activating session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
