hotkey.onkey("b", () => {selected.selectedTool = "brush"})
hotkey.onkey("e", () => {selected.selectedTool = "eraser"})
hotkey.onkey("i", () => {selected.selectedTool = "dropper"})
hotkey.onkey("g", () => {selected.selectedTool = "bucket"})
hotkey.onkey(187, () => {zoomInFunction(5)})
hotkey.onkey(189, () => {zoomOutFunction(5)})

hotkey.onmousedown("left", () => {
    switch (selected.selectedTool) {
        case "zoom":
            zoomInFunction(5)
            break;
        case "pan":
            panStartFunction()
            break;
    }
})

hotkey.onmousedown("right", () => {
    if (selected.selectedTool == "zoom") {
        zoomOutFunction(5)
    }
})

hotkey.onmouseup("left", () => {
    if (!(["", "dropper", "pan", "zoom"].includes(selected.selectedTool))) {
        if (logPos < gridLog.length-1) {
            gridLog.splice(logPos+1, gridLog.length-logPos-1)
        }
        logPos += 1;
        gridLog.push(copyGrid(grid))
    }
})