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
            square.addEventListener("mouseover", ()=>{
                square.style.backgroundColor="black";
            })
        }
    }
}