import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  title: "Questify",
  description:
    "Questify is a platform for creating and sharing prize-based questionnaire.",
};

const hauoraFont = localFont({
  src: [
    {
      path: "../fonts/hauora/Hauora-ExtraLight.otf",
      weight: "200",
    },
    {
      path: "../fonts/hauora/Hauora-Light.otf",
      weight: "300",
    },
    {
      path: "../fonts/hauora/Hauora-Regular.otf",
      weight: "400",
    },
    {
      path: "../fonts/hauora/Hauora-Medium.otf",
      weight: "500",
    },
    {
      path: "../fonts/hauora/Hauora-SemiBold.otf",
      weight: "600",
    },
    {
      path: "../fonts/hauora/Hauora-Bold.otf",
      weight: "700",
    },
    {
      path: "../fonts/hauora/Hauora-ExtraBold.otf",
      weight: "800",
    },
  ],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="!scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          hauoraFont.variable
        )}
      >
        {children}
        <Toaster />
        <GoogleAnalytics
          gaId={process.env.NEXT_PUBLIC_MEASUREMENT_ID as string}
        />
      </body>
    </html>
  );
}
