let currentColor = "black";

function createGrid(gridSize)
{
    const grid = document.getElementById("grid");

    let squareSideLength=800/gridSize;

    numberOfContainers=gridSize

    const containerStyle={
        width: "800px",
        height: `${squareSideLength}px`,
        display: "flex", 
        flexDirection: "row",
    };
    
    const squareStyle={
        width: `${squareSideLength}px`,
        height: `${squareSideLength}px`,
        border: "0.5px solid #000",
        borderWidth: "thin",
        borderColor: "black"
    };

    for(n=1; n<=gridSize; n++)
    {
        const squareContainer = document.createElement("div");
        Object.assign(squareContainer.style, containerStyle);
        grid.appendChild(squareContainer);  
        squareContainer.classList.add("grid-container");

        for(m=1; m<=gridSize; m++)
    
        {
            const square = document.createElement("div");
            squareContainer.appendChild(square);
            Object.assign(square.style, squareStyle);
            square.style.backgroundColor
            square.classList.add("grid-square");
            square.addEventListener("mouseover", function(){
                square.style.backgroundColor = currentColor;
            })
        }
    }
}

function clearGrid()
{
    const allSquares = document.getElementsByClassName("grid-square");

    for(square of allSquares){
        square.style.backgroundColor = "transparent";
    }
}

function setColors(color)
{
    currentColor=color;
}

function randomColors(){
    let r = Math.floor(Math.random()*256);
    let g = Math.floor(Math.random()*256);
    let b = Math.floor(Math.random()*256);

    currentColor = `rgb(${r},${g},${b})`;
}

// Default grid creation
createGrid(32);