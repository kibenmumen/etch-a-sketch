const DEFAULT_SIZE = 16;
const DEFAULT_COLOR = "black";
const DEFAULT_MODE = "color";
const ERASE_COLOR = "white";

let current_color = DEFAULT_COLOR;
let current_size = DEFAULT_SIZE;
let current_mode = DEFAULT_MODE;

const inColor = document.querySelector(`#colorPicker`);

const btnColor = document.querySelector(`#colorBtn`)
const btnRainbow = document.querySelector(`#rainbowBtn`)
const btnClear = document.querySelector(`#clearBtn`)
const btnErase = document.querySelector(`#eraseBtn`);

let inGridValue = document.querySelector(`#gridSizeValue`);
let inGridSizeSlider = document.querySelector(`.gridSizeSlider`);
//=========================================================

function createGrid(size) {
    let gridBox = document.querySelector(`.grid-container`);
    let squares = gridBox.querySelectorAll(`div`);
    squares.forEach((div) => div.remove());
    gridBox.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    gridBox.style.gridTemplateRows = `repeat(${size}, 1fr)`;

    let amount = size * size;
    for (let i = 1; i <= amount; i++) {
        let box = document.createElement(`div`);
        box.addEventListener("mouseover", changeColor);
        box.style.backgroundColor = "white";
        gridBox.insertAdjacentElement("beforeend", box);
    }

}

function updateMode(mode) {
    current_mode = mode;
    deactivateButton();
    if (current_mode === "color") {
        btnColor.classList.add('active')
    } else if (current_mode === "rainbow") {
        btnRainbow.classList.add('active')
    } else if (current_mode === "erase") {
        btnErase.classList.add('active')
    }
}

function updateGridSize(size) {
    if (size => 1 || size <= 64) {
        createGrid(size);
    } else {
        console.log(`too many squares!`)
    }
}

function changeColor() {
    if (current_mode === "rainbow") {
        const randomR = Math.floor(Math.random() * 256);
        const randomG = Math.floor(Math.random() * 256);
        const randomB = Math.floor(Math.random() * 256);
        current_color = `rgb(${randomR}, ${randomG}, ${randomB})`;
        this.style.backgroundColor = current_color;
    } else if (current_mode === "color") {
        current_color = inColor.value
        this.style.backgroundColor = current_color;
    } else if(current_mode === "erase"){
        current_color = ERASE_COLOR;
        this.style.backgroundColor = current_color;
    }
    else {
        console.log(current_mode);
    }

}


inGridSizeSlider.addEventListener('change', (size) => {
    size = inGridSizeSlider.value;
    current_size = size;
    inGridValue.textContent = `${size} x ${size}`;
    console.log(size);
})

inColor.addEventListener('change', (color) => {
    color = inColor.value;
    current_color = color;
})

btnClear.addEventListener('click', () => {
    current_color = inColor.value;
    createGrid(current_size)
});

btnErase.addEventListener('click', () => {updateMode("erase")})
btnColor.addEventListener('click', () => {updateMode("color")})
btnRainbow.addEventListener('click', () => {updateMode("rainbow")})

function deactivateButton(mode) {

    btnColor.classList.remove('active')
    btnErase.classList.remove('active')
    btnRainbow.classList.remove('active')
}

createGrid(DEFAULT_SIZE);
updateMode(DEFAULT_MODE);