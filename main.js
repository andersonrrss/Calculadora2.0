const display = document.querySelector(".display");
// True é o primeiro número, false é o segundo
let calculateState = true;

let firstNumber = "";
let secondNumber = "";
let operator = "";

// Adiciona um eventListener para todos os botões
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    // O botão de apagar precisa ser acessado pelo id
    // Acessá-lo pelo seu texto interno deixaria o código ilegível devido ao ícone
    if (btn.id == "delete") {
      deleteItem();
    } else {
      const texto = this.textContent;
      clique(texto);
    }
  });
});

// Se o usuário apertar enter o resultado será mostrado se as expecificações estiverem cumpridas
document.addEventListener("keypress", function (e) {
  if (e.key == "Enter") {
    resultado();
  }
});

// Pega o texto que está dentro do botão clicado e processa o que esse valor tem que fazer
// Gambiarra que funcionou
function clique(elemento) {
  //Se for um número ou "." então ele só é adicionado ao número atual
  if (!isNaN(elemento) || elemento == ".") {
    let targetNumber = calculateState ? firstNumber : secondNumber;
    if (elemento == "." && targetNumber.includes(".")) {
      return false;
    }

    targetNumber += `${elemento}`;
    update(targetNumber);
    // Código que decide o que fazer se o elemento não for um número
  } else {
    // Se for um operador ele apenas será adicionado a variável operator que será usada nas outras funções
    const operadores = ["+", "-", "x", "÷"];
    if (operadores.includes(elemento)) {
      calculateState = false;
      operator = elemento;
    } else if (elemento == "=") {
      resultado();
    } else if (elemento == "C") {
      //Limpa tudo
      clearAll();
    } else if (elemento == "+/-") {
      tradeSignal();
    }
  }
}

// Função que calcula os resultados e os mostra para o usuário
function resultado() {
  if (firstNumber.length !== 0 && secondNumber.length !== 0) {
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    let conta = {
      "+": firstNumber + secondNumber,
      "-": firstNumber - secondNumber,
      x: firstNumber * secondNumber,
      "÷":
        secondNumber == 0 || firstNumber == 0
          ? 0
          : (firstNumber / secondNumber).toFixed(4),
    };
    if (conta[operator] !== undefined) {
      // O resultado é armazenado no firstNumber caso o usuário queira continuar operações com ele
      firstNumber = `${conta[operator]}`;
      secondNumber = "";
      //Atualiza o display
      display.innerHTML = `${conta[operator]}`;
      calculateState = true;
    }
  }
}

// Função que vai apagar o último caractere digitado do número mostrado
function deleteItem() {
  let targetNumber = calculateState ? firstNumber : secondNumber;
  if (targetNumber) {
    targetNumber = targetNumber.slice(0, -1); //Deleta o último caractere do número
    update(targetNumber);
  }
}

// Função que inverte o valor do número(positivo -> negativo && negativo -> positivo)
function tradeSignal() {
  let targetNumber = calculateState ? firstNumber : secondNumber;
  targetNumber = !targetNumber.includes("-") //Checa se o número já está negativo
    ? `-${targetNumber}`
    : targetNumber.replace("-", "");
  update(targetNumber);
}

//Função que atualiza o display e o número atual que está sendo manipulado
function update(number) {
  display.innerHTML = number;
  calculateState ? (firstNumber = number) : (secondNumber = number);
}

//função que vai limpar todos os campos
function clearAll() {
  firstNumber = "";
  secondNumber = "";
  display.innerHTML = "";
  operator = "";
  calculateState = true
}
