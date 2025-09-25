
import { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "next js payments app",
  description: "Secure and fast payment processing app for businesses and individuals",
  icons: {
    icon: "/icon2.png"
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={``}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
