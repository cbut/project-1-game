let gameCanvas
let ctx
let playerCharacter
// mapSize = how many tiles the map square has
let mapSize = 10;
let tileSize = 25;
let levelMap = []
let monstersInLevel = []
let state

class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heigth = tileSize;
        this.width = tileSize;
        this.wall = true;
    }
}

class player {
    constructor(x, y) {
        this.maximumHealth = 50;
        this.currentHealth = 1;
        this.damage = 10;
        this.armor = 4;
        this.experiencePoints = 0;
        this.x = x;
        this.y = y;
    }
    moveDirection(horizontal, vertical) {
        this.x += horizontal;
        this.y += vertical;
    }

    attack(enemy) {
        let dealtDamage = Math.floor(Math.random() * playerCharacter.damage) - enemy.armor
        if (dealtDamage <= 0) { dealtDamage = 0 }
        enemy.currentHealth -= dealtDamage
        if (enemy.currentHealth > 0) {
            appendInfoBar(`Hero hits monster for ${dealtDamage}`)
        } else {
            appendInfoBar(`Hero kills monster with ${dealtDamage}`)
        }
    }
}

class monster {
    constructor(x, y) {
        this.maximumHealth = 25;
        this.currentHealth = 25;
        this.damage = 10;
        this.armor = 1;
        this.x = x;
        this.y = y;
    }
    moveDirection(horizontal, vertical) {
        this.x += horizontal;
        this.y += vertical;
    }
    attack() {
        let dealtDamage = Math.floor(Math.random() * this.damage) - playerCharacter.armor
        if (dealtDamage <= 0) { dealtDamage = 0 }
        playerCharacter.currentHealth -= dealtDamage
        if (playerCharacter.currentHealth > 0) {
            appendInfoBar(`Monster hits Hero for ${dealtDamage}`)
            updateHeroStatsInInfoBar()
        } else {
            appendInfoBar(`Monster kills Hero with ${dealtDamage}`)
            updateHeroStatsInInfoBar()
        }
    }
}

function populateLevelMapWithCells(level) {
    for (i = 0; i < mapSize; i++) {
        levelMap[i] = new Array()
        for (j = 0; j < mapSize; j++) {
            cellObject = new cell((i * tileSize), (j * tileSize))
            levelMap[i].push(cellObject)
        }
    }
}
function createMonsters(howMany) {
    for (i = 0; i < howMany; i++) {
        let monsterVariable = new monster(6 * tileSize, 7 * tileSize)
        monstersInLevel.push(monsterVariable)
    }
}



function drawCells() {
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            let location = levelMap[i][j]
            if (location.wall == true) {
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

function clearBoard() {
    fillStyle = "black"
    ctx.fillRect(0, 0, 500, 500)
}

function drawPlayer() {
    let playerImg = new Image(50, 50)
    playerImg.src = './images/big_zombie_idle_anim_f0.png';
    playerImg.onload = function () {
        ctx.drawImage(playerImg, (playerCharacter.x), (playerCharacter.y), tileSize, tileSize)
    }
}
function drawMonsters() {
    for (i = 0; i < monstersInLevel.length; i++) {
        drawMonster(monstersInLevel[i])
    }
}

function drawMonster(monsterID) {
    let monsterImg = new Image(50, 50)
    monsterImg.src = './images/big_zombie_idle_anim_f0.png';
    monsterImg.onload = function () {
        ctx.drawImage(monsterImg, (monsterID.x), (monsterID.y), tileSize, tileSize)
    }
}



function moveMonsters() {
    for (i = 0; i < monstersInLevel.length; i++) {
        let currentMonster = monstersInLevel[i]
        moveMonster(currentMonster)
        checkForPlayerProximity(currentMonster)
    }
}

function checkForPlayerProximity(whichMonster) {
    let proximateInXAxis = (((playerCharacter.x / tileSize - whichMonster.x / tileSize) || (whichMonster.x / tileSize - playerCharacter.x / tileSize)) == (1 || 0 || -1))
    let proximateInYAxis = (((playerCharacter.y / tileSize - whichMonster.y / tileSize) || (whichMonster.y / tileSize - playerCharacter.y / tileSize)) == (1 || 0 || -1))
    console.log(proximateInXAxis)
    console.log(proximateInYAxis)
    // console.log((playerCharacter.x / tileSize - whichMonster.x / tileSize))
    // console.log((playerCharacter.y / tileSize - whichMonster.y / tileSize))
    // console.log((whichMonster.x / tileSize - playerCharacter.x / tileSize))
    // console.log((whichMonster.y / tileSize - playerCharacter.y / tileSize))
    // if ((((playerCharacter.x / tileSize - whichMonster.x / tileSize) (1 || 0 || -1)) ||
    // (whichMonster.x / tileSize - playerCharacter.x / tileSize)) == (1 || 0 || -1))) &&
    //  (((playerCharacter.y / tileSize - whichMonster.y / tileSize) == (1 || 0 || -1)) ||
    //   (whichMonster.y / tileSize - playerCharacter.y / tileSize)) == (1 || 0 || -1))) {
    //     fight(whichMonster)
    // }
}

function moveMonster(monsterID) {
    let direction = Math.floor(Math.random() * 4 + 37)
    switch (direction) {
        case 38: // up arrow
            if (levelMap[monsterID.x / tileSize][monsterID.y / tileSize - 1].wall == false) {
                monsterID.moveDirection(0, -(tileSize))
            }
            drawBoard()
            break;
        case 40: // down arrow
            if (levelMap[monsterID.x / tileSize][monsterID.y / tileSize + 1].wall == false) {
                monsterID.moveDirection(0, tileSize)
            }
            drawBoard()
            break;
        case 37: // left arrow
            if (levelMap[monsterID.x / tileSize - 1][monsterID.y / tileSize].wall == false) {
                monsterID.moveDirection(-(tileSize), 0)
            }
            drawBoard()
            break;
        case 39: // right arrow
            if (levelMap[monsterID.x / tileSize + 1][monsterID.y / tileSize].wall == false) {
                monsterID.moveDirection(tileSize, 0)
            }
            drawBoard()
            break;
    }
}

function drawBoard() {
    clearBoard()
    drawCells()
    drawPlayer()
    drawMonsters()
}

function level1() {
    levelMap[1][1].isPlayerInCell = true
    levelMap[1][1].wall = false
    levelMap[1][2].wall = false
    levelMap[1][3].wall = false
    levelMap[2][1].wall = false
    levelMap[2][2].wall = false
    levelMap[2][3].wall = false
    levelMap[2][4].wall = false
    levelMap[2][5].wall = false
    levelMap[3][5].wall = false
    levelMap[4][5].wall = false
    levelMap[4][6].wall = false
    levelMap[4][7].wall = false
    levelMap[4][8].wall = false
    levelMap[5][6].wall = false
    levelMap[5][7].wall = false
    levelMap[5][8].wall = false

    levelMap[6][6].wall = false
    levelMap[6][8].wall = false
    levelMap[6][7].wall = false
    levelMap[7][6].wall = false
    levelMap[7][8].wall = false
    levelMap[7][7].wall = false


}

function init() {
    playerCharacter = new player(50, 50)
    monstersInLevel = []
    // state = unpaused
    loadInfobar()
    createMonsters(1)
    populateLevelMapWithCells()
    level1()
}

function startGame() {
    init()
    drawBoard()
    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 38: // up arrow
                if (levelMap[playerCharacter.x / tileSize][playerCharacter.y / tileSize - 1].wall == false) {
                    playerCharacter.moveDirection(0, -(tileSize))
                }
                drawBoard()
                break;
            case 40: // down arrow
                if (levelMap[playerCharacter.x / tileSize][playerCharacter.y / tileSize + 1].wall == false) {
                    playerCharacter.moveDirection(0, tileSize)
                }
                drawBoard()
                break;
            case 37: // left arrow
                if (levelMap[playerCharacter.x / tileSize - 1][playerCharacter.y / tileSize].wall == false) {
                    playerCharacter.moveDirection(-(tileSize), 0)
                }
                drawBoard()
                break;
            case 39: // right arrow
                if (levelMap[playerCharacter.x / tileSize + 1][playerCharacter.y / tileSize].wall == false) {
                    playerCharacter.moveDirection(tileSize, 0)
                }
                drawBoard()
                break;
        }
        moveMonsters()
    };
}

