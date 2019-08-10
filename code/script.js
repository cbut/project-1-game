let gameCanvas
let ctx
let playerCharacter
// mapSize = how many tiles the map square has
let mapSize = 20;
let tileSize = 25;
let levelMap = []
let whatLevelAreWeIn = 1
let monstersInLevel = []
let lootTable = []
let playerImg = new Image(50, 50)
playerImg.src = './images/big_zombie_idle_anim_f0.png';
let monsterImg = new Image(50, 50)
monsterImg.src = './images/big_demon_idle_anim_f0.png';
let exitImg = new Image(50, 50)
exitImg.src = './images/doors_leaf_closed.png';
let lootImg = new Image(50, 50)
lootImg.src = './images/chest_empty_open_anim_f0.png';
let floorImg = new Image(50, 50)
floorImg.src = './images/stonefloor.png'
let lavaWallImg = new Image(50, 50)
lavaWallImg.src = './images/lavarocks.png'
let fireWallImg = new Image(50, 50)
fireWallImg.src = './images/75810180-abstract-blaze-fire-flame-texture-background.jpg'
let iceWallImg = new Image(50, 50)
iceWallImg.src = './images/ice texture.jpg'
chaosWallImg = new Image(50, 50)
chaosWallImg.src = './images/butterflies.jpg'
let levelExit
let pause = false


class cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.heigth = tileSize;
        this.width = tileSize;
        this.wall = true;
        this.visible = false;
    }
    draw() {
        if (this.visible == true) {
            if (this.wall == true) {
                if (whatLevelAreWeIn == 1) {
                    ctx.drawImage(lavaWallImg, this.x, this.y, tileSize, tileSize)
                }
                else if (whatLevelAreWeIn == 2) {
                    ctx.drawImage(iceWallImg, this.x, this.y, tileSize, tileSize)
                }
                else if (whatLevelAreWeIn == 3) {
                    ctx.drawImage(fireWallImg, this.x, this.y, tileSize, tileSize)
                }
                else {
                    ctx.drawImage(chaosWallImg, this.x, this.y, tileSize, tileSize)
                }
            }
            else {
                // ctx.fillStyle = "grey"
                ctx.drawImage(floorImg, this.x, this.y, tileSize, tileSize)
                // ctx.fillRect(location.x, location.y, tileSize, location.width)
                // ctx.fillStyle = "black"
            }

        }
    }
}

class player {
    constructor(x, y) {
        this.maximumHealth = 25;
        this.currentHealth = 25;
        this.damage = 10;
        this.armor = 4;
        this.healingPotions = 0
        this.experiencePoints = 0;
        this.x = x;
        this.y = y;
        this.weaponDamageAdded = 0
        this.armorAdded = 0
        this.healthPotion = 0
        this.hasKey = false
        this.level = 0
    }
    moveDirection(horizontal, vertical) {
        this.x += horizontal;
        this.y += vertical;
    }
    draw() {

        // playerImg.onload = function () {
        ctx.drawImage(playerImg, (this.x), (this.y), tileSize, tileSize)
        // }
    }
    levelUp() {
        this.level++
        this.maximumHealth += Math.floor(Math.random() * 10)
        this.currentHealth = this.maximumHealth
        appendInfoBar(`LevelUp! Hero is now Level ${this.level}`)
    }

    attack(enemy) {
        let dealtDamage = Math.floor(Math.random() * (playerCharacter.damage + playerCharacter.weaponDamageAdded)) - enemy.armor
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
        let dealtDamage = Math.floor(Math.random() * this.damage) - playerCharacter.armor - playerCharacter.armorAdded
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
    draw() {
        if (levelMap[this.x / tileSize][this.y / tileSize].visible) {
            ctx.drawImage(monsterImg, (this.x), (this.y), tileSize, tileSize)
        }
    }

}

class stationaryObjectsWithLocation {
    constructor(x, y, image) {
        this.x = x;
        this.y = y;
        this.image = image;
        this.inGame = true;
    }
    draw() {
        if (this.inGame == true) {
            if (levelMap[this.x / tileSize][this.y / tileSize].visible) {
                ctx.drawImage(this.image, (this.x), this.y, tileSize, tileSize)
            }
        }
    }
}


class exit extends stationaryObjectsWithLocation {
    // checkForPlayerProximity(whichObject, numberOfTilesAroundObject)
    constructor(x, y) {
        super(x, y, exitImg)
    }
}




class loot extends stationaryObjectsWithLocation {
    // checkForPlayerProximity(whichObject, numberOfTilesAroundObject)
    constructor(x, y) {
        super(x, y, lootImg)
    }
    giveLoot(whatLevelAreWeIn) {
        if (Math.floor(Math.random() * 2) == 1) {
            let armorVariable = 1 + Math.floor(Math.random() * whatLevelAreWeIn)
            if (armorVariable > playerCharacter.armorAdded) {
                playerCharacter.armorAdded = armorVariable
            }
            loadInfobar()
            appendInfoBar(`You found armor +${armorVariable}!`)
        }
        else {
            let weaponVariable = 1 + Math.floor(Math.random() * whatLevelAreWeIn)
            console.log(weaponVariable + '>' + playerCharacter.weaponDamageAdded)
            if (weaponVariable > playerCharacter.weaponDamageAdded) {
                console.log('weapon if clause engaged')
                playerCharacter.weaponDamageAdded = weaponVariable
            }
            loadInfobar()
            appendInfoBar(`You found a weapon + ${weaponVariable}!`)
        }
    }

