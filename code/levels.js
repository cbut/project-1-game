
// function level1() {
//     levelMap[1][1].isPlayerInCell = true
//     levelMap[1][1].wall = false
//     levelMap[1][2].wall = false
//     levelMap[1][3].wall = false
//     levelMap[2][1].wall = false
//     levelMap[2][2].wall = false
//     levelMap[2][3].wall = false
//     levelMap[2][4].wall = false
//     levelMap[2][5].wall = false
//     levelMap[3][5].wall = false
//     levelMap[4][5].wall = false
//     levelMap[4][6].wall = false
//     levelMap[4][7].wall = false
//     levelMap[4][8].wall = false
//     levelMap[5][6].wall = false
//     levelMap[5][7].wall = false
//     levelMap[5][8].wall = false
//     levelMap[6][6].wall = false
//     levelMap[6][8].wall = false
//     levelMap[6][7].wall = false
//     levelMap[7][6].wall = false
//     levelMap[7][8].wall = false
//     levelMap[7][7].wall = false

//     levelMap[5][11].wall = false
//     levelMap[5][12].wall = false
//     levelMap[5][13].wall = false
//     levelMap[5][14].wall = false
//     levelMap[6][11].wall = false
//     levelMap[6][12].wall = false
//     levelMap[6][13].wall = false
//     levelMap[6][14].wall = false
//     levelMap[7][11].wall = false
//     levelMap[7][12].wall = false
//     levelMap[7][13].wall = false
//     levelMap[7][14].wall = false
//     levelMap[8][11].wall = false
//     levelMap[8][12].wall = false
//     levelMap[8][13].wall = false
//     levelMap[8][14].wall = false

//     levelMap[4][2].wall = false
//     levelMap[4][3].wall = false
//     levelMap[4][4].wall = false
//     levelMap[4][5].wall = false
//     levelMap[5][2].wall = false
//     levelMap[5][3].wall = false
//     levelMap[5][4].wall = false
//     levelMap[5][5].wall = false
//     levelMap[6][2].wall = false
//     levelMap[6][3].wall = false
//     levelMap[6][4].wall = false
//     levelMap[6][5].wall = false
//     levelMap[7][2].wall = false
//     levelMap[7][3].wall = false
//     levelMap[7][4].wall = false
//     levelMap[7][5].wall = false

//     levelMap[8][8].wall = false
//     levelMap[8][9].wall = false
//     levelMap[8][10].wall = false
//     levelMap[9][8].wall = false
//     levelMap[9][9].wall = false
//     levelMap[9][9].wall = false
//     levelMap[9][10].wall = false
//     levelMap[10][9].wall = false
//     levelMap[10][10].wall = false

//     levelMap[10][10].wall = false
//     levelMap[10][11].wall = false
//     levelMap[10][12].wall = false
//     levelMap[10][13].wall = false
//     levelMap[11][10].wall = false
//     levelMap[11][11].wall = false
//     levelMap[11][12].wall = false
//     levelMap[11][13].wall = false
//     levelMap[12][10].wall = false
//     levelMap[12][11].wall = false
//     levelMap[12][12].wall = false
//     levelMap[12][13].wall = false
//     levelMap[13][10].wall = false
//     levelMap[13][11].wall = false
//     levelMap[13][12].wall = false
//     levelMap[13][13].wall = false
//     levelMap[15][15].wall = false
//     levelMap[15][16].wall = false
//     levelMap[15][17].wall = false
//     levelMap[15][18].wall = false
//     levelMap[16][15].wall = false
//     levelMap[16][16].wall = false
//     levelMap[16][17].wall = false
//     levelMap[16][18].wall = false
//     levelMap[17][15].wall = false
//     levelMap[17][16].wall = false
//     levelMap[17][17].wall = false
//     levelMap[17][18].wall = false
//     levelMap[18][15].wall = false
//     levelMap[18][16].wall = false
//     levelMap[18][17].wall = false
//     levelMap[18][18].wall = false

//     levelMap[11][8].wall = false
//     levelMap[11][7].wall = false
//     levelMap[11][9].wall = false
//     levelMap[10][7].wall = false
//     levelMap[10][8].wall = false
//     levelMap[10][9].wall = false
//     levelMap[12][7].wall = false
//     levelMap[12][8].wall = false

