var gol;

var heightInput = document.getElementById("cellHeight");
heightInput.addEventListener("input", checkRange);

var widthInput = document.getElementById("cellWidth");
widthInput.addEventListener("input", checkRange);

var submit = document.getElementById("submit");
submit.addEventListener("click", createCells);

class GoL {
    constructor() {
        this.height = document.querySelector("#cellHeight").value || 5;
        this.width = document.querySelector("#cellWidth").value || 5;
        this.living = document.querySelector("#livingColor").value;
        this.dead = document.querySelector("#deadColor").value;

        this.cells = [];
        for (let i = 0; i < this.height; i++) {
            var arr = [];
            for (let j = 0; j < this.width; j++) {
                arr.push(new Cells(Math.floor(Math.random() * 2) === 0))
            }
            this.cells.push(arr);
        }
        console.log(this.cells);
    }
}

class Cells {
    constructor(isAlive) {
        this.isAlive = isAlive
    }
}

function createCells() {
    gol = new GoL();
    var container = document.getElementById('container');

    // delete any old cells
    while (container.lastChild) {
        container.lastChild.remove();
    }

    // create new cells
    container.style.gridTemplateColumns = `repeat(${gol.width}, auto)`
    for (let i = 0; i < gol.height; i++) {
        for (let j = 0; j < gol.width; j++) {
            var gridItem = document.createElement('div');
            gridItem.className = "grid-item";
            gridItem.innerHTML = " ";
            gridItem.style.backgroundColor = gol.cells[i][j].isAlive ? gol.living : gol.dead;
            container.appendChild(gridItem);
        }
    }
}

function checkRange(event) {
    if (event.target.value < 1) {
        alert("Min value is 1");
        event.target.value = 1;
    }
    if (event.target.value > 50) {
        alert("Max value is 50");
        event.target.value = 50;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function step() {
    //pass
}
