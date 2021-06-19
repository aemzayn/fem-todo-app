import { AppProps } from "next/app";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Head from "next/head";
import "tailwindcss/tailwind.css";
import "@fontsource/josefin-sans/400.css";
import "@fontsource/josefin-sans/700.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <Head>
        <title>Todo App | Frontend Mentor</title>
        <meta name="description" content="Todo app from frontend mentor" />
        <meta name="keywords" content="Todo app, Frontend mentor" />
      </Head>
      <Component {...pageProps} />
    </DndProvider>
  );
}
