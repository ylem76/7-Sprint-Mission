import React, { ReactNode } from 'react';
interface DefaultLayoutProps {
  children: ReactNode;
}
export default function DefaultLayout({ children }: DefaultLayoutProps) {
  return <div>{children}</div>;
}
