import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FanCamping - Địa điểm cắm trại lý tưởng',
  description: 'Tìm kiếm và đặt các địa điểm cắm trại tốt nhất',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
