import React, { ReactNode } from 'react';
interface BoardLayoutProps {
  children: ReactNode;
}
export default function BoardLayout({ children }: BoardLayoutProps) {
  return <div>{children}</div>;
}
