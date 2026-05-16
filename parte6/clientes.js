const db = require('./database');
const NOME_ARQUIVO = 'clientes';

function criarCliente(nome, email, categoria) {
    return {
        id: Date.now(),
        nome: nome,
        email: email,
        categoria: categoria, // VIP ou Comum
    };
}

function cadastrarCliente(cliente) {
    const lista = db.lerArquivo(NOME_ARQUIVO);

    lista.push(cliente)
    db.salvarArquivo(NOME_ARQUIVO, lista);
    
    console.log("Sucesso: Cliente cadastrado.");
}

function listarClientes() {
    return db.lerArquivo(NOME_ARQUIVO);
}

function buscarClientePorId(id) {
    const lista = db.lerArquivo(NOME_ARQUIVO);

    const cliente = lista.find(cliente => {
        return cliente.id === id ? cliente : null;
    }); 
    return cliente;
}

module.exports = {
    criarCliente,
    cadastrarCliente,
    listarClientes,
    buscarClientePorId,
}