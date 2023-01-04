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