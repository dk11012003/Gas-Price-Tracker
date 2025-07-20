// app/layout.tsx
import '../styles/globals.css'; 
import { ReactNode } from 'react';

export const metadata = {
  title: 'Gas Price Tracker',
  description: 'Track real-time gas prices across multiple blockchains',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
