const list = document.getElementById("bag-items");
const empty = document.getElementById("clear");
const amount = document.getElementById("amount");
const emptyText = "Your shopping bag is empty. Use Catalog to add new items.";
const purchaseText = "Thank you for your purchase.";
const message = document.getElementById("message");
const checkout = document.getElementById("checkout");
const discountEl = document.getElementById("discount");

function renderProduct(product) {
    return `
                <li class="item">
                <a href="item.html" class="new-item">
                    <img src="${product.thumbnail}" alt="product image">
                    ${product.hasNew ? '<span class="new">NEW</span>' : ''}
                    
                </a>
                <div class="item-information">
                    <span class="item-name">${product.title}</span>
                    <span class="item-price">£${product.discountedPrice.toFixed(2)}</span>
                    <div class="chosen-options">
                        <span class="choose-color">Color:</span>
                        <span class="color">${product.color}</span>
                    </div>
                    <div class="chosen-options">
                        <span class="choose-size">Size:</span>
                        <span class="size">${product.size}</span>
                    </div>
                    <span class="quality">Quantity:<i class="fas fa-minus colorized"></i>${product.count}<i class="fas fa-plus colorized"></i></span>
                    <span class="colorized remove-item">Remove item</span>
                </div>

            </li>
    `

}

function renderProducts(products) {
    list.innerHTML = "";

    for (let i = 0; i < products.length; i++) {
        list.innerHTML += renderProduct(products[i]);
    }

    addListenersToButtons();
}

renderProducts(localStorageData);

empty.addEventListener("click", function () {
    localStorage.setItem("shopping-bag", "[]");
    renderProducts([]);
    renderTotal();
    renderAmount();
    updateMessage(false);
});

checkout.addEventListener("click", function () {
    localStorage.setItem("shopping-bag", "[]");
    renderProducts([]);
    renderTotal();
    renderAmount();
    updateMessage(true);
});

function renderAmount() {
    let discount = 0;
    for (let i = 0; i < localStorageData.length; i++) {
        discount += (localStorageData[i].price - localStorageData[i].discountedPrice) * localStorageData[i].count;
    }
    if (discount > 0) {
       discountEl.innerHTML = "Applied discount: £" + discount.toFixed(2);
    } else {
        discountEl.innerHTML = "";
    }
    amount.innerHTML = totalPrice.toFixed(2);
}

renderAmount();

function updateMessage(checkout) {
    if (totalPrice === 0 && !checkout) {
        message.innerHTML = emptyText;
    } else if (totalPrice === 0 && checkout) {
        message.innerHTML = purchaseText;
    }
}

updateMessage(false);

function addListenersToButtons() {
    const decreaseButtons = document.getElementsByClassName("fa-minus");
    const increaseButtons = document.getElementsByClassName("fa-plus");
    const removeButtons = document.getElementsByClassName("remove-item");
    for(let i = 0; i < decreaseButtons.length; i++) {
        (function(protectedIndex) {
            decreaseButtons[i].addEventListener('click', function () {
                changeCount(protectedIndex, false)
            });
            increaseButtons[i].addEventListener('click', function () {
                changeCount(protectedIndex, true)
            });
            removeButtons[i].addEventListener("click", function () {
                removeItem(protectedIndex);
            })
        })(i)
    }
}

function changeCount(index, increase) {
    if (increase) {
        localStorageData[index].count += 1
    } else {
        localStorageData[index].count -= 1;

        if (localStorageData[index].count === 0) {
            removeItem(index);
        }
    }

    localStorage.setItem("shopping-bag", JSON.stringify(localStorageData));

    renderProducts(localStorageData);
    renderTotal();
    renderAmount();
}

function removeItem(index) {
    localStorageData.splice(index, 1);

    localStorage.setItem("shopping-bag", JSON.stringify(localStorageData));

    renderProducts(localStorageData);
    renderTotal();
    renderAmount();

    if(localStorageData.length === 0) {
        updateMessage(false);
    }
}







