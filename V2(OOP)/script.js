
/*------------------------- cached Variables -------------------------*/
const redTurnText = document.querySelector("#red-turn-text");
const blackTurntext = document.querySelector("#black-turn-text");

/*------------------------- Game State Data --------------------------*/
const board = [   
    null, 0, null, 1, null, 2, null, 3,
    4, null, 5, null, 6, null, 7, null,
    null, 8, null, 9, null, 10, null, 11,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    12, null, 13, null, 14, null, 15, null,
    null, 16, null, 17, null, 18, null, 19,
    20, null, 21, null, 22, null, 23, null
];

const player1 = {
    color: "red",
    score: 12,
    turn: true,
}

const player2 = {
    color: "black",
    score: 12,
    turn: false,
    pieces: [],
}


/*------------------------- Event Listeners -------------------------*/




/*------------------------- Logic -----------------------------------*/

// Changes the board states data on the back end
function changeData() {
    
    changePlayer();
}

// Switches players turn
function changePlayer() {
    if (player1.turn) {
        player1.turn = false;
        player2.turn = true;
        redTurnText.style.color = "lightGrey";
        blackTurntext.style.color = "black";
    } else if (player2.turn) {
        player1.turn = true;
        player2.turn = false
        blackTurntext.style.color = "lightGrey";
        redTurnText.style.color = "black"
    }
    checkForWin();
}

// Checks every turn for a win
function checkForWin() {
    if (player2.pieces.length === 0) {
        blackTurntext.textContent = "";
        redTurnText.textContent = "RED WINS!";
    } else if (player2.pieces.length === 0) {
        redTurnText.textContent = "";
        blackTurntext.textContent = "BLACK WINS!"
    }
}