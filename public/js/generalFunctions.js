// Close Pokémon Select List
export function closeSelectList(element) {
  element.classList.remove("open")
  LockUnlockScroll(false)
}

// Open Pokémon Select List
export function openSelectList(element) {
  element.classList.add("open")
  LockUnlockScroll(true)
};

// Change Lock and unlock with body overflow styles
export function LockUnlockScroll(isLocked) {
  isLocked ? 
  document.body.style.overflowY = "hidden" :
  document.body.style.overflowY = "visible";
}