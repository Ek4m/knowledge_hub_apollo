import "./globals.css";

import type { Metadata } from "next";
import { AppProviders } from "./wrappers";
import { MainHeader, MainFooter } from "./common/components";
import { CategoryProvider } from "./category/contexts";

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
          <CategoryProvider>{children}</CategoryProvider>
          <MainFooter />
        </AppProviders>
      </body>
    </html>
  );
}
