// Server Component — Next.js pre-renders this shell at build time
// Client interactivity is isolated to HomeClient (smallest possible island)

import HomeClient from "@/components/HomeClient";

// Force static generation
export const dynamic = 'force-static';

export default function HomePage() {
  return <HomeClient />;
}