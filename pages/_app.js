import Head from 'next/head'

import 'tailwindcss/tailwind.css'
import '@fontsource/josefin-sans/400.css'
import '@fontsource/josefin-sans/700.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no'
        />
        <meta name='description' content='Description' />
        <meta name='keywords' content='Todo App' />
        <title>Todo App | Frontend mentor</title>

        <link rel='manifest' href='/manifest.json' />
        <link
          href='/favicon-32x32.png'
          rel='icon'
          type='image/png'
          sizes='32x32'
        />
        <meta name='theme-color' content='#85a2fc' />
        <link rel='shortcut icon' href='/favicon.ico' type='image/x-icon' />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
