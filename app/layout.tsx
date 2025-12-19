import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ReduxProvider } from "./redux-provider";
import { Providers } from "./providers";
import { View } from "react-native";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          // defaultTheme="system"
          defaultTheme="light"
          // enableSystem
          disableTransitionOnChange
        >
          <ReduxProvider>
            <Providers>
              <View
                style={{
                  flex: 1,
                  height: "100%",
                  width: "100%",
                  paddingHorizontal: 12,
                  backgroundColor: "hsl(var(--background))",
                  alignItems: "center",
                  gap: 24,
                }}
              >
                {children}
              </View>
            </Providers>
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
