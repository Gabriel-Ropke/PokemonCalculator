const header = document.querySelector("header")
console.log(header)
window.addEventListener("scroll", () => {
    window.scrollY > 100 ? header.classList.add("inactive") : header.classList.remove("inactive");
})