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

/* used to help remove event listeners if selected piece is changed */
let tempSeven = [];
let tempNine = [];
let tempFourteen = [];
let tempEighteen = [];

/*---------- Event Listeners ----------*/

function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redsPieces.length; i++) {
            redsPieces[i].addEventListener("click", getAvailableSpaces);
        }
    }

    if (turn == false) {
        for (let i = 0; i < blacksPieces.length; i++) {
            blacksPieces[i].addEventListener("click", getAvailableSpaces);
        }
    }
}

/*---------- Logic ----------*/

function getAvailableSpaces(event) {

    /* removes the previous event listener if piece target is changed */
    if (turn && pieceId < 12) {
        if (tempSeven[0]) {
            cells[indexOfBoardPiece + 7].removeEventListener("click", seventhMove)
            tempSeven.pop();
            seventhSpace = false;
        }
        if (tempNine[0]) {
            cells[indexOfBoardPiece + 9].removeEventListener("click", ninthMove)
            tempNine.pop();
            ninthSpace = false;
        }
        if (tempFourteen[0]) {
            cells[indexOfBoardPiece + 14].removeEventListener("click", fourteenthMove)
            tempFourteen.pop();
            fourteenthSpace = false;
        }
        if (tempEighteen[0]) {
            cells[indexOfBoardPiece + 18].removeEventListener("click", eighteenthMove)
            tempEighteen.pop();
            eighteenthSpace = false;
        }
    }
    if (turn === false && pieceId >= 12) {
        if (tempSeven[0]) {
            cells[indexOfBoardPiece - 7].removeEventListener("click", seventhMove)
            tempSeven.pop();
            seventhSpace = false;
        }
        if (tempNine[0]) {
            cells[indexOfBoardPiece - 9].removeEventListener("click", ninthMove)
            tempNine.pop();
            ninthSpace = false;
        }
        if (tempFourteen[0]) {
            cells[indexOfBoardPiece - 14].removeEventListener("click", fourteenthMove)
            tempFourteen.pop();
            fourteenthSpace = false;
        }
        if (tempEighteen[0]) {
            cells[indexOfBoardPiece - 18].removeEventListener("click", eighteenthMove)
            tempEighteen.pop();
            eighteenthSpace = false;
        }
    }

    pieceId = parseInt(event.target.id);
    indexOfBoardPiece = parse(pieceId);
    if (turn && pieceId < 12) {
        for (let i = 0; i < redsPieces.length; i++) {
            if (board[indexOfBoardPiece + 7] === null && cells[indexOfBoardPiece + 7].classList.contains("red") !== true) {
                seventhSpace = true;
                redsPieces[i].style.border = "1px solid white";
                document.getElementById(pieceId).style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece + 9] === null && cells[indexOfBoardPiece + 9].classList.contains("red") !== true) {
                ninthSpace = true;
                redsPieces[i].style.border = "1px solid white";
                document.getElementById(pieceId).style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece + 14] === null && cells[indexOfBoardPiece + 14].classList.contains("red") !== true && board[indexOfBoardPiece + 7] >= 12) {
                fourteenthSpace = true;
                redsPieces[i].style.border = "1px solid white";
                document.getElementById(pieceId).style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece + 18] === null && cells[indexOfBoardPiece + 18].classList.contains("red") !== true && board[indexOfBoardPiece + 9] >= 12) {
                eighteenthSpace = true;
                redsPieces[i].style.border = "1px solid white";
                document.getElementById(pieceId).style.border = "3px solid green";
            }
        }
        giveCellsClick();
    }

    if (turn === false && pieceId >= 12) {
        for (let i = 0; i < blacksPieces.length; i++) {
            if (board[indexOfBoardPiece - 7] === null && cells[indexOfBoardPiece - 7].classList.contains("red") !== true) {
                seventhSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                document.getElementById(pieceId).style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece - 9] === null && cells[indexOfBoardPiece - 9].classList.contains("red") !== true) {
                ninthSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                document.getElementById(pieceId).style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece - 14] === null && cells[indexOfBoardPiece - 14].classList.contains("red") !== true && board[indexOfBoardPiece - 7] < 12 && board[indexOfBoardPiece - 7] !== null) {
                fourteenthSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                document.getElementById(pieceId).style.border = "3px solid green";
            }
            if (board[indexOfBoardPiece - 18] === null && cells[indexOfBoardPiece - 18].classList.contains("red") !== true && board[indexOfBoardPiece - 9] < 12 && board[indexOfBoardPiece - 9] !== null) {
                eighteenthSpace = true;
                blacksPieces[i].style.border = "1px solid white";
                document.getElementById(pieceId).style.border = "3px solid green";
            }
        }
        giveCellsClick();
    }
}

