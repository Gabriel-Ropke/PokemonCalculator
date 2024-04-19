export const pokemonFetch = async (pokemonID) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      .then((APIResponse) => {
        if (APIResponse.status === 200) {
          return APIResponse.json();
        } else {
          throw new Error(`Este Pokémon não existe`);
        }
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

const fetchAllPokemon = async () => {
  const pokemonData = {}
  for (let i = 1; i <= 151; i++) {
    await pokemonFetch(i)
    .then((data) => {
      pokemonData[data.id] = data
    })
    .catch((error) => {
      console.error(error);
    });
  }
  return pokemonData;
}
export const allPokemon = await fetchAllPokemon();