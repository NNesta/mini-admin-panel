import { Metadata } from 'next';
import './globals.css';
import AdminLayout from '../components/Layout';
import { Toaster } from 'sonner';
// import AdminLayout from '../components/Layout';

export const metadata: Metadata = {
  title: 'Mini Admin Panel',
  description: 'Mini Admin Panel',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <AdminLayout>
          <Toaster />
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}
