export function SwitchPage({fromPage, toPage}) {
  const transitionScreen = document.querySelector("div#transitionScreen")
  transitionScreen.classList.add("transition")
  setTimeout(() => {
    fromPage.classList.add("hidden")
    toPage.classList.remove("hidden")
  }, 500);
  setTimeout(() => {
    transitionScreen.classList.remove("transition")
  }, 2000);
}