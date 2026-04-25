import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

import Logo from "../components/logoOnly";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Logo/>
        {children}
      </body>
    </html>
  );
}
