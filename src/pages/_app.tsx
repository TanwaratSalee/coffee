import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { useEffect } from "react";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "500"],
});
const liffId = process.env.NEXT_PUBLIC_LIFF_ID as string;
export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const initLiff = async () => {
      const liff = (await import("@line/liff")).default;
      try {
        await liff.init({ liffId });
      } catch (error) {}
      if (!liff.isLoggedIn()) {
        liff.login();
      }
    };
    initLiff();
  }, []);

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
