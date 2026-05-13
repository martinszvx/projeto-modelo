const menu = require('./menu');
const moduloClientes = require('./clientes');

const minhasOpcoes = [
    {
        texto: 'Cadastrar Cliente',
        acao: (rl, retornar) => {
            rl.question('Digite o Nome: ', (nome) => {
                rl.question('Digite o Email: ', (email) => {
                    rl.question('Categoria (VIP/COMUM): ', (cat) => {

                        const novoCliente = moduloClientes.criarCliente(nome, email, cat);
                        moduloClientes.cadastrarCliente(novoCliente);

                        console.log("\n Processo Finalizado! ");
                        retornar();
                    });
                });
            });
        }
    },
    {
        texto: 'Listar Clientes',
        acao: (rl, retornar) => {
            const lista = moduloClientes.listarClientes();
            console.log("\n--- CLIENTES CADASTRADOS ---");
            console.table(lista);
            retornar();
        }
    }
];

menu.criarMenu('Gerenciamento de Clientes', minhasOpcoes);