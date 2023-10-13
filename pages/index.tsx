import { pokeApi } from '@/api'
import { MainLayout } from '@/components/layouts'
import { PokemonCard } from '@/components/pokemon'
import { PokemonListResponse, SmallPokemon } from '@/interfaces'
import { Card, Grid, Row, Text } from '@nextui-org/react'
import { GetStaticProps, NextPage } from 'next'

interface Props {
  pokemons: SmallPokemon[]
}

const Home: NextPage<Props> = ({ pokemons }) => {
  return (
    <>
      <MainLayout title="Pikachu">
        <Grid.Container gap={2} justify="flex-start">
          {pokemons.map((poke) => (
            <PokemonCard key={poke.id} pokemon={poke} />
          ))}
        </Grid.Container>
      </MainLayout>
    </>
  )
}

export default Home

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151') // your fetch function here

  const pokemons: SmallPokemon[] = data.results.map((pokemon, index) => {
    const id = index + 1
    return {
      ...pokemon,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
    }
  })

  // https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg

  return {
    props: {
      pokemons,
    },
  }
}
