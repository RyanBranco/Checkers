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

// parses pieceId's and returns the index of that piece's place on the board
let findPiece = function (pieceId) {
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

/* selected piece properties */
let selectedPiece = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    kingSeventhSpace: false,
    kingNinthSpace: false,
    kingFourteenthSpace: false,
    kingEighteenthSpace: false
}

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







// Changes the board states data on the back end
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(pieceId);
    if (turn && pieceId < 12 && modifiedIndex >= 57) {
        document.getElementById(pieceId).classList.add("king")
    }
    if (turn === false && pieceId >= 12 && modifiedIndex <= 7) {
        document.getElementById(pieceId).classList.add("king");
    }
    if (removePiece) {
        board[removePiece] = null;
        if (turn && pieceId < 12) {
            cells[removePiece].innerHTML = "";
            blackScore--
        }
        if (turn === false && pieceId >= 12) {
            cells[removePiece].innerHTML = "";
            redScore--
        }
    }
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.kingSeventhSpace = false;
    selectedPiece.kingNinthSpace = false;
    selectedPiece.kingFourteenthSpace = false;
    selectedPiece.kingEighteenthSpace = false;
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
        redTurnText.style.color = "black";
        blackTurntext.textContent = "";
        redTurnText.textContent = "RED WINS!";
    } else if (redScore === 0) {
        blackTurntext.style.color = "black";
        redTurnText.textContent = "";
        blackTurntext.textContent = "BLACK WINS!"
    }
    givePiecesEventListeners();
}
givePiecesEventListeners();