import type { Metadata } from "next";
import { Roboto_Slab as Roboto } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Joe's Auto Dealer | Find your dream car using AI",
  description:
    "Discover your perfect vehicle at Joe's Auto Dealer. Our AI-powered search helps you find and compare cars, trucks, and SUVs. Expert service, competitive prices, hassle-free experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${roboto.variable} antialiased font-roboto scroll-smooth`}
        suppressHydrationWarning
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
