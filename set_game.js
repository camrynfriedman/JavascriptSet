class Card{
    constructor(sym,col,num,shade,imgName){
        this.symbol = sym;
        this.color = col;
        this.numSym = num;
        this.shading = shade;
        this.imageName = imgName;
    }

}

let totalSets = 0;
const savedCards = [];
const cards = [];
const symbols = ["oval", "squiggle", "diamond"];
const colors = ["red", "purple", "green"];
const numSyms = ["1", "2", "3"];
const shades = ["filled", "striped", "open"];

for (let i of symbols){
    for (let j of colors){
        for (let k of numSyms){
            for (let l of shades){
                //so that the right image is pulled given the attributes i, j, k, and l
                //let img = new Image();
                let card = new Card(i, j, k, l, 'images/' + k.charAt(0) + i.charAt(0) + l.charAt(0) + j.charAt(0) + '.png'); 
                cards.push(card);
            }
        }
    }
}

//random 12 cards from deck
const tableCards = [];
for (let i = 0; i < 12; i++){
    let draw = Math.floor(Math.random() * cards.length);
    let array = cards.splice(draw,1)
    tableCards.push(array[0]); //splice removes element from cards and pushes it to the tableCards array
    
}

function displayCards(){
    let table = document.querySelector("table");
    let i = 0;
    let rows = 3;
    let cells = 4;
    if(tableCards.length > 12){
        cells = Math.ceil(tableCards.length /rows);
 
    }

    for (let x = 0; x<rows; x++){//rows
        let row = table.insertRow(); //puts in <tr> tag
        for(let y = 0; y<cells; y++){//columns
            let cell = row.insertCell();
            let card = tableCards[i];
            //.innerHTML is used to get/set the HTML content of an element node
            cell.innerHTML = '<a class = "cardImage" id = "' + card.imageName + '" value = "" href= "javascript:void(0);" onclick="checkSet(' + i + ');" > <img class="card" src = "' + card.imageName + '"  alt = "' + card.imageName+'" ></a>'; //NEED TO GET CARD'S SOURCE!
            i++;
        }
    }
}

function removeCards(){
    let table  = document.querySelector("table");
        for (let i = 0; i < 3; i++){
            table.deleteRow(0);
        }
}

function checkEachCharacteristic(char1, char2, char3){
    let result = false;
    if (char1 == char2 && char2 == char3){
            result = true;
    } else if (char1 != char2 && char2 != char3 && char1 != char3){
            result = true;
    }
    return result;
}

function checkSet(spot){
    
    let cont = true;
    let card = tableCards[spot];

    
    savedCards[savedCards.length] = card;
    if (savedCards.length == 3){
        let result = document.getElementById("check");
        if(checkEachCharacteristic(savedCards[0].symbol, savedCards[1].symbol, savedCards[2].symbol) && checkEachCharacteristic(savedCards[0].color, savedCards[1].color, savedCards[2].color) && checkEachCharacteristic(savedCards[0].numSym, savedCards[1].numSym, savedCards[2].numSym) && checkEachCharacteristic(savedCards[0].shading, savedCards[1].shading, savedCards[2].shading) && savedCards[0]!=savedCards[1] && savedCards[0] != savedCards[2] && savedCards[1] != savedCards[2]){
            totalSets++;
            document.getElementById("check").textContent = "You found a set!";
            document.getElementById("count").textContent = "You have found " + totalSets +" Sets!";
            //remove highlight
            removeThreeCards();
            if(tableCards.length < 12){
                addThreeCards(false);
            }
            removeCards();
            displayCards();
            document.getElementById("hintCard").innerHTML = "";
        
        }else{
            document.getElementById("check").textContent = "That is not a set!";
            removeHighlight();
        }
    savedCards.length = 0;
    }else{
        let clicked = document.getElementById(card.imageName);
            clicked.setAttribute("value", "clicked");
    }

}

function removeHighlight(){
    for(let i= 0; i < 3; i++){
        let clicked = document.getElementById(savedCards[i].imageName);
            clicked.setAttribute("value", "");
    }

}

function removeThreeCards(){
    for(let i = 0; i < savedCards.length; i++){
       let spot = tableCards.indexOf(savedCards[i]);
        tableCards.splice(spot, 1);
    }

}

function addThreeCards(check) {

    if(cards.length > 0){
        for (let i = 0; i < 3; i++){
            let draw = Math.floor(Math.random() * cards.length);
            let array = cards.splice(draw,1);
            tableCards.push(array[0]); //splice removes element from cards and pushes it to the tableCards array

        }
        if(check){
            removeCards();
            displayCards();
        }
    }else{
        document.getElementById("check").textContent = "There are no more cards left in the deck!";
    }


}

function hintSet(){
    
    let cont = true;
    let card1, card2, card3;
    for (let i = 0; i < tableCards.length - 2; i++){
        if (cont){
            card1 = tableCards[i];
            for (let j = i + 1; j < tableCards.length - 1; j++){
                if (cont){
                    card2 = tableCards[j];
                    for (let k = j + 1; k < tableCards.length; k++){
                        if (cont){
                            card3 = tableCards[k];
                            if(checkEachCharacteristic(card1.symbol, card2.symbol, card3.symbol) && checkEachCharacteristic(card1.color, card2.color, card3.color) && checkEachCharacteristic(card1.numSym, card2.numSym, card3.numSym) && checkEachCharacteristic(card1.shading, card2.shading, card3.shading)){
                                cont = false;
                            }
                        }
                    }
                }
            }
        }
    }
    if (cont){
        alert("No sets were found. Deal more cards.");
    } else {
        let hintCard = document.getElementById("hintCard");
        let hintCards = [card1, card2, card3];
        hintCard.innerHTML = '<img src = "' + hintCards[Math.floor(Math.random() * 3)].imageName + '"  ></img>';
    }
}

displayCards();