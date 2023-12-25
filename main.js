let currentColor = "black";
let isRainbow = false;
let progressiveDarkening = false;

let fixedColor = true;

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
                    square.style.backgroundColor = `hsl(240, 100%, ${square.dataset.darkness}%)`
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
    currentColor = color;
}

function randomColors() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    currentColor = `rgb(${r},${g},${b})`;
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

// Default grid creation
createGrid(16);

