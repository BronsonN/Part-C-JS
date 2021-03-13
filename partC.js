var creamcheeseTotal;
var fruitAndAlmondTotal;
var fruitFillingTotal;
var orderTotal;
var sheetCakeTotal;
var roundCakeTotal;
var roundCakeArea;
var sheetCakeArea;
var sheetCakeTotal;
var layerPriceIncrease;
var basePrice;
var firstname;
var lastname;
var phoneNumber;
var postalCode;
var customerAddress;
var email;



function getElementValue(id) {
    var elementExists = document.getElementById(id);
    var stringValue = "";

    if (elementExists && elementExists.value !== undefined) {

        stringValue = elementExists.value;

    }
    return stringValue;
}


function getQuantity(id) {

    var elementExists = document.getElementById(id);
    var totalAmountOfProduct = 0;

    if (elementExists && elementExists.value !== undefined) {

        var stringTotalAmountOfProduct = elementExists.value;

        if (stringTotalAmountOfProduct != "") {
            totalAmountOfProduct = parseFloat(stringTotalAmountOfProduct);
        }

    }
    return totalAmountOfProduct;

}

function canadianCurrencyFormat(amount) {

    var canadianCurrency = {
        style: "currency",
        currency: "CAD"
    }
    return amount.toLocaleString("en-CA", canadianCurrency);
}

function customerInformation() {

    firstname = getElementValue("firstname");

    lastname = getElementValue("lastname");
    phoneNumber = getElementValue("phonenumber");
    postalCode = getElementValue("postalCode");
    customerAddress = getElementValue("customerAddress");
    email = getElementValue("email");

}

