const table = [];

const calcForm = document.getElementById("calc-form");
const firstNumberInput = document.getElementById("first-number");
const secondNumberInput = document.getElementById("second-number");
const operatorSelect = document.getElementById("operator");
const calcHistory = document.getElementById("calc-history");
const summary = document.getElementById("summary");
const lastResultSpan = document.getElementById("last-result");
const calcCountSpan = document.getElementById("calc-count");
const clearBtn = document.getElementById("clear-btn");


function calculate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case "+":
      return firstNumber + secondNumber;
    case "-":
      return firstNumber - secondNumber;
    case "*":
      return firstNumber * secondNumber;
    case "/":
        if(secondNumber === 0) {
            throw new Error("Error: Division by zero is not allowed.");
        }else { 
      return firstNumber / secondNumber;
        }
    default:
      throw new Error("Invalid operator");
  }

}

calcForm.addEventListener("submit", (event) => {
  event.preventDefault();

const firstNumber = Number(firstNumberInput.value);
const secondNumber = Number(secondNumberInput.value);
const operator = operatorSelect.value;

if(isNaN(firstNumber) || isNaN(secondNumber)) {
    alert("Please enter valid numbers.");
    return;
}else {

    const result = calculate(firstNumber, secondNumber, operator);

    addToHistory(firstNumber, secondNumber, operator, result);
    displayHistory();
    updateSummary();
    calcForm.reset();
}
});

function addToHistory(firstNumber, secondNumber, operator,result) {
  table.push({ 
    firstNumber: firstNumber,
     secondNumber: secondNumber, 
     operator: operator, 
     result: result 
    });
}

function displayHistory() {
  calcHistory.innerHTML = "";
  table.forEach((entry, index) => {
   const p = document.createElement("p");
   p.textContent = `${entry.firstNumber} ${entry.operator} ${entry.secondNumber} = ${entry.result}`;
   calcHistory.appendChild(p);
  });
}


function updateSummary() {

    summary.classList.remove("hidden");

 calcCountSpan.textContent = table.length;
 if (table.length > 0) {
   const lastEntry = table[table.length - 1];
   lastResultSpan.textContent = `${lastEntry.firstNumber} ${lastEntry.operator} ${lastEntry.secondNumber} = ${lastEntry.result}`;
   calcCountSpan.textContent = table.length;
   
 } else {
   lastResultSpan.textContent = "0";
   calcCountSpan.textContent = "0";
 }
}

clearBtn.addEventListener("click", () => {
  table.length = 0; // Clear the history
  displayHistory();
  updateSummary();
}); 