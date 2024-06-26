import { allPokemon } from "./pokemonFetch.js"
import { Natures } from "./minidb.js"
export function initResult({ natureSelected, ivs }) {

    // -------- QuerySelector
    const resultSection = document.querySelector("section#resultSection")
    const pokemonImage = resultSection.querySelector("div#top div#pokemonImageContainer img")
    const pokemonStatusContainer = resultSection.querySelector("div#pokemonStatusContainer");
    const innerBar = pokemonStatusContainer.querySelectorAll("div.inner-bar")
    const allStatValues = pokemonStatusContainer.querySelectorAll("span.stat-value")

    // -------- Fetch Datas
    
    const pokemonID = localStorage.getItem("pokemonDex")
    const selectedPokemon = allPokemon[pokemonID]
    const animated = selectedPokemon["sprites"]["versions"]['generation-v']['black-white']['animated'].front_default
    const name = selectedPokemon["name"];
    const hp = selectedPokemon["stats"][0].base_stat;
    const atk = selectedPokemon["stats"][1].base_stat;
    const def = selectedPokemon["stats"][2].base_stat;
    const spatk = selectedPokemon["stats"][3].base_stat;
    const spdef = selectedPokemon["stats"][4].base_stat;
    const speed = selectedPokemon["stats"][5].base_stat;
    
    // -------- Put Datas

    const selectedPokemonObj = {}
    const nature = Natures[natureSelected]
    console.log(nature)

    const BST = parseInt(hp) + parseInt(atk) + parseInt(def) + parseInt(spatk) + parseInt(spdef) + parseInt(speed)
    const status = {
        hp: hp,
        atk: atk,
        def: def,
        spatk: spatk,
        spdef: spdef,
        speed: speed,
    }
    console.log(`O BST é: ${BST}`)

    // Get ordenered Base Stats in decresciment order
    function getRankedStats(status) {
        const rankedStats = {};
    
        // Ordena as chaves com base nos valores numéricos
        const sortedKeys = Object.keys(status).sort((a, b) => status[b] - status[a]);
    
        // Verifica o índice de 'speed' após a ordenação
        const speedIndex = sortedKeys.indexOf('speed');
    
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

    const stats = getRankedStats(status);
    // Get Nature Result
    function getNatureResult(nature) {
        const NatureCategoryArray = {0: "Neutra", 2.5: "Ruim", 5: "Mediana", 7.5: "Ótima",10: "Perfeita"}

        const natureIncrease = nature.increase;
        const natureDecrease = nature.decrease;

        var statIncreasedIndex, statDecreasedIndex;
        console.log(stats)
        stats[natureIncrease].index <= 4 ? statIncreasedIndex = stats[natureIncrease].index : statIncreasedIndex = 4
        stats[natureDecrease].index <= 4 ? statDecreasedIndex = stats[natureDecrease].index : statDecreasedIndex = 4

        // Get note for Increase Stat
        const increased = (10 - statIncreasedIndex * 2.5) 
        const decreased = (- 10 + statDecreasedIndex * 2.5)
        const note = increased - decreased;
        const resultMessage = NatureCategoryArray[note]

        console.log(`Nota final é: ${note}`)
        console.log("A Nature é ", resultMessage)
        return {note: note, message: resultMessage}
    }
    
    // Fix only one decimal number
    function fixedOne(number) {
        var formattedNumber = number.toFixed(1);
        var againNumber = parseFloat(formattedNumber);
        return againNumber;
    } 

    // Get IV Nature
    function getIvNote() {
        let sum = 0;
        const a = [];
        for (let i = 0; i < 6; i++) {
            const statusIndex = stats[Object.keys(stats)[i]].index
            const invertIndex = (statusIndex - 6) * -1
            const ivValue = parseInt(ivs[Object.keys(ivs)[i]])
            const calc = invertIndex * ivValue
            console.log(calc)
            a.push(calc)
            sum += calc
        }
        console.log(a)
        return fixedOne(sum / 651 * 10);
    }

    // ------ HTML Renderize Page with Actual Information and Formulas

    for (let i = 0; i < innerBar.length; i++) {
        const statID = Object.keys(status)[i]
        innerBar[i].style.width = `${status[statID] / 2.5}%`;
        allStatValues[i].innerText = status[statID]
    }
    selectedPokemonObj.animated = animated;
    selectedPokemonObj.name = name
    selectedPokemonObj.status = [
        hp,
        atk,
        def,
        spatk,
        spdef,
        speed,
    ]

    pokemonImage.src = animated;

    // Iv HTML Actualize
    const pokemonIvAvaliationList = document.querySelector("div#pokemonIvAvaliation ul")
    for (let i = 0; i < Object.keys(ivs).length; i++) {
        const ivValue = ivs[Object.keys(ivs)[i]]
        const spanValue = pokemonIvAvaliationList.children[i].querySelector("span.iv-value");
        spanValue.innerText = `${ivValue}/31`
    }

    // Nature HTML Actualize
    const natureTitle = document.querySelector("div#pokemonNatureAvaliation h4.nature")
    natureTitle.innerText = natureSelected
    const natureIncreaseSpan = document.querySelector("div#pokemonNatureAvaliation span.increase")
    natureIncreaseSpan.innerText = `+ ${nature.increase}`
    const natureDecreaseSpan = document.querySelector("div#pokemonNatureAvaliation span.decrease")
    natureDecreaseSpan.innerText = `- ${nature.decrease}`

    // Page Title Actualize
    const resultSectionTitle = document.querySelector("section#resultSection h1");
    resultSectionTitle.innerText = `Avaliação do seu ${name}`

    // ------ Final Note Actualize

    // Result Variables
    const imageNotes = 
        {
            D: "D-rank.png",
            C: "C-rank.png",
            B: "B-rank.png",
            A: "A-rank.png",
            S: "S-rank.png",
            SS: "SS-rank.png",
        }
    var noteLetter = "";
    var pokemonNote = fixedOne(BST / 525 * 10);
    if(BST / 525 * 10 > 10) {
        pokemonNote = 10
    }
    const natureNote = getNatureResult(nature).note;
    const ivNote = getIvNote();
    const noteNumber = fixedOne((natureNote + ivNote + pokemonNote) / 3);
    
    // Result Note Container Actualize
    const resultNoteContainer = document.querySelector("div#resultNote");
    setTimeout(() => {
        resultNoteContainer.style.height = "400px";
        resultNoteContainer.style.padding = "0 20px 20px 20px";
    }, 1500);
    const resultImg = resultNoteContainer.querySelector("img")
    const resultFinalNote = resultNoteContainer.querySelector("span.final-note")
    const resultCloseButton = resultNoteContainer.querySelector("button.close-btn")
    // Result List Actualize
    const resultListChildren = resultNoteContainer.querySelector("ul#resultList").children;
    resultListChildren[0].querySelector("span.pokemon-note").innerText = `${pokemonNote} / 10`
    resultListChildren[1].querySelector("span.nature-note").innerText = `${natureNote} / 10`
    resultListChildren[2].querySelector("span.iv-note").innerText = `${ivNote} / 10`

    if(noteNumber == 10) {
        noteLetter = "SS"
    } else if (noteNumber >= 8) {
        noteLetter = "S"
    } else if (noteNumber >= 6) {
        noteLetter = "A"
    } else if (noteNumber >= 4) {
        noteLetter = "B"
    } else if(noteNumber >= 2) {
        noteLetter = "C"
    } else if (noteNumber <= 0) {
        noteLetter = "D"
    } 

    resultFinalNote.innerText = `Rank ${noteLetter} Score ${noteNumber}`
    
    resultImg.src = `public/img/${imageNotes[noteLetter]}`;

    resultCloseButton.onclick = () => {
        resultNoteContainer.style.animation = "closeResult 1s"
        setTimeout(() => {
            resultNoteContainer.remove()
        }, 900);
    }


    


}



