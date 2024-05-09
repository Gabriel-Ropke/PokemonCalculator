import { imageNotes, typeColors } from "../minidb.js";
import { Natures } from "../minidb.js";
import { allPokemon, fetchUrl } from "../pokemonFetch.js";
import {
  closeSelectList,
  getIdFromUrl,
  openSelectList,
} from "./generalFunctions.js";
import {
  getIvNote,
  getNatureResult,
  getNote,
  getNoteLetter,
  getPokemonNote,
} from "./resultFunctions.js";

// ---------------- Document Queries
// Pokemon Select List Query
export const pokemonSelectList = document.querySelector(
  "div#pokemonListContainer ul#pokemonList"
);

// Pokémon Queries
const pokemonContainer = document.querySelector("div#pokemonContainer");
const pokemonImage = pokemonContainer.querySelector("img.pokemon-img");
const pokemonName = document.querySelector("span.pokemon-name");
const buttonNext = document.querySelector("button#next");
const buttonPreview = document.querySelector("button#preview");

// Stats Queries
const avaliationContainer = document.querySelector("section#avaliationSection");
const avaliationBST = document.querySelector("div#avaliationBaseStatTotal");
const allAvaliationStatContainer =
  avaliationContainer.querySelectorAll("div.stat");

// Nature Queries
const natureListContainer = document.querySelector("div#natureListContainer");
const natureList = natureListContainer.querySelector("menu.nature-list ul");

// IV Queries
const ivInputContainer = document.querySelector("div#ivInputContainer");
const allTextInput = ivInputContainer.querySelectorAll("input[type='text']");
const allRangeInput = ivInputContainer.querySelectorAll("input[type='range']");

// ------- Result Queries

// Container & Buttons
const resultContainer = document.querySelector("div#resultContainer");
const buttonResult = document.querySelector("button#result");
const closeResultButton = document.querySelector("button#closeResult");

// Stats
const resultBST = document.querySelector("div#resultBaseStatTotal");
const allResultStatContainer = resultContainer.querySelectorAll("div.stat");

// Lists
const resultIconList = resultContainer.querySelector("ul#iconList");
const resultNoteList = resultContainer.querySelector("ol#noteList");
const resultPokemonNote = resultNoteList.querySelector("span.pokemon-note");
const resultNatureNote = resultNoteList.querySelector("span.nature-note");
const resultIvNote = resultNoteList.querySelector("span.ivs-note");
const resultTotalNote = resultNoteList.querySelector("span.total-note");

// Images
const resultPokemonImage = resultContainer.querySelector(
  "div.img-container img.pokemon-image"
);
const resultNoteImage = resultContainer.querySelector("img.note-img");

// ---- Getting Selected Pokémon
let selectedPokemonId = 1;
let selectedPokemon = allPokemon[selectedPokemonId];
let evolution_chain = 1;
let basicId = 1;
let firstStageId = 2;
let secondStageId = 3;
let evolutionChainIdArray = [1, 2, 3];
let evolutionChainArray = [
  allPokemon[basicId],
  allPokemon[firstStageId],
  allPokemon[secondStageId],
];
export let pokemonStats = [];

// Nature selected
let natureSelected;
// ----------------

// Get Ivs Function
function getIvs() {
  const arr = [];
  for (let i = 0; i < allRangeInput.length; i++) {
    arr.push(allRangeInput[i].value);
  }
  return arr;
}

// Format NumberDex
function formatNumber(num) {
  return num.toString().padStart(3, "0");
}

// Result Functions

async function getEvolutionChainIds() {
  try {
    const urlSpecies = selectedPokemon.species.url;
    const dataSpecies = await fetchUrl(urlSpecies);
    const urlChain = dataSpecies.evolution_chain.url;
    const dataChain = await fetchUrl(urlChain);
    const dataBasic = dataChain["chain"]["species"]["url"];
    basicId = getIdFromUrl(dataBasic);
    if (dataChain["chain"]["evolves_to"].length > 0) {
      const dataFirstStage =
        dataChain["chain"]["evolves_to"][0]["species"]["url"];
      firstStageId = getIdFromUrl(dataFirstStage);

      if (dataChain["chain"]["evolves_to"][0]["evolves_to"].length > 0) {
        const dataSecondStage =
          dataChain["chain"]["evolves_to"][0]["evolves_to"][0]["species"][
            "url"
          ];
        secondStageId = getIdFromUrl(dataSecondStage);
      }
    } else {
      secondStageId = 0;
      firstStageId = 0;
    }
    evolutionChainIdArray = [basicId, firstStageId, secondStageId];
    evolutionChainArray = [
      allPokemon[basicId],
      allPokemon[firstStageId],
      allPokemon[secondStageId],
    ];
  } catch (error) {
    console.error("Erro na busca de Evolution Chain:", error.message);
  }
}

