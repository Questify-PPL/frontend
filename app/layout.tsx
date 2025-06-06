import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://questify.my.id",
  ),
  title: {
    default: "Questify - Create & Share Prize-Based Questionnaires",
    template: "%s | Questify",
  },
  description:
    "Create fun, prize-based questionnaires on Questify. Engage participants, collect data, and reward winners. Share with friends or the world.",
  twitter: {
    card: "summary_large_image",
    site: "@Questify",
    title: "Questify - Create & Share Prize-Based Questionnaires",
    description:
      "Create fun, prize-based questionnaires on Questify. Engage participants, collect data, and reward winners. Share with friends or the world.",
    images: {
      url: "twitter-image.png",
      alt: "Questify - Create & Share Prize-Based Questionnaires",
    },
  },
  openGraph: {
    title: "Questify - Engage & Earn with Prize-Based Questionnaires",
    description:
      "Create fun, prize-based questionnaires on Questify. Engage participants, collect data, and reward winners. Share with friends or the world.",
    images: {
      url: "opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "Questify - Engage & Earn with Prize-Based Questionnaires",
    },
    type: "website",
  },
  applicationName: "Questify",
  authors: {
    name: "Questify",
  },
  keywords: [
    "questionnaire",
    "survey",
    "prize",
    "earn",
    "reward",
    "engage",
    "data collection",
    "create",
    "share",
  ],
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
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          hauoraFont.variable,
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
