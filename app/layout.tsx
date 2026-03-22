import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import Sidebar from "@/components/Sidebar";
import { Web3Providers } from "@/components/Web3Providers";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Supercompute — Your Gateway to Web3 Innovation",
  description:
    "1 builder. 13 agents. Building in public on Base. Explore $SCOM, community projects, Web3 school, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.variable} antialiased`}
        style={{ backgroundColor: "#F9FAFB", color: "#374151", fontFamily: "'Wix Madefor Text', system-ui, sans-serif" }}
      >
        <Web3Providers>
          <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <main style={{ flex: 1, backgroundColor: "#FFFFFF", minHeight: "100vh" }}>
              {children}
            </main>
          </div>
        </Web3Providers>
      </body>
    </html>
  );
}
