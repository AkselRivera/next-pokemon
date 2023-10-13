import { Spacer, useTheme } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'

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
      <Link href="/">Pokemon</Link>
      <Spacer css={{ flex: 1 }} />
      <Link href="/favorites">Favoritos</Link>
    </div>
  )
}
