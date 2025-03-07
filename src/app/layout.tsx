import "./globals.css";
import type { Metadata } from "next";
import { AppProviders } from "./wrappers";
import { MainHeader, MainFooter } from "./common/components";

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
        <AppProviders>
          <MainHeader />
          {children}
          <MainFooter />
        </AppProviders>
      </body>
    </html>
  );
}
