import {
  checkIfIsBiggerThan151,
  getIdFromUrl,
} from "./functions/generalFunctions.js";
import { pokemonStats } from "./functions/startFunctions.js";

async function functionSpecificFetchUrl({ url, id }) {
  return fetch(`${url}/${id}`)
    .then((APIResponse) => {
      if (APIResponse.status === 200) {
        return APIResponse.json();
      } else {
        throw new Error(`Este item não existe`);
      }
    })
    .catch((error) => {
      console.error(error.message);
    });
}

const fetchAllPokemon = async () => {
  const pokemonData = {};
  const url = "https://pokeapi.co/api/v2/pokemon";
  for (let id = 1; id <= 151; id++) {
    await functionSpecificFetchUrl({ url, id })
      .then((data) => {
        pokemonData[data.id] = data;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return pokemonData;
};

const fetchAllChain = async () => {
  const chainData = {};
  const url = "https://pokeapi.co/api/v2/evolution-chain";
  for (let id = 1; id <= 78; id++) {
    await functionSpecificFetchUrl({ url, id })
      .then((data) => {
        chainData[data.id] = data.chain;
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return chainData;
};

async function cleanEvolutionChain() {
  const evolutionChainData = await fetchAllChain();
  const allEvolutionChainArray = [];
  for (let id = 1; id <= 78; id++) {
    const data = evolutionChainData[id];
    const evolutionChainArray = [];
    console.log(allEvolutionChainArray);

    // --- Push First
    if (checkIfIsBiggerThan151(getIdFromUrl(data.species.url))) {
      const first = getIdFromUrl(data.species.url);
      evolutionChainArray.push(first);
    }

    // --- Push Second
    if (data["evolves_to"].length > 0) {
      if (
        checkIfIsBiggerThan151(getIdFromUrl(data["evolves_to"][0].species.url))
      ) {
        const second = getIdFromUrl(data["evolves_to"][0].species.url);
        evolutionChainArray.push(second);
      }

      // --- Push Third
      if (data["evolves_to"][0]["evolves_to"].length > 0) {
        if (
          checkIfIsBiggerThan151(
            getIdFromUrl(data["evolves_to"][0]["evolves_to"][0].species.url)
          )
        ) {
          const third = getIdFromUrl(
            data["evolves_to"][0]["evolves_to"][0].species.url
          );
          evolutionChainArray.push(third);
        }
      }
    }

    allEvolutionChainArray.push(evolutionChainArray);
  }
  return allEvolutionChainArray;
}

async function cleanPokemon() {
  const pokemonData = await fetchAllPokemon();
  const allPokemonArray = [];
  const allPokemon = {};
  for (let i = 1; i < 152; i++) {
    const pokemonObj = {};
    const pokemon = pokemonData[i];
    const name = pokemon.name;
    const id = pokemon.id;
    const icon =
      pokemon["sprites"]["versions"]["generation-vii"]["icons"][
        "front_default"
      ];
    const animated =
      pokemon["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    const status = {
      hp: pokemon.stats[0],
      atk: pokemon.stats[1],
      def: pokemon.stats[2],
      spatk: pokemon.stats[3],
      spdef: pokemon.stats[4],
      speed: pokemon.stats[5],
    };

    pokemonObj["id"] = id;
    pokemonObj["name"] = name;
    pokemonObj["animated"] = animated;
    pokemonObj["icon"] = icon;
    pokemonObj["status"] = status;
    allPokemon[i] = pokemonObj;
    allPokemonArray.push(pokemonObj);
  }
  console.log(allPokemon);
  console.log(allPokemonArray);
  return allPokemonArray;
}

async function functionFetchUrl(url) {
  try {
    const APIResponse = await fetch(url);
    if (APIResponse.status === 200) {
      const data = await APIResponse.json();
      return data;
    } else {
      throw new Error(`Este item não existe`);
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
    console.error("Erro:", error.message);
    throw error;
  }
};

export const allPokemon = await fetchAllPokemon();
export const auPokemon = await cleanPokemon();
