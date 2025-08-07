import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MasterPos", // Uygulamanızın adını buraya yazın
  description: "MasterPos Yönetim Paneli",
};

export default function RootLayout({ children }) {
  return (
   <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}>
        <div className="flex h-screen">
          <Sidebar />
          
          <div className="flex-1 flex flex-col overflow-hidden">
            <Header />
            
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#f5f5f5]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}