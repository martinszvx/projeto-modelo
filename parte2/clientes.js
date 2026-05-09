const listaClientes = [];

function criarCliente(nome, email, categoria) {
    return {
        nome: nome,
        email: email,
        categoria: categoria, // VIP ou Comum
    };
}

function cadastrarCliente(cliente) {
    listaClientes.push(cliente)
    console.log("Sucesso: Cliente cadastrado.");
}

function listarClientes() {
    return listaClientes;
}

module.exports = {
    criarCliente,
    cadastrarCliente,
    listarClientes,
}