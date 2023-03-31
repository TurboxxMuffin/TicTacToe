const gameResult = document.querySelector("#game-result");
const cells = document.querySelectorAll(".cell");
const singleplayer = document.querySelector("#singleplayer");
const restartButton = document.querySelector("#restart-button");
const gameMode = document.querySelector("#game-mode");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let options = Array(9).fill("");
let currentPlayer = "X";
let running = false;
let computerPlayer = "O";

initializeGame();

function initializeGame(){
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartButton.addEventListener("click", restartGame);
    gameMode.addEventListener("change", gameModeChange);
    gameResult.textContent = `Tura Gracza ${currentPlayer}`;
    running = true;
}

function gameModeChange(){ 
    restartGame();   
}

function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }

    updateCell(this, cellIndex);
    checkWinner();
    if (singleplayer.checked && running) {
        makeComputerMove();
    }
}

function updateCell(cell, index){ 
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function makeComputerMove() {
    let availableCells = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i] === "") {
        availableCells.push(i);
      } 
    }
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cellIndex = availableCells[randomIndex];
    const cell = cells[cellIndex];
    updateCell(cell, cellIndex);
    checkWinner();
  }

function changePlayer(){ 
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    gameResult.textContent = `Tura Gracza ${currentPlayer}`;
}

function checkWinner(){ 
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            roundWon = true;
            break;
        }
    }

    if(roundWon){
        gameResult.textContent = `${currentPlayer} wygrywa!`;
        running = false; 
    }
    else if(!options.includes("")){
        gameResult.textContent = `Remis!`;
        running = false;
    }
    else{
        changePlayer();
    }
}

function restartGame(){ 
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    gameResult.textContent = `Tura Gracza ${currentPlayer}`;
    cells.forEach(cell => cell.textContent = "");
    running = true;
}


