let gameCanvas
let ctx
let playerCharacter
// mapSize = how many tiles the map square has
let mapSize = 20;
let levelMap = []

class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heigth = 50;
        this.width = 50;
        this.border = true;
        this.isPlayerInCell = false;
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

function populateLevelMapWithCells() {
    for (i = 0; i < mapSize; i++) {
        levelMap[i] = new Array()
        for (j = 0; j < mapSize; j++) {
            cellObject = new cell((i * 50), (j * 50))
            levelMap[i].push(cellObject)
        }
    }
    levelMap[1][1].border = false
    levelMap[1][1].isPlayerInCell = true
    levelMap[1][2].border = false
    levelMap[1][3].border = false
    levelMap[2][3].border = false
    levelMap[2][4].border = false
    levelMap[3][4].border = false
}

function drawCells() {
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            let location = levelMap[i][j]
            if (location.border == true) {
                ctx.fillStyle = "DarkGrey"
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

function findPlayer() {
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            if (levelMap[i][j].isPlayerInCell == true) {
                return [i, j]
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
        ctx.drawImage(player, (findPlayer()[0] * 50), (findPlayer()[1] * 50), 50, 50)
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
                if (levelMap[findPlayer()[0]][(findPlayer()[1] - 1)].border == false) {
                    let currentX = findPlayer()[0]
                    let currentY = findPlayer()[1]
                    levelMap[currentX][currentY - 1].isPlayerInCell = true
                    levelMap[currentX][currentY].isPlayerInCell = false
                }
                drawBoard()
                break;
            case 40: // down arrow
                if (levelMap[findPlayer()[0]][(findPlayer()[1] + 1)].border == false) {
                    let currentX = findPlayer()[0]
                    let currentY = findPlayer()[1]
                    levelMap[currentX][currentY + 1].isPlayerInCell = true
                    levelMap[currentX][currentY].isPlayerInCell = false
                }
                drawBoard()
                break;
            case 37: // left arrow
                if (levelMap[(findPlayer()[0] - 1)][findPlayer()[1]].border == false) {
                    let currentX = findPlayer()[0]
                    let currentY = findPlayer()[1]
                    levelMap[currentX - 1][currentY].isPlayerInCell = true
                    levelMap[currentX][currentY].isPlayerInCell = false
                }
                drawBoard()
                break;
            case 39: // right arrow
                if (levelMap[(findPlayer()[0] + 1)][findPlayer()[1]].border == false) {
                    let currentX = findPlayer()[0]
                    let currentY = findPlayer()[1]
                    levelMap[currentX + 1][currentY].isPlayerInCell = true
                    levelMap[currentX][currentY].isPlayerInCell = false
                }
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