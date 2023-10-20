import { pokeApi } from "@/api"
import { Pokemon } from "@/interfaces"

export async function getPokemonInfo(nameOrID:string){
  // Incremental Static Generation (ISG)
  try {
      const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrID}`)
      
      const pokemon = {
        id: data.id,
        name: data.name,
        sprites: data.sprites,
      }
    
      return pokemon

    } catch (error) {
      return null
    }
  
    
  }
