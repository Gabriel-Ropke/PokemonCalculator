import { pokemonGroups } from "../minidb.js";
import { fixedOne } from "./generalFunctions.js";
import { pokemonStats } from "./startFunctions.js";

// Order Stats based in his Values
export function getRankedStats({ status }) {
  const rankedStats = {};

  // Ordena as chaves com base nos valores numéricos
  const sortedKeys = Object.keys(status).sort((a, b) => status[b] - status[a]);

  // Verifica o índice de 'speed' após a ordenação
  const speedIndex = sortedKeys.indexOf("speed");

  // Se o índice de 'speed' for maior que 1, move 'speed' para o último lugar
  if (speedIndex > 1) {
    sortedKeys.push(sortedKeys.splice(speedIndex, 1)[0]);
  }

  // Determina a categoria para cada atributo
  sortedKeys.forEach((key, index) => {
    const statValue = status[key];

    // Cria o objeto com a categoria e o índice
    rankedStats[key] = { value: statValue, index: index };
  });

  return rankedStats;
}

export function getPokemonGroup() {
  const keys = Object.keys(getPokemonStatsAndRank({ pokemonStats }));

  const firstKey = keys[0];
  const secondKey = keys[1];

  const bestStats = [firstKey, secondKey];

  return matchPokemonGroup({ bestStats });
}
function matchPokemonGroup({ bestStats }) {
  return pokemonGroups.find((objeto) => {
    // Ordena os arrays antes de comparar
    const elementosOrdenados = objeto.stats.slice().sort();
    const elementosEspecificosOrdenados = bestStats.slice().sort();

    // Verifica se os arrays ordenados são iguais
    return (
      JSON.stringify(elementosOrdenados) ===
      JSON.stringify(elementosEspecificosOrdenados)
    );
  });
}
// Get Nature Result Based in Stats Index
export function getNatureResult({ nature }) {
  const stats = getPokemonStatsAndRank({ pokemonStats });
  const statsPoints = getPokemonGroup().statsPoints;
  console.log(statsPoints);
  const NatureCategoryArray = {
    0: "Neutra",
    2: "Ruim",
    4: "Mediana",
    6: "Boa",
    8: "Ótima",
    10: "Perfeita",
  };
  console.log(nature);
  const natureIncrease = nature.increase;
  const natureDecrease = nature.decrease;

  console.log(statsPoints[natureIncrease]);
  const statsPointsDifference =
    statsPoints[natureIncrease] - statsPoints[natureDecrease];
  let statIncreasedIndex, statDecreasedIndex;
  console.log(stats);
  statIncreasedIndex = stats[natureIncrease].index;
  statDecreasedIndex = stats[natureDecrease].index;

  // Get note for Increase Stat
  const increased = 10 - statIncreasedIndex * 2;
  const decreased = -10 + statDecreasedIndex * 2;
  const note = increased + decreased;
  let resultMessage;
  NatureCategoryArray[note]
    ? (resultMessage = NatureCategoryArray[note])
    : (resultMessage = "Horrível");

  return { note: note, message: resultMessage };
}

// Get IV Nature based in Stats Index and Iv Value
export function getIvNote({ ivs }) {
  const stats = getPokemonStatsAndRank({ pokemonStats });
  let sum = 0;
  const a = [];
  for (let i = 0; i < 6; i++) {
    const statusIndex = stats[Object.keys(stats)[i]].index;
    const invertIndex = (statusIndex - 6) * -1;
    const ivValue = parseInt(ivs[Object.keys(ivs)[i]]);
    const calc = invertIndex * ivValue;
    a.push(calc);
    sum += calc;
  }
  return fixedOne((sum / 651) * 10);
}

// Get Pokémon Stats and return ranked Stats
export function getPokemonStatsAndRank() {
  // Pokémon Informations
  const hp = pokemonStats[0];
  const atk = pokemonStats[1];
  const def = pokemonStats[2];
  const spatk = pokemonStats[3];
  const spdef = pokemonStats[4];
  const speed = pokemonStats[5];

  const status = {
    hp: hp,
    atk: atk,
    def: def,
    spatk: spatk,
    spdef: spdef,
    speed: speed,
  };
  return getRankedStats({ status });
}

// Get note Letter base in note number
export function getNoteLetter({ noteNumber }) {
  let noteLetter = "";
  console.log(noteNumber);
  if (noteNumber == 10) {
    noteLetter = "SS";
  } else if (noteNumber >= 8) {
    noteLetter = "S";
  } else if (noteNumber >= 6) {
    noteLetter = "A";
  } else if (noteNumber >= 3) {
    noteLetter = "B";
  } else if (noteNumber <= 3) {
    noteLetter = "C";
  } else if (noteNumber <= 1) {
    noteLetter = "D";
  }
  return noteLetter;
}

// Get note based in Pokémon, Nature and iv notes
export function getPokemonNote({ BST }) {
  let pokemonNote = fixedOne((BST / 525) * 10);
  if ((BST / 525) * 10 > 10) {
    pokemonNote = 10;
  }
  return pokemonNote;
}
export function getNote({ pokemonNote, natureNote, ivNote }) {
  const pokemon = parseInt(pokemonNote);
  const nature = parseInt(natureNote);
  const iv = parseInt(ivNote);

  const sum = (nature + iv + pokemon) / 3;
  return fixedOne(sum);
}
