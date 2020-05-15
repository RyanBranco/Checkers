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
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

/*---------- Event Listeners ----------*/

/* initialize event listeners on pieces */
function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", removeOldEventListeners);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", removeOldEventListeners);
        }
    }
}

/*---------- Logic ----------*/

// removes possible moves from old selected piece (* this is needed because the user might re-select a piece *)
function removeOldEventListeners() {
    if (selectedPiece.seventhSpace) {
        cells[indexOfBoardPiece + 7].removeEventListener("click", possibleMoves);
        selectedPiece.seventhSpace = false;
    }
    if (selectedPiece.ninthSpace) {
        cells[indexOfBoardPiece + 9].removeEventListener("click", possibleMoves);
        selectedPiece.ninthSpace = false;
    }
    if (selectedPiece.fourteenthSpace) {
        cells[indexOfBoardPiece + 14].removeEventListener("click", possibleMoves);
        selectedPiece.fourteenthSpace = false;
    }
    if (selectedPiece.eighteenthSpace) {
        cells[indexOfBoardPiece + 18].removeEventListener("click", possibleMoves);
        selectedPiece.eighteenthSpace = false;
    }
    if (selectedPiece.minusSeventhSpace) {
        cells[indexOfBoardPiece - 7].removeEventListener("click", possibleMoves);
        selectedPiece.minusSeventhSpace = false;
    }
    if (selectedPiece.minusNinthSpace) {
        cells[indexOfBoardPiece - 9].removeEventListener("click", possibleMoves);
        selectedPiece.minusNinthSpace = false;
    }
    if (selectedPiece.minusFourteenthSpace) {
        cells[indexOfBoardPiece - 14].removeEventListener("click", possibleMoves);
        selectedPiece.minusFourteenthSpace = false;
    }
    if (selectedPiece.minusEighteenthSpace) {
        cells[indexOfBoardPiece - 18].removeEventListener("click", possibleMoves);
        selectedPiece.minusEighteenthSpace = false;
    }
    getSelectedPiece();
}

// Gets ID and index of the board cell its on
function getSelectedPiece() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    console.log(selectedPiece);
    isPieceKing();
}

// Checks if selected piece is a king
function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        isKing = true;
    } else {
        isKing = false;
    }
    getAvailableSpaces();
}

function getAvailableSpaces() {

}

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
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
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
        redTurnText.style.color = "black";
    }
    removeOpponentEventListeners();
}

// removes the opponents 'onClick' event listener
function removeOpponentEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            blacksPieces[i].removeEventListener("click", removeOldEventListeners);
        }
    } else {
        for (let i = 0; i < blacksPieces.length; i++) {
            redsPieces[i].removeEventListener("click", removeOldEventListeners);
        }
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