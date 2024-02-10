"use strict";

const display = document.getElementById("display");
const num = document.querySelectorAll(".num");
const ops = document.querySelectorAll(".ops");
const equals = document.querySelector(".calc__numPad__btn-equals");
const resets = document.querySelector(".calc__numPad__btn-resets");
const del = document.querySelector(".calc__numPad__btn-del");

function calc() {
  try {
    // Replace 'x' with '*' in currentInput for evaluation
    const sanitizedInput = currentInput.replace(/x/g, "*");

    // Evaluate the sanitized input
    const result = eval(sanitizedInput);

    // Display the result
    display.value = result;
  } catch (error) {
    // Display error message
    display.value = "Error";

    // Log the error to console
    console.error(error);
  }
}

ops.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent.trim();
    let operator;

    if (/[+\-*/%.xX]/.test(buttonText)) {
      // If it's any other operator, assign the button's text directly
      operator = " " + buttonText + " ";
    } else {
      // If it's a number or any other character, parse it as a float
      operator = parseFloat(buttonText);
    }
    displayNum(operator);
    console.log("button text =", buttonText);
    console.log("current input =", currentInput); // Display the button's text ('x' will be displayed)
    // Use the corresponding operator for calculation
  });
});
let currentInput = "";

const displayNum = function (value) {
  currentInput += value;
  display.value += value;
};

const clear = function () {
  currentInput = "";
  display.value = "";
};
display.addEventListener("input", function () {
  validateInput(this);
});

function validateInput(input) {
  input.value = input.value.replace(/[^0-9+\-*/().%xX]/g, "");
}

num.forEach((button) => {
  button.addEventListener("click", () => {
    displayNum(button.textContent.trim());
  });
});

resets.addEventListener("click", function () {
  clear();
});
del.addEventListener("click", function () {
  currentInput = currentInput.slice(0, -1);
  display.value = display.value.slice(0, -1);
});

equals.addEventListener("click", function () {
  calc();
  currentInput = display.value; // Update currentInput with the result
  display.value = currentInput; // Display the result
});
