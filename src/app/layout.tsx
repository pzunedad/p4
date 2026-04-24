import type { Metadata } from "next";
import "./globals.css";
import NavegadorPags from "./components/NavegadorPags";


export const metadata: Metadata = {
  title: "Clon de Twitter",
  description: "Facilito el twistter este",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="MainContainer">
          <NavegadorPags/>
          {children}
        </div>
      </body>
    </html>
  );
}
