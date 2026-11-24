import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "JobMatch — Temukan pekerjaan yang tepat",
  description: "Cari pekerjaan berdasarkan pendidikan, pengalaman, dan kemampuanmu."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="id"><body>{children}</body></html>;
}