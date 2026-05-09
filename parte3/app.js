const clientes = require('./clientes')

const cliente1 = clientes.criarCliente(
    "Lucas Martins",
    "lucas@gmail.com",
    "VIP",
);


const cliente2 = clientes.criarCliente(
    "Raphael Sausen",
    "raphael@gmail.com",
    "VIP",
);

clientes.cadastrarCliente(cliente1)
clientes.cadastrarCliente(cliente2)

const listaClientes = clientes.listarClientes();
console.table(listaClientes);