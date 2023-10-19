import { pokeApi } from "@/api"
import { Pokemon } from "@/interfaces"

export async function getPokemonInfo(nameOrID:string){
    const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrID}`)
  
    const pokemon = {
      id: data.id,
      name: data.name,
      sprites: data.sprites,
    }
  
    return pokemon
    
  }
