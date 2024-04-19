const typeOfProduct = document.querySelectorAll("div#typeOfProduct div.selectTwo span")

for (let i = 0; i < typeOfProduct.length; i++) {
    let option = typeOfProduct[i];
    function selectedProductType() {
        option.classList.toggle("selected")
        console.log("batata")
        typeOfProduct[0].removeEventListener("click", selectedProductType)
        typeOfProduct[1].removeEventListener("click", selectedProductType)
        for (let ii = 0; ii < typeOfProduct.length; ii++) {
            console.log(ii)
            const removeOption = typeOfProduct[ii];
            console.log(removeOption)
            removeOption.removeEventListener("click", selectedProductType)
        }
    }
    typeOfProduct[i].addEventListener("click", selectedProductType)
    
}
