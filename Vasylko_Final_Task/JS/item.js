const mainPhotos = document.querySelectorAll(".main-photo");
const choosePhoto = document.querySelectorAll(".chose-photo .wrapper");
const sizes = document.querySelectorAll(".size");
const color = document.querySelectorAll(".color");
const addToBag = document.getElementById("add-item");

const item = {
    count: 1,
    id: '',
    dateAdded: '2017-01-01T13:26:14.000Z',
    title: 'Dark classic fit suit',
    description: 'Featuring fine Italian wool, this elegant suit has pick-stitch edging, cascade buttons at the cuffs',
    discountedPrice: 180.6,
    price: 180.6,
    hasNew: false,
    category: 'men',
    fashion: 'Classical style',
    color: null,
    size: null,
    thumbnail: 'img/item_big_1.png',
};

for (let i = 0; i < sizes.length; i++) {
    sizes[i].addEventListener("click", function (event) {
        item.size = event.target.getAttribute("data-size");
        for (let j = 0; j < sizes.length; j++) {
            sizes[j].classList.remove("choose--active")
        }
        event.target.classList.add("choose--active");
    })

}

for (let i = 0; i < color.length; i++) {
    color[i].addEventListener("click", function (event) {
        item.color = event.target.getAttribute("data-color");
        for (let j = 0; j < color.length; j++) {
            color[j].classList.remove("choose--active")
        }
        event.target.classList.add("choose--active");
    })
}

addToBag.addEventListener("click", function () {
    if (item.size && item.color) {
        const matchedItem = localStorageData.find(function (product) {
            return product.color === item.color && product.size === item.size && product.title === item.title
        });

        if (matchedItem) {
            matchedItem.count += 1;
        } else {
            localStorageData.push({...item});
        }
        localStorage.setItem("shopping-bag", JSON.stringify(localStorageData));
        window.location.href = 'shopping-bag.html';
    }
});

for (let i = 0; i < choosePhoto.length; i++) {
    choosePhoto[i].addEventListener("click", function () {

        for (let j = 0; j < mainPhotos.length; j++) {
            mainPhotos[j].classList.remove("active-photo");
        }
        mainPhotos[i].classList.add("active-photo");

        for (let j = 0; j < choosePhoto.length; j++) {
            choosePhoto[j].classList.remove("wrapper--active");
        }
        choosePhoto[i].classList.add("wrapper--active");
    })
}

