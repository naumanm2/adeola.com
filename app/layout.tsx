import type { Metadata } from "next";
import "./globals.css";
import Container from "./components/container";
import Nav from "./components/nav";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Adeola",
  description: "Adeola",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Container>
          <Nav />
          {children}
        </Container>
        <SanityLive />
      </body>
    </html>
  );
}
