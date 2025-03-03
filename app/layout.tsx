import type { Metadata } from "next";
import "./globals.css";
import Container from "./components/container";
import Nav from "./components/nav";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
      </body>
    </html>
  );
}
