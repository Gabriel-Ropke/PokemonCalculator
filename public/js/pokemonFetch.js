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
async function functionFetchUrl(url) {
  try {
      const APIResponse = await fetch(url);
      if (APIResponse.status === 200) {
          const data = await APIResponse.json();
          return data;
      } else {
          throw new Error(`Este Pokémon não existe`);
      }
  } catch (error) {
      console.error(error.message);
      throw error;
  }
}

// Chama a função e exporta seu resultado
export const fetchUrl = async (url) => {
  try {
      return await functionFetchUrl(url);
  } catch (error) {
      console.error('Erro:', error.message);
      throw error;
  }
};
export const allPokemon = await fetchAllPokemon();