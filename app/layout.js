import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Providers } from "./providers";
import { ThemeProvider } from "@/components/providers/ThemeProviders";

// Font optimizasyonları
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Metadata (SEO ve temel bilgiler)
export const metadata = {
  title: "MasterPos - Yönetim Paneli",
  description: "MasterPos profesyonel yönetim paneli - Satış, müşteri ve envanter yönetimi",
  keywords: "pos, yönetim paneli, satış, müşteri yönetimi, envanter",
  authors: [{ name: "MasterPos Team" }],
};

// Viewport export (yeni standart)
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// themeColor export (yeni standart)
export const themeColor = [
  { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  { media: "(prefers-color-scheme: dark)", color: "#1e1e1e" },
];

export default function RootLayout({ children }) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <body
          className={`
            ${geistSans.variable} ${geistMono.variable} 
            antialiased
            bg-[hsl(var(--background))]
            text-[hsl(var(--foreground))]
            transition-colors duration-300 ease-in-out
            min-h-screen
            overflow-hidden
          `}
        >
          <Providers>
            <div className="flex h-screen bg-[hsl(var(--background))]">
              <aside className="flex-shrink-0" role="navigation" aria-label="Ana menü">
                <Sidebar />
              </aside>

              <div
                className="
                  flex-1 flex flex-col
                  overflow-hidden
                  bg-[hsl(var(--background))]
                  transition-colors duration-300
                "
              >
                <header role="banner">
                  <Header />
                </header>

                <main
                  id="main-content"
                  role="main"
                  tabIndex={-1}
                  className="
                    flex-1
                    overflow-y-auto
                    bg-gray-50/50 dark:bg-[#1a1c23]
                    text-[hsl(var(--foreground))]
                    transition-all duration-300
                    relative
                  "
                >
                  <div
                    className="
                      min-h-full
                      bg-gradient-to-br
                      from-gray-50/30 via-gray-50/10 to-transparent
                      dark:from-gray-900/30 dark:via-gray-900/10 dark:to-transparent
                    "
                  >
                    {children}
                  </div>

                  <div id="scroll-top-anchor" className="absolute top-0" />
                </main>
              </div>
            </div>

            {/* Loading overlay (isteğe bağlı) */}
            <div
              id="loading-overlay"
              className="
                fixed inset-0 z-50
                bg-white/80 dark:bg-gray-900/80
                backdrop-blur-sm
                flex items-center justify-center
                opacity-0 pointer-events-none
                transition-opacity duration-300
              "
              aria-hidden="true"
            >
              <div
                className="
                  flex flex-col items-center space-y-4
                  text-[hsl(var(--foreground))]
                "
              >
                <div
                  className="
                    w-8 h-8 border-4 border-blue-200 dark:border-blue-800
                    border-t-blue-600 dark:border-t-blue-400
                    rounded-full animate-spin
                  "
                />
                <p className="text-sm font-medium">Yükleniyor...</p>
              </div>
            </div>
          </Providers>

          {/* Skip to main content link (Accessibility) */}
          <a
            href="#main-content"
            className="
              sr-only focus:not-sr-only
              focus:absolute focus:top-4 focus:left-4
              bg-blue-600 text-white
              px-4 py-2 rounded-md
              z-50 font-medium
              transition-all duration-200
            "
          >
            Ana içeriğe geç
          </a>
        </body>
      </ThemeProvider>
    </html>
  );
}
