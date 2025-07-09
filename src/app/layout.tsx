import '../app/globals.css';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from "next/font/google";
import { ToasterProvider } from '../components/Toaster';
import { AuthProvider } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: 'Bangedara',
//   description: 'Discover and share Islamic knowledge',
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToasterProvider>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </ToasterProvider>
      </body>
    </html>
  );
}
