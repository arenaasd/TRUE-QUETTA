import "./globals.css"
import Header from "@/components/Header"
import Script from "next/script"
import SidebarWrapper from "@/components/SidebarWrapper"

export const metadata = {
  title: "True Quetta | Discover Quetta's Everything",
  description: "Explore top restaurants, hotels, parks, bakeries, and cafes in Quetta, Pakistan. Your trusted local guide to discover the best of Quetta (Koita).",
  keywords: "quetta pakistan, pakistan quetta, quetta in pakistan, quetta pak, quetta quetta, koita pakistan, quetta restaurants, quetta hotels, quetta parks, quetta cafes, quetta bakeries",
  openGraph: {
    title: "TrueQuetta | Discover Quetta Pakistan's Best Spots",
    description: "Explore top restaurants, hotels, parks, bakeries, and cafes in Quetta.",
    url: "https://truequetta.com",
    siteName: "TrueQuetta",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TrueQuetta Discover Quetta"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueQuetta | Discover Quetta Pakistan's Best Spots",
    description: "Explore top restaurants, hotels, parks, bakeries, and cafes in Quetta.",
    images: ["/og-image.png"]
  }
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
    <meta name="google-adsense-account" content="ca-pub-1485111412817846"/>
        <Script
          async
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1485111412817846"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased">
        <Header />
        <SidebarWrapper>
          {children}
        </SidebarWrapper>
      </body>
    </html>
  )
}