    checkIfNearPlayer() {
        if (this.inGame == true) {
            let x1 = this.x / tileSize
            let y1 = this.y / tileSize
            if ((playerCharacter.x / tileSize == x1) && (playerCharacter.y / tileSize == y1)) {
                this.giveLoot(whatLevelAreWeIn)
                this.inGame = false

            }
        }
    }
}

class keyChest extends stationaryObjectsWithLocation {
    constructor(x, y) {
        super(x, y, lootImg)
    }


    checkIfNearPlayer() {
        let x1 = this.x / tileSize
        let y1 = this.y / tileSize
        if (this.inGame == true) {
            if ((playerCharacter.x / tileSize == x1) && (playerCharacter.y / tileSize == y1)) {
                playerCharacter.hasKey = true
                appendInfoBar('You have found a key!')
                this.inGame = false
            }
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
    position = generateAPositionOnMapWithoutWalls()
    let keyChest1 = new keyChest(position[0] * tileSize, position[1] * tileSize)
    lootTable.push(keyChest1)
}

function createMonsters(howMany) {
    for (i = 0; i < (howMany); i++) {
        let position = generateAPositionOnMapWithoutWalls()
        let monsterVariable = new monster(position[0] * tileSize, position[1] * tileSize)
        console.log("one monster created")
        monstersInLevel.push(monsterVariable)
    }
}



function drawCells() {
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            levelMap[i][j].draw()
        }
    }
}

function clearBoard() {
    fillStyle = "black"
    ctx.fillRect(0, 0, 500, 500)
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
    levelExit.visible = false;
}

function drawExit() {
    if (levelMap[levelExit.x / tileSize][levelExit.y / tileSize].visible) {
        ctx.drawImage(exitImg, (levelExit.x), (levelExit.y), tileSize, tileSize)
    }
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
        if (playerCharacter.hasKey == true) {
            whatLevelAreWeIn += 1
            monstersInLevel = []
            initLevel()
        }
        else {
            loadInfobar()
            appendInfoBar('you need a key')
        }
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

function checkForLevelUp() {
    if (playerCharacter.experiencePoints >= 150 && playerCharacter.level < 1) {
        playerCharacter.levelUp()
    }
    else if (playerCharacter.experiencePoints >= 250 && playerCharacter.level < 2) {
        playerCharacter.levelUp()
    }
    updateHeroStatsInInfoBar()
}

function drawBoard() {
    clearBoard()

    fogOfWar()
    drawCells()

    lootTable.forEach(loot => loot.draw())
    lootTable.forEach(loot => loot.checkIfNearPlayer())
    levelExit.draw()
    checkIfNearExit()
    monstersInLevel.forEach(monster => monster.draw())
    checkAllMonstersForProximity()
    checkForLevelUp()
    playerCharacter.draw()
}

function fogOfWar() {
    // all cells visible==false
    // for (i = 0; i < levelMap.length; i++) {
    //     for (j = 0; j < levelMap.length; j++) {
    //         levelMap[i][j].visible == false
    //     }
    // }

    let testXLeft
    let testYUp
    let testXRight
    let testYDown
    // the visibiliy radius will search over the map array, so we have to exclude cases where it would try to access
    // tiles outside of the map like levelMap[-1][-2]
    if (playerCharacter.x / tileSize - 2 < 0 || playerCharacter.x / tileSize - 1 < 0) {
        testXLeft = 0
    } else {
        testXLeft = playerCharacter.x / tileSize - 2
    }
    if (playerCharacter.x / tileSize + 3 > mapSize || playerCharacter.x / tileSize + 2 > mapSize || playerCharacter.x / tileSize + 1 > mapSize) {
        testXRight = mapSize
    } else {
        testXRight = playerCharacter.x / tileSize + 3
    }
    if (playerCharacter.y / tileSize - 2 < 0 || playerCharacter.y / tileSize - 1 < 0) {
        testYUp = 0
    } else {
        testYUp = playerCharacter.y / tileSize - 2
    }
    if (playerCharacter.y / tileSize + 3 > mapSize || playerCharacter.y / tileSize + 2 > mapSize || playerCharacter.y / tileSize + 2 > mapSize) {
        testYDown = mapSize
    } else {
        testYDown = playerCharacter.y / tileSize + 3
    }
    // set visibility == true around the player
    for (i = (testXLeft); i < (testXRight); i++) {
        for (j = (testYUp); j < (testYDown); j++) {

            levelMap[i][j].visible = true

        }

    }
    if (checkForPlayerProximity(levelExit, 2)) {
        levelExit.visible = true
    } else { levelExit.visible == false }
    // walls

    // but not behind walls
    // put object.visible == true
}

function initLevel() {
    pause = false
    monstersInLevel = []
    lootTable = []
    populateLevelMapWithCells()
    levelExit = new exit
    if (whatLevelAreWeIn == 5) {
        appendInfoBar("you won! you found the exit out of the dungeon!")
    }
    else {
        genLevel()
    }
    if (typeof playerCharacter == "undefined") {
        let position = generateAPositionOnMapWithoutWalls()
        playerCharacter = new player(position[0] * tileSize, position[1] * tileSize)
    } else {
        let position = generateAPositionOnMapWithoutWalls()
        playerCharacter.x = position[0] * tileSize
        playerCharacter.y = position[1] * tileSize
        playerCharacter.hasKey = false
    }
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            levelMap[i][j].visible = false
        }
    }

