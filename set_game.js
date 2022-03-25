class Card{
    constructor(sym,col,num,shade,imgName){
        this.symbol = sym;
        this.color = col;
        this.numSym = num;
        this.shading = shade;
        this.imageName = imgName;
    }

    get symb(){
        return this.symbol;
    }
}

const cards = [];
const symbols = ["oval", "squiggle", "diamond"];
const colors = ["red", "purple", "green"];
const numSyms = ["1", "2", "3"];
const shades = ["filled", "striped", "open"];

for (let i of symbols){
    for (let j of colors){
        for (let k of numSyms){
            for (let l of shades){
                let card = new Card(i, j, k, l, "image");
                cards.push(card);
            }
        }
    }
}

const tableCards = [];
for (let i = 0; i < 12; i++){
    let draw = Math.floor(Math.random() * cards.length);
    tableCards.push(cards.splice(draw,1));
}