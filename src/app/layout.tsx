import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ToastContainer } from '@/components/ui/toast';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'WordMaster - 智能记单词应用',
  description: '基于科学记忆算法的英语单词学习应用',
  keywords: ['英语', '单词', '学习', '记忆', '教育'],
  authors: [{ name: 'WordMaster Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          {children}
          <ToastContainer />
        </div>
      </body>
    </html>
  );
}
