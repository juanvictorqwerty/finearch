import Navbar from "@/components/ui/navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <Navbar />
        {/* We add pt-16 (padding-top) to prevent content from hiding under the fixed navbar */}
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}