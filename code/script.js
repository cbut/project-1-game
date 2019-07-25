let gameCanvas
let ctx
let playerCharacter

class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heigth = 50;
        this.width = 50;
        this.border = true;
    }
}

class player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    moveDirection(horizontal, vertical) {
        this.x += horizontal;
        this.y += vertical;
    }
}


let levelMap = [[],
[],
[],
[],
[],]



function populateLevelMapWithCells() {
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            cellObject = new cell((i * 50), (j * 50))
            levelMap[i].push(cellObject)
        }
    }
    levelMap[1][1].border = false
    levelMap[1][2].border = false
    levelMap[1][3].border = false
    levelMap[2][3].border = false
    levelMap[2][4].border = false
    levelMap[3][4].border = false
}

function drawCells() {
    for (i = 0; i < 5; i++) {
        for (j = 0; j < 5; j++) {
            let location = levelMap[i][j]
            if (location.border == true) {
                ctx.fillStyle = "black"
                ctx.fillRect(location.x, location.y, location.heigth, location.width)
                ctx.fillStyle = "black"
            }
            else {
                ctx.fillStyle = "grey"
                ctx.fillRect(location.x, location.y, location.heigth, location.width)
                ctx.fillStyle = "black"
            }
        }
    }
}

function clearBoard() {
    fillStyle = "black"
    ctx.fillRect(0, 0, 500, 500)
}

function drawPlayer() {
    player = new Image(50, 50)
    player.src = './images/big_zombie_idle_anim_f0.png';
    player.onload = function () {
        ctx.drawImage(player, playerCharacter.x, playerCharacter.y, 50, 50)
    }
}

function drawBoard() {
    clearBoard()
    drawCells()
    drawPlayer()
}

function startGame() {
    populateLevelMapWithCells()

    playerCharacter = new player(levelMap[2][4].x, levelMap[2][4].y)
    // playerCharacter.x = levelMap[2][4].x
    // playerCharacter.y = levelMap[2][4].y
    drawBoard()
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 38: // up arrow
                playerCharacter.moveDirection(0, -50);
                drawBoard()
                break;
            case 40: // down arrow
                playerCharacter.moveDirection(0, 50);
                drawBoard()
                break;
            case 37: // left arrow
                playerCharacter.moveDirection(-50, 0);
                drawBoard()
                break;
            case 39: // right arrow
                playerCharacter.moveDirection(50, 0);
                drawBoard()
                break;
        }
    };
}







window.onload = function () {
    gameCanvas = document.getElementById('game');
    ctx = gameCanvas.getContext('2d');
    document.getElementById("start-button").onclick = function () {
        startGame();
    };

};