import { Link, Spacer, Text, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import NextLink from 'next/link'

export const Navbar = () => {
  const { theme } = useTheme()

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0px 10px',
        backgroundColor: theme?.colors.gray900.value,
      }}
    >
      <Image
        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/25.png"
        alt="Imagen pokemon"
        width={70}
        height={70}
      />
      <NextLink href="/" legacyBehavior>
        <Link>
          <Text h2>P</Text>
          <Text h3>ókemon</Text>
        </Link>
      </NextLink>
      <Spacer css={{ flex: 1 }} />
      <NextLink href="/favorites" legacyBehavior>
        <Link css={{ marginRight: '15px' }}>Favoritos</Link>
      </NextLink>
    </div>
  )
}
