function helperAddBtnId(event) {
    const id = event.target.id;
    const parsedId = parseInt(id.slice(7), 10);
    return parsedId;
}

function helperFindItemById(parsedId, tempArray) {
    let tempVar;
    tempArray.forEach(poster => {
        if (poster.id === parsedId) {
            tempVar = poster;
            // poster.quantity++;
        }
    });
    return tempVar;
}

function helperHighlightItemToRemove(event) {
    const fullId = event.target.id;
    const parsedId = parseInt(fullId.slice(9), 10);
    event.target.style.border = "5px solid brown";
    return parsedId;
}

function removeItemFromCart(removeItemId, cart) {
    return cart.filter((item) => item.id !== removeItemId);
}

//npm init
//npm i express dotenv cors nodemon



