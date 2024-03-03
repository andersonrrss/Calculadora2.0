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
  if (!isNaN(elemento) || elemento == ",") {
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
  } else if (operacao == '+/-'){
    tradeSignal()
  }
}

function resultado() {
  if(firstNumber.lenght !== 0 && secondNumber.lenght !== 0){
    firstNumber = Number(firstNumber.replace(",", "."));
    secondNumber = Number(secondNumber.replace(",", "."));
    let conta = {
      "+": firstNumber + secondNumber,
      "-": firstNumber - secondNumber,
      "x": firstNumber * secondNumber,
      "÷": (firstNumber / secondNumber).toFixed(4),
    };
    if (conta[operator]) {
      firstNumber = `${conta[operator]}`;
      secondNumber = "";

      display.innerHTML = `${conta[operator]}`.replace('.', ',');
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

function tradeSignal(){
  if (display.innerHTML == firstNumber) {
    if (firstNumber) {
      firstNumber = Number(firstNumber) > 0? `-${firstNumber}` : Math.abs(Number(firstNumber)).toString()
      display.innerHTML = firstNumber;
    }
  } else {
    if (secondNumber) {
      secondNumber = Number(secondNumber) >= 0? `-${secondNumber}` : Math.abs(Number(secondNumber)).toString()
      display.innerHTML = secondNumber;
    }
  }
}
