var gol;

const heightInput = document.getElementById("cellHeight");
heightInput.addEventListener("input", checkRange);

const widthInput = document.getElementById("cellWidth");
widthInput.addEventListener("input", checkRange);

const submit = document.getElementById("submit");
submit.addEventListener("click", newGame);

const stop = document.getElementById("stop");
stop.addEventListener("click", stopGame);

const counter = document.getElementById('counter');

class GoL {
    constructor() {
        this.height = document.querySelector("#cellHeight").value || 23;
        this.width = document.querySelector("#cellWidth").value || 23;
        this.living = document.querySelector("#livingColor").value;
        this.dead = document.querySelector("#deadColor").value;
        this.playing = false;

        this.cells = [];
        for (let i = 0; i < this.height; i++) {
            let arr = [];
            for (let j = 0; j < this.width; j++) {
                arr.push(Math.floor(Math.random() * 2) === 1);
            }
            this.cells.push(arr);
        }
    }
}

function newGame() {
    if (gol && gol.playing) {
        alert("Game in progress. Stop the game before starting a new game :)");
    } else if (!gol || (gol && !gol.playing)) {
        gol = new GoL();
        gol.playing = true;
        create();
        playGame();
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function playGame() {
    let i = 2;
    let seconds = 2.5;

    counter.style.padding = "2%";
    counter.innerHTML = 'Step: 1';
    await sleep(seconds * 1000);

    while (gol.playing) {
        counter.innerHTML = `Step: ${i}`;
        //printing
        console.log(`step ${i}`);
        let str = JSON.stringify(gol.cells);
        console.log(str);

        step();
        change();
        await sleep(seconds * 1000);
        i++;
    }
}

function stopGame() {
    gol.playing = false;
    counter.innerHTML = "";
    counter.style.padding = null;
}

function step() {
    let currentCells = [];
    let up, down, left, right, livingNeighbors;

    for (let i = 0; i < gol.cells.length; i++) {
        currentCells[i] = gol.cells[i].slice();
    }

    for (let i = 0; i < gol.height; i++) {
        for (let j = 0; j < gol.width; j++) {
            up = i - 1;
            down = i + 1;
            left = j - 1;
            right = j + 1;

            livingNeighbors = 0
            if (up >= 0 && left >= 0 && currentCells[up][left]) {
                livingNeighbors++;
            } if (up >= 0 && currentCells[up][j]) {
                livingNeighbors++;
            } if (up >= 0 && right < gol.width && currentCells[up][right]) {
                livingNeighbors++;
            } if (left >= 0 && currentCells[i][left]) {
                livingNeighbors++;
            } if (right < gol.width && currentCells[i][right]) {
                livingNeighbors++;
            } if (down < gol.height && left >= 0 && currentCells[down][left]) {
                livingNeighbors++;
            } if (down < gol.height && currentCells[down][j]) {
                livingNeighbors++;
            } if (down < gol.height && right < gol.width && currentCells[down][right]) {
                livingNeighbors++;
            }

            if (currentCells[i][j] && (livingNeighbors === 2 || livingNeighbors === 3)) {
                continue;
            } else if (!currentCells[i][j] && livingNeighbors === 3) {
                gol.cells[i][j] = true;
            } else {
                gol.cells[i][j] = false;
            }
        }
    }
}

function create() {
    const parentContainer = document.getElementById('cells');
    const gridContainer = document.getElementById('grid-container');
    let newContainer = document.createElement('div');
    let fragment = document.createDocumentFragment();

    // create new cells
    newContainer.style.gridTemplateColumns = `repeat(${gol.width}, auto)`
    for (let i = 0; i < gol.height; i++) {
        for (let j = 0; j < gol.width; j++) {
            let gridItem = document.createElement('div');
            gridItem.className = "grid-item";
            gridItem.innerHTML = " ";
            gridItem.style.backgroundColor = gol.cells[i][j] ? gol.living : gol.dead;
            fragment.appendChild(gridItem);
        }
    }

    newContainer.appendChild(fragment.cloneNode(true));
    parentContainer.replaceChild(newContainer, gridContainer);
    newContainer.setAttribute('id', 'grid-container');
}

function change() {
    const gridItems = document.querySelectorAll("div.grid-item");
    const mergedCells = gol.cells.flat(1);

    gridItems.forEach((gridItem, idx) => {
        gridItem.style.backgroundColor = mergedCells[idx] ? gol.living : gol.dead;
    });
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
