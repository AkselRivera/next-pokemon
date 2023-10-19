import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui'
import { useRouter } from 'next/router'

interface CustomProps extends PropsWithChildren {
  title?: string
}

const origin = typeof window === 'undefined' ? '' : window.location.origin

export const MainLayout: FC<CustomProps> = ({
  children,
  title = 'Pokemon',
}) => {
  return (
    <>
      <Head>
        <title>{title} - NextJS</title>
        <meta name="author" content="Aksel Rivera" />
        <meta
          name="description"
          content={`Informacion sobre Pokemon ${title}`}
        />
        <meta name="keywords" content={`pokemon, pokedex, ${title}`} />

        <meta property="og:title" content={`Información sobre ${title}`} />
        <meta
          property="og:description"
          content={`Esta es la pagina sobre ${title}`}
        />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />
      <main style={{ padding: '0px 20px' }}>{children}</main>
    </>
  )
}
