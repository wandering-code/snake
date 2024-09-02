var gameArea;
var gameOverArea;
var table;
var limitCells = [];
var currentOccupiedCells = [];
var pointActive = false;
var lastPointPosition = "";
var lastKeyDown = "s";

const Direction = {
    Up: 0,
    Right: 1, 
    Down: 2,
    Left: 3,
}

var board = {
    rows: 22,
    columns: 22,
    speed: 50
};

var snake = {
    x: 1,
    y: 1,
    size: 1,
    direction: Direction.Down
};

function starting() {
    initializatingGeneralVariables();
    createGameArea();
    drawingPoint();

    setInterval(function() {
        if (board.speed != 0) {
            running();
        }
    }, board.speed);
}

function running() {
    if (limitCells.includes(snake.x + "-" + snake.y)) {
        gameOver();
    }

    currentOccupiedCells.push(snake.x + "-" + snake.y);

    if (snake.direction == Direction.Up) {
        snake.x--;
    } else if (snake.direction == Direction.Down) {
        snake.x++;
    } else if (snake.direction == Direction.Left) {
        snake.y--;
    } else if (snake.direction == Direction.Right) {
        snake.y++;
    }
    
    drawingSnake(currentOccupiedCells); 
}

function drawingSnake(currentOccupiedCellsToDraw) {
    let positionsToDraw = currentOccupiedCellsToDraw.slice(currentOccupiedCellsToDraw.length - (snake.size + 1));

    for (let i = positionsToDraw.length - 1; i >= positionsToDraw.length - snake.size ; i--) {
        let cell = document.getElementById(positionsToDraw[i]);
        cell.style.backgroundColor = "green";

        if (positionsToDraw[i] == lastPointPosition) {
            document.getElementById(lastPointPosition).style.backgroundColor = "white";
            snake.size++;
            drawingPoint();
            board.speed = board.speed + 5;
        }

        if (positionsToDraw[i] == (snake.x + "-" + snake.y)) {
            gameOver();
        }

    }
    
    for (let i = 0; i < positionsToDraw.length - snake.size; i++) {
        let cell = document.getElementById(positionsToDraw[i]);
        cell.style.backgroundColor = "white";
    }
}

// Trying to improve the performance...
function drawingSnake_testing(currentOccupiedCellsToDraw) {
    // console.log("Array size: " + currentOccupiedCellsToDraw.length); 
    
    // Maybe if I copy the initial array to another keeping only the number of the sice of the snake...
    let positionsToDraw = currentOccupiedCellsToDraw.slice(currentOccupiedCellsToDraw.length - (snake.size + 1));
    console.log("Total size: " + positionsToDraw.length); 

    positionsToDraw.forEach(e => {
        document.getElementById(e).style.backgroundColor = "green";
    });

    if (positionsToDraw.find(e => e == lastPointPosition)) {
        document.getElementById(lastPointPosition).style.backgroundColor = "white";
        snake.size++;
        drawingPoint();
        board.speed = board.speed + 5;
    }

    if (positionsToDraw.find(e => e == (snake.x + "-" + snake.y))) {
        gameOver();
    }
    
    for (let i = 0; i < positionsToDraw.length - snake.size; i++) {
        let cell = document.getElementById(positionsToDraw[i]);
        cell.style.backgroundColor = "white";
    }
}

function createGameArea() {
    for (let row = 0; row < board.rows; row++) {
        var newRow = document.createElement("tr");

        for (let column = 0; column < board.columns; column++) {
            var newColumn = document.createElement("td");
            newColumn.id = row + "-" + column;
            // newColumn.textContent = row + "-" + column;

            if (row == 0 || row == 21 || column == 0 || column == 21) {
                newColumn.setAttribute("class", "limit");
                limitCells.push(newColumn.id);
            }

            newRow.appendChild(newColumn);
        }

        table.appendChild(newRow);
    }

    gameArea.appendChild(table);
}

function initializatingGeneralVariables() {
    gameArea = document.getElementById("game-area");
    gameOverArea = document.getElementById("game-over");
    gameOverArea.style.display = "none";
    table = document.getElementById("table-game-area");
}


function gameOver() {
    board.speed = 0;
    gameArea.style.display = "none";
    gameOverArea.style.display = "block";
}

window.addEventListener('keydown', function (event) {
    if (lastKeyDown == null) {
        lastKeyDown = event.key;
    }

    if (lastKeyDown !== event.key 
            && ( event.key === "a" && (lastKeyDown !== "d" && lastKeyDown !== "a"))
            || ( event.key === "w" && (lastKeyDown !== "s" && lastKeyDown !== "w"))
            || ( event.key === "d" && (lastKeyDown !== "a" && lastKeyDown !== "d"))
            || ( event.key === "s" && (lastKeyDown !== "w" && lastKeyDown !== "s"))
            && event.key !== "Escape") {
        if (event.key === "a") {
            snake.direction = Direction.Left;
        } else if (event.key === "d") {
            snake.direction = Direction.Right
        } else if (event.key === "w") {
            snake.direction = Direction.Up
        } else if (event.key === "s") {
            snake.direction = Direction.Down
        } 

        
        lastKeyDown = event.key;
    } else {
        if (event.key === "Escape") {
            if (board.speed != 0) {
                board.speed = 0; 
            } else {
                board.speed = 125;
            }
        }
    }
}, false);

function drawingPoint() {
    let x = getRandomIntInclusive(1,20);
    let y = getRandomIntInclusive(1,20);
    let id = x + "-" + y;

    while(currentOccupiedCells.includes(id)) {
        x = getRandomIntInclusive(1,20);
        y = getRandomIntInclusive(1,20);
        id = x + "-" + y;
    }
    
    document.getElementById(id).style.backgroundColor = "blue";

    lastPointPosition = id;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function refresh() {
    window.refresh();
}