const display = document.getElementById("display");
const num = document.querySelectorAll(".num");
const ops = document.querySelectorAll(".ops");

const displayNum = function (number) {
  display.value += number;
};

const clear = function () {
  display.value = "";
};

const calc = function () {
  try {
    const result = eval(display.value);
    display.value = result;
  } catch (err) {
    console.log(err);
    display.value = "Error";
  }
};

display.addEventListener("input", function () {
  validateInput(this);
});

function validateInput(input) {
  input.value = input.value.replace(/[^0-9+\-*/().%]/g, "");
}

num.forEach((button) => {
  button.addEventListener("click", () => {
    const number = parseFloat(button.textContent.trim());

    displayNum(number);
  });
});

ops.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent.trim();
    let number;
    if (/[+\-*/%]/.test(buttonText)) {
      // If it's an operator, assign the button's text directly
      number = buttonText;
    } else {
      // If it's a number, parse it as a float
      number = parseFloat(buttonText);
    }

    displayNum(number);
  });
});
