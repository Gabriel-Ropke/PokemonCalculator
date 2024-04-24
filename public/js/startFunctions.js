import { typeColors } from "./minidb.js";
import { Natures } from "./minidb.js";
import { allPokemon } from "./pokemonFetch.js";
import { closeSelectList, openSelectList } from "./generalFunctions.js";

// ---------------- Document Queries
// Pokemon Select List Query
export const pokemonSelectList = document.querySelector("div#pokemonListContainer ul#pokemonList");

// Pokémon Queries
const pokemonContainer = document.querySelector("div#pokemonContainer")
const pokemonImage = pokemonContainer.querySelector("img.pokemon-img")
const pokemonName = document.querySelector("span.pokemon-name")
const buttonNext = document.querySelector("button#next")
const buttonPreview = document.querySelector("button#preview")

// Stats Queries
const allStatContainer = document.querySelectorAll("div.stat")

// Nature Queries
const natureListContainer = document.querySelector("div#natureListContainer")
const natureList = natureListContainer.querySelector("menu.nature-list ul")

// IV Queries
const ivInputContainer = document.querySelector("div#ivInputContainer");
const allTextInput = ivInputContainer.querySelectorAll("input[type='text']");
const allRangeInput = ivInputContainer.querySelectorAll("input[type='range']");

// Result Button
const buttonResult = document.querySelector("button#result")

// ---- Getting Selected Pokémon
var selectedPokemonId = 1
var selectedPokemon = allPokemon[selectedPokemonId]

// Nature selected
var natureSelected;
// ----------------

// Get Ivs Function
function getIvs() {
    const arr = []
    for (let i = 0; i < allRangeInput.length; i++) {
        arr.push(allRangeInput[i].value)
    }
    return arr
}

// Format NumberDex
function formatNumber(num) {
    return num.toString().padStart(3, '0');
}

// Change Selected Pokémon 
function changeSelectedPokemon(id) {
    selectedPokemon = allPokemon[id];
    pokemonImage.src = selectedPokemon["sprites"]["versions"]['generation-v']['black-white']['animated'].front_default;
    pokemonName.innerText = `${selectedPokemon["name"]} #${formatNumber(id)}`
    actualizeStatValues();
}

function actualizeStatValues() {
    for (let i = 0; i < allStatContainer.length; i++) {
        const baseStat = selectedPokemon["stats"][i]["base_stat"]
        const statContainer = allStatContainer[i]
        const statValue = statContainer.querySelector("span.stat-value")
        const innerBar = statContainer.querySelector("div.inner-bar")
        const innerShadow = statContainer.querySelector("div.inner-shadow")
        statValue.innerText = baseStat;
        innerBar.style.width = `${baseStat / 255 * 100}%`
        innerShadow.style.width = `${baseStat / 255 * 100}%`
    }
}

// Get Pokémon Attributes Function
function getPokemonAttributes(pokemon) {
    const src = pokemon.sprites.versions['generation-v']['black-white'].front_default;
    const id = pokemon.id;
    const type = pokemon.types[0].type.name;
    return { src, id, type };
}

// Create Pokémon List Elements
function createPokemonListElements({ src, id, type }) {
    const liPokemon = document.createElement('li');
    const imgPokemon = document.createElement('img');
    liPokemon.dataset.id = id;
    liPokemon.style.background = `rgba(${typeColors[type]})`;
    liPokemon.appendChild(imgPokemon);
    imgPokemon.src = src;
    pokemonSelectList.appendChild(liPokemon);
    liPokemon.addEventListener('click', () => {
        selectPokemonInList(id);
        changeSelectedPokemon(id)
        selectedPokemonId = id
        liPokemon.classList.add("selected")
    });
}

// Function to Select Pokémon in List
function selectPokemonInList(id) {
    localStorage.setItem("pokemonDex", id)
    closeSelectList(pokemonSelectList);
    const liWithSelected = pokemonSelectList.querySelector("li.selected")
    if(liWithSelected) {
        liWithSelected.classList.remove("selected")
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
export function startPage( ) {
    // Add Pokémon Informations
    changeSelectedPokemon(1)

    // Add Pokémon Event Listeners 
    pokemonImage.addEventListener("click", () => {
        openSelectList(pokemonSelectList);
    })
    buttonNext.addEventListener("click", () => {
        selectedPokemonId += 1
        changeSelectedPokemon(selectedPokemonId)
    })
    buttonPreview.addEventListener("click", () => {
        selectedPokemonId -= 1
        changeSelectedPokemon(selectedPokemonId)
    })
    buttonResult.addEventListener("click", () => {
        console.log("clicou")
    })

    // Create Nature Table 
    for (let i = 0; i < Object.keys(Natures).length; i++) {
        const name = Object.keys(Natures)[i]
        const statModified = Natures[name]
        const liNature = document.createElement("li");
        liNature.innerText = name;
        liNature.dataset.value = name;
        console.log(statModified)
        liNature.classList.add(statModified.increase)
        natureList.appendChild(liNature)
        liNature.addEventListener("click", () => {
            const alreadyHaveSelected = natureList.querySelector("li.selected")
            const allLi = natureList.querySelectorAll("li");
            if(alreadyHaveSelected) {
                alreadyHaveSelected.classList.remove("selected");
                alreadyHaveSelected.classList.add("no-selected");
                liNature.classList.add("selected")
            } else {
                for (let i = 0; i < allLi.length; i++) {
                    const li = allLi[i];
                    li.classList.add("no-selected");
                }
                natureSelected = liNature.dataset.value;
                liNature.classList.remove("no-selected")
                liNature.classList.add("selected");
            }
        })   
    }

    // Add IVs Inputs Listener
    for (let i = 0; i < allRangeInput.length; i++) {
        const rangeInput = allRangeInput[i];
        const textInput = allTextInput[i];
        rangeInput.oninput = () => {
            textInput.value = rangeInput.value
        }
    }

    // Create Pokémon List
    createPokemonList()
}