import type { Metadata } from 'next';
import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/600.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/newsreader/500.css';
import './globals.css';
import { ThemeController } from '../components/theme-toggle';
import { themeBootstrap } from '../features/appearance/theme';
export const metadata: Metadata = {
  title: 'JavaPractice',
  description: 'Interactive Java learning · Aprendizaje interactivo de Java',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        <ThemeController />
        {children}
      </body>
    </html>
  );
}
