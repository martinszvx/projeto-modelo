const menu = require('./menu');
const moduloClientes = require('./clientes');

const minhasOpcoes = [
    {
        texto: 'Cadastrar Cliente',
        acao:(rs) => {
            //logica linear: Pergunta por pergunta, atribuidas diretamente a variaveis
            const nome = rs.question('Digite o nome do cliente: ');
            const email = rs.question('Digite o email do cliente: ');
            const cat = rs.question('Digite a categoria do cliente (VIP ou COMUM): ');

            const novoCliente = moduloClientes.criarCliente(nome, email, cat);
            moduloClientes.cadastrarCliente(novoCliente);

            console.log('Cliente cadastrado com sucesso!');
        }
    },
    {
        texto: 'Listar Clientes',
        acao: () => {
            const lista = moduloClientes.listarClientes();
            console.log("\n--- CLIENTES CADASTRADOS ---");
            console.table(lista);
        }
    }
];

// Criamos a variável antes do array de opções
const tituloSistema = "Gestao Comercial Senac";


// E chamamos ela para inicializar a aplicação no final do arquivo
menu.criarMenu(tituloSistema, minhasOpcoes);