function loadInfobar() {
    let topDiv = document.getElementById("game-intro")
    topDiv.innerHTML = ""
    let heroStatsDiv = document.createElement('div')
    heroStatsDiv.classList.add("heroStatsDiv")
    heroStatsDiv.innerText = `Health: ${playerCharacter.currentHealth}/${playerCharacter.maximumHealth}
    Damage: 1-${playerCharacter.damage}
            Armor: ${playerCharacter.armor}            
            Experience Points: ${playerCharacter.experiencePoints}`
    topDiv.appendChild(heroStatsDiv)
}

function updateHeroStatsInInfoBar() {
    let topDiv = document.getElementsByClassName("heroStatsDiv")[0].innerText = `Health: ${playerCharacter.currentHealth}/${playerCharacter.maximumHealth}
    Damage: 1-${playerCharacter.damage}
            Armor: ${playerCharacter.armor}
            Experience Points: ${playerCharacter.experiencePoints}`

}

function appendInfoBar(textForTheDiv) {
    let divToAdd = document.createElement('div')
    divToAdd.innerText = textForTheDiv
    document.getElementById("game-intro").appendChild(divToAdd)
}

function appendWinButtonToInfoBar() {
    let buttonToAdd = document.createElement('button')
    buttonToAdd.innerText = "kk thx"
    document.getElementById("game-intro").appendChild(buttonToAdd)
    buttonToAdd.onclick = function () {
        loadInfobar()
    }
}

function appendLoseButtonToInfoBar() {
    let buttonToAdd = document.createElement('button')
    buttonToAdd.innerText = "RIP gg start new game"
    document.getElementById("game-intro").appendChild(buttonToAdd)
    buttonToAdd.onclick = function () {
        startGame()
    }
}

function assignLoot(MonsterID) {
    return MonsterID.damage * 10
}

function fight(monsterID) {
    appendInfoBar("FIGHT!!!!!!")
    while (playerCharacter.currentHealth > 0 && monsterID.currentHealth > 0) {
        playerCharacter.attack(monsterID)
        if (monsterID.currentHealth > 0) {
            monsterID.attack()
        }
    }
    if (playerCharacter.currentHealth > 0) {
        let XP = assignLoot(monsterID)
        appendInfoBar(`Hero wins and gets ${XP} XP`)
        playerCharacter.experiencePoints += XP
        appendWinButtonToInfoBar()
    }
    else {
        appendInfoBar(`REKT`)
        appendLoseButtonToInfoBar()
    }
}


window.onload = function () {
    gameCanvas = document.getElementById('game');
    ctx = gameCanvas.getContext('2d');
    document.getElementById("start-button").onclick = function () {
        startGame();
    };

};