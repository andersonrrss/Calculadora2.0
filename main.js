const display = document.querySelector(".display");

let firstNumber = "";
let secondNumber = "";
let operator = "";

document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    if (btn.id == "delete") {
      deleteItem();
    } else {
      const texto = this.textContent;
      clique(texto);
    }
  });
});

document.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    resultado();
  }
});

function clique(elemento) {
  if (!isNaN(elemento) || elemento == ".") {
    numbers(elemento);
  } else {
    funcao(elemento);
  }
}

function numbers(number) {
  if (operator.length == 0) {
    firstNumber += `${number}`;
    display.innerHTML = firstNumber;
  } else {
    secondNumber += `${number}`;
    display.innerHTML = secondNumber;
  }
}

function funcao(operacao) {
  const operadores = ["+", "-", "x", "÷"];
  if (operadores.includes(operacao)) {
    operator = operacao;
  } else if (operacao == "=") {
    resultado();
  } else if (operacao == "C") {
    firstNumber = "";
    secondNumber = "";
    display.innerHTML = "";
    operator = "";
  } else if (operacao == "+/-") {
    tradeSignal();
  }
}

function resultado() {
  if (firstNumber.length !== 0 && secondNumber.length !== 0) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    let conta = {
      "+": firstNumber + secondNumber,
      "-": firstNumber - secondNumber,
      "x": firstNumber * secondNumber,
      "÷": secondNumber == 0? 0: (firstNumber / secondNumber).toFixed(4)
    };
    if (conta[operator] !== undefined) {
      firstNumber = `${conta[operator]}`;
      secondNumber = "";

      display.innerHTML = `${conta[operator]}`;
    }
  }
}

function deleteItem() {
  if (display.innerHTML == firstNumber) {
    if (firstNumber) {
      firstNumber = firstNumber.slice(0, -1);
      display.innerHTML = firstNumber;
    }
  } else {
    if (secondNumber) {
      secondNumber = secondNumber.slice(0, -1);
      display.innerHTML = secondNumber;
    }
  }
}

function tradeSignal() {
  if (operator == "") {
      firstNumber =
        !firstNumber.includes('-')
          ? `-${firstNumber}`
          : firstNumber.replace("-", "");
      display.innerHTML = firstNumber;
  } else {
      secondNumber =
        !secondNumber.includes("-")
          ? `-${secondNumber}`
          : secondNumber.replace("-", "");
      display.innerHTML = secondNumber;
  }
}
