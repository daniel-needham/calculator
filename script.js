//functions for all operators
function add() {
    return arguments[0] + arguments[1]
}

function subtract() {
    return arguments[0] - arguments[1]
}

function multiply(...args) {
    return args.reduce((total, current) => total * current, 1);
}

function divide(...args) {
    if (args[1] === 0) return "DON'T BE CLEVER";
    return args.reduce((total, current) => total / current,);
}

//sets all variables to nothing and removes anythiing in the screen
function clear() {
    primary = "";
    operator = "";
    secondary = "";
    primarySelect = true;
    while (screen.lastChild) {
        screen.removeChild(screen.lastChild)
    }
}

//takes primary and secondary number, calculates based on operator chosen
function operate(primary, secondary, operator) {
    let result = window[operator](Number(primary), Number(secondary));
    if (typeof result === "string") return result;
    result = +result.toFixed(10);
    return result;
}

//function to display on screen
function displayScreen(text) {
    if (screen.lastChild) screen.removeChild(screen.lastChild);
    const nums = document.createElement("p");
    nums.textContent = text;
    screen.appendChild(nums);
}

const screen = document.querySelector("#screen");
let primary = "";
let operator = "";
let secondary = "";
let primarySelect = true;
const symbols = {  
    multiply: "×",
    add: "+",
    subtract: "−",
    divide: "÷",
    decimal: ".",
};

//event listeners for numbers
const digits = document.querySelectorAll(".digits"); //this creats a node list which acts similarly to an array
digits.forEach((button) => {  //for.Each adds event listener to button in node list 
    button.addEventListener("click", () => {
        if (primarySelect === true) {
            primary += button.id; //creates string
            console.log(primary);
            displayScreen(primary);
        } else {
            secondary += button.id;
            console.log(secondary);
            displayScreen(secondary)
        }
    });

});

//event listener for operators
const operators = document.querySelectorAll(".operators");
operators.forEach((button) => {
    button.addEventListener("click", () => {
        if (!(primary === "") && !(secondary === "")) {  //this allows multiple calcs without equals
            let result = operate(primary, secondary, operator);
            displayScreen(result);
            primary = result;
            secondary = "";
        }
        operator = button.id;
        displayScreen(symbols[operator]); //finds symbol for the id
        primarySelect = false; 
    });

});

//event listener for clear btn, runs clear function
const clearBtn = document.querySelector("#clear")
clearBtn.addEventListener("click", () => {
    clear();
});

//event listener for equals, runs operate function
const equalBtn = document.querySelector("#equal")
equalBtn.addEventListener("click", () => {
    if (secondary === "") return; // doesn't run if no secondary number
    let result = operate(primary, secondary, operator);
    displayScreen(result);
    primary = result;
    secondary = "";
});

//event listener for decimal button
const deciBtn = document.querySelector("#decimal")
deciBtn.addEventListener("click", () => {
    if (primarySelect === true && primary.includes(".")) return; //only allows one instance of decimal
    if (primarySelect === false && secondary.includes(".")) return;
    if (primarySelect === true) {
        primary += symbols[deciBtn.id]; 
        displayScreen(primary);
    } else {
        secondary += symbols[deciBtn.id];
        displayScreen(secondary)
    }
});

//event listener for backspace
const backBtn = document.querySelector("#backspace")
backBtn.addEventListener("click", () => {
    if (!(operator === "") && secondary === ""){ // allows user to backspace operator
        operator = "";
        displayScreen("");
    }
    if (primarySelect === true) {
        primary = primary.slice(0, -1); 
        displayScreen(primary);
    } else {
        secondary = secondary.slice(0, -1);
        displayScreen(secondary);
    }
});