import { initInformations } from './informations.js';
import { addEventListeners, createPokemonList } from './startApp.js';

// Função para iniciar o aplicativo
function startApp() {
  createPokemonList();
  addEventListeners();
  console.log("Deu Start")
}
startApp(); 

