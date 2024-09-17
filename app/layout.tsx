import '../globals.scss';
import Script from 'next/script';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BodyWrapper from '@/components/layout/BodyWrapper';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Md Samsuzzoha Shayon',
  description: 'Welcome to the online portfolio of Md Samsuzzoha Shayon – a passionate web developer dedicated to creating engaging and innovative web experiences. Explore a collection of meticulously crafted projects showcasing expertise in front-end and back-end development, responsive design, and user-centric solutions. Get inspired by a journey of turning ideas into functional and visually appealing websites.',
  keywords: 'web developer, portfolio, JavaScript, Python, Django, Node.js, React.js, GraphQL, DevOps, front-end development, back-end development, responsive design, web applications, UI/UX, coding, programming, software engineering, innovative solutions, projects, full-stack development, server-side scripting',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>


        {/* Google Tag Manager Script */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WFLV2FXK');
            `,
          }}
        />

        <title>Md Samsuzzoha Shayon</title>
        <link rel="icon" type="image/x-icon" href='/img/favicon.ico' />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WFLV2FXK"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        {/* Main Body Content */}
        <BodyWrapper>{children}</BodyWrapper>
      </body>
    </html>
  );
}
