const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {
  //   Replace current display value if first value entered
  if (awaitingNextValue) {
    calculatorDisplay.textContent = number;
    awaitingNextValue = false;
  } else {
    // If the current display value is 0, replace it if note add number
    const displayValue = calculatorDisplay.textContent;

    calculatorDisplay.textContent =
      displayValue === "0" ? number : displayValue + number;
  }
}

function addDecimal() {
  // If operator pressed dont add decimal
  if (awaitingNextValue) {
    return;
  }
  // if no decimal, add one
  if (!calculatorDisplay.textContent.includes(".")) {
    calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
  }
}

// Calculate first and second value depending on operator
const calculate = {
  "/": (firstNumber, secondNumber) => firstValue / secondNumber,
  "*": (firstNumber, secondNumber) => firstValue * secondNumber,
  "+": (firstNumber, secondNumber) => firstValue + secondNumber,
  "-": (firstNumber, secondNumber) => firstValue - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};
function useOperator(operator) {
  const currentValue = Number(calculatorDisplay.textContent);
  //   To prevent ;ultiple operators
  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }
  // Assign firstvlue if no value
  if (!firstValue) {
    firstValue = currentValue;
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue);
    calculatorDisplay.textContent = calculation;
    firstValue = calculation;
  }
  //   Ready for next value
  awaitingNextValue = true;
  operatorValue = operator;
}

// Add event listeners
inputBtns.forEach((inputBtn) => {
  if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => addDecimal());
  }
});

// Reset display
function resetAll() {
  firstValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
  calculatorDisplay.textContent = "0";
}

// Event Listner
clearBtn.addEventListener("click", resetAll);
