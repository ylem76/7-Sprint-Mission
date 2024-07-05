import React, { ReactNode } from 'react';
import '@/styles/globals.css';

interface RootLayoutProps {
  children: ReactNode;
}
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
