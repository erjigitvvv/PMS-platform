import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PMS — OTM Talabalar Amaliyotini Boshqarish Platformasi',
  description: 'Oliy ta\'lim muassasasi talabalar amaliyotlarini boshqarishning zamonaviy va minimalist platformasi',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className="bg-[#FAFAFA] text-zinc-900 min-h-screen selection:bg-zinc-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
