const financeiro = require('./financeiro');
const clientes = require('./clientes')

function imprimirCupom (cliente, valorFinal) {
    console.log("\n");
    console.log("LOJA MODA SENAC");
    console.log("Cliente: ", cliente);
    console.log("Total a Pagar:", valorFinal);
    console.log("\n");
}

const valorFinal = financeiro.calcularTotalComDesconto(300, 15);

const cliente1 = clientes.criarCliente(
    "Lucas Martins",
    "lucas@gmail.com",
    "VIP",
);
clientes.cadastrarCliente(cliente1)

const cliente2 = clientes.criarCliente(
    "Raphael Sausen",
    "raphael@gmail.com",
    "VIP",
);
clientes.cadastrarCliente(cliente2)

const listaClientes = clientes.listarClientes();

for (let cliente of listaClientes) {
    imprimirCupom(cliente.nome, valorFinal);
}