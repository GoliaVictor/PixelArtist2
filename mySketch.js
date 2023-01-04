let grid = [];
let gridSize = 0;
let squareSize = 0;
let gridX = 0;
let gridY = 35;

let inEditor = false;

// Grid log for undo and redo
let logPos = 0;
let gridLog = [];


function setup() {
    createCanvas(windowWidth, windowHeight).parent("canvasParent")
}

function draw() {
    cursor('default')
    background(Color.nearInverse)
    if (gridSize == 0) {
        decideGridPanel.render((windowWidth-decideGridPanel.width)/2, (windowHeight-decideGridPanel.height)/2)
    }
    else if (typeof gridSize === "string"){
        inEditor = true;
        gridSize = Math.round(parseFloat(gridSize))

        for (let row = 0; row < gridSize; row++) {
            grid.push([])
            for (let col = 0; col < gridSize; col++) {
                grid[row].push("")
            }
        }

        gridLog.push(copyGrid(grid))

        squareSize = (windowHeight-2*gridY)/gridSize
        gridX = (windowWidth-gridSize*squareSize)/2

        exportCanvasSetup()
        loadJS("hotkeys.js", document.body)
    }
    else {
        if (panning) {
            panFunction()
        }
        push()
        noFill()
        stroke(Color.primary)
        strokeWeight(2)
        rect(gridX, gridY, gridSize*squareSize, gridSize*squareSize)
        strokeWeight(1)
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (grid[row][col] == "") {
                    fill(Color.nearInverse)
                    stroke(Color.nearInverse)
                }
                else {
                    fill(grid[row][col])
                    stroke(grid[row][col])
                }
                rect(gridX + col*squareSize, gridY + row*squareSize, squareSize, squareSize)
            }
        }
        pop()

        if (selected.selectedTool != "" && mouseOnGrid()) {
            switch(selected.selectedTool) {
                case "brush":
                    cursor("none")
                    BRUSH_CURSOR.render(mouseX-2, mouseY-22)
                    if (mouseIsPressed && mouseButton == LEFT) {
                        brushFunction()
                    }
                    break;
                case "eraser":
                    cursor("none")
                    ERASER_CURSOR.render(mouseX-5, mouseY-20)
                    if (mouseIsPressed && mouseButton == LEFT) {
                        eraserFunction()
                    }
                    break;
                case "dropper":
                    cursor("none")
                    DROPPER_CURSOR.render(mouseX-2, mouseY-22)
                    if (mouseIsPressed && mouseButton == LEFT) {
                        dropperFunction()
                    }
                    break;
                case "bucket":
                    cursor("none")
                    BUCKET_CURSOR.render(mouseX-4, mouseY-16)
                    if (mouseIsPressed && mouseButton == LEFT) {
                        bucketFunction()
                    }
                    break;
            }
        }

        switch (selected.selectedTool) {
            case "pan":
                if (mouseIsPressed) {
                    cursor('grabbing')
                }
                else {
                    cursor("grab")
                }
                break;
            case "zoom":
                cursor("none")
                ZOOM_CURSOR.render(mouseX-11, mouseY-11)
                break;
        }

        controlPanel.render(0, (windowHeight-controlPanel.height)/2)
        navPanel.render(windowWidth-navPanel.width, (windowHeight-navPanel.height)/2)
    }
}

function onGrid(x, y) {
    return (x >= 0 && x < gridSize && y >= 0 && y < gridSize)
}

function mouseToGrid() {
    if (mouseX < gridX) return;
    let conversion = {x: Math.round(((mouseX-gridX)-(mouseX-gridX)%squareSize)/squareSize), y: Math.round(((mouseY-gridY)-(mouseY-gridY)%squareSize)/squareSize)}
    if (onGrid(conversion.x, conversion.y)) return conversion;
}

function mouseOnGrid() {
    return mouseX > gridX && mouseX < gridX + gridSize*squareSize && mouseY > gridY && mouseY < gridY + gridSize*squareSize;
}

function copyGrid(arr) {
    let copy = []
    for (let row = 0; row < arr.length; row++) {
        copy.push([])
        for (let col = 0; col < arr[row].length; col++) {
            copy[row].push(arr[row][col])
        }
    }
    return copy;
}

function mousePressed() {
    hotkey.onMousePressed()
    switch (mouseButton) {
        case LEFT:
            decideGridPanel.onMousePressed()
            controlPanel.onMousePressed()
            navPanel.onMousePressed()
            break;
        case CENTER:
            if (inEditor) {
                panStartFunction()
            }
            break;
    }
}

function mouseReleased() {
    hotkey.onMouseReleased()
    switch (mouseButton) {
        case LEFT:
            decideGridPanel.onMouseReleased()
            controlPanel.onMouseReleased()
            navPanel.onMouseReleased()

            if (selected.selectedTool == "pan") {
                panStopFunction()
            }
            break;
        case CENTER:
            if (inEditor) {
                panStopFunction()
            }
            break;
    }
}

function keyPressed() {
    decideGridPanel.onKeyPressed()
    controlPanel.onKeyPressed()
    navPanel.onKeyPressed()
    hotkey.onKeyPressed()
}

function mouseWheel(event) {
    if (inEditor) {
        if (event.delta < 0) {
            zoomInFunction(3)
        }
        else {
            zoomOutFunction(3)
        }
    }
}