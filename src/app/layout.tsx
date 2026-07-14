import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "BERS Institute LLC | International Institute for Climate Crisis and Risk Management",
  description:
    "BERS Institute LLC is a Florida-based technical organization specializing in holistic disaster risk reduction and time-tested water management systems, backed by 28 years of humanitarian field experience.",
  openGraph: {
    title: "BERS Institute LLC | Climate Crisis and Risk Management",
    description:
      "Preventing climate crises through time-tested wisdom and scientific validation.",
    type: "website",
    locale: "en_US",
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
