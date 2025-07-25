import { Inter } from "next/font/google";
import "./globals.css";
import 'bootstrap/dist/css/bootstrap.css'
import Bootstrap from "@/components/Bootstrap/Bootstrap";
import './main.sass'
import { Providers } from "@/providers/chakra.provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clic-IA",
  description: "Automatiza a tu favor",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <Bootstrap/>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
      </body>
    </html>
  );
}
