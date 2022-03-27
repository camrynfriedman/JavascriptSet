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
    tableCards.push(cards.splice(draw,1)); //splice removes element from cards and pushes it to the tableCards array
}
console.log(tableCards[0]);
//function displayCards(){
  //  console.log(tableCards);
    let table = document.querySelector("table");
    let i = 0;
    let j = 0;
    for (let x = 0; x<4; x++){//rows
        let row = table.insertRow();
        for(let y = 0; y<3; y++){//columns
            let cell = row.insertCell();
            let card = tableCards[i][j];
            //.innerHTML is used to get/set the HTML content of an element node
            cell.innerHTML = '<img src = "' + card.imageName + '">'; //NEED TO GET CARD'S SOURCE!!
            i++;

        }
        j++
    }
//}
//console.log(tableCards) //correct path to image shows in console under currentSource
//displayCards();