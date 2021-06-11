import Head from 'next/head'

import 'tailwindcss/tailwind.css'
import '@fontsource/josefin-sans/400.css'
import '@fontsource/josefin-sans/700.css'

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Todo App | Frontend mentor</title>
        <link rel='shortcut icon' href='favicon.ico' type='image/x-icon' />
      </Head>
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