function giveCellsClick() {
    console.log("pieceId: " + pieceId);
    console.log("index: " + indexOfBoardPiece);
    console.log("isKing: " + isKing);
    console.log("Seventh: " + seventhSpace);
    console.log("ninth: " + ninthSpace);
    console.log("fourteenth: " + fourteenthSpace);
    console.log("eighteenth: " + eighteenthSpace);
    console.log("turn: " + turn);

    if (turn && pieceId < 12) {
        if (seventhSpace) {
            cells[indexOfBoardPiece + 7].addEventListener("click", seventhMove);
            tempSeven.push(indexOfBoardPiece + 7);
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece + 9].addEventListener("click", ninthMove);
            tempNine.push(indexOfBoardPiece + 9);
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece + 14].addEventListener("click", fourteenthMove);
            tempFourteen.push(indexOfBoardPiece + 14);
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece + 18].addEventListener("click", eighteenthMove);
            tempEighteen.push(indexOfBoardPiece + 18);
        }
    }

    if (turn === false && pieceId >= 12) {
        if (seventhSpace) {
            cells[indexOfBoardPiece - 7].addEventListener("click", seventhMove);
            tempSeven.push(indexOfBoardPiece - 7);
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece - 9].addEventListener("click", ninthMove);
            tempNine.push(indexOfBoardPiece - 9);
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece - 14].addEventListener("click", fourteenthMove);
            tempFourteen.push(indexOfBoardPiece - 14);
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece - 18].addEventListener("click", eighteenthMove);
            tempEighteen.push(indexOfBoardPiece - 18);
        }
    }
    console.log("tempSeven: " + tempSeven);
    console.log("tempNine: " + tempNine);
    console.log("tempFourteen: " + tempFourteen);
    console.log("tempEighteen: " + tempEighteen);
    console.log("")
}

function seventhMove() {
    if (turn && pieceId < 12) {
        document.getElementById(pieceId).remove();
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece + 7].innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
        redsPieces = document.querySelectorAll("p");
        document.getElementById(pieceId).addEventListener("click", getAvailableSpaces);
        if (seventhSpace) {
            cells[indexOfBoardPiece + 7].removeEventListener("click", seventhMove);
            tempSeven.pop();
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece + 9].removeEventListener("click", ninthMove);
            tempNine.pop();
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece + 14].removeEventListener("click", fourteenthMove);
            tempFourteen.pop();
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece + 18].removeEventListener("click", eighteenthMove);
            tempEighteen.pop();
        }
        changeData(indexOfBoardPiece, indexOfBoardPiece + 7);
    }

    if (turn === false && pieceId >= 12) {
        document.getElementById(pieceId).remove();
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece - 7].innerHTML = `<span class="black-piece" id="${pieceId}"></span>`;
        blacksPieces = document.querySelectorAll("span");
        document.getElementById(pieceId).addEventListener("click", getAvailableSpaces);
        if (seventhSpace) {
            cells[indexOfBoardPiece - 7].removeEventListener("click", seventhMove)
            tempSeven.pop();
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece - 9].removeEventListener("click", ninthMove)
            tempNine.pop();
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece - 14].removeEventListener("click", fourteenthMove)
            tempFourteen.pop();
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece - 18].removeEventListener("click", eighteenthMove)
            tempEighteen.pop();
        }
        changeData(indexOfBoardPiece, indexOfBoardPiece - 7);
    }
}

function ninthMove() {
    if (turn && pieceId < 12) {
        document.getElementById(pieceId).remove();
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece + 9].innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
        redsPieces = document.querySelectorAll("p");
        document.getElementById(pieceId).addEventListener("click", getAvailableSpaces);
        if (seventhSpace) {
            cells[indexOfBoardPiece + 7].removeEventListener("click", seventhMove);
            tempSeven.pop();
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece + 9].removeEventListener("click", ninthMove);
            tempNine.pop();
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece + 14].removeEventListener("click", fourteenthMove);
            tempFourteen.pop();
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece + 18].removeEventListener("click", eighteenthMove);
            tempEighteen.pop();
        }
        changeData(indexOfBoardPiece, indexOfBoardPiece + 9);
    }

    if (turn === false && pieceId >= 12) {
        document.getElementById(pieceId).remove();
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece - 9].innerHTML = `<span class="black-piece" id="${pieceId}"></span>`;
        blacksPieces = document.querySelectorAll("span");
        document.getElementById(pieceId).addEventListener("click", getAvailableSpaces);
        if (seventhSpace) {
            cells[indexOfBoardPiece - 7].removeEventListener("click", seventhMove)
            tempSeven.pop();
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece - 9].removeEventListener("click", ninthMove)
            tempNine.pop();
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece - 14].removeEventListener("click", fourteenthMove)
            tempFourteen.pop();
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece - 18].removeEventListener("click", eighteenthMove)
            tempEighteen.pop();
        }
        changeData(indexOfBoardPiece, indexOfBoardPiece - 9);
    }
}

