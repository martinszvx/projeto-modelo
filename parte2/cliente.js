const listaClientes = [];

function criarCliente(nome, email, categoria) {
    return {
        nome: nome,
        email: email,
        categoria: categoria, //vip ou comum
    };
}

function cadastrarCliente(cliente) {
    listaClientes.push(cliente);
    console.log("Sucesso: cliente cadastrado.");
}

function listarClientes() {
    return listaClientes;
}