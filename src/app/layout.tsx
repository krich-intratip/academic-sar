import type { Metadata } from "next";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "ระบบประเมินโครงร่างและวิทยานิพนธ์",
  description: "ระบบประเมินโครงร่างและวิทยานิพนธ์โดยผู้เชี่ยวชาญทางวิชาการ AI - Thesis Proposal & Full Thesis Evaluation System",
  keywords: ["thesis", "proposal", "วิทยานิพนธ์", "โครงร่างวิทยานิพนธ์", "ประเมินวิทยานิพนธ์", "AI evaluation", "academic research"],
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
