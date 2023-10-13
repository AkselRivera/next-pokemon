import Head from 'next/head'
import { FC, PropsWithChildren } from 'react'
import { Navbar } from '../ui'

interface CustomProps extends PropsWithChildren {
  title?: string
}

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
      </Head>

      <Navbar />
      <main style={{ padding: '0px 20px' }}>{children}</main>
    </>
  )
}
