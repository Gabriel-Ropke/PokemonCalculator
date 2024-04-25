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
let selectedPokemonId = 1;
let selectedPokemon = allPokemon[selectedPokemonId];

// Nature selected
let natureSelected;
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
function changeSelectedPokemon({id, animation}) {
    selectedPokemonId = id;
    selectedPokemon = allPokemon[selectedPokemonId];
    pokemonImage.src = selectedPokemon["sprites"]["versions"]['generation-v']['black-white']['animated'].front_default;
    pokemonName.innerText = `${selectedPokemon["name"]} #${formatNumber(id)}`
    if(animation) {
        pokemonImage.style.animation = `${animation} 0.5s`
        buttonNext.disabled = true
        buttonPreview.disabled = true
        
        setTimeout(() => {
            pokemonImage.style = ""
            buttonNext.disabled = false;
            buttonPreview.disabled = false;
        }, 500);
    }

    actualizeStatValues();
}

function actualizeStatValues() {
    let bst = 0;
    for (let i = 0; i < selectedPokemon["stats"].length; i++) {
        const stat = selectedPokemon["stats"][i]["base_stat"]
        const statContainer = allStatContainer[i]
        const statValue = statContainer.querySelector("span.stat-value")
        const innerBar = statContainer.querySelector("div.inner-bar")
        const innerShadow = statContainer.querySelector("div.inner-shadow")
        statValue.innerText = stat;
        innerBar.style.width = `${stat / 255 * 100}%`
        innerShadow.style.width = `${stat / 255 * 100}%`
        bst += stat;
    }
    const bstContainer = document.querySelector("div#baseStatTotal")
    const bstInnerBar = bstContainer.querySelector("div.inner-bar")
    const bstInnerShadow = bstContainer.querySelector("div.inner-shadow")
    const bstValue = bstContainer.querySelector("span.stat-value")

    bstInnerBar.style.width = `${bst / 550 * 100}%`
    bstInnerShadow.style.width = `${bst / 550 * 100}%`
    bstValue.innerText = bst;
    
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
        changeSelectedPokemon({id})
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
    changeSelectedPokemon({id: 1, animation: "nextPokemon"})

    // Add Pokémon Event Listeners 
    pokemonImage.addEventListener("click", () => {
        openSelectList(pokemonSelectList);
    })
    buttonNext.addEventListener("click", () => {
        selectedPokemonId += 1;
        if(selectedPokemonId == 151 ){
            selectedPokemonId = 1
        }
        changeSelectedPokemon({id: selectedPokemonId, animation: "nextPokemon"});
    })
    buttonPreview.addEventListener("click", () => {
        selectedPokemonId -= 1
        if(selectedPokemonId == 0) {
            selectedPokemonId = 151
        }
        changeSelectedPokemon({id: selectedPokemonId, animation: "previewPokemon"});
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
        textInput.addEventListener("input", () => {
            // Remove NaN Characteres
            textInput.value = textInput.value.replace(/\D/g, '');
    
            if (textInput.value == "") {
                textInput.value = 0
            }

            let numero = parseInt(textInput.value, 10);
            if (numero > 31) {
                numero = 31;
            }
            textInput.value = numero
            rangeInput.value = numero
        })
    }

    // Create Pokémon List
    createPokemonList()
}