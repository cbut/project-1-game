let gameCanvas
let ctx
let playerCharacter
// mapSize = how many tiles the map square has
let mapSize = 40;
let tileSize = 20;
let levelMap = []
let whatLevelAreWeIn = 1
let monstersInLevel = []
let lootTable = []
let levelExit = {
    x: 0,
    y: 0
}
let playerInventory = []
let playerImg = new Image(50, 50)
playerImg.src = './images/big_zombie_idle_anim_f0.png';
let monsterImg = new Image(50, 50)
monsterImg.src = './images/big_demon_idle_anim_f0.png';
let exitImg = new Image(50, 50)
exitImg.src = './images/doors_leaf_closed.png';
let lootImg = new Image(50, 50)
lootImg.src = './images/chest_empty_open_anim_f0.png';

class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heigth = tileSize;
        this.width = tileSize;
        this.wall = true;
        this.visible = false;
    }
}

class player {
    constructor(x, y) {
        this.maximumHealth = 50;
        this.currentHealth = 50;
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
        this.visible = false;
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

class stationaryObjectsWithLocation {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.visible = false;
    }
}


class exit extends stationaryObjectsWithLocation {
    // checkForPlayerProximity(whichObject, numberOfTilesAroundObject)
    constructor(x, y) {
        super(x, y)
    }
}


class weapons {
    constructor(whatLevelAreWeIn) {
        this.addedDamage = Math.floor(Math.random() * whatLevelAreWeIn)
    }
}

class armor {
    constructor(whatLevelAreWeIn) {
        this.addedArmor = Math.floor(Math.random() * whatLevelAreWeIn)
    }
}

class loot extends stationaryObjectsWithLocation {
    // checkForPlayerProximity(whichObject, numberOfTilesAroundObject)
    constructor(x, y) {
        super(x, y)
    }

