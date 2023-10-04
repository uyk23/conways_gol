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
    }
}

function createCells() {
    gol = new GoL();
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