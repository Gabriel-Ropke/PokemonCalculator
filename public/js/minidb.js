export const typeColors = {
  rock: "182, 158, 49",
  ghost: "112, 85, 155",
  steel: "183, 185, 208",
  water: "100, 147, 235",
  grass: "76, 203, 72",
  psychic: "251, 85, 132",
  ice: "154, 214, 223",
  dark: "117, 87, 76",
  fairy: "230, 158, 172",
  normal: "170, 166, 127",
  fighting: "193, 34, 57",
  flying: "168, 145, 236",
  poison: "164, 62, 158",
  ground: "222, 193, 107",
  bug: "167, 183, 35",
  fire: "245, 125, 49",
  electric: "249, 207, 48",
  dragon: "112, 55, 255",
};
export const typeNotes = {
  rock: 9,
  ghost: 6.5,
  steel: 2,
  water: 2.5,
  grass: 0,
  psychic: 1,
  ice: 4,
  dark: 9,
  fairy: 3,
  normal: 2,
  fighting: 9,
  flying: 2,
  poison: 5,
  ground: 4,
  bug: 6,
  fire: 7.5,
  electric: 8,
  dragon: 9,
};
export const Natures = {
  Hardy: {
    increase: "atk",
    decrease: "atk",
  },
  Lonely: {
    increase: "atk",
    decrease: "def",
  },
  Adamant: {
    increase: "atk",
    decrease: "spatk",
  },
  Naughty: {
    increase: "atk",
    decrease: "spdef",
  },
  Brave: {
    increase: "atk",
    decrease: "speed",
  },
  Bold: {
    increase: "def",
    decrease: "atk",
  },
  Docile: {
    increase: "def",
    decrease: "def",
  },
  Impish: {
    increase: "def",
    decrease: "spatk",
  },
  Lax: {
    increase: "def",
    decrease: "spdef",
  },
  Relaxed: {
    increase: "def",
    decrease: "speed",
  },
  Modest: {
    increase: "spatk",
    decrease: "atk",
  },
  Mild: {
    increase: "spatk",
    decrease: "def",
  },
  Bashful: {
    increase: "spatk",
    decrease: "spatk",
  },
  Rash: {
    increase: "spatk",
    decrease: "spdef",
  },
  Quiet: {
    increase: "spatk",
    decrease: "speed",
  },
  Calm: {
    increase: "spdef",
    decrease: "atk",
  },
  Gentle: {
    increase: "spdef",
    decrease: "def",
  },
  Careful: {
    increase: "spdef",
    decrease: "spatk",
  },
  Quirky: {
    increase: "spdef",
    decrease: "spdef",
  },
  Sassy: {
    increase: "spdef",
    decrease: "speed",
  },
  Timid: {
    increase: "speed",
    decrease: "atk",
  },
  Hasty: {
    increase: "speed",
    decrease: "def",
  },
  Jolly: {
    increase: "speed",
    decrease: "spatk",
  },
  Naive: {
    increase: "speed",
    decrease: "spdef",
  },
  Serious: {
    increase: "speed",
    decrease: "speed",
  },
};
export const statColor = {
  hp: "pink",
  atk: "#ff3632",
  def: "#1689fe",
  spatk: "#ff69b4",
  spdef: "#6dc6fe",
  speed: "#dedb35",
};
export const imageNotes = {
  D: "D-rank.png",
  C: "C-rank.png",
  B: "B-rank.png",
  A: "A-rank.png",
  S: "S-rank.png",
  SS: "SS-rank.png",
};
export const pokemonGroups = [
  {
    name: "Bruiser Physical",
    stats: ["def", "atk"],
    statsPoints: { hp: 8, atk: 10, def: 10, spatk: 0, spdef: 5, speed: 5 },
  },
  {
    name: "Bruiser Special",
    stats: ["spatk", "spdef"],
    statsPoints: { hp: 8, atk: 0, def: 5, spatk: 10, spdef: 10, speed: 5 },
  },
  {
    name: "Offensive Physical",
    stats: ["speed", "atk"],
    statsPoints: { hp: 8, atk: 10, def: 0, spatk: 5, spdef: 5, speed: 10 },
  },
  {
    name: "Offensive Special",
    stats: ["speed", "spatk"],
    statsPoints: { hp: 8, atk: 5, def: 0, spatk: 10, spdef: 5, speed: 10 },
  },
  {
    name: "Defensive",
    stats: ["def", "spdef"],
    statsPoints: { hp: 8, atk: 5, def: 10, spatk: 0, spdef: 10, speed: 5 },
  },
  {
    name: "Tank Physical",
    stats: ["hp", "def"],
    statsPoints: { hp: 10, atk: 5, def: 10, spatk: 0, spdef: 5, speed: 5 },
  },
  {
    name: "Tank Special",
    stats: ["hp", "spdef"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "hp atk",
    stats: ["hp", "atk"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Hp Def",
    stats: ["hp", "def"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Hp Spatk",
    stats: ["hp", "spatk"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Hp Spdef",
    stats: ["hp", "spdef"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Hp Speed",
    stats: ["hp", "speed"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Atk Def",
    stats: ["atk", "def"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Atk Spatk",
    stats: ["atk", "spatk"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Atk Spdef",
    stats: ["atk", "spdef"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Atk Speed",
    stats: ["atk", "speed"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Def Spatk",
    stats: ["def", "spatk"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Def Spdef",
    stats: ["def", "spdef"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Def Speed",
    stats: ["def", "speed"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Spatk Spdef",
    stats: ["spatk", "spdef"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Spatk Speed",
    stats: ["spatk", "speed"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
  {
    name: "Spdef Speed",
    stats: ["spdef", "speed"],
    statsPoints: { hp: 10, atk: 0, def: 5, spatk: 5, spdef: 10, speed: 5 },
  },
];
