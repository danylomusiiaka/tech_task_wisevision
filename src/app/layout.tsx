import type { Metadata } from "next";
import { FavCitiesProvider } from "@/contexts/FavCitiesContext";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Simple weather app for displaying weather based on input city",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <FavCitiesProvider>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </FavCitiesProvider>
  );
}
