var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.onrender.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	sudokusol(board, 0, 0, 9);
};

// function SudokuSolver(board, i, j, n) {
// 	// Write your Code here
// }
	function isvalid( board, i,  j,  num,  n){
	//check row
	for(let x = 0;x<n;x++){
		if(board[i][x] == num){
		 return false;
		}
	}
	//check coloumn
	for(let x = 0;x<n;x++){
	  if(board[x][j] == num){
		 return false;
	  }
	}
	// sub grid check
	let rn = Math.sqrt(n);
	let si = i - (i % rn);
	let sj = j- j % rn;
	for(let i = si; i<si+rn; i++){
	 for(let j = sj; j<sj+rn; j++){
	   if(board[i][j] == num){
		 return false;
	   }
	 }
	}
	return true;
 }
function sudokusol( board,  i,  j,  n){
    if(i == n){
        // print(board, n);
		FillBoard(board)
        return true;
    }
    if(j == n){
       return sudokusol(board, i+1, 0, n);
    }
    if(board[i][j]!=0){
      return sudokusol(board, i, j+1, n);
    }
     //we fill the number
       for(let num = 1;num<=9;num++){
        if(isvalid(board, i, j, num, n)){
            board[i][j] = num;
          let subans =  sudokusol(board, i, j+1, n);
          if(subans){
            return true;
          }
          //backtracking
          board[i][j] = 0;
        }
       }
       return false;
}
