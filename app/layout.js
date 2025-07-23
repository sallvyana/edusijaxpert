// app/layout.js
import './globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata = {
  title: 'EduSijaXpert',
  description: 'Kuis SIJA & Teknologi Digital',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={poppins.className}>
      <body className="bg-white text-gray-800">{children}</body>
    </html>
  );
}
