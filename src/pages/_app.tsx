import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Tajawal } from "next/font/google";

const tajawal = Tajawal({
  subsets: ["latin"],
  variable: "--font-tajawal",
  weight: ["300", "500"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={`${tajawal.variable} font-tajawal font-light	p-[50px] w-[820px] h-[1180px]`}
    >
      <Component {...pageProps} />
    </main>
  );
}
