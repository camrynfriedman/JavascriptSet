class Card{
    constructor(sym,col,num,shade,imgName){
        this.symbol = sym;
        this.color = col;
        this.numSym = num;
        this.shading = shade;
        this.imageName = imgName;
    }

    // get symb(){
    //     return this.symbol;
    // }
    // get image(){
    //     return this.imageName;
    // }
}

// class Image{
//     constructor(src){
//         this.source = src
//     }
// }
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
        let row = table.insertRow();
        for(let y = 0; y<cells; y++){//columns
            let cell = row.insertCell();
            let card = tableCards[i];
            //.innerHTML is used to get/set the HTML content of an element node
            cell.innerHTML = '<a href= "javascript:void(0);" onclick="save(' + i + ');" > <img src = "' + card.imageName + '"  ></a>'; //NEED TO GET CARD'S SOURCE!
            i++;
        }
    }
}

function removeCards(){
    let table  = document.querySelector("table");
        for (let i = 0; i < 3; i++){
            table.deleteRow(0);
        }
    
    // let count = Math.ceil(tableCards.length /4);
    // for (let i = 0; i < count; i++){
    //     table.deleteRow(i);
    // }
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

function save(spot){
    
    let cont = true;
    let card = tableCards[spot];
    // let i = 0;
    // while(cont){
    //     if(src == tableCards[i]){
    //        let card = tableCards[i];
    //         cont = false;
    //     }
    //     i++;
    // }
    savedCards[savedCards.length] = card;
    if (savedCards.length == 3){
        let result = document.getElementById("check");
        if(checkEachCharacteristic(savedCards[0].symbol, savedCards[1].symbol, savedCards[2].symbol) && checkEachCharacteristic(savedCards[0].color, savedCards[1].color, savedCards[2].color) && checkEachCharacteristic(savedCards[0].numSym, savedCards[1].numSym, savedCards[2].numSym) && checkEachCharacteristic(savedCards[0].shading, savedCards[1].shading, savedCards[2].shading) && savedCards[0]!=savedCards[1] && savedCards[0] != savedCards[2] && savedCards[1] != savedCards[2]){
            totalSets++;
            alert("You found a set!");
            removeThreeCards();
            if(tableCards.length < 12){
                addThreeCards(false);
            }
            removeCards();
            displayCards();
        
        }else{
            alert("That is not a set");
        }
    savedCards.length = 0;
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
        //INFORM USER THAT THERE ARE NO CARDS LEFT
    }


}

displayCards();