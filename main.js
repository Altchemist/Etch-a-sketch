let currentColor = "black";
let isRainbow = false;
let progressiveDarkening = false;

let fixedColor = true;

let hue = null;

function createGrid(gridSize) {
    const grid = document.getElementById("grid");

    while (grid.lastElementChild) {
        grid.removeChild(grid.lastElementChild);
    }

    let squareSideLength = 800 / gridSize;

    numberOfContainers = gridSize

    const containerStyle = {
        width: "800px",
        height: `${squareSideLength}px`,
        display: "flex",
        flexDirection: "row",
    };

    const squareStyle = {
        width: `${squareSideLength}px`,
        height: `${squareSideLength}px`,
        border: "0.5px solid #000",
        borderWidth: "thin",
        borderColor: "black"
    };

    for (n = 1; n <= gridSize; n++) {
        const squareContainer = document.createElement("div");
        Object.assign(squareContainer.style, containerStyle);
        grid.appendChild(squareContainer);
        squareContainer.classList.add("grid-container");

        for (m = 1; m <= gridSize; m++) {
            const square = document.createElement("div");
            squareContainer.appendChild(square);
            Object.assign(square.style, squareStyle);
            square.style.backgroundColor
            square.classList.add("grid-square");
            square.dataset.darkness = 60;
            
            square.addEventListener("mouseover", function () {
                if(fixedColor == true){
                    square.style.backgroundColor = currentColor;
                }
            })
            
            square.addEventListener("mouseout", function () {
                if (isRainbow == true) { randomColors(); }
            })

            
            square.addEventListener("mouseover", function(){
                if (progressiveDarkening == true){
                    square.dataset.darkness -= 10;
                    square.style.backgroundColor = `hsl(${hue}, 100%, ${square.dataset.darkness}%)`
                }
            })
        }
    }
}

function clearGrid() {
    const allSquares = document.getElementsByClassName("grid-square");

    for (square of allSquares) {
        square.style.backgroundColor = "transparent";
        square.dataset.darkness = 50;
    }
}

function setColors(color) {
    disableRainbow();
    disableDarkening();

    currentColor = color;
    resetDarkness()
    hue = calculateHue();
}

function randomColors() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    currentColor = `rgb(${r},${g},${b})`;
}

function calculateHue(){
    let calculatedHue = null;

    const square = document.querySelector(".grid-square");

    let previousColor = window.getComputedStyle(square, null).getPropertyValue("background-color"); 

    square.style.backgroundColor = currentColor;
    
    let rgbString = window.getComputedStyle(square, null).getPropertyValue("background-color");

    square.style.backgroundColor = previousColor;
    
    rgbString = rgbString.slice(4, rgbString.length-1); // Slices string "rgb(value1, value2, value3)" into "value1, value2, value3"

    rgbString = rgbString.split(",") // Remove the comma to obtain r, g and b values
    
    let r = parseInt(rgbString[0]);
    let g = parseInt(rgbString[1]);
    let b = parseInt(rgbString[2]);
    console.log(rgbString[0])
    console.log(rgbString[1])
    console.log(rgbString[2])
    r = r/255;
    g = g/255;
    b = b/255

    let minC = Math.min(r,g,b);
    let maxC = Math.max(r,g,b);

    diff = maxC - minC;

    if(maxC == r){
        calculatedHue = 60*(((g-b)/diff)%6)
    }
    else if (maxC == g){
        calculatedHue = 60*(((b-r)/diff)+2)
    }
    else if (maxC == b){
        calculatedHue = 60*(((r-g)/diff)+4)
    }
    else{
        return 0;
    }

    if (calculatedHue<0){
        calculatedHue += 360;
    }
    console.log(calculatedHue);
    
    return calculatedHue; 
}

function resetDarkness(){
    const allSquares = document.getElementsByClassName("grid-square");

    for (square of allSquares) {
        square.dataset.darkness = 50;
    }
}

function enableRainbow() {
    isRainbow = true;
}

function disableRainbow(){
    isRainbow = false;
}

function enableDarkening(){
    progressiveDarkening = true;
}

function disableDarkening(){
    progressiveDarkening = false;
}

promptButton = document.getElementById("promptSize")

promptButton.addEventListener("click", ()=>{
    let size=prompt("Enter the size of the grid [Cannot exceed 100]");
    while(size>100)
    {
        size=prompt("Enter the size of the grid [Cannot exceed 100]")
    }
    createGrid(size);
})

const blackButton = document.getElementById("black")
const redButton = document.getElementById("red")
const greenButton = document.getElementById("green")
const blueButton= document.getElementById("blue")
const rainbowButton = document.getElementById("rainbow")

const progressiveDarkeningButton = document.getElementById("progressiveDarkening");

blackButton.addEventListener("click", ()=>{
    disableRainbow();
    setColors("black");
})

redButton.addEventListener("click", ()=>{
    disableRainbow();
    setColors("red");
})

greenButton.addEventListener("click",()=>{
    setColors("green");
})

blueButton.addEventListener("click", ()=>{
    disableRainbow();
    setColors("blue");
})

rainbowButton.addEventListener("click", ()=>{
    enableRainbow();
})

progressiveDarkeningButton.addEventListener("click", ()=>{
    enableDarkening();
})

// Default grid creation
createGrid(16);

