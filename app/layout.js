
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ClientOnly from "./components/ClientOnly";
import Loading from "./components/loading";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Child Activity Tracker",
  description:
    "A lightweight child activity tracker app for parents to monitor and manage daily tasks, routines, and goals for each child",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ClientOnly fallback={<Loading />}>
          {children}
          </ClientOnly>
        </ThemeProvider>
      </body>
    </html>
  );
}

