let exportCanvas = document.createElement("canvas");
exportCanvas.style.display = "none";
document.body.appendChild(exportCanvas);

function exportCanvasSetup() {
    exportCanvas.width = gridSize;
    exportCanvas.height = gridSize;
}

function downloadCanvasLink() {
    let ctx = exportCanvas.getContext("2d");

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] != "") {
                ctx.fillStyle = `rgb(${grid[row][col][0]}, ${grid[row][col][1]}, ${grid[row][col][2]})`
                ctx.fillRect(col, row, 1, 1)
            }
        }
    }

    return exportCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream")
}