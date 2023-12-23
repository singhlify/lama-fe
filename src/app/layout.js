import { Inter } from "next/font/google";
import "./globals.css";
import { TanstackProvider } from "../providers";
import { Navbar, Toast } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LAMA App",
  description: "A tool for podcasts creators.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <TanstackProvider>
          <Navbar />
          {children}
        </TanstackProvider>
        <Toast />
      </body>
    </html>
  );
}
