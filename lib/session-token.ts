import * as crypto from "crypto";

/**
 * Session token configuration
 * Session tokens are used to ensure only customers who scan the QR code
 * can access the menu and place orders
 */
const SESSION_EXPIRY_HOURS = 3; // Sessions expire after 3 hours
const QR_CODE_TOKEN_SECRET =
  process.env.QR_CODE_TOKEN_SECRET || "change-this-qr-secret-in-production";

/**
 * Generate a session token for a customer session
 */
export function generateSessionToken(): string {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
}

/**
 * Verify if a QR code token is valid
 * QR codes should contain a token that's signed with our secret
 */
export function verifyQRCodeToken(qrToken: string): boolean {
  try {
    // For now, we'll use a simple validation
    // In production, you might want to:
    // 1. Store QR tokens in database with expiry
    // 2. Use HMAC signing for QR tokens
    // 3. Rotate QR tokens periodically

    // Simple validation - token should be at least 16 characters
    // You can enhance this based on your QR code generation strategy
    return qrToken && qrToken.length >= 16;
  } catch {
    return false;
  }
}

/**
 * Create a signed QR code token
 * Use this when generating QR codes for tables
 */
export function createQRCodeToken(tableNumber?: string): string {
  const data = {
    timestamp: Date.now(),
    table: tableNumber || "general",
  };

  const payload = Buffer.from(JSON.stringify(data)).toString("base64");
  const hmac = crypto.createHmac("sha256", QR_CODE_TOKEN_SECRET);
  hmac.update(payload);
  const signature = hmac.digest("hex");

  return `${payload}.${signature}`;
}

/**
 * Verify and decode a QR code token
 */
export function decodeQRCodeToken(
  qrToken: string
): { table: string; timestamp: number } | null {
  try {
    const [payload, signature] = qrToken.split(".");
    if (!payload || !signature) return null;

    const hmac = crypto.createHmac("sha256", QR_CODE_TOKEN_SECRET);
    hmac.update(payload);
    const expectedSignature = hmac.digest("hex");

    if (signature !== expectedSignature) return null;

    const data = JSON.parse(Buffer.from(payload, "base64").toString());
    return {
      table: data.table,
      timestamp: data.timestamp,
    };
  } catch {
    return null;
  }
}

/**
 * Calculate session expiry time
 */
export function getSessionExpiry(): number {
  return Date.now() + SESSION_EXPIRY_HOURS * 60 * 60 * 1000;
}

/**
 * Check if a session is expired
 */
export function isSessionExpired(expiryTimestamp: number): boolean {
  return Date.now() > expiryTimestamp;
}

/**
 * Hash a session token for storage (optional, for database storage)
 */
export function hashSessionToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}
