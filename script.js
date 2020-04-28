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
let parse = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

/* html referenes */
const cells = document.querySelectorAll("td");
let redsPieces = document.querySelectorAll("p");
let blacksPieces = document.querySelectorAll("span")
const redTurnText = document.querySelector("#red-turn-text");
const blackTurntext = document.querySelector("#black-turn-text");

/* player properties */
let turn = true;
let redScore = 12;
let blackScore = 12;

/* piece properties */
let pieceId;
let indexOfBoardPiece;
let isKing = false;
let seventhSpace = false;
let ninthSpace = false;
let fourteenthSpace = false;
let eighteenthSpace = false;
let kingSeventhSpace = false;
let kingNinthSpace = false;
let kingFourteenthSpace = false;
let kingEighteenthSpace = false;

/* used to help remove event listeners if selected piece is changed */
let tempSeven = [];
let tempNine = [];
let tempFourteen = [];
let tempEighteen = [];
let tempKingSeven = [];
let tempKingNine = [];
let tempKingFourteen = [];
let tempKingEighteen = [];

/*---------- Event Listeners ----------*/

function givePiecesEventListeners() {
    for (let i = 0; i < redsPieces.length; i++) {
        redsPieces[i].addEventListener("click", getAvailableSpaces);
    }

    for (let i = 0; i < blacksPieces.length; i++) {
        blacksPieces[i].addEventListener("click", getAvailableSpaces);
    }
}

/*---------- Logic ----------*/