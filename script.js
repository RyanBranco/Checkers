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
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
]

let turn = true; // true = reds turn, false = blacks turn


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

/*---------- Event Listeners ----------*/

// Gives the pieces on "click" (for whoevers turn it is) and assigns the proper id to it
function givePiecesClick() {
    if (turn) {
        for (let i = 0; i < red.pieces.length; i++) {
            piece[i].addEventListener("click", (event) => {
                const pieceId = event.target.getAttribute("id");
                giveCellsClick(pieceId);
            })
        }
    } else if (turn === false) {
        for (let i = 0; i < black.pieces.length; i++) {
            piece[red.pieces.length + i].addEventListener("click", (event) => {
                const pieceId = event.target.getAttribute("id");
                giveCellsClick(pieceId);
            })
        }
    }
}

// Gives the cells on "click" (for whoevers turn it is)
function giveCellsClick(pieceId) {
    let parsedId = parse(pieceId);

    // Helps normal red pieces move
    if (turn && board[parsedId + 7] === null && cells[parsedId + 7].classList.contains("red") !== true) {
        piece[pieceId].style.border = "3px solid green";
        if (turn && board[parsedId + 9] === null && cells[parsedId + 9].classList.contains("red") !== true) {
            cells[parsedId + 9].addEventListener("click", function giveClickToNine(event) {
                event.target.innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
                cells[parsedId].innerHTML = "";
                piece[pieceId].border = "none";
                deleteEventListeners(parsedId + 9);
                changeData(pieceId, parsedId, parsedId + 9);
            })
        }
        cells[parsedId + 7].addEventListener("click", function giveClickToSeven(event) {
            event.target.innerHTML = `<p class="red-piece" id="${pieceId}"></p>`;
            cells[parsedId].innerHTML = "";
            piece[pieceId].border = "none";
            deleteEventListeners(parsedId + 7);
            changeData(pieceId, parsedId, parsedId + 7);
        })
    } else if (turn === false && board[parsedId - 7] === null && cells[parsedId - 7].classList.contains("red") !== true) {
        piece[pieceId].style.border = "3px solid green";
        if (turn === false && board[parsedId - 9] === null && cells[parsedId - 9].classList.contains("red") !== true) {
            cells[parsedId - 9].addEventListener("click", function giveClickToNine(event) {
                event.target.innerHTML = `<p class="black-piece" id="${pieceId}"></p>`;
                cells[parsedId].innerHTML = "";
                piece[pieceId].border = "none";
                deleteEventListeners(parsedId - 9);
                changeData(pieceId, parsedId, parsedId - 9);
            })
        }
        cells[parsedId - 7].addEventListener("click", function giveClickToSeven(event) {
            event.target.innerHTML = `<p class="black-piece" id="${pieceId}"></p>`;
            cells[parsedId].innerHTML = "";
            piece[pieceId].border = "none";
            deleteEventListeners(parsedId - 7);
            changeData(pieceId, parsedId, parsedId - 7);
        })
    } 
}

/*---------- Logic ----------*/

// removes the event listeners that were just added


/***** THERE IS A BUG IN HERE VVVVVVV FIX IT! *****/
function deleteEventListeners(cellIdOne) {
   
}

// Changes the board states data on the back end
function changeData(pieceId, parsedId, modifiedParse) {
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
    if (black.pieces.length === 0) {
        blackTurntext.textContent = "";
        redTurnText.textContent = "RED WINS!";
    } else if (red.pieces.length === 0) {
        redTurnText.textContent = "";
        blackTurntext.textContent = "BLACK WINS!"
    }
    givePiecesClick();
}

givePiecesClick();