function fourteenthMove() {
    if (turn && pieceId < 12) {
        document.getElementById(pieceId).remove();
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece + 14].innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
        redsPieces = document.querySelectorAll("p");
        document.getElementById(pieceId).addEventListener("click", getAvailableSpaces);
        if (seventhSpace) {
            cells[indexOfBoardPiece + 7].removeEventListener("click", seventhMove);
            tempSeven.pop();
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece + 9].removeEventListener("click", ninthMove);
            tempNine.pop();
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece + 14].removeEventListener("click", fourteenthMove);
            tempFourteen.pop();
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece + 18].removeEventListener("click", eighteenthMove);
            tempEighteen.pop();
        }
        changeData(indexOfBoardPiece, indexOfBoardPiece + 14, indexOfBoardPiece + 7);
    }

    if (turn === false && pieceId >= 12) {
        document.getElementById(pieceId).remove();
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece - 14].innerHTML = `<span class="black-piece" id="${pieceId}"></span>`;
        blacksPieces = document.querySelectorAll("span");
        document.getElementById(pieceId).addEventListener("click", getAvailableSpaces);
        if (seventhSpace) {
            cells[indexOfBoardPiece - 7].removeEventListener("click", seventhMove)
            tempSeven.pop();
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece - 9].removeEventListener("click", ninthMove)
            tempNine.pop();
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece - 14].removeEventListener("click", fourteenthMove)
            tempFourteen.pop();
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece - 18].removeEventListener("click", eighteenthMove)
            tempEighteen.pop();
        }
        changeData(indexOfBoardPiece, indexOfBoardPiece - 14, indexOfBoardPiece - 7);
    }
}

function eighteenthMove() {
    if (turn && pieceId < 12) {
        document.getElementById(pieceId).remove();
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece + 18].innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
        redsPieces = document.querySelectorAll("p");
        document.getElementById(pieceId).addEventListener("click", getAvailableSpaces);
        if (seventhSpace) {
            cells[indexOfBoardPiece + 7].removeEventListener("click", seventhMove);
            tempSeven.pop();
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece + 9].removeEventListener("click", ninthMove);
            tempNine.pop();
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece + 14].removeEventListener("click", fourteenthMove);
            tempFourteen.pop();
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece + 18].removeEventListener("click", eighteenthMove);
            tempEighteen.pop();
        }
        changeData(indexOfBoardPiece, indexOfBoardPiece + 18, indexOfBoardPiece + 9);
    }

    if (turn === false && pieceId >= 12) {
        document.getElementById(pieceId).remove();
        cells[indexOfBoardPiece].innerHTML = "";
        cells[indexOfBoardPiece - 18].innerHTML = `<span class="black-piece" id="${pieceId}"></span>`;
        blacksPieces = document.querySelectorAll("span");
        document.getElementById(pieceId).addEventListener("click", getAvailableSpaces);
        if (seventhSpace) {
            cells[indexOfBoardPiece - 7].removeEventListener("click", seventhMove)
            tempSeven.pop();
        }
        if (ninthSpace) {
            cells[indexOfBoardPiece - 9].removeEventListener("click", ninthMove)
            tempNine.pop();
        }
        if (fourteenthSpace) {
            cells[indexOfBoardPiece - 14].removeEventListener("click", fourteenthMove)
            tempFourteen.pop();
        }
        if (eighteenthSpace) {
            cells[indexOfBoardPiece - 18].removeEventListener("click", eighteenthMove)
            tempEighteen.pop();
        }
        changeData(indexOfBoardPiece, indexOfBoardPiece - 18, indexOfBoardPiece - 9);
    }
}

// Changes the board states data on the back end
function changeData(indexOfBoardPiece, modifiedIndex, removePiece) {
    board[indexOfBoardPiece] = null;
    board[modifiedIndex] = parseInt(pieceId);
    if (removePiece) {
        board[removePiece] = null;
        if (turn && pieceId < 12) {
            console.log("I REMOVED A BLACK SCORE")
            cells[removePiece].innerHTML = "";
            blackScore--
        }
        if (turn === false && pieceId >= 12) {
            console.log("I REMOVED A RED SCORE")
            cells[removePiece].innerHTML = "";
            redScore--
        }
    }
    isKing = false;
    seventhSpace = false;
    ninthSpace = false;
    fourteenthSpace = false;
    eighteenthSpace = false;
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
    console.log(board)
    givePiecesEventListeners();
}
givePiecesEventListeners();