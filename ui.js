let selected = {
    set selectedTool(val) {
        if (this.selectedTool != val) {
            this.prevTool = this.selectedTool;
            this.selectedToolVar = val;
        }
    },
    get selectedTool() {
        return this.selectedToolVar;
    },
    set selectedColour(val) {
        if (this.selectedColour != val) {
            this.prevColour = this.selectedColour;
            this.selectedColourVar = val;
        }
    },
    get selectedColour() {
        return this.selectedColourVar;
    },
    
    selectedToolVar: "brush",
    prevTool: "brush",
    selectedColourVar: Color.red,
    prevColour: Color.red,
}

let colourToggles = [

]
let palette = [Color.red, Color.green, Color.blue, Color.saffron, Color.yellow, Color.pink, Color.purple, Color.secondary, Color.white, Color.black]

function inPalette(colour) {
    for (const swatch of palette) {
        if (colour[0] == swatch[0] && colour[1] == swatch[1] && colour[2] == swatch[2]) return true;
    }
    return false;
}

function addColourBarRow() {
    colourBar.contents.push(new HStack().contains([]).spacing(5))
}

function addColourBarColour(colour) {
    colourBar.contents[colourBar.contents.length-1].contents.push(
        new CheckToggle(35, 35)
            .background(colour, "default")
            .background(Color.nudge(colour, 2), "hover")
            .background(Color.nudge(colour, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", colour)
            ,
    )
}

function addColourToPalette(colour) {
    if (!inPalette(colour)) {
        if (colourBar.contents.length == 0) {
            addColourBarRow()
        }
        else if (colourBar.contents[colourBar.contents.length-1].contents.length == 2) {
            // make room
            addColourBarRow()
        }
        addColourBarColour(colour)
        palette.push(colour)
    }
}

function deletePaletteColour(colour) {
    // let i = 0;
    // for (let i = 0; i < palette.length; i++) {
    //     if (palette[i][0] == colour[0] && palette[i][1] == colour[1] && palette[i][2] == colour[2]) break;
    // }
    let i = palette.indexOf(colour)
    palette.splice(i, 1);
    let row =  Math.floor(i/2);
    let col = i%2;
    console.log(i, row, col)

    colourBar.contents[row].contents.splice(col, 1);
    if (colourBar.contents[row].contents.length == 0) {
        colourBar.contents.splice(row, 1);
    }
    else {
        for (let h = row+1; h < colourBar.contents.length; h++) {
            let hs = colourBar.contents[h]
            colourBar.contents[h-1].contents.push(hs.contents.shift())
            if (hs.contents.length == 0) colourBar.contents.splice(h, 1);
        }
    }


    selected.selectedColour = ""
}

let gridSizeInput = new TextInput()
                    .placeholder("Size")
                    .bind("gridSize")

let decideGridPanel = new Panel()
    .contains([
        new Title("Create Canvas"),
        new HStack().contains([
            gridSizeInput,
            // new Text("•")
            //     .hidden("gridSize == gridSizeInput.t")
            //     .align("center")
            //     .textColour(Color.blue)
                // ,
        ]).spacing(5).align("center"),
    ])
    .cornerRadius(15)

let toolbar = new VStack().contains([
    new HStack().contains([
        new CheckToggle(35, 35)
            .background(Color.nearInverse, "default off")
            .background(Color.nudge(Color.nearInverse, 2), "hover off")
            .background(Color.nudge(Color.nearInverse, 4), "pressed off")
            .contains(new Icon(BRUSH_ICON))
            .radio("selected.selectedTool", "brush")
            ,
        new CheckToggle(35, 35)
            .background(Color.nearInverse, "default off")
            .background(Color.nudge(Color.nearInverse, 2), "hover off")
            .background(Color.nudge(Color.nearInverse, 4), "pressed off")
            .contains(new Icon(ERASER_ICON))
            .radio("selected.selectedTool", "eraser")
            ,
    ]).spacing(5),
    new HStack().contains([
        new CheckToggle(35, 35)
            .background(Color.nearInverse, "default off")
            .background(Color.nudge(Color.nearInverse, 2), "hover off")
            .background(Color.nudge(Color.nearInverse, 4), "pressed off")
            .contains(new Icon(DROPPER_ICON))
            .radio("selected.selectedTool", "dropper")
            ,
        new CheckToggle(35, 35)
            .background(Color.nearInverse, "default off")
            .background(Color.nudge(Color.nearInverse, 2), "hover off")
            .background(Color.nudge(Color.nearInverse, 4), "pressed off")
            .contains(new Icon(BUCKET_ICON).flipHorizontally())
            .radio("selected.selectedTool", "bucket")
            ,
    ]).spacing(5),
]).spacing(5)

let colourBar = new VStack().contains([
    new HStack().contains([
        new CheckToggle(35, 35)
            .background(Color.red, "default")
            .background(Color.nudge(Color.red, 2), "hover")
            .background(Color.nudge(Color.red, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.red)
            ,
        new CheckToggle(35, 35)
            .background(Color.green, "default")
            .background(Color.nudge(Color.green, 2), "hover")
            .background(Color.nudge(Color.green, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.green)
            ,
    ]).spacing(5),
    new HStack().contains([
        new CheckToggle(35, 35)
            .background(Color.blue, "default")
            .background(Color.nudge(Color.blue, 2), "hover")
            .background(Color.nudge(Color.blue, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.blue)
            ,
        new CheckToggle(35, 35)
            .background(Color.saffron, "default")
            .background(Color.nudge(Color.saffron, 2), "hover")
            .background(Color.nudge(Color.saffron, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.saffron)
            ,
    ]).spacing(5),
    new HStack().contains([
        new CheckToggle(35, 35)
            .background(Color.yellow, "default")
            .background(Color.nudge(Color.yellow, 2), "hover")
            .background(Color.nudge(Color.yellow, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.yellow)
            ,
        new CheckToggle(35, 35)
            .background(Color.pink, "default")
            .background(Color.nudge(Color.pink, 2), "hover")
            .background(Color.nudge(Color.pink, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.pink)
            ,
    ]).spacing(5),
    new HStack().contains([
        new CheckToggle(35, 35)
            .background(Color.purple, "default")
            .background(Color.nudge(Color.purple, 2), "hover")
            .background(Color.nudge(Color.purple, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.purple)
            ,
        new CheckToggle(35, 35)
            .background(Color.secondary, "default")
            .background(Color.nudge(Color.secondary, 2), "hover")
            .background(Color.nudge(Color.secondary, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.secondary)
            ,
    ]).spacing(5),
    new HStack().contains([
        new CheckToggle(35, 35)
            .background(Color.white, "default")
            .background(Color.nudge(Color.white, 2), "hover")
            .background(Color.nudge(Color.white, 4), "pressed")
            .contains(new Icon(CHECK_ICON).strokeColour(Color.black), "on")
            .radio("selected.selectedColour", Color.white)
            ,
        new CheckToggle(35, 35)
            .background(Color.black, "default")
            .background(Color.nudge(Color.black, 2), "hover")
            .background(Color.nudge(Color.black, 4), "pressed")
            .contains(new Icon(CHECK_ICON), "on")
            .radio("selected.selectedColour", Color.black)
            ,
    ]).spacing(5),
]).spacing(5)


let navToolbar = new VStack()
.contains([
    new HStack()
    .contains([
        new CheckToggle(35, 35)
        .background(Color.nearInverse, "default off")
        .background(Color.nudge(Color.nearInverse, 2), "hover off")
        .background(Color.nudge(Color.nearInverse, 4), "pressed off")
        .contains(new Icon(HAND_ICON))
        .radio("selected.selectedTool", "pan")
        ,
        new CheckToggle(35, 35)
        .background(Color.nearInverse, "default off")
        .background(Color.nudge(Color.nearInverse, 2), "hover off")
        .background(Color.nudge(Color.nearInverse, 4), "pressed off")
        .contains(new Icon(ZOOM_ICON))
        .radio("selected.selectedTool", "zoom")
        ,
    ]).spacing(5),
    new HStack()
    .contains([
        new Button(35, 35)
        .background(Color.nearInverse, "default")
        .background(Color.nudge(Color.nearInverse, 2), "hover")
        .background(Color.nudge(Color.nearInverse, 4), "pressed")
        .contains(new Icon(UNDO_ICON))
        .command(undoFunction)
        ,
        new Button(35, 35)
        .background(Color.nearInverse, "default")
        .background(Color.nudge(Color.nearInverse, 2), "hover")
        .background(Color.nudge(Color.nearInverse, 4), "pressed")
        .contains(new Icon(REDO_ICON))
        .command(redoFunction)
        ,
    ]).spacing(5),
]).spacing(5)

let controlPanel = new Panel()
    .contains([
        // new Title("Controls"),
        toolbar.align("center"),
        colourBar.align("center"),
        new HStack().contains([
            new Button(35, 35)
                .contains(new Icon(MINUS_ICON))
                .background(Color.nearInverse, "default")
                .background(Color.nudge(Color.nearInverse, 2), "hover")
                .background(Color.nudge(Color.nearInverse, 4), "pressed")
                .command(() => {
                    if (palette.length > 0 && selected.selectedColour != "") deletePaletteColour(selected.selectedColour)
                })
                ,
            new Button(35, 35)
                .contains(new Icon(PLUS_ICON))
                .background(Color.nearInverse, "default")
                .background(Color.nudge(Color.nearInverse, 2), "hover")
                .background(Color.nudge(Color.nearInverse, 4), "pressed")
                .command(() => {
                    showColourSelectionWindow = true;
                    inEditor = false;
                    colourSelectionWindow.phantom(false)
                })
                ,
        ]).spacing(5)
    ])
    .cornerRadius(0, 10, 10, 0)

let navPanel = new Panel()
    .contains([
        // new Title("Controls"),
        navToolbar.align("center"),
        new Button(75, 35)
            .contains(new Icon(DOWNLOAD_ICON))
            .command(() => {
                window.open(downloadCanvasLink(), '_blank').focus();
            })
            .background(Color.nearInverse, "default")
            .background(Color.nudge(Color.nearInverse, 2), "hover")
            .background(Color.nudge(Color.nearInverse, 4), "pressed")
            ,
    ])
    .cornerRadius(10, 0, 0, 10)

let showColourSelectionWindow = false;
let rSelect = "0"
let gSelect = "0"
let bSelect = "0"
let colourSelectionWindow = new Panel()
    .contains([
        new Title("Add Colour"),
        new HStack().contains([
            new Panel().contains([
                new Label("Red"),
                new TextInput().placeholder("Input").bind("rSelect"),
                new Label("Green"),
                new TextInput().placeholder("Input").bind("gSelect"),
                new Label("Blue"),
                new TextInput().placeholder("Input").bind("bSelect"),
            ]),
            new VStack()
                .contains([new Blank(120, 120)])
                .background([0, 0, 0])
                .cornerRadius(10)
                .align("center"),
        ]),
        new HStack().contains([
            new Button(35, 35)
                .contains(new Icon(X_CIRCLE_ICON))
                .background(Color.nearInverse, "default")
                .background(Color.nudge(Color.nearInverse, 2), "hover")
                .background(Color.nudge(Color.nearInverse, 4), "pressed")
                .command(() => {
                    showColourSelectionWindow = false;
                    inEditor = true;
                    colourSelectionWindow.phantom(true)
                })
            ,
            new Blank(130, 1),
            new Button(35, 35)
                .command(() => {
                    if (rSelect !== "" && gSelect !== "" && bSelect !== "") {
                        showColourSelectionWindow = false;
                        inEditor = true;
                        colourSelectionWindow.phantom(true)
                        addColourToPalette([parseFloat(rSelect), parseFloat(gSelect), parseFloat(bSelect)])
                    }
                })
                .contains(new Icon(PLUS_CIRCLE_ICON))
                .background(Color.nearInverse, "default")
                .background(Color.nudge(Color.nearInverse, 2), "hover")
                .background(Color.nudge(Color.nearInverse, 4), "pressed")
            ,
        ])
    ])
    .border(Color.primary)
    .cornerRadius(10)
    .phantom(true)