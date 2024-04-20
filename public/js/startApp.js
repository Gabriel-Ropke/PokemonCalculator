import { SwitchPage } from "./generalFunctions.js";
import { initInformations } from "./informations.js";
import { typeColors } from "./minidb.js";
import { allPokemon } from "./pokemonFetch.js";

// ----------------

const main = document.querySelector("main");

let selectedCharacterIndex = 0;
let NumberOfPokemon = 150;
const pokemonSelectList = main.querySelector("section#pokemonSection ul#pokemonList");
let scrollLocked = false;
let selectedPokemon = 1

// ----------------

function getPokemonAttributes(pokemon) {
    const src = pokemon.sprites.versions['generation-v']['black-white'].front_default;
    const id = pokemon.id;
    const type = pokemon.types[0].type.name;
    return { src, id, type };
}

function createPokemonListElement({ src, id, type }) {
    const liPokemon = document.createElement('li');
    const imgPokemon = document.createElement('img');
    liPokemon.dataset.id = id;
    liPokemon.style.background = `rgba(${typeColors[type]}, 0.7)`;
    liPokemon.appendChild(imgPokemon);
    imgPokemon.src = src;
    pokemonSelectList.appendChild(liPokemon);
    liPokemon.addEventListener('click', () => {
        handlePokemonClick(id)
        const liWithSelected = pokemonSelectList.querySelector("li.selected")
        if(liWithSelected) {
            liWithSelected.classList.remove("selected")
        }
        selectedCharacterIndex = id - 1
        liPokemon.classList.add("selected")
    });
}
function createPokemonList() {
    const allPokemonArray = Object.values(allPokemon);

    for (const pokemon of allPokemonArray) {
        const { src, id, type } = getPokemonAttributes(pokemon);
        createPokemonListElement({ src, id, type });
    }

    selectCharacter(0);
}

function handlePokemonClick(id) {
    selectPokemon(id);
}

function scrollIntoView() {
    const selectedCharacterCard = pokemonSelectList.children[selectedCharacterIndex];
    const selectedCharacterRect = selectedCharacterCard.getBoundingClientRect();

    const newScrollY = window.scrollY + selectedCharacterRect.top - (window.innerHeight / 2) + (selectedCharacterRect.height / 2);

    window.scrollTo({
        top: newScrollY,
        behavior: 'smooth',
    });
}

function addEventListeners() {
    document.addEventListener('keydown', (event) => changeSelectedPokemon(event));
}

function getNumColumns() {
    const gridStyles = getComputedStyle(pokemonSelectList);
    const gridColumnValue = gridStyles.getPropertyValue('grid-template-columns');

    // Calcula o número de colunas baseado na propriedade grid-template-columns
    const numColumns = gridColumnValue.split(' ').length;

    return numColumns;
}

function changeSelectedPokemon(event) {
    if (scrollLocked && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        return;   
    }
    if (selectPokemonKeyFunctions[event.key]) {
        event.preventDefault();
        selectPokemonKeyFunctions[event.key]();
    }
}

function selectCharacter(index) {
    removeSelectedClass();
    selectedCharacterIndex = index;
    addSelectedClass();
    scrollIntoView();
    console.log(`O Index é: ${index}`)
    console.log(selectedCharacterIndex)
  }
function addSelectedClass() {
    const selectedCharacterCard = pokemonSelectList.children[selectedCharacterIndex];
    selectedCharacterCard.classList.add('selected');
}
function removeSelectedClass() {
    const selectedCharacterCard = pokemonSelectList.querySelector('.selected');
    if (selectedCharacterCard) {
        selectedCharacterCard.classList.remove('selected');
    }
}

const selectPokemonKeyFunctions = {
    ArrowRight: () => selectCharacter(getNextIndex('right')),
    ArrowLeft: () => selectCharacter(getNextIndex('left')),
    ArrowDown: () => selectCharacter(getNextIndex('down')),
    ArrowUp: () => selectCharacter(getNextIndex('up')),
    a: () => selectCharacter(getNextIndex('left')),
    w: () => selectCharacter(getNextIndex('up')),
    s: () => selectCharacter(getNextIndex('down')),
    d: () => selectCharacter(getNextIndex('right')),
    Enter: () => handleEnterKey(),
    Backspace: () => handleBackspaceKey(),
    Delete: () => handleBackspaceKey(),
  };
  // Sobrescreve cada função com uma função vazia
