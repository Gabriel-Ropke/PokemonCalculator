import { SwitchPage } from "./generalFunctions.js";
import { Natures, statColor } from "./minidb.js";
import { allPokemon } from "./pokemonFetch.js";
import { initResult } from "./result.js";

export function initInformations() {
    const informationSection = document.querySelector("section#informationSection")
    const resultSection = document.querySelector("section#resultSection")
    const buttonCheck = document.querySelector("button#buttonCheck");
    const naturesContainer = document.querySelector("div#naturesContainer")
    const naturesList = naturesContainer.querySelector("ul")
    let natureSelected = "";
    for (let i = 0; i < Object.keys(Natures).length; i++) {
        const name = Object.keys(Natures)[i]
        const statModified = Natures[name]
        const liNature = document.createElement("li");
        liNature.innerText = name;
        liNature.dataset.value = name;
        liNature.style.background = statColor[statModified.increase]
        naturesList.appendChild(liNature)
        liNature.addEventListener("click", () => {
            const alreadyHaveSelected = naturesList.querySelector("li.selected")
            const allLi = naturesList.querySelectorAll("li");
            if(alreadyHaveSelected) {
                for (let i = 0; i < allLi.length; i++) {
                    const li = allLi[i];
                    li.classList.remove("selected")
                    li.classList.remove("no-selected");
                }
                natureSelected = "";
                buttonCheck.disabled = true
            } else {
                for (let i = 0; i < allLi.length; i++) {
                    const li = allLi[i];
                    li.classList.add("no-selected");
                }
                buttonCheck.disabled = false
                natureSelected = liNature.dataset.value;
                liNature.classList.remove("no-selected")
                liNature.classList.add("selected");
            }
        })   
    }
    const allIvInputs = document.querySelectorAll("div#ivsContainer div#inputsContainer input[type='range']")
    for (let i = 0; i < allIvInputs.length; i++) {
        const input = allIvInputs[i]
        input.oninput = () => {
            input.dataset.value = input.value;
        }
    }
    buttonCheck.addEventListener("click", () => {
        const selectedPokemonID = localStorage.getItem("pokemonDex")
        const selectedPokemon = allPokemon[selectedPokemonID]
        const ivs = {
            ivHp: allIvInputs[0].value,
            ivSpAtk: allIvInputs[3].value,
            ivAtk: allIvInputs[1].value,
            ivDef: allIvInputs[2].value,
            ivSpDef: allIvInputs[4].value,
            ivSpeed: allIvInputs[5].value,
        }
        const name = selectedPokemon.name;
        console.log(selectedPokemon)
        console.log(`O Pokémon é: ${name}`)
        console.log(`A Nature é ${natureSelected}`)
        console.log(`Os IV são hp: ${ivs.ivHp}, atk: ${ivs.ivAtk}, def: ${ivs.ivDef}, sp.atk: ${ivs.ivSpAtk}, sp.def: ${ivs.ivSpDef}, speed: ${ivs.ivSpeed}`)
        SwitchPage({fromPage: informationSection, toPage: resultSection})
        initResult({ natureSelected, ivs });
    })
}