const clientes = require('./clientes')

const cliente1 = clientes.criarCliente('jose', 'jose@gmail.com', 'vip');

clientes.cadastrarCliente(cliente1);


const todos = clientes.listarClientes();
console.table(todos);

const idparaBusca = todos[0].id; // Pegando o id do primeiro cliente cadastrado

const clienteEncontrado = clientes.buscarClientePorId(idparaBusca);
console.log(`Cliente encontrado com id ${idparaBusca}:`, clienteEncontrado);