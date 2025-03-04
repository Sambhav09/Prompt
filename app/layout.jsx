import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@component/Provider";
import Nav from "@component/Nav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prompt",
  description: "A app where you can create your prompt",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>
          <Nav/>
        {children}
        </Provider>
      </body>
    </html>
  );
}