    populateLootTable(whatLevelAreWeIn)
    generateLevelExit()
    createMonsters(3)

    loadInfobar()
}

function genLevel() {
    let level
    if (whatLevelAreWeIn == 1) {
        level = level1Map
    }
    else if (whatLevelAreWeIn == 2) {
        level = level2Map
    }
    else if (whatLevelAreWeIn == 3) {
        level = level3Map
    }
    else if (whatLevelAreWeIn == 4) {
        level = level4Map
    }

    const rows = level.split('\n').map(row => row.split(''));
    console.log(rows); 4
    for (i = 0; i < mapSize; i++) {
        for (j = 0; j < mapSize; j++) {
            if (rows[i][j] == 'W') {
                levelMap[i][j].wall = true
            } else if (rows[i][j] == 'S') {
                levelMap[i][j].wall = false
            }
        }

    }
}

function startGame() {
    initLevel()
    drawBoard()
    document.onkeydown = function (e) {
        if (pause == false) {
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
        }
    };
}

function loadInfobar() {
    let topDiv = document.getElementById("game-intro")
    topDiv.innerHTML = "" // deletes start button or fight log etc
    let heroStatsDiv = document.createElement('div')
    heroStatsDiv.classList.add("heroStatsDiv")
    heroStatsDiv.innerText = `Health: ${playerCharacter.currentHealth}/${playerCharacter.maximumHealth}
    Damage: 1-${playerCharacter.damage} + ${playerCharacter.weaponDamageAdded}
            Armor: ${playerCharacter.armor} + ${playerCharacter.armorAdded}           
            Experience Points: ${playerCharacter.experiencePoints}`
    topDiv.appendChild(heroStatsDiv)
    let weaponDiv = document.createElement('div')
    if (playerCharacter.weaponDamageAdded == 0) {
        weaponDiv.innerText = `Weapon: none`
    } else {
        weaponDiv.innerText = `Weapon: + ${playerCharacter.weaponDamageAdded}`
    }
    topDiv.appendChild(weaponDiv)
    let armorDiv = document.createElement('div')
    if (playerCharacter.armorAdded == 0) {
        armorDiv.innerText = `Armor: none`
    } else {
        armorDiv.innerText = `Armor: + ${playerCharacter.armorAdded}`
    }
    topDiv.appendChild(armorDiv)
}


function updateHeroStatsInInfoBar() {
    let topDiv = document.getElementsByClassName("heroStatsDiv")[0].innerText = `Health: ${playerCharacter.currentHealth}/${playerCharacter.maximumHealth}
    Damage: 1-${playerCharacter.damage} + ${playerCharacter.weaponDamageAdded}
            Armor: ${playerCharacter.armor} + ${playerCharacter.armorAdded}           
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
        pause = false
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



function fight(monsterID) {
    pause = true
    appendInfoBar("FIGHT!!!!!!")
    while (playerCharacter.currentHealth > 0 && monsterID.currentHealth > 0) {
        playerCharacter.attack(monsterID)
        if (monsterID.currentHealth > 0) {
            monsterID.attack()
        }
    }
    if (playerCharacter.currentHealth > 0) {
        let XP = getXPAfterFight(monsterID)
        removeDeadMonstersFromGame(monsterID)
        appendInfoBar(`Hero wins and gets ${XP} XP`)
        playerCharacter.experiencePoints += XP
        checkForLevelUp()
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

// turns fog of war off for debugging reasons
function turnFOWOff() {
    for (i = 0; i < levelMap.length; i++) {
        for (j = 0; j < levelMap.length; j++) {
            let location = levelMap[i][j]
            location.visible = true
            location.draw()
        }
    }
    drawBoard()
}