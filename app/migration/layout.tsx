import type { ReactNode } from 'react';

interface MigrationLayoutProps {
  children: ReactNode;
}

export default function MigrationLayout({ children }: MigrationLayoutProps) {
  return <div className="pt-36">{children}</div>;
}