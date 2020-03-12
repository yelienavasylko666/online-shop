const addToBag = document.getElementsByClassName("add-button");
const item1 = [
    {
        count: 1,
        id: '',
        dateAdded: '2017-01-01T13:26:14.000Z',
        title: 'Only Skinny Jeans',
        discountedPrice: 70.50,
        price: 70.50,
        hasNew: true,
        category: 'women',
        fashion: 'Casual',
        color: "Black",
        size: "12",
        thumbnail: 'img/only_skinny.png',
    },
    {
        count: 1,
        id: '',
        dateAdded: '2017-01-01T13:26:14.000Z',
        title: 'Coat',
        discountedPrice: 65.50,
        price: 65.50,
        hasNew: true,
        category: 'women',
        fashion: 'Casual',
        color: "Black",
        size: "12",
        thumbnail: 'img/coat.png',
    },
    {
        count: 1,
        id: '',
        dateAdded: '2017-01-01T13:26:14.000Z',
        title: 'Dress',
        discountedPrice: 61.40,
        price: 61.40,
        hasNew: true,
        category: 'women',
        fashion: 'Casual',
        color: "Black",
        size: "12",
        thumbnail: 'img/dress.png',
    }
];
const item2 = [
    {
        count: 1,
        id: '',
        dateAdded: '2017-01-01T13:26:14.000Z',
        title: 'Levi`s Jeans for women',
        discountedPrice: 70.00,
        price: 83.50,
        hasNew: false,
        category: 'women',
        fashion: 'Casual',
        color: "Light Blue",
        size: "32",
        thumbnail: 'img/levis_women_jeans.png',
    },
    {
        count: 1,
        id: '',
        dateAdded: '2017-01-01T13:26:14.000Z',
        title: 'Jacket for women',
        discountedPrice: 80.50,
        price: 95.50,
        hasNew: false,
        category: 'women',
        fashion: 'Casual',
        color: "Light Blue",
        size: "32",
        thumbnail: 'img/jacket.png',
    },
    {
        count: 1,
        id: '',
        dateAdded: '2017-01-01T13:26:14.000Z',
        title: 'Bohemian',
        discountedPrice: 86.50,
        price: 99.99,
        hasNew: false,
        category: 'women',
        fashion: 'Casual',
        color: "Light Blue",
        size: "32",
        thumbnail: 'img/bohemian.png',
    }
];

const firstSliderUp = document.getElementById('first-slider-up');
const firstSliderDown = document.getElementById('first-slider-down');
const secondSliderUp = document.getElementById('second-slider-up');
const secondSliderDown = document.getElementById('second-slider-down');
const sliderItem = document.querySelectorAll('.offer__item a:first-child');
const oldPrice = document.getElementById('old-price');
const newPrice = document.getElementById('new-price');


let sliderPos = [1, 1];

function slider(direction, sliderIndex) {
    if (direction === 'up' && sliderPos[sliderIndex] > 0) {
        sliderPos[sliderIndex]--
    } else if (direction === 'down' && sliderPos[sliderIndex] < 2) {
        sliderPos[sliderIndex]++
    }

    sliderItem[sliderIndex].style.marginTop = -393 * sliderPos[sliderIndex] + 'px';
    oldPrice.innerHTML = '£' + (item1[sliderPos[0]].price + item2[sliderPos[1]].price).toFixed(2);
    newPrice.innerHTML = '£' + (item1[sliderPos[0]].discountedPrice + item2[sliderPos[1]].discountedPrice).toFixed(2);
}

firstSliderUp.addEventListener('click', function () {
    slider('up', 0);
});

firstSliderDown.addEventListener('click', function () {
    slider('down', 0);
});

secondSliderUp.addEventListener('click', function () {
    slider('up', 1);
});

secondSliderDown.addEventListener('click', function () {
    slider('down', 1);
});

for (let i = 0; i < addToBag.length; i++) {
    addToBag[i].addEventListener("click", function () {
        addToBasket(item1[sliderPos[0]]);
        addToBasket(item2[sliderPos[1]]);
        localStorage.setItem("shopping-bag", JSON.stringify(localStorageData));
        window.location.href = 'shopping-bag.html';
    });
}


function addToBasket(item) {
    const matchedItem = localStorageData.find(function (product) {
        return product.color === item.color && product.size === item.size && product.title === item.title
    });

    if (matchedItem) {
        matchedItem.count += 1;
    } else {
        localStorageData.push({...item});
    }
}


