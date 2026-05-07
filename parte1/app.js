const financeiro = require('./financeiro');

function imprimirCupom(cliente, valorFinal) {
    console.log("LOJA MODA SENAC");
    console.log("Cliente: ", cliente);
    console.log("Total a Pagar: ", valorFinal);
}

const valorFinal = financeiro.calcularTotalComDesconto(300, 15);

imprimirCupom("Raphael Sausen", valorFinal);