// Change Selected Pokémon
async function changeSelectedPokemon({ id, animation }) {
  selectedPokemonId = id;
  selectedPokemon = allPokemon[selectedPokemonId];
  pokemonImage.src =
    selectedPokemon["sprites"]["versions"]["generation-v"]["black-white"][
      "animated"
    ].front_default;
  pokemonName.innerText = `${selectedPokemon["name"]} #${formatNumber(id)}`;
  actualizeStatValues({
    statsArray: allAvaliationStatContainer,
    bstContainer: avaliationBST,
  });
  if (animation) {
    pokemonImage.style.animation = `${animation} 0.5s`;
    buttonNext.disabled = true;
    buttonPreview.disabled = true;

    setTimeout(() => {
      pokemonImage.style = "";
      buttonNext.disabled = false;
      buttonPreview.disabled = false;
    }, 500);
  }
  await getEvolutionChainIds();
}

// Get Result Informations
function getResult() {
  const ivs = getIvs();
  const ivNote = getIvNote({ ivs });
  resultIvNote.innerText = `${ivNote}/10`;

  const pokemonNote = getPokemonNote({ BST: pokemonStats[6] });
  resultPokemonNote.innerText = `${pokemonNote}/10`;

  const natureNote = getNatureResult({
    nature: Natures[natureSelected],
  }).note;
  resultNatureNote.innerText = `${natureNote}/10`;

  const note = getNote({
    pokemonNote: pokemonNote,
    ivNote: ivNote,
    natureNote: natureNote,
  });
  resultTotalNote.innerText = `${note}/10`;
  console.log(note);

  const noteLetter = getNoteLetter({ noteNumber: note });
  const noteImage = imageNotes[noteLetter];

  resultNoteImage.src = `public/img/${noteImage}`;
}

function resultPage() {
  getResult();
  // Actualize Result Page
  resultIconList.innerHTML = "";
  for (let i = 0; i < evolutionChainArray.length; i++) {
    // Actualize Base Stats
    actualizeStatValues({
      statsArray: allResultStatContainer,
      bstContainer: resultBST,
    });
    const id = evolutionChainIdArray[i];
    if (id != 0) {
      const form = evolutionChainArray[i];
      let li = document.createElement("li");
      let img = document.createElement("img");
      li.dataset.id = id;
      img.src =
        form["sprites"]["versions"]["generation-vii"]["icons"]["front_default"];
      li.appendChild(img);
      resultIconList.appendChild(li);
      li.addEventListener("click", () => {
        changeSelectedPokemon({ id: id });
        resultPokemonImage.src =
          selectedPokemon["sprites"]["versions"]["generation-v"]["black-white"][
            "animated"
          ]["front_default"];
        resultIconList
          .querySelector("li.selected")
          .classList.remove("selected");
        li.classList.add("selected");
        actualizeStatValues({
          statsArray: allResultStatContainer,
          bstContainer: resultBST,
        });
        getResult();
      });
      if (id == selectedPokemonId) {
        resultPokemonImage.src =
          selectedPokemon["sprites"]["versions"]["generation-v"]["black-white"][
            "animated"
          ]["front_default"];
        li.classList.add("selected");
      }
    }
  }
}

function actualizeStatValues({ statsArray, bstContainer }) {
  let bst = 0;
  pokemonStats = [];
  for (let i = 0; i < selectedPokemon["stats"].length; i++) {
    const stat = selectedPokemon["stats"][i]["base_stat"];
    const statContainer = statsArray[i];
    const statValue = statContainer.querySelector("span.stat-value");
    const innerBar = statContainer.querySelector("div.inner-bar");
    const innerShadow = statContainer.querySelector("div.inner-shadow");
    statValue.innerText = stat;
    innerBar.style.width = `${(stat / 255) * 100}%`;
    innerShadow.style.width = `${(stat / 255) * 100}%`;
    pokemonStats.push(stat);
    bst += stat;
  }
  pokemonStats.push(bst);
  const bstInnerBar = bstContainer.querySelector("div.inner-bar");
  const bstInnerShadow = bstContainer.querySelector("div.inner-shadow");
  const bstValue = bstContainer.querySelector("span.stat-value");

  bstInnerBar.style.width = `${(bst / 550) * 100}%`;
  bstInnerShadow.style.width = `${(bst / 550) * 100}%`;
  bstValue.innerText = bst;
}

