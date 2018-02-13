/// <reference path="./bindings/p5.global-mode.d.ts" />

let height = 480;
let width = 480;

let resolution = 10;

let cols = width / resolution;
let rows = height / resolution;

let grid;
let nextGenGrid;

function setup() {
    createCanvas(width, height);
    background(0);

    //frameRate(4);
    
    console.log({ rows : rows, cols : cols});

    grid = make2DArray(cols, rows);

    grid = fillGrid(grid);
}

function draw() {
    grid = nextGen(grid);
    drawGrid(grid);
}

function nextGen(grid) {

    let nextGenGrid = make2DArray(cols, rows);

    forEachCellOfGridDo((currentCol, currentRow) => {
        let cellState = grid[currentCol][currentRow];
        let numberOfNeighbors = countNeighborsModulo(grid, currentCol, currentRow);

        let cellNextState = getNextStateForCell(cellState, numberOfNeighbors);

        nextGenGrid[currentCol][currentRow] = cellNextState;
    });

    return nextGenGrid;
}

function getNextStateForCell(currentState, numberOfNeighbors) {

    if (currentState == 0 && numberOfNeighbors == 3) {
        currentState = 1;
    } else if (currentState == 1 && (numberOfNeighbors < 2 || numberOfNeighbors > 3)) {
        currentState = 0;
    } 

    return currentState;
}

function fillGrid(grid) {

    forEachCellOfGridDo((currentCol, currentRow) => {
        grid[currentCol][currentRow] = floor(random(2));
    });

    return grid;
}

function countNeighborsModulo(grid, col, row) {

    let neighbors = 0;

    for(let colOffset = -1 ; colOffset <= 1 ; colOffset++) {
        for(let rowOffset = -1 ; rowOffset <= 1 ; rowOffset++) {
            let colToLookup = (col + colOffset + cols) % cols;
            let rowToLookup = (row + rowOffset + rows) % rows;

            neighbors += grid[colToLookup][rowToLookup];
        
        }
    }
    neighbors -= grid[col][row];

    return neighbors;
}

function drawGrid(grid) {
    //console.log('drawing grid');
    background(0);

    forEachCellOfGridDo((currentCol, currentRow) => {
        let x = currentCol * resolution;
        let y = currentRow * resolution;
    
        if(grid[currentCol][currentRow] === 1) {
            fill(255);
            stroke(0);
            rect(x, y, resolution - 1, resolution - 1);
        }
    });
    
}

function forEachCellOfGridDo(funcToExecute) {
    for(let currentRow = 0 ; currentRow < rows ; currentRow++) {
        for(let currentCol = 0 ; currentCol < cols ; currentCol++) {
            funcToExecute(currentCol, currentRow);
        }
    }
}

function make2DArray(cols, rows) {
    let array = new Array(cols);

    for(let i = 0 ; i < array.length ; i ++) {
        array[i] = new Array(rows);
    }
    
    return array;
}