//     levelMap[11][3].wall = false
//     levelMap[11][4].wall = false
//     levelMap[11][5].wall = false
//     levelMap[11][6].wall = false
//     levelMap[12][3].wall = false
//     levelMap[12][4].wall = false
//     levelMap[12][5].wall = false
//     levelMap[12][6].wall = false
//     levelMap[13][3].wall = false
//     levelMap[13][4].wall = false
//     levelMap[13][5].wall = false
//     levelMap[13][6].wall = false
//     levelMap[14][3].wall = false
//     levelMap[14][4].wall = false
//     levelMap[14][5].wall = false
//     levelMap[14][6].wall = false

//     levelMap[4][2].wall = false
//     levelMap[4][3].wall = false
//     levelMap[4][4].wall = false
//     levelMap[4][5].wall = false
//     levelMap[5][2].wall = false
//     levelMap[5][3].wall = false
//     levelMap[5][4].wall = false
//     levelMap[5][5].wall = false
//     levelMap[6][2].wall = false
//     levelMap[6][3].wall = false
//     levelMap[6][4].wall = false
//     levelMap[6][5].wall = false
//     levelMap[7][2].wall = false
//     levelMap[7][3].wall = false
//     levelMap[7][4].wall = false
//     levelMap[7][5].wall = false

//     levelMap[12][13].wall = false
//     levelMap[12][14].wall = false
//     levelMap[12][15].wall = false
//     levelMap[12][16].wall = false
//     levelMap[13][13].wall = false
//     levelMap[13][14].wall = false
//     levelMap[13][15].wall = false
//     levelMap[13][16].wall = false
//     levelMap[14][13].wall = false
//     levelMap[14][14].wall = false
//     levelMap[14][15].wall = false
//     levelMap[14][16].wall = false

//     console.log(`level1() initiated`)
// }

let level1Map = `
WWWWWWWWWWWWWWWWWWW
WWSSSSSWWSSSSSSWWWW
WWWWSSSSSSWWWWSSWWW
WWSSSSSSSSSWWWWSWWW
WWWSSSSSSSWWWWWSSWW
WWWWWSWWWWWWWWWWSWW
WWWWWSSWWWWWWWWWSWW
WWWWSSWWWWWWWWWWSWW
WWWSSWWWWWWWWWWWSWW
WWSSSSSWWWWWWWWWSWW
WWWWSSSSSSSWWSSSSWW
WWSSSWWWWSSSSSSSSWW
WWWSWWWWWWWSSWWSSSW
WWSSWWWWWWWWSSSSWWW
WWSWWWWWWSSSSWWWWWW
WWSSSWWSSSSWWWWWWWW
WWWSSWWWWWSSSSSWWWW
WWSSWWWWWWWWSSSSSWW
WWWSSSSWWWWWSSSWWWW
WWWWWWSSSSSSSWWWWWW
WWWWWWWWWWWWWWWWWWW
    `.trim();

let level2Map = `
WWWWWWWWWWWWWWWWWWW
WWSSSSSWWSSSSSSWWWW
WWWWSSSSSSWWWWSSWWW
WWSSSSSSSSSWWWWSWWW
WWWSSSSSSSWWWWWSSWW
WWWWWSWWWWWWWWWWSWW
WWWWWSSWWSSSSSSWSWW
WWWSSSSSSSWWSSSSSWW
WWWSSWWWSSSSSSWWSWW
WWSSSSSWWWWWWWWWSWW
WWWWSSSSSSSWWSSSSWW
WWSSWWWWWSSSSSSSSWW
WWWSSSSSSSSSSWWSSSW
WWSSWWWWWWWWSSSSWWW
WWSWWWWWWSSSSWWSSWW
WWSSSWWSSSSWWWSSWWW
WWWSSWWWWWSSSSSWWWW
WWSSWWWWWWWWSSSSSWW
WWWSSSSWWWWWSSSWWWW
WWWWWWSSSSSSSWWWWWW
WWWWWWWWWWWWWWWWWWW
    `.trim();

