'use client';
import { SidebarTrigger } from '@/components/ui/sidebar';
import Link from 'next/link';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm md:px-6">
      <SidebarTrigger className="md:hidden" />
      <Link href="/">
        <h1 className="text-2xl font-semibold tracking-tight font-headline">
          UniLife Organizer
        </h1>
      </Link>
    </header>
  );
}
