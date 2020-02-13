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
let pieceId;
let indexOfBoardPiece;
let isKing = false;
let seventhSpace = false;
let ninthSpace = false;
let fourteenthSpace = false;
let eighteenthSpace = false;

/*---------- Event Listeners ----------*/

function givePiecesEventListeners() {
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
        giveCellsClick();
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
            if (board[indexOfBoardPiece - 14] === null && cells[indexOfBoardPiece - 14].classList.contains("red") !== true && board[indexOfBoardPiece - 7] < 12 && board[indexOfBoardPiece - 7] !== null) {
                fourteenthSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                blacksPieces[pieceId].style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece - 18] === null && cells[indexOfBoardPiece - 18].classList.contains("red") !== true && board[indexOfBoardPiece - 9] < 12 && board[indexOfBoardPiece - 7] !== null) {
                eighteenthSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                blacksPieces[pieceId].style.border = "3px solid green";
            }
        }
        giveCellsClick();
    }
}

function giveCellsClick() {
    if (turn && pieceId < 12) {
        if (seventhSpace) {
            cells[indexOfBoardPiece + 7].addEventListener("click", seventhMove);
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece + 9].addEventListener("click", ninthMove);
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece + 14].addEventListener("click", fourteenthMove);
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece + 18].addEventListener("click", eighteenthMove);
        }
    }

    if (turn === false && pieceId >= 12) {
        if (seventhSpace) {
            cells[indexOfBoardPiece - 7].addEventListener("click", seventhMove);
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece - 9].addEventListener("click", ninthMove);
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece - 14].addEventListener("click", fourteenthMove);
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece - 18].addEventListener("click", eighteenthMove);
        }
    }
}

function seventhMove() {
    if (turn) {
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece + 7].innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
        changeData(indexOfBoardPiece, indexOfBoardPiece + 7);
    }

    if (turn === false) {
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece - 7].innerHTML = `<span class="black-piece" id="${pieceId}"></span>`;
        changeData(indexOfBoardPiece, indexOfBoardPiece - 7);
    }
}

function ninthMove() {
    if (turn) {
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece + 9].innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
        changeData(indexOfBoardPiece, indexOfBoardPiece + 9);
    }

    if (turn === false) {
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece - 9].innerHTML = `<span class="black-piece" id="${pieceId}"></span>`;
        changeData(indexOfBoardPiece, indexOfBoardPiece - 9);    
    }
}

function fourteenthMove() {
    if (turn) {
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece + 14].innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
        changeData(indexOfBoardPiece, indexOfBoardPiece + 14);
    }

    if (turn === false) {
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece - 14].innerHTML = `<span class="black-piece" id="${pieceId}"></span>`;
        changeData(indexOfBoardPiece, indexOfBoardPiece - 14);   
    }
}

function eighteenthMove() {
    if (turn) {
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece + 18].innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
        changeData(indexOfBoardPiece, indexOfBoardPiece + 18);
    }

    if (turn === false) {
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece - 18].innerHTML = `<span class="black-piece" id="${pieceId}"></span>`;
        changeData(indexOfBoardPiece, indexOfBoardPiece - 18);   
    }
}

// Changes the board states data on the back end
function changeData(indexOfBoardPiece, modifiedIndex) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(indexOfBoardPiece);
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
    givePiecesEventListeners();
}

givePiecesEventListeners();