let level3Map = `
WWWWWWWWWWWWWWWWWWW
WWWWSSSSSSSSSSSWWWW
WWWWSWWWWWWWWWSSWWW
WWWWSWWWWWWWWWSSWWW
WWWSSSSSSSWWWWWSSWW
WWWWWSWWWWWWWWWWSWW
WWWWWSSSSSSSSSSSSWW
WWWWSSWWWWWWWWWWSWW
WWWSSSSSSSSSSSSSSWW
WWSSSSSWWWWWWWWWSWW
WWWSSSSSSSSWWSSSSWW
WWSSWWWWWSSSSSSSSWW
WWWSWWWWWWWSSWWSSSW
WWSSWWWWWWWWSSSSSWW
WWSSSSSSSSSSSWWWSWW
WWSSSWWWWWWWWWWWSWW
WWWSSWWWWWWWWWWWSWW
WWSSWWWWWWWWSSSSSWW
WWWSSSSWWWWWSSSWWWW
WWWWWWSSSSSSSWWWWWW
WWWWWWWWWWWWWWWWWWW
    `.trim();

let level4Map = `
WWWWWWWWWWWWWWWWWWW
WWWWSSSSSSSSSSSWWWW
WWWWSSSSSSSSSSSSWWW
WWWWSSSSSSSSSSSSWWW
WWWSSSSSSSWWWWWSSWW
WWWWWSWWWWWWWWWWSWW
WWWWWSSSSSSSSSSSSWW
WWWWSSWWSSSSSSWWSWW
WWWSSSSSSSSSSSSSSWW
WWSSSSSSSSSSSSSSSWW
WWWWSSSSSSSWWSSSSWW
WWSSWWWWWSSSSSSSSWW
WWWSWWWWWWWSSWWSSSW
WWSSSSSSSSSSSSSSSWW
WWSSSSSSSSSSSWWWSWW
WWSSSWWWWWWWWWWWSWW
WWWSSWWWWWWWWWWWSWW
WWSSWWWWWWWWSSSSSWW
WWWSSSSSSSSSSSSWWWW
WWWWWWSSSSSSSWWWWWW
WWWWWWWWWWWWWWWWWWW
    `.trim();

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

    levelMap[13][1].wall = false
    levelMap[13][2].wall = false
    levelMap[13][3].wall = false
    levelMap[13][4].wall = false
    levelMap[14][1].wall = false
    levelMap[14][2].wall = false
    levelMap[14][3].wall = false
    levelMap[14][4].wall = false

    levelMap[11][1].wall = false
    levelMap[11][2].wall = false
    levelMap[12][1].wall = false
    levelMap[12][2].wall = false
    levelMap[13][1].wall = false
    levelMap[13][2].wall = false
    levelMap[14][1].wall = false
    levelMap[14][2].wall = false

    levelMap[1][10].wall = false
    levelMap[1][11].wall = false
    levelMap[2][10].wall = false
    levelMap[2][11].wall = false
    levelMap[3][10].wall = false
    levelMap[3][11].wall = false

    levelMap[2][6].wall = false
    levelMap[2][7].wall = false
    levelMap[2][8].wall = false
    levelMap[2][9].wall = false
    levelMap[3][6].wall = false
    levelMap[3][7].wall = false
    levelMap[3][8].wall = false
    levelMap[3][9].wall = false

    levelMap[3][15].wall = false
    levelMap[3][16].wall = false
    levelMap[4][15].wall = false
    levelMap[4][16].wall = false

    levelMap[7][6].wall = false
    levelMap[7][7].wall = false
    levelMap[7][8].wall = false
    levelMap[7][9].wall = false
    levelMap[8][6].wall = false
    levelMap[8][7].wall = false
    levelMap[8][8].wall = false
    levelMap[8][9].wall = false
    levelMap[9][6].wall = false
    levelMap[9][7].wall = false
    levelMap[9][8].wall = false
    levelMap[9][9].wall = false
    levelMap[10][6].wall = false
    levelMap[10][7].wall = false
    levelMap[10][8].wall = false
    levelMap[10][9].wall = false

    levelMap[5][8].wall = false
    levelMap[5][9].wall = false
    levelMap[5][10].wall = false
    levelMap[5][11].wall = false
    levelMap[6][8].wall = false
    levelMap[6][9].wall = false
    levelMap[6][10].wall = false
    levelMap[6][11].wall = false
    levelMap[7][8].wall = false
    levelMap[7][9].wall = false
    levelMap[7][10].wall = false
    levelMap[7][11].wall = false
    levelMap[8][8].wall = false
    levelMap[8][9].wall = false
    levelMap[8][10].wall = false
    levelMap[8][11].wall = false

    levelMap[8][6].wall = false
    levelMap[8][7].wall = false
    levelMap[8][8].wall = false
    levelMap[9][6].wall = false
    levelMap[9][7].wall = false
    levelMap[9][8].wall = false

    levelMap[3][5].wall = false
    levelMap[3][6].wall = false
    levelMap[3][7].wall = false
    levelMap[4][5].wall = false
    levelMap[4][6].wall = false
    levelMap[4][7].wall = false
    levelMap[5][5].wall = false
    levelMap[5][6].wall = false
    levelMap[5][7].wall = false

    levelMap[7][6].wall = false
    levelMap[7][7].wall = false
    levelMap[7][8].wall = false
    levelMap[7][9].wall = false
    levelMap[8][6].wall = false
    levelMap[8][7].wall = false
    levelMap[8][8].wall = false
    levelMap[8][9].wall = false
    levelMap[9][6].wall = false
    levelMap[9][7].wall = false
    levelMap[9][8].wall = false
    levelMap[9][9].wall = false

    levelMap[15][8].wall = false
    levelMap[15][9].wall = false
    levelMap[15][10].wall = false
    levelMap[16][8].wall = false
    levelMap[16][9].wall = false
    levelMap[16][10].wall = false


    levelMap[6][7].wall = false
    levelMap[6][8].wall = false
    levelMap[7][7].wall = false
    levelMap[7][8].wall = false

    levelMap[10][8].wall = false
    levelMap[10][9].wall = false
    levelMap[10][10].wall = false
    levelMap[10][11].wall = false
    levelMap[11][8].wall = false
    levelMap[11][9].wall = false
    levelMap[11][10].wall = false
    levelMap[11][11].wall = false
    levelMap[12][8].wall = false
    levelMap[12][9].wall = false
    levelMap[12][10].wall = false
    levelMap[12][11].wall = false

    levelMap[10][14].wall = false
    levelMap[10][15].wall = false
    levelMap[11][14].wall = false
    levelMap[11][15].wall = false
    levelMap[12][14].wall = false
    levelMap[12][15].wall = false
    levelMap[13][14].wall = false
    levelMap[13][15].wall = false

    levelMap[15][12].wall = false
    levelMap[15][13].wall = false
    levelMap[15][14].wall = false
    levelMap[15][15].wall = false
    levelMap[16][12].wall = false
    levelMap[16][13].wall = false
    levelMap[16][14].wall = false
    levelMap[16][15].wall = false
    levelMap[17][12].wall = false
    levelMap[17][13].wall = false
    levelMap[17][14].wall = false
    levelMap[17][15].wall = false

    levelMap[15][13].wall = false
    levelMap[15][14].wall = false
    levelMap[15][15].wall = false
    levelMap[16][13].wall = false
    levelMap[16][14].wall = false
    levelMap[16][15].wall = false
    levelMap[17][13].wall = false
    levelMap[17][14].wall = false
    levelMap[17][15].wall = false
    levelMap[18][13].wall = false
    levelMap[18][14].wall = false
    levelMap[18][15].wall = false

    levelMap[3][15].wall = false
    levelMap[3][16].wall = false
    levelMap[4][15].wall = false
    levelMap[4][16].wall = false
    levelMap[5][15].wall = false
    levelMap[5][16].wall = false
    levelMap[6][15].wall = false
    levelMap[6][16].wall = false

    levelMap[10][15].wall = false
    levelMap[10][16].wall = false
    levelMap[10][17].wall = false
    levelMap[11][15].wall = false
    levelMap[11][16].wall = false
    levelMap[11][17].wall = false
    levelMap[12][15].wall = false
    levelMap[12][16].wall = false
    levelMap[12][17].wall = false

}

function level3() {
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
function level4() {
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
