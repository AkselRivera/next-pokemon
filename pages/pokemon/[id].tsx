import React, { FC, useState, useEffect } from 'react'

import { MainLayout } from '@/components/layouts'
import { Pokemon } from '@/interfaces'
import { getPokemonInfo, localFavorites } from '@/utils'
import { Button, Card, Container, Grid, Text } from '@nextui-org/react'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'

import confetti from 'canvas-confetti'

interface Props {
  pokemon: Pokemon
}

const PokemonPage: FC<Props> = ({ pokemon }) => {
  const [isInFavorites, setIsInFavorites] = useState(false)
  const [buttonText, setButtonText] = useState('Guardar en favoritos')

  useEffect(() => {
    localFavorites.existInFavorites(pokemon.id)
      ? setIsInFavorites(true)
      : setIsInFavorites(false)
  }, [pokemon])

  useEffect(() => {
    isInFavorites
      ? setButtonText('En favoritos')
      : setButtonText('Guardar en favoritos')
  }, [isInFavorites])

  function onToggleFavorite() {
    localFavorites.toggleFavorites(pokemon.id)
    setIsInFavorites(!isInFavorites)

    if (!isInFavorites) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0,
        },
      })
    }
  }
  return (
    <MainLayout title={`${pokemon.name}`}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px', border: 0 }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  '/no-image'
                }
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card css={{ border: 0 }}>
            <Card.Header
              css={{
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <Text h1 transform="capitalize">
                {pokemon.name}
              </Text>
              <Button
                color="gradient"
                ghost={!isInFavorites}
                onClick={onToggleFavorite}
              >
                {buttonText}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container
                direction="row"
                display="flex"
                gap={0}
                justify="space-around"
              >
                <Image
                  src={pokemon.sprites.front_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={pokemon.name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </MainLayout>
  )
}

export default PokemonPage

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, index) => `${index + 1}`)

  return {
    paths: pokemons151.map((id) => ({ params: { id } })),
    // Incremental Static Generation (ISG)
    fallback: 'blocking',

    // ***  APUNTES como se ve realmente el getStaticPaths***
    // paths: [
    //   {
    //     params: {
    //       id: '1',
    //     },
    //   },
    // ],
    // fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string }

  const pokemon = await getPokemonInfo(id)
  // Incremental Static Generation (ISG)
  if (!pokemon) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      pokemon,
    },
    // Incremental Static Regeneration (ISR)
    revalidate: 86400, // 60 * 60 * 24
  }
}
