export function SwitchPage({fromPage, toPage}) {
  const transitionScreen = document.querySelector("div#transitionScreen")
  transitionScreen.classList.add("transition")
  transitionScreen.style.bottom = "0px"
  transitionScreen.style.right = "0px"
  setTimeout(() => {
    transitionScreen.style = ""
    transitionScreen.style.left = "-50px"
    transitionScreen.style.top = "-50px"
    transitionScreen.style.borderRadius = "0% 0% 25% 0%"
  }, 700);
  setTimeout(() => {
    fromPage.classList.add("hidden")
    toPage.classList.remove("hidden")
  }, 500);
  setTimeout(() => {
    transitionScreen.classList.remove("transition")
    transitionScreen.style = ""
  }, 2000);
}
export function switchData({from, to}) {
  from.classList.add("hide")
  to.classList.remove("hide")
}