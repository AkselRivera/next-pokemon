import { useRouter } from 'next/router'
import React from 'react'

interface Props {
  pokemon: any
}

const PokemonPage = () => {
  const { query } = useRouter()

  return <div>Hola</div>
}

export default PokemonPage
