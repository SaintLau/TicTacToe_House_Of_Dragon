// start
const cells = document.querySelectorAll(".cell");

// var to control who turn is:
let firstPlayer = true;
// var to control if game is active/on 
let gameOn = true;

// winning scenarios/conditions:
const winningCombos = [
    [0, 1, 2], // top lane
    [3, 4, 5], // mid lane
    [6, 7, 8], // bottom lane
    [0, 3, 6], // left column
    [1, 4, 7], // center column
    [2, 5, 8], // right column
    [0, 4, 8], // one diagonal
    [2, 4, 6], // two diagonal
]

// Add mouse-click event:
cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        // condition
        if(
            !cell.classList.contains("reds") &&
            !cell.classList.contains("greens") &&
            gameOn
        ) {
            cell.classList.add(firstPlayer ? "reds" : "greens");
            checkWinner();
            checkTie();
            firstPlayer = !firstPlayer;
        }
    });
});

// fuction check winner
function checkWinner() {
    winningCombos.forEach((combo) => {
        const [a, b, c] = combo;
        if(
            cells[a].classList.contains("reds") &&
            cells[b].classList.contains("reds") && 
            cells[c].classList.contains("reds")
        ) {
            gameOn = false; // game stops
            setTimeout(() => alert("Reds Win"), 100);
        } else if (
            cells[a].classList.contains("greens") &&
            cells[b].classList.contains("greens") && 
            cells[c].classList.contains("greens")
        ){
            gameOn = false;
            setTimeout(() => alert("Greens win"), 100);
        }
    });
}

// function restart game:
function restartGame() {
    cells.forEach((cell) => {
        cell.classList.remove("reds", "greens");
    });
    firstPlayer = true;
    gameOn = true; // starts game
}

// function to check tie
function checkTie() {
    const boardComplete = Array.from(cells).every(
        (cell) => 
            cell.classList.contains("reds") || cell.classList.contains("greens")
    );
    if(boardComplete && gameOn) {
        setTimeout(() => {
            alert("Tie! A new game will start");
            restartGame();
        }, 100);
    }
}

document.getElementById("restart").addEventListener("click", restartGame);