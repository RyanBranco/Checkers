/*----------- Game State Data ----------*/

const red = {
    pieces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
}

const black = {
    pieces: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
}

const board = [   
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null
]

let turn = true;


/*---------- Cached Variables ----------*/

const cells = document.querySelectorAll("td");
const piece = document.querySelectorAll("p");
const redTurnText = document.querySelector("#red-turn-text");
const blackSidetext = document.querySelector("#black-turn-text");

/*---------- Event Listeners ----------*/
for (let i = 0; i < piece.length; i++) {
    piece[i].addEventListener("click", (event) => {
        let pieceId = piece[i].getAttribute("id");
    })
};

for (let i = 0; i < board.length; i++) {
    cells[i].addEventListener("click", (event) => {
        
    })
}

/*---------- Logic ----------*/

// give pieces on click {
//      grab the id of that piece
//      when pieces are on click change css outline to green
//      highlight available locations by the isOccupied object and if its in range
//      the next click assigns that id of the piece to the boards id that was clicked
//      match the two id's of the board and the piece
//      phisically move the piece on the screen to correct square
//      change board object to have is occupied to true
//      *** there will be a whole lot of logic here that i have no idea how it will work,
//          but i have to some how check is a piece needs to get taken away ***
//      invoke change player function
//  }



// funcion changePlayer() {
//      access player object and change the value
//      change html accordingly
//      invoke check for win function
// }



// function checkForWin() {
//  if reds pieces = 0 then black wins
//  if blacks pieces = 0 then red wins
//}