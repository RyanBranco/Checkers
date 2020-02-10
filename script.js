/*----------- Game State Data ----------*/

const red = {
    pieces: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
}

const black = {
    pieces: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
}

const board = [   
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    null, 12, null, 13, null, 14, null, 15,
    16, null, 17, null, 18, null, 19, null,
    null, 20, null, 21, null, 22, null, 23
]

let turn = true; // true = reds turn, false = blacks turn


/*---------- Cached Variables ----------*/

const cells = document.querySelectorAll("td");
const piece = document.querySelectorAll("p");
const redTurnText = document.querySelector("#red-turn-text");
const blackTurntext = document.querySelector("#black-turn-text");
// const possibleMoves = {
//     one: board.indexOf(pieceId + 7),
//     two: board.indexOf(pieceId + 9),
//     three: board.indexOf(pieceId - 7),
//     four: board.indexOf(pieceId - 9)
// }

// plus or minus 14, 16, 18 are the available moves if you are taking away the oponents piece

/*---------- Event Listeners ----------*/

// Gives the pieces on "click" (for whoevers turn it is) and assigns the proper id to it
if (turn) {
    for (let i = 0; i < red.pieces.length; i++) {
        piece[i].addEventListener("click", (event) => {
            const pieceId = event.target.getAttribute("id");
            event.target.style.border = "3px solid green";
        })
    }
} else if (turn === false) {
    for (let i = 0; i < black.pieces.length; i++) {
        piece[red.pieces.length + i].addEventListener("click", (event) => {
            const pieceId = event.target.getAttribute("id");
            event.target.style.border = "3px solid green";

        })
    }
}

/*---------- Logic ----------*/

// if you call parse(pieceId), it will give you the cells 
let parse = function(pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

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

function changePlayer() {
    checkForWin();
}

function checkForWin() {
    if (black.pieces.length === 0) {
        blackTurntext.textContent = "";
        redTurnText.textContent = "RED WINS!";
    } else if (red.pieces.length === 0) {
        redTurnText.textContent = "";
        blackTurntext.textContent = "BLACK WINS!"
    }
}