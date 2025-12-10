import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
} from '@/components/ui/sidebar';
import AppHeader from '@/components/layout/AppHeader';
import AppNav from '@/components/layout/AppNav';
import { ThemeProvider } from '@/components/layout/ThemeProvider';

export const metadata: Metadata = {
  title: 'UniLife Organizer',
  description:
    'Organize your university and work life with this AI-powered scheduler.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          'font-body'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <Sidebar>
              <AppNav />
            </Sidebar>
            <SidebarInset className="flex flex-col">
              <AppHeader />
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </SidebarInset>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
