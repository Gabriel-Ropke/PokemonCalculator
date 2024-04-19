export function SwitchPage({fromPage, toPage}) {
    const main = document.querySelector("main")
    const transitionScreen = main.querySelector("div#transitionScreen")
    transitionScreen.classList.add("transition")
    setTimeout(() => {
      fromPage.classList.add("hidden")
      toPage.classList.remove("hidden")
    }, 1000);
    setTimeout(() => {
      transitionScreen.classList.remove("transition")
    }, 2000);
  }