/*----------- Game State Data ----------*/

const board = [   
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

/*---------- Cached Variables ----------*/

// parses pieceId's and returns the index of that pieces place on the board
let parse = function(pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};
const cells = document.querySelectorAll("td");
const piece = document.querySelectorAll("p");
const redTurnText = document.querySelector("#red-turn-text");
const blackTurntext = document.querySelector("#black-turn-text");
let turn = true;
let redScore = 12;
let blackScore = 12;
let pieceIndexOfBoard;
let pieceId

/*---------- Event Listeners ----------*/

for (let i = 0; i < piece.length; i++) {
    piece[i].addEventListener("click", (event) => {
        pieceId = piece[i].getAttribute("id");
        pieceIndexOfBoard = parse(pieceId);
        selectPiece();
    })
}

/*---------- Logic ----------*/

function selectPiece() {
    for (let i = 0; i < piece.length; i++) {
        piece[i].style.border = "1px solid white";
   }
    piece[pieceId].style.border = "3px solid green";
    getAvailableSpaces();
}

function getAvailableSpaces() {
    console.log(pieceId);
    console.log(pieceIndexOfBoard);
}



// Changes the board states data on the back end
function changeData() {
    board[parsedId] = null;
    board[modifiedParse] = parseInt(pieceId);
    changePlayer();
}

// Switches players turn
function changePlayer() {
    if (turn) {
        turn = false;
        redTurnText.style.color = "lightGrey";
        blackTurntext.style.color = "black";
    } else if (turn === false) {
        turn = true;
        blackTurntext.style.color = "lightGrey";
        redTurnText.style.color = "black"
    }
    checkForWin();
}

// Checks every turn for a win
function checkForWin() {
    if ( black.pieces.length === 0) {
        blackTurntext.textContent = "";
        redTurnText.textContent = "RED WINS!";
    } else if (red.pieces.length === 0) {
        redTurnText.textContent = "";
        blackTurntext.textContent = "BLACK WINS!"
    }
}