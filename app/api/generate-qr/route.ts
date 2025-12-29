import { NextRequest, NextResponse } from "next/server";
import { createQRCodeToken } from "@/lib/session-token";

/**
 * GET /api/generate-qr?table=TABLE_NUMBER
 * Generates a QR code token for a specific table
 * This should be protected (staff only) in production
 *
 * Example: /api/generate-qr?table=5
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const tableNumber = searchParams.get("table") || "general";

    // In production, add authentication check here
    // Only staff should be able to generate QR codes

    const qrToken = createQRCodeToken(tableNumber);

    // Generate the URL that should be embedded in the QR code
    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000");
    const qrUrl = `${baseUrl}/?token=${qrToken}`;

    return NextResponse.json({
      table: tableNumber,
      token: qrToken,
      qrUrl,
      // For development: You can use this URL to generate QR codes
      // Use a service like qrcode.js or qrcode.react to generate the QR image
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
