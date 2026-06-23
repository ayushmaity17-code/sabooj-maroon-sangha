import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://saboojmaroon.club"),
  title: {
    default: "Sabooj Maroon Club | Culture, Community & Togetherness",
    template: "%s | Sabooj Maroon Club",
  },
  description:
    "Sabooj Maroon Club, established in 2020 — a community rooted in culture, service and togetherness.",
  keywords: [
    "Sabooj Maroon Club",
    "community club",
    "cultural club",
    "West Bengal",
    "community events",
  ],
  authors: [{ name: "Sabooj Maroon Club" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://saboojmaroon.club",
    siteName: "Sabooj Maroon Club",
    title: "Sabooj Maroon Club",
    description: "Rooted in culture. Growing together.",
    images: [
      {
        url: "/gallery/courtyard-evening.png",
        width: 1536,
        height: 864,
        alt: "Sabooj Maroon Club community evening",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sabooj Maroon Club",
    description: "Rooted in culture. Growing together.",
    images: ["/gallery/courtyard-evening.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#5A1E2D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Sabooj Maroon Club",
    foundingDate: "2020",
    url: "https://saboojmaroon.club",
    logo: "https://saboojmaroon.club/logo-mark.svg",
    description:
      "A community club rooted in culture, service and togetherness.",
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${playfair.variable} ${cormorant.variable} bg-ivory font-sans text-charcoal antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