    giveLoot(whatLevelAreWeIn) {
        if (Math.floor(Math.random() * 2) == 1) {
            return new armor(whatLevelAreWeIn)
        }
        else {
            return new weapon(whatLevelAreWeIn)
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

function populateLootTable(level) {
    let position = generateAPositionOnMapWithoutWalls()
    let loot1 = new loot(position[0] * tileSize, position[1] * tileSize)
    lootTable.push(loot1)
}

function createMonsters(howMany) {
    for (i = 0; i < howMany; i++) {
        let position = generateAPositionOnMapWithoutWalls()
        let monsterVariable = new monster(position[0] * tileSize, position[1] * tileSize)
        monstersInLevel.push(monsterVariable)
    }
}



function drawCells() {
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            let location = levelMap[i][j]
            ctx.fillStyle = "black"
            ctx.fillRect(location.x, location.y, location.heigth, location.width)
            if (location.visible == true) {
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
}

function clearBoard() {
    fillStyle = "black"
    ctx.fillRect(0, 0, 500, 500)
}

function drawPlayer() {

    // playerImg.onload = function () {
    ctx.drawImage(playerImg, (playerCharacter.x), (playerCharacter.y), tileSize, tileSize)
    // }
}
function drawMonsters() {
    if (monstersInLevel.length != 0) {
        for (i = 0; i < monstersInLevel.length; i++) {
            drawMonster(monstersInLevel[i])
        }
    }
}

function generateAPositionOnMapWithoutWalls() {
    let result = {
        x: 0,
        y: 0
    }
    let helperArray = []
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            let location = levelMap[i][j]
            let posX = i
            let posY = j
            console.log
            if (location.wall == false) {
                helperArray.push({ x: i, y: j })
            }
        }
    }
    let randomObjectInArray = Math.floor(Math.random() * helperArray.length)
    let positionXofRandomPosition = helperArray[randomObjectInArray].x
    let positionYofRandomPosition = helperArray[randomObjectInArray].y
    return [positionXofRandomPosition, positionYofRandomPosition]

}

function drawMonster(monsterID) {

    // monsterImg.onload = function () {
    ctx.drawImage(monsterImg, (monsterID.x), (monsterID.y), tileSize, tileSize)
    // }
}

function generateLevelExit() {
    let position = generateAPositionOnMapWithoutWalls()
    levelExit.x = position[0] * tileSize
    levelExit.y = position[1] * tileSize
}

function drawExit() {
    // exitImg.onload = function () {
    ctx.drawImage(exitImg, (levelExit.x), (levelExit.y), tileSize, tileSize)
    // }
}

function drawLoot() {
    // if (monstersInLevel.length != 0) {
    for (i = 0; i < lootTable.length; i++) {
        let currentLoot = lootTable[i]
        // lootImg.onload = function () {
        ctx.drawImage(lootImg, (currentLoot.x), (currentLoot.y), tileSize, tileSize)
        // }
    }
    // }
}

function moveMonsters() {
    for (i = 0; i < monstersInLevel.length; i++) {
        let currentMonster = monstersInLevel[i]
        moveMonster(currentMonster)
    }
}

function checkIfNearExit() {
    let x1 = levelExit.x / tileSize
    let y1 = levelExit.y / tileSize
    if ((playerCharacter.x / tileSize == x1) && (playerCharacter.y / tileSize == y1)) {
        whatLevelAreWeIn += 1
        initLevel()
    }
}

// proximity check is called every time the board is redrawn, for example after hero or monster moved, in order to initiate fights
function checkAllMonstersForProximity() {
    for (i = 0; i < monstersInLevel.length; i++) {
        let currentMonster = monstersInLevel[i]
        // checks for playerCharacter.currentHealth to prevent further fights against hero's corpse after hero's deatj
        if ((checkForPlayerProximity(currentMonster, 1) && (playerCharacter.currentHealth > 0)) == true) {
            fight(currentMonster)
        }

    }
}

function checkForPlayerProximity(whichObject, numberOfTilesAroundObject) {
    //checks whether "whichObject" is in a square centered around "whichObject" which sides are "numberOfTilesAroundObject" away from ""whichObject
    // x1 is the x-value of the left border around the whichObject
    let x1 = whichObject.x / tileSize - numberOfTilesAroundObject
    let x2 = whichObject.x / tileSize + numberOfTilesAroundObject
    let y1 = whichObject.y / tileSize - numberOfTilesAroundObject
    let y2 = whichObject.y / tileSize + numberOfTilesAroundObject
    if ((playerCharacter.x / tileSize >= x1 && playerCharacter.x / tileSize <= x2) && (playerCharacter.y / tileSize >= y1 && playerCharacter.y / tileSize <= y2)) {
        return true
    }
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

    fogOfWar()
    drawCells()

    drawLoot()
    drawExit()
    checkIfNearExit()
    drawMonsters()
    checkAllMonstersForProximity()
    drawPlayer()
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

function level2() {
    levelMap[3][3].isPlayerInCell = true
    levelMap[3][3].wall = false
    levelMap[3][4].wall = false
    levelMap[3][3].wall = false
    levelMap[4][3].wall = false
    levelMap[4][4].wall = false
    levelMap[4][3].wall = false
    levelMap[4][4].wall = false
    levelMap[4][5].wall = false
    levelMap[3][5].wall = false
    levelMap[4][5].wall = false
    levelMap[4][6].wall = false
    levelMap[4][7].wall = false
    levelMap[4][8].wall = false
    levelMap[5][6].wall = false
    levelMap[5][5].wall = false
    levelMap[5][8].wall = false
    levelMap[6][6].wall = false
    levelMap[6][8].wall = false
    levelMap[6][5].wall = false
    levelMap[5][6].wall = false
    levelMap[5][8].wall = false
    levelMap[5][5].wall = false
}

function fogOfWar() {
    // all cells visible==false
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            levelMap[i][j].visible == false
        }
    }
    let testXLeft
    let testYUp
    let testXRight
    let testYDown
    // the visibiliy radius will search over the map array, so we have to exclude cases where it would try to access
    // tiles outside of the map like levelMap[-1][-2]
    if (playerCharacter.x / tileSize - 2 < 0) {
        testXLeft = 0
    } else {
        testXLeft = playerCharacter.x / tileSize - 2
    }
    if (playerCharacter.x / tileSize + 2 > mapSize) {
        testXRight = mapSize
    } else {
        testXRight = playerCharacter.x / tileSize + 2
    }
    if (playerCharacter.y / tileSize - 2 < 0) {
        testYUp = 0
    } else {
        testYUp = playerCharacter.y / tileSize - 2
    }
    if (playerCharacter.y / tileSize + 2 > mapSize) {
        testYDown = mapSize
    } else {
        testYDown = playerCharacter.y / tileSize + 2
    }
    // set visibility == true around the player
    for (i = (testXLeft); i < (testXRight); i++) {
        for (j = (testYUp); j < (testYDown); j++) {

            levelMap[i][j].visible = true
        }
    }

    // walls

    // but not behind walls
    // put object.visible == true
}

function initLevel() {
    monstersInLevel = []
    lootTable = []
    populateLevelMapWithCells()
    if (whatLevelAreWeIn == 1) {
        level1()
    }
    else if (whatLevelAreWeIn == 2) {
        level2()
    }
    else {
        appendInfoBar("you won! you found the exit out of the dungeon!")
    }
    if (typeof playerCharacter == "undefined") {
        let position = generateAPositionOnMapWithoutWalls()
        playerCharacter = new player(position[0] * tileSize, position[1] * tileSize)
    } else {
        let position = generateAPositionOnMapWithoutWalls()
        playerCharacter.x = position[0] * tileSize
        playerCharacter.y = position[1] * tileSize
    }
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            levelMap[i][j].visible == false
        }
    }

    populateLootTable(whatLevelAreWeIn)
    generateLevelExit()
    createMonsters(1)

    loadInfobar()
}


function startGame() {
    initLevel()
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
    topDiv.innerHTML = "" // deletes start button or fight log etc
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

// used to push fight log etc into document
function appendInfoBar(textForTheDiv) {
    let divToAdd = document.createElement('div')
    divToAdd.innerText = textForTheDiv
    document.getElementById("game-intro").appendChild(divToAdd)
}

function appendWinButtonToInfoBar() {
    let buttonToAdd = document.createElement('button')
    buttonToAdd.innerText = "cool!"
    document.getElementById("game-intro").appendChild(buttonToAdd)
    buttonToAdd.onclick = function () {
        loadInfobar()
    }
}

function appendLoseButtonToInfoBar() {
    let buttonToAdd = document.createElement('button')
    buttonToAdd.innerText = "start new game"
    document.getElementById("game-intro").appendChild(buttonToAdd)
    buttonToAdd.onclick = function () {
        startGame()
    }
}

function removeDeadMonstersFromGame(monsterID) {
    for (i = 0; i < monstersInLevel.length; i++) {
        if (monstersInLevel[i].currentHealth < 1) {
            monstersInLevel.splice(i, 1)
        }
    }
}

function getXPAfterFight(MonsterID) {
    return MonsterID.damage * 10
}

function getLoot(level) {

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
        removeDeadMonstersFromGame(monsterID)
        let XP = getXPAfterFight(monsterID)
        appendInfoBar(`Hero wins and gets ${XP} XP`)
        playerCharacter.experiencePoints += XP
        updateHeroStatsInInfoBar()
        appendWinButtonToInfoBar()
        drawBoard()
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