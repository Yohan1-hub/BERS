import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://bersinstitute.org"),
  title: {
    default:
      "BERS Institute LLC | International Institute for Climate Crisis and Risk Management",
    template: "%s | BERS Institute LLC",
  },
  description:
    "BERS Institute LLC is a Florida-based technical organization specializing in holistic disaster risk reduction and time-tested water management systems, backed by 28 years of humanitarian field experience.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  openGraph: {
    title: "BERS Institute LLC | Climate Crisis and Risk Management",
    description:
      "Preventing climate crises through time-tested wisdom and scientific validation.",
    url: "https://bersinstitute.org",
    siteName: "BERS Institute LLC",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BERS Institute LLC — Climate Crisis and Risk Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BERS Institute LLC | Climate Crisis and Risk Management",
    description:
      "Preventing climate crises through time-tested wisdom and scientific validation.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white font-sans">
        {children}
        <Script
          id="google-translate-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  autoDisplay: false,
                }, 'google_translate_element');
              };
            `,
          }}
        />
        <Script
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
