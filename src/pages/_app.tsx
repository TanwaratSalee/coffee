import "@/styles/globals.css";
import type { AppProps } from "next/app";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "500"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${roboto.variable} font-roboto font-light`}>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <title>Coffee</title>
      <Component {...pageProps} />
    </main>
  );
}
