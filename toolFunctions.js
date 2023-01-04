function brushFunction() {
    let m = mouseToGrid()
    if (m) grid[m.y][m.x] = selected.selectedColour;
}

function eraserFunction() {
    let m = mouseToGrid()
    if (m) grid[m.y][m.x] = "";
}

function dropperFunction() {
    let m = mouseToGrid()
    if (m) selected.selectedColour = grid[m.y][m.x];
}

function floodFill(x, y, oldColour) {
    if (!onGrid(x, y)) return false;
    if (grid[y][x] != oldColour) return false;
    if (grid[y][x] == selected.selectedColour) return false;
    grid[y][x] = selected.selectedColour;
    floodFill(x+1, y, oldColour)
    floodFill(x-1, y, oldColour)
    floodFill(x, y+1, oldColour)
    floodFill(x, y-1, oldColour)
}
function bucketFunction() {
    let m = mouseToGrid()
    if (m) floodFill(m.x, m.y, grid[m.y][m.x])
}

function zoomInFunction(mag) {
    gridX -= (mouseX-gridX)*mag/squareSize
    gridY -= (mouseY-gridY)*mag/squareSize
    squareSize += mag;
}

function zoomOutFunction(mag) {
    if (squareSize - mag >= 1) {
        gridX += (mouseX-gridX)*mag/squareSize
        gridY += (mouseY-gridY)*mag/squareSize
        squareSize -= mag;
    }
}

let panOffsetX = 0;
let panOffsetY = 0;
let panning = false;
function panStartFunction() {
    panOffsetX = mouseX-gridX;
    panOffsetY = mouseY-gridY;
    panning = true;
}
function panFunction() {
    gridX = mouseX-panOffsetX;
    gridY = mouseY-panOffsetY;
}
function panStopFunction() {
    panning = false;
    panOffsetX = 0;
    panOffsetY = 0;
}

function undoFunction() {
    if (logPos > 0) {
        logPos -= 1;
        grid = copyGrid(gridLog[logPos])
    }
}

function redoFunction() {
    if (logPos < gridLog.length-1) {
        logPos += 1;
        grid = copyGrid(gridLog[logPos])
    }
}