function RetrieveCheckBoxValues() {


    var v;
    var radioButtonGrouping = document.getElementsByName("cakeLayers");
    if (radioButtonGrouping && radioButtonGrouping.length > 0) {

        for (let idx = 0; idx < radioButtonGrouping.length; idx++) {
            if (radioButtonGrouping[idx]
                && radioButtonGrouping[idx].value !== undefined
                && radioButtonGrouping[idx].checked !== undefined) {
                if (radioButtonGrouping[idx].checked) {
                    v = radioButtonGrouping[idx].value;
                    break;
                }
            }
        }
    }
    else {
        console.log("Could not find radio button group named '" + groupName + "'");
    }


    var value = [];
    var checkboxGrouping = document.getElementsByName("additionChoices");
    if (checkboxGrouping && checkboxGrouping.length > 0) {

        for (let idx = 0; idx < checkboxGrouping.length; idx++) {
            if (checkboxGrouping[idx]
                && checkboxGrouping[idx].value !== undefined
                && checkboxGrouping[idx].checked !== undefined) {
                if (checkboxGrouping[idx].checked) {
                    value.push(checkboxGrouping[idx].value);
                }
            }
        }
    }
    else {
        console.log("Could not find checkbox group named '" + groupName + "'");
    }
    var sheetLength = getQuantity("CakeLength");
    var sheetWidth = getQuantity("CakeWidth");
    var radius = getQuantity("radius");


    var orderItemsFragmentHTML = "";



    if (showOrHideCakeOption() == "sheetCake") {
        if (v == 1) {
            layerPriceIncrease = 9;
        } else if (v == 2) {
            layerPriceIncrease = 18;
        } else if (v == 3) {
            layerPriceIncrease = 36;
        }

        basePrice = 18 + layerPriceIncrease;
        sheetCakeArea = sheetLength * sheetWidth - 900;
        sheetCakeTotal = sheetCakeArea * 0.02 + basePrice;
        orderTotal = sheetCakeTotal;
        orderItemsFragmentHTML += "Your Sheet cake of " + sheetLength + "cm x " + +sheetWidth + "cm " + "<u>" + "<b>" + canadianCurrencyFormat(sheetCakeTotal) + "</b>" + "</u>" + "</li>"
            + "<br>"
    } else if (showOrHideCakeOption() == "roundCake") {

        if (v == 1) {
            layerPriceIncrease = 0;
        } else if (v == 2) {
            layerPriceIncrease = 7.5;
        } else if (v == 3) {
            layerPriceIncrease = 15;
        }

        basePrice = 15 + layerPriceIncrease;
        roundCakeArea = (radius * radius * 3.14 - 707) * 0.02;
        roundCakeTotal = roundCakeArea + basePrice;
        orderTotal = roundCakeTotal;
        orderItemsFragmentHTML += " Radius: $ " + "<u>" + "<b>" + canadianCurrencyFormat(roundCakeTotal) + "</b>" + "</u>" + "</li>"
            + "<br>"
    }


    for (var i = 0; i < value.length; i++) {
        if (value[i].includes("creamCheese")) {
            creamcheeseTotal = 5;
            if (showOrHideCakeOption() == "sheetCake") {
                orderTotal = sheetCakeTotal += creamcheeseTotal;
                orderItemsFragmentHTML += " Cream Cheese Icing: " + "<u>" + "<b>" + canadianCurrencyFormat(creamcheeseTotal) + "</b>" + "</u>" + "</li>"
                    + "<br>"
            } else if (showOrHideCakeOption() == "roundCake") {
                creamcheeseTotal = 5;

                orderTotal = roundCakeTotal += creamcheeseTotal;
                orderItemsFragmentHTML += " Cream Cheese Icing: " + "<u>" + "<b>" + canadianCurrencyFormat(creamcheeseTotal) + "</b>" + "</u>" + "</li>"
                    + "<br>"
            }




        }
        if (value[i].includes("fruitAndAlmond")) {
            fruitAndAlmondTotal = 7;
            if (showOrHideCakeOption() == "sheetCake") {
                orderTotal = sheetCakeTotal += fruitAndAlmondTotal;
                orderItemsFragmentHTML += " Fruit and Almond topping: " + "<u>" + "<b>" + canadianCurrencyFormat(fruitAndAlmondTotal) + "</b>" + "</u>" + "</li>"
                    + "<br>"
            } else if (showOrHideCakeOption() == "roundCake") {


                orderTotal = roundCakeTotal += fruitAndAlmondTotal;
                orderItemsFragmentHTML += " Fruit and Almond topping: " + "<u>" + "<b>" + canadianCurrencyFormat(fruitAndAlmondTotal) + "</b>" + "</u>" + "</li>"
                    + "<br>"
            }



        }
        if (value[i].includes("fruitFilling")) {
            fruitFillingTotal = 4;
            if (showOrHideCakeOption() == "sheetCake") {
                orderTotal = sheetCakeTotal += fruitFillingTotal;
                orderItemsFragmentHTML += " Fruit Filling for layers: " + "<u>" + "<b>" + canadianCurrencyFormat(fruitFillingTotal) + "</b>" + "</u>" + "</li>"
                    + "<br>"
            } else if (showOrHideCakeOption() == "roundCake") {


                orderTotal = roundCakeTotal += fruitFillingTotal;
                orderItemsFragmentHTML += " Fruit Filling for layers: " + "<u>" + "<b>" + canadianCurrencyFormat(fruitFillingTotal) + "</b>" + "</u>" + "</li>"
                    + "<br>"
            }



        }
    }

    var fragmentHTML = "<h2><u>Your Order:</u></h2>"
        + "<div>" + firstname + " " + lastname + "</div>"
        + "<div>" + phoneNumber + "</div>"
        + "<div>" + customerAddress + "</div>"
        + "<div>" + postalCode + "</div>"
        + "<div>" + email + "</div>"
        + "<br>"
        + "<ol>"
        + orderItemsFragmentHTML +
        "</ol>" +
        "<br>" +
        "<div>Total Cost: " + "<u>" + "<b>" + canadianCurrencyFormat(orderTotal) + "</b>" + "</br>" + "</div>";


    var customerOrderElement = document.getElementById("customerOrder")
    if (customerOrderElement) {
        customerOrderElement.innerHTML = fragmentHTML;
    }

}



function showOrHideCakeOption() {


    var caketype = document.getElementsByName("caketype");
    var selectedCakeOption;

    for (var i = 0; i < caketype.length; i++) {
        if (caketype[i].checked)
            selectedCakeOption = caketype[i].value;
    }

    if (selectedCakeOption == "sheetCake") {

        document.getElementById("sheet").style.display = 'block';

    } else document.getElementById("sheet").style.display = 'none';

    if (selectedCakeOption == "roundCake") {

        document.getElementById("round").style.display = 'block';

    } else document.getElementById("round").style.display = 'none';

    return selectedCakeOption;



















}

