import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "SAR for Academic Research",
  description: "ระบบรีวิวงานวิจัยโดยผู้เชี่ยวชาญทางวิชาการ AI - Academic SAR Review System",
  keywords: ["academic research", "SAR", "research review", "AI evaluation", "งานวิจัย", "ประเมินงานวิจัย"],
  authors: [{ name: "พล.ท.ดร.กริช อินทราทิพย์" }],
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased">
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
