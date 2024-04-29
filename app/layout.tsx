import type { Metadata } from "next";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import Providers from "@/redux/provider";
import MainHTML from "@/components/html";

export const metadata: Metadata = {
  title: "shop is here",
  description: "all in one is here",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <Providers>
      <SessionProvider session={session}>
        <MainHTML children={children} />
      </SessionProvider>
    </Providers>
  );
}
