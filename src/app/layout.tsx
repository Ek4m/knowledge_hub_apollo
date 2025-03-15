import "./globals.css";

import type { Metadata } from "next";
import { AppProviders, SessionProvider } from "./wrappers";
import { MainHeader, MainFooter } from "./common/components";
import { CategoryProvider } from "./category/contexts";
import { getServerSession } from "next-auth";
import { authOptions } from "./(auth)/api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Welcome to Decentralized Knowledge Hub (DKH)",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <SessionProvider session={session}>
            <MainHeader />
            <CategoryProvider>{children}</CategoryProvider>
            <MainFooter />
          </SessionProvider>
        </AppProviders>
      </body>
    </html>
  );
}
