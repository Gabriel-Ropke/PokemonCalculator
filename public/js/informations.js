import { SwitchPage } from "./generalFunctions.js";
import { Natures } from "./minidb.js";
import { allPokemon } from "./pokemonFetch.js";
import { initResult } from "./result.js";

export function initInformations() {
    // Get window Width
    const windowWidth = window.innerWidth
    console.log(windowWidth)

    // ---- Initial Page Queries
    const avaliationSection = document.querySelector("section#avaliationSection")
    const resultSection = document.querySelector("section#resultSection")
    const buttonNext = avaliationSection.querySelector("button#buttonNext")
    const buttonConfirm = avaliationSection.querySelector("button#buttonConfirm")

    // Pokémon Queries
    const pokemonContainer = avaliationSection.querySelector("div#pokemon")
    const pokemonImage = pokemonContainer.querySelector("img.pokemon")

    // --- Data Queries

    const dataSection = avaliationSection.querySelector("section#dataSection")
    // Nature Queries
    const natureListContainer = dataSection.querySelector("div#natureListContainer")
    const natureList = natureListContainer.querySelector("menu.nature-list ul")

    let natureSelected;

    // IV Queries
    const ivInputContainer = dataSection.querySelector("div#ivInputContainer");
    const allTextInput = ivInputContainer.querySelectorAll("input[type='text']");
    const allRangeInput = ivInputContainer.querySelectorAll("input[type='range']");

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
            buttonNext.disabled = false;
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

    // Add IV Inputs Event Listener
    for (let i = 0; i < allRangeInput.length; i++) {
        const rangeInput = allRangeInput[i];
        const textInput = allTextInput[i];
        rangeInput.oninput = () => {
            buttonConfirm.disabled = false
            textInput.value = rangeInput.value
        }
    }
    function getIvs() {
        const arr = []
        for (let i = 0; i < allRangeInput.length; i++) {
            arr.push(allRangeInput[i].value)
        }
        return arr
    }

    // Button Next Click Event Listener
    buttonNext.addEventListener("click", () => {
        dataSection.style.transform = `translateX(-${windowWidth}px)`
        dataSection.style.height = "200px"
        setTimeout(() => {
            natureListContainer.style.height= "0px"
            natureListContainer.style.padding = "0px"
        }, 800);
        buttonConfirm.style.display = "flex"
        buttonNext.style.display = "none";
    })

    buttonConfirm.addEventListener("click", () => {
        SwitchPage({fromPage: avaliationSection, toPage: resultSection})
        initResult({ivs: getIvs(), natureSelected: natureSelected});
    })
}