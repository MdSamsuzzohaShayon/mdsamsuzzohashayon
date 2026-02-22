import "./globals.css";
import './globals.scss';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Syne } from 'next/font/google';
import BodyWrapper from '@/components/layout/BodyWrapper';
import StaticDataProvider from '@/lib/StaticDataProvider';

// Syne — distinctive developering-grade display font, zero layout shift
const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  display: 'swap',
  variable: '--font-syne',
});

export const metadata: Metadata = {
  title: 'Md Samsuzzoha Shayon | Senior Full-Stack Developer for Remote Hire',
  description:
    'Senior Full-Stack Developer (6+ years) specializing in Node.js, Next.js, PostgreSQL & System Design. ' +
    'Available for remote roles worldwide. I build scalable APIs and full-stack systems that grow with your business.',
  keywords:
    'hire senior full-stack developer remote, Node.js developer for hire, Next.js developer remote, ' +
    'PostgreSQL developer, scalable REST API developer, system design developer, remote full-stack developer, ' +
    'TypeScript Next.js Node.js PostgreSQL remote developer',
  openGraph: {
    title: 'Hire Md Samsuzzoha Shayon — Senior Full-Stack Developer (Remote)',
    description:
      'Senior Full-Stack Developer · 6+ Years · Node.js · Next.js · PostgreSQL · System Design · Available Worldwide',
    type: 'website',
  },
  // Canonical + robots for SEO
  alternates: { canonical: 'https://md-samsuzzoha.webdevlab.org' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={syne.variable}>
      <head>
        {/* Preconnect fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DM Mono — monospace for labels/stats */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/img/favicon.ico" />

        {/* Google Tag Manager */}
        <Script
          id="gtm"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WFLV2FXK');`,
            }}
        />
      </head>
      <body
        className="bg-gray-900 text-gray-300 antialiased"
        suppressHydrationWarning
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFLV2FXK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        {/* Skip to main — accessibility */}
        <a href="#main-content" className="skip-link">Skip to main content</a>

        <StaticDataProvider>
          <BodyWrapper>{children}</BodyWrapper>
        </StaticDataProvider>
      </body>
    </html>
  );
}