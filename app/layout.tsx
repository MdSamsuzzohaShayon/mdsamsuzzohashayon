import '../globals.scss';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import BodyWrapper from '@/components/layout/BodyWrapper';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Md Samsuzzoha Shayon',
  description: 'Welcome to the online portfolio of Md Samsuzzoha Shayon – a passionate web developer dedicated to creating engaging and innovative web experiences. Explore a collection of meticulously crafted projects showcasing expertise in front-end and back-end development, responsive design, and user-centric solutions. Get inspired by a journey of turning ideas into functional and visually appealing websites.',
  keywords: 'web developer, portfolio, JavaScript, Python, Django, Node.js, React.js, GraphQL, DevOps, front-end development, back-end development, responsive design, web applications, UI/UX, coding, programming, software engineering, innovative solutions, projects, full-stack development, server-side scripting'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  
  return (
    <html lang="en" >
      <head>
        <title>Md Samsuzzoha Shayon</title>
        <link rel="icon" type="image/x-icon" href='/img/favicon.ico' />
      </head>
      <body className={inter.className} suppressHydrationWarning >
        {/* eslint-disable-next-line react/no-children-prop */}
        <BodyWrapper children={children} />
      </body>
    </html>
  )
}
