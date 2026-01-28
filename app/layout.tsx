import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { CartProvider } from "@/src/contexts/CartContext";
import { AuthProvider } from "@/src/contexts/AuthContext";
import LiveChatWidget from "@/src/components/chat/LiveChatWidget";
import Script from "next/script";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lovable App",
  description: "Lovable Generated Project",
  authors: [{ name: "Lovable" }],
  openGraph: {
    type: "website",
    images: "https://lovable.dev/opengraph-image-p98pqg.png",
    title: "Lovable App",
    description: "Lovable Generated Project",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Lovable",
    images: "https://lovable.dev/opengraph-image-p98pqg.png",
    title: "Lovable App",
    description: "Lovable Generated Project",
  },
  icons: {
    icon: "https://storage.googleapis.com/gpt-engineer-file-uploads/Z1jpMvofgWN4lrKx2PaFFzkbsZF2/uploads/1768152864726-personal image.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '910751078293429');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=910751078293429&ev=PageView&noscript=1"
          />
        </noscript>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <AuthProvider>
            <CartProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                {children}
                <LiveChatWidget />
              </TooltipProvider>
            </CartProvider>
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
