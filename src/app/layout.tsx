import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Vital Starter",
  description: "תבנית התחלה מהירה של ויטל ל־Next.js",
};

const YEAR = new Date().getFullYear();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="he" dir="rtl">
      <body className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
        <Navbar />

        {/* אזור התוכן + הסיידבר */}
        <div className="flex flex-1 max-w-6xl mx-auto w-full">
          <Sidebar />
          <main className="flex-1 px-4 py-8">{children}</main>
        </div>

        <footer className="border-t border-slate-800 py-4 text-center text-xs text-slate-500">
          © {YEAR} ויטל — תבנית התחלה
        </footer>
      </body>
    </html>
  );
}
