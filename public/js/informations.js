import { SwitchPage } from "./generalFunctions.js";
import { Natures } from "./minidb.js";
import { allPokemon } from "./pokemonFetch.js";
import { initResult } from "./result.js";

export function initInformations() {
    // ---- Initial Page Queries
    const avaliationSection = document.querySelector("section#avaliationSection")
    
    // Pokémon Queries
    const pokemonContainer = avaliationSection.querySelector("div#pokemon")
    const pokemonImage = pokemonContainer.querySelector("img.pokemon")

    // Nature Queries
    const natureListContainer = avaliationSection.querySelector("div#natureListContainer")
    const natureList = natureListContainer.querySelector("menu.nature-list ul")

    let natureSelected = "";

    // ---- Getting Selected Pokémon
    const selectedPokemonID = localStorage.getItem("pokemonDex")
    const selectedPokemon = allPokemon[selectedPokemonID]
    console.log(selectedPokemon)

    // add Pokémon Image
    pokemonImage.src = selectedPokemon["sprites"]["versions"]['generation-v']['black-white']['animated'].front_default;

    // Create and add Interactive Functions to Nature List
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
                return
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
    /*
    const allIvInputs = document.querySelectorAll("div#ivsContainer div#inputsContainer input[type='range']")
    for (let i = 0; i < allIvInputs.length; i++) {
        const input = allIvInputs[i]
        input.oninput = () => {
            input.dataset.value = input.value;
        }
    }
    */
}