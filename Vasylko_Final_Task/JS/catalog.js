const productsUl = document.getElementById("products");
const filter = document.getElementById("filter");
const closeFilter = document.getElementById("close");
const filterOptions = document.getElementById("filter-options");
const filterWrapper = document.getElementById("filter-wrapper");
const showMore = document.getElementById("show-more");
const products = window.catalog;
const additionalProducts = window.nextCatalog;
const filterItem = document.querySelectorAll(".filter__item");
const filterOption = document.querySelectorAll(".filter__options li");


function renderProduct(product) {
    const htmlEl = `
        <li class="item">
            <a href="item.html">
                <div class="products-image-wrapper">
                    <img src="${product.thumbnail}" alt="product image">
                    ${product.hasNew ? '<span class="new">NEW</span>' : ''}
                </div>
                <span class="item-name">${product.title}</span>
                <span class="item-price">${"£"+ product.discountedPrice.toFixed(2)}</span>
            </a>
        </li>
    `

    return htmlEl;
}

function renderList(list) {
    productsUl.innerHTML = "";

    for (let i = 0; i < list.length; i++) {
        productsUl.innerHTML += renderProduct(list[i]);
    }
}

renderList(products);

filter.addEventListener("click", function () {
    filterOptions.classList.add("filter__items--open");
    closeFilter.style.display = "block";
    filterWrapper.classList.add("filter-wrapper--show-bg");
});

closeFilter.addEventListener("click", function (event) {
    event.stopImmediatePropagation();
    filterOptions.classList.remove("filter__items--open");
    closeFilter.style.display = "none";
    filterWrapper.classList.remove("filter-wrapper--show-bg");
});

showMore.addEventListener("click", function () {
    const newProducts = products.concat(additionalProducts);
    showMore.style.display = "none";
    renderList(newProducts);
});

for (let i = 0; i < filterOption.length; i++) {
    filterOption[i].addEventListener("click", function (event) {
        for (let j = 0; j < filterOption.length; j++) {
            filterOption[j].classList.remove('chosen--option')
        }
        event.target.classList.add('chosen--option');

        const parent = event.target.parentElement.parentElement;
        const filterId = parent.getAttribute('data-filterId');
        const tabletFilterNameEl =  document.querySelector(`[data-filterTarget=${filterId}]`)

        if (event.target.className.indexOf('no-choose') > -1 ) {
            parent.querySelector('span').innerHTML = '';
            parent.classList.remove('filter__item--active');
            tabletFilterNameEl.innerHTML = filterId.split('-').join(' ');
            tabletFilterNameEl.classList.remove('colorized');
        } else {
            parent.querySelector('span').innerHTML = event.target.innerHTML;
            parent.classList.add('filter__item--active');
            tabletFilterNameEl.innerHTML = event.target.innerHTML;
            tabletFilterNameEl.classList.add('colorized');

            // filterProducts(event.target.getAttribute('data-property'), event.target.getAttribute('data-value'))

            if (event.target.id === "casual-style") {
                filterProducts('fashion', 'Casual style');
            } else {
                renderList(products);
            }
        }
    })
};

function filterProducts(property, value) {
    const newProducts = products.filter(function (item) {
        return item[property] === value

    });
    showMore.style.display = "none";
    renderList(newProducts);
}











