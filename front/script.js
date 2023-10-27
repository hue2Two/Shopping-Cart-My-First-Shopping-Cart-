// poster objs
const poster_1 = {
    id: 1,
    price: 25,
    quantity: 0,
};

const poster_2 = {
    id: 2,
    price: 30,
    quantity: 0,
};

const poster_3 = {
    id: 3,
    price: 50,
    quantity: 0,
};

const poster_4 = {
    id: 4,
    price: 5,
    quantity: 0,
};

const poster_5 = {
    id: 5,
    price: 70,
    quantity: 0,
};

const poster_6 = {
    id: 6,
    price: 60,
    quantity: 0,
};

//temp array to find obj id when comparing
const tempArray = [
    poster_1, 
    poster_2, 
    poster_3, 
    poster_4, 
    poster_5, 
    poster_6
];

let theCart = []; //empty array to store cart objs

let removeItemIdHelper;
let addBtnId; //to store addBtnId in addToCart
let exists = false;
let toalPrice = 0;

let checkoutBtn = document.getElementById("btnCheckout");
let visualTotal = document.getElementById("totalVisual");
let toalBtn = document.getElementById("btnTotal");
let cartShow = document.getElementById("showCart"); //p tag in c p2
let removeBtn = document.getElementById("btnRemove"); //rmBtn in c p2
let addBtn = document.querySelectorAll('.btnAdd'); //addBtns in c p3

//link to port in backend via fetch
checkoutBtn.addEventListener('click', async () => {
    const response = await fetch('http://127.0.0.1:8080/api/create-checkout-session', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            product: poster_1,
        })
    });

    const session = response.json();
    if (session) {
        window.location.href = session.url;
    }
})

function updateCartHtml() {
    let cartHtml = "";
    theCart.forEach(item => {
        cartHtml += `<div id="cartItem-${item.id}" style="border: 5px solid blue; margin: 5px;">${JSON.stringify(item)}</div>`;
    });
    cartShow.innerHTML = cartHtml;
}

toalBtn.addEventListener('click', function() {
    total();
    visualTotal.textContent = `$ ${toalPrice}`;
})

//itemOnClick >> highlights item to remove
cartShow.addEventListener('click', removeP1);

//rmBtnOnClick >> removes item from cart
removeBtn.addEventListener('click', removeItem);

//onClick >> add items to cart
addBtn.forEach((button) => {
    button.addEventListener('click', function(eContinuep0) {
        addToCart(eContinuep0);
        addToCartPart2();
        updateCartHtml();
    });
});

//addBtnOnClick >> parses for id of add button
function addToCart(eContinue) {
    console.log("add was clicked");
    addBtnId = helperAddBtnId(eContinue);  // HOW IS IT GETTING IT?
    console.log("addBtnId: " + addBtnId);
}

//compares id of clicked w/id of objs in temp array & pushes that obj
function addToCartPart2() {
    console.log("the cart in part 2: ");
    let foundItem = helperFindItemById(addBtnId, tempArray);

    if (foundItem.quantity == 0) {
        theCart.push(foundItem);
        foundItem.quantity++;
    } else {
        foundItem.quantity++;
    }
    console.log("the cart in part 2: " + JSON.stringify(theCart));
}

//returns the parsed id of clicked item to be remvoed & color change
function removeP1() {
    console.log("highlighting item to be removed");
    removeItemIdHelper = helperHighlightItemToRemove(event);
}

//onClickRmBtn >> removes item hl w/that id
function removeItem() {
    console.log("item removed");

    theCart.forEach((item) => {
        if (item.quantity === 1 && item.id === removeItemIdHelper) {
            theCart = removeItemFromCart(removeItemIdHelper, theCart);
        } else {
            if (item.id === removeItemIdHelper) {
                item.quantity--;
            }    
        }
    })
    console.log("CART BEFORE TOTAL: " + JSON.stringify(theCart));
    updateCartHtml();
}

function total() {
    theCart.forEach((item) => {
        toalPrice += item.quantity * item.price;
    });

    console.log("total price: " + toalPrice);
}




