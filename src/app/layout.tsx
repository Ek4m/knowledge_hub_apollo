import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./wrappers";

export const metadata: Metadata = {
  title: "Welcome to Decentralized Knowledge Hub (DKH)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
