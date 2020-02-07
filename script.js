/*----------- Game State Data ----------*/

// 2 objects representing both players named red / black (that each have):
//      turn: false / true,
//      pieces: [], <-- this is the id's of the pieces

// have a board array of objects:      ***after a lot of thinking having a board object could be used to pair the id's of the pieces 
//      square id: num,                     to the id's of the squares
//      

/*---------- Cached Variables ----------*/

// board squares
// pieces
// text on the side 

/*---------- Logic ----------*/

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



// funcion changePlayer() {
//      access player object and change the value
//      change html accordingly
//      invoke check for win function
// }



// function checkForWin() {
//  if reds pieces = 0 then black wins
//  if blacks pieces = 0 then red wins
//}