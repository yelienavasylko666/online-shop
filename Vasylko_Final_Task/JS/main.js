let localStorageData = [];
if (!localStorage.getItem("shopping-bag")) {
    localStorage.setItem("shopping-bag", "[]");
} else {
    localStorageData = JSON.parse(localStorage.getItem("shopping-bag"));
}

const menu = document.getElementById("menu");
const closeMenu = document.getElementById("close-menu");
const navigation = document.getElementById("navigation");
const body = document.getElementsByTagName("body")[0];
const totalPriceEl = document.getElementById("total-price");
const totalCountEl = document.getElementById("total-count");

let totalPrice;
let totalCount;

function renderTotal() {
    totalCount = 0;
    totalPrice = 0;
    localStorageData = JSON.parse(localStorage.getItem("shopping-bag"));

    for (let i = 0; i < localStorageData.length; i++) {
        totalPrice += localStorageData[i].discountedPrice * localStorageData[i].count;
        totalCount += localStorageData[i].count
    }

    totalPriceEl.innerHTML = totalPrice.toFixed(2);
    totalCountEl.innerHTML = totalCount;
}
renderTotal();

menu.addEventListener("click", function () {
    navigation.classList.add("nav-wrapper--open");
    menu.style.display = "none";
    closeMenu.style.display = "block";
    body.style.overflow = "hidden";

});

closeMenu.addEventListener("click", function () {
    navigation.classList.remove("nav-wrapper--open");
    menu.style.display = "block";
    closeMenu.style.display = "none";
    body.style.overflow = "auto";
});