// Get Pokémon Attributes Function
function getPokemonAttributes(pokemon) {
  const src =
    pokemon.sprites.versions["generation-v"]["black-white"].front_default;
  const id = pokemon.id;
  const type = pokemon.types[0].type.name;
  return { src, id, type };
}

// Create Pokémon List Elements
function createPokemonListElements({ src, id, type }) {
  const liPokemon = document.createElement("li");
  const imgPokemon = document.createElement("img");
  liPokemon.dataset.id = id;
  liPokemon.style.background = `rgba(${typeColors[type]})`;
  liPokemon.appendChild(imgPokemon);
  imgPokemon.src = src;
  pokemonSelectList.appendChild(liPokemon);
  liPokemon.addEventListener("click", () => {
    selectPokemonInList(id);
    changeSelectedPokemon({ id });
    liPokemon.classList.add("selected");
  });
}

// Function to Select Pokémon in List
function selectPokemonInList(id) {
  localStorage.setItem("pokemonDex", id);
  closeSelectList(pokemonSelectList);
  const liWithSelected = pokemonSelectList.querySelector("li.selected");
  if (liWithSelected) {
    liWithSelected.classList.remove("selected");
  }
}

function createPokemonList() {
  const allPokemonArray = Object.values(allPokemon);

  for (const pokemon of allPokemonArray) {
    const { src, id, type } = getPokemonAttributes(pokemon);
    createPokemonListElements({ src, id, type });
  }
}
// Get Pokemon Informations to create Pokemon List
export function startPage() {
  // Add Pokémon Informations
  changeSelectedPokemon({ id: 1, animation: "nextPokemon" });

  // Add Pokémon Event Listeners
  pokemonImage.addEventListener("click", () => {
    openSelectList(pokemonSelectList);
  });
  buttonNext.addEventListener("click", () => {
    selectedPokemonId += 1;
    if (selectedPokemonId == 152) {
      selectedPokemonId = 1;
    }
    changeSelectedPokemon({ id: selectedPokemonId, animation: "nextPokemon" });
  });
  buttonPreview.addEventListener("click", () => {
    selectedPokemonId -= 1;
    if (selectedPokemonId == 0) {
      selectedPokemonId = 151;
    }
    changeSelectedPokemon({
      id: selectedPokemonId,
      animation: "previewPokemon",
    });
  });

  // Result Event Listeners
  buttonResult.addEventListener("click", () => {
    resultPage();
    resultContainer.classList.add("open");
  });
  closeResultButton.addEventListener("click", () => {
    resultContainer.classList.remove("open");
  });

  // Create Nature Table
  for (let i = 0; i < Object.keys(Natures).length; i++) {
    const name = Object.keys(Natures)[i];
    const statModified = Natures[name];
    const liNature = document.createElement("li");
    liNature.innerText = name;
    liNature.dataset.value = name;
    liNature.classList.add(statModified.increase);
    natureList.appendChild(liNature);
    liNature.addEventListener("click", () => {
      const alreadyHaveSelected = natureList.querySelector("li.selected");
      const allLi = natureList.querySelectorAll("li");
      natureSelected = liNature.dataset.value;
      buttonResult.disabled = false;
      console.log(natureSelected);
      if (alreadyHaveSelected) {
        alreadyHaveSelected.classList.remove("selected");
        alreadyHaveSelected.classList.add("no-selected");
        liNature.classList.add("selected");
      } else {
        for (let i = 0; i < allLi.length; i++) {
          const li = allLi[i];
          li.classList.add("no-selected");
        }
        natureSelected = liNature.dataset.value;
        liNature.classList.remove("no-selected");
        liNature.classList.add("selected");
      }
    });
  }

  // Add IVs Inputs Listener
  for (let i = 0; i < allRangeInput.length; i++) {
    const rangeInput = allRangeInput[i];
    const textInput = allTextInput[i];
    rangeInput.oninput = () => {
      textInput.value = rangeInput.value;
    };
    textInput.addEventListener("input", () => {
      // Remove NaN Characteres
      textInput.value = textInput.value.replace(/\D/g, "");

      if (textInput.value == "") {
        textInput.value = 0;
      }

      let numero = parseInt(textInput.value, 10);
      if (numero > 31) {
        numero = 31;
      }
      textInput.value = numero;
      rangeInput.value = numero;
    });
  }

  // Create Pokémon List
  createPokemonList();
}
