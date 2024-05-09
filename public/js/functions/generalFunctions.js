// Close Pokémon Select List
export function closeSelectList(element) {
  element.classList.remove("open");
  LockUnlockScroll(false);
}

// Open Pokémon Select List
export function openSelectList(element) {
  element.classList.add("open");
  LockUnlockScroll(true);
}

// Change Lock and unlock with body overflow styles
export function LockUnlockScroll(isLocked) {
  isLocked
    ? (document.body.style.overflowY = "hidden")
    : (document.body.style.overflowY = "visible");
}
// Fix only one decimal number
export function fixedOne(number) {
  let formattedNumber = number.toFixed(1);
  let againNumber = parseFloat(formattedNumber);
  return againNumber;
}
// Get Id from Url
export function getIdFromUrl(url) {
  const parts = url.split("/");
  return parseInt(parts[parts.length - 2]);
}

export function checkIfIsBiggerThan151(id) {
  if (id < 152) {
    return id;
  }
  return;
}
