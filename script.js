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
const redsPieces = document.querySelectorAll("p");
const blacksPieces = document.querySelectorAll("span")
const redTurnText = document.querySelector("#red-turn-text");
const blackTurntext = document.querySelector("#black-turn-text");

/* player properties */
let turn = true;
let redScore = 12;
let blackScore = 12;

/* piece properties */
let seventhSpace = false;
let ninthSpace = false;
let fourteenthSpace = false;
let eighteenthSpace = false;
let pieceId = false;
let indexOfBoardPiece = false;

/*---------- Event Listeners ----------*/

function giveEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", getAvailableSpaces)
        }
    }

    if (turn == false) {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", getAvailableSpaces)
        }
    }
}

/*---------- Logic ----------*/

function getAvailableSpaces(event) {
    pieceId = parseInt(event.target.id);
    indexOfBoardPiece = parse(pieceId);

    if (turn && pieceId < 12) {
        for (let i = 0; i < redsPieces.length; i++) {
            if (board[indexOfBoardPiece + 7] === null  && cells[indexOfBoardPiece + 7].classList.contains("red") !== true) {
                seventhSpace = true;
                redsPieces[i].style.border = "1px solid white";
                redsPieces[pieceId].style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece + 9] === null && cells[indexOfBoardPiece + 9].classList.contains("red") !== true) {
                ninthSpace = true;
                redsPieces[i].style.border = "1px solid white";
                redsPieces[pieceId].style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece + 14] === null && cells[indexOfBoardPiece + 14].classList.contains("red") !== true && board[indexOfBoardPiece + 7] >= 12) {
                fourteenthSpace = true;
                redsPieces[i].style.border = "1px solid white";
                redsPieces[pieceId].style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece + 18] === null && cells[indexOfBoardPiece + 18].classList.contains("red") !== true && board[indexOfBoardPiece + 9] >= 12) {
                eighteenthSpace = true;
                redsPieces[i].style.border = "1px solid white";
                redsPieces[pieceId].style.border = "3px solid green";
            }
        }
        move();
    }

    if (turn === false && pieceId >= 12) {
        for (let i = 0; i < blacksPieces.length; i++) {
            if (board[indexOfBoardPiece - 7] === null  && cells[indexOfBoardPiece - 7].classList.contains("red") !== true) {
                seventhSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                blacksPieces[pieceId].style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece - 9] === null && cells[indexOfBoardPiece - 9].classList.contains("red") !== true) {
                ninthSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                blacksPieces[pieceId].style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece - 14] === null && cells[indexOfBoardPiece - 14].classList.contains("red") !== true && board[indexOfBoardPiece - 7] < 12) {
                fourteenthSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                blacksPieces[pieceId].style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece - 18] === null && cells[indexOfBoardPiece - 18].classList.contains("red") !== true && board[indexOfBoardPiece - 9] < 12) {
                eighteenthSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                blacksPieces[pieceId].style.border = "3px solid green";
            }
        }
        move();
    }
}

function move() {
    if (turn && pieceId < 12) {

    }

    if (turn === false && pieceId >= 12) {

    }
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
    if (blackScore === 0) {
        blackTurntext.textContent = "";
        redTurnText.textContent = "RED WINS!";
    } else if (redScore === 0) {
        redTurnText.textContent = "";
        blackTurntext.textContent = "BLACK WINS!"
    }
    giveEventListeners();
}

giveEventListeners();