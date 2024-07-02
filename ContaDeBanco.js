function Conta(agencia, conta, saldo) {
    this.agencia = agencia;
    this.conta = conta;
    this.saldo = saldo;
    this.transacoes = [];
}

Conta.prototype.sacar = function(valor) {
    if (this.saldo < valor) {
        console.log(`Não tem dinheiro suficiente, seu saldo é de R$${this.saldo.toFixed(2)}`);
        this.verSaldo();
        this.chequeEspecial(valor);
        return;
    }
    this.saldo -= valor;
    this.transacoes.push(`Saque de R$${valor.toFixed(2)}`);
    this.verSaldo();
};

Conta.prototype.depositar = function(valor) {
    this.saldo += valor;
    this.transacoes.push(`Depósito de R$${valor.toFixed(2)}`);
    this.verSaldo();
};

Conta.prototype.verSaldo = function() {
    document.getElementById('saldo').textContent = `Saldo: R$${this.saldo.toFixed(2)}`;
    const transacoesList = document.getElementById('transacoes');
    transacoesList.innerHTML = '';
    this.transacoes.forEach(transacao => {
        const li = document.createElement('li');
        li.textContent = transacao;
        transacoesList.appendChild(li);
    });
};

Conta.prototype.chequeEspecial = function(valor) {
    const deficit = valor - this.saldo;
    const chequeEspecialElement = document.getElementById('cheque-especial');
    if (deficit > 0) {
        chequeEspecialElement.textContent = `Cheque Especial: R$ -${deficit.toFixed(2)}`;
        chequeEspecialElement.classList.add('negativo');
    } else {
        chequeEspecialElement.textContent = `Cheque Especial: R$0.00`;
        chequeEspecialElement.classList.remove('negativo');
    }
};

// Inicializando a conta com saldo zerado
const conta1 = new Conta(11, 22, 0);

// Funções para interação com o formulário
function depositar(event) {
    event.preventDefault(); // Evita o envio do formulário
    const valor = parseFloat(document.getElementById('deposit-value').value);
    if (!isNaN(valor) && valor > 0) {
        conta1.depositar(valor);
    } else {
        alert('Insira um valor válido para depositar.');
    }
    document.getElementById('deposit-form').reset();
}

function sacar(event) {
    event.preventDefault(); // Evita o envio do formulário
    const valor = parseFloat(document.getElementById('withdraw-value').value);
    if (!isNaN(valor) && valor > 0) {
        conta1.sacar(valor);
    } else {
        alert('Insira um valor válido para sacar.');
    }
    document.getElementById('withdraw-form').reset();
}