function cleanKeyFunctions() {
    Object.keys(selectPokemonKeyFunctions).forEach(key => {
     selectPokemonKeyFunctions[key] = () => {};
    });
}
  
function selectPokemon(id) {
    selectedPokemon = id;
    if(!scrollLocked) {
        LockUnlockScroll()
      } else {
        LockUnlockScroll()
        SwitchPagePokemonSelectToCalculator();
        initInformations();
      }
      localStorage.setItem("pokemonDex", id)
}
function LockUnlockScroll() {
    console.log("funcionando")
    if (scrollLocked) {
        window.removeEventListener('wheel', scrolllock);
        removeSelectedPokemon();
        console.log("removeu")
    } else {
        window.addEventListener('wheel', scrolllock, { passive: false });
        createSelectedPokemon();
        console.log("criou")
    }
    scrollLocked = !scrollLocked;
}

function scrolllock(e) {
    e.preventDefault();
}

function createSelectedPokemon() {
    const id = selectedPokemon;
    const pokemon = allPokemon[id]
    let animated = pokemon["sprites"]["versions"]['generation-v']['black-white']['animated'].front_default;
    let name = pokemon["name"];
    const spanSelect = document.querySelector("span#spanSelect")
    const selectedPokemonName = document.querySelector("h2#selectedPokemonName")
    const selectedPokemonContainer = document.querySelector("div#selectedPokemon");
    const selectedPokemonImage = document.querySelector("img#pokemon");
    selectedPokemonContainer.classList.add("active");
    spanSelect.style.display = "none";
    selectedPokemonName.innerText = name
    selectedPokemonImage.src = animated;
}

function removeSelectedPokemon() {
    const spanSelect = document.querySelector("span#spanSelect")
    const selectedPokemonContainer = document.querySelector("div#selectedPokemon");
    const selectedPokemonImage = document.querySelector("img#pokemon");
    selectedPokemonContainer.classList.remove("active");
    spanSelect.style= "";
    setTimeout(() => {
      selectedPokemonImage.src = ""
    }, 500);
}

function getNextIndex(direction) {
    const numColumns = getNumColumns();
    const numRows = Math.ceil(NumberOfPokemon / numColumns);

    const currentColumn = selectedCharacterIndex % numColumns;
    const currentRow = Math.floor(selectedCharacterIndex / numColumns);

    let nextIndex;

    switch (direction) {
        case 'right': 
            nextIndex = (currentColumn < numColumns - 1) ? selectedCharacterIndex + 1 : currentRow * numColumns;
            break;
        case 'left':
            nextIndex = (currentColumn > 0) ? selectedCharacterIndex - 1 : currentRow * numColumns + (numColumns - 1);
            break;
        case 'down':
            nextIndex = (currentRow < numRows - 1) ? selectedCharacterIndex + numColumns : currentColumn;
            break;
        case 'up':
            nextIndex = (currentRow > 0) ? selectedCharacterIndex - numColumns : (numRows - 1) * numColumns + currentColumn;
            break;
        default:
            nextIndex = selectedCharacterIndex;
    }
    // Verifica se o próximo índice está dentro dos limites do array de personagens
    if (nextIndex >= 0 && nextIndex <= NumberOfPokemon) {
        selectedCharacterIndex = nextIndex; // Atualiza apenas se o próximo índice for válido
    }
    selectedPokemon = selectedCharacterIndex + 1;
    return selectedCharacterIndex;
} 
function SwitchPagePokemonSelectToCalculator() {
    const main = document.querySelector("main")
    const pokemonSection = main.querySelector("section#pokemonSection")
    const informationSection = main.querySelector("section#informationSection")
    console.log(pokemonSection)
    SwitchPage({ fromPage: pokemonSection, toPage: informationSection});
    cleanKeyFunctions();
}
function handleEnterKey() {
    selectPokemon(selectedPokemon);
}
function handleBackspaceKey() {
if(scrollLocked) {
    LockUnlockScroll();
}
}
export {createPokemonList,addEventListeners}
