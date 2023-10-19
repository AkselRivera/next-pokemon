import { useState, useEffect } from 'react'
import { MainLayout } from '@/components/layouts'
import { localFavorites } from '@/utils'
import { FavoritesPokemons, NoFavorites } from '@/components/ui'

function FavoritesPage() {
  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([])

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons())
  }, [])

  return (
    <MainLayout title="Pokemon - Favoritos">
      {favoritePokemons.length === 0 ? (
        <NoFavorites />
      ) : (
        <FavoritesPokemons pokemons={favoritePokemons} />
      )}
    </MainLayout>
  )
}

export default FavoritesPage
