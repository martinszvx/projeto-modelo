const readline = require('readline-sync');

function criarMenu(titulo, opcoes) {
    while (true) {
        console.log(`\n==============================`);
        console.log(`    ${titulo.toUpperCase()}    `);
        console.log(`==============================`);

        opcoes.forEach((opt,index) => {
            console.log(`${index + 1}. ${opt.texto}`);
        });
        console.log(`0. Sair`);
        console.log(`==============================`);

        // Mudança importante: O codigo PAUSA nesta linha até a resposta do usuário
        const escolha = readline.question('Escolha uma opcao: ');
        
        if(escolha === '0') {
            console.log('Saindo do menu...');
            break;
        }

        const indice = parseInt(escolha) - 1;
        const opcaoSelecionada = opcoes[indice];

        if (opcaoSelecionada && typeof opcaoSelecionada.acao === 'function') {
            // Agora a execução da ação recebe apenas a referência do leitor síncrono.
            // Sem necessidade do callback de 'retornar'!
            opcaoSelecionada.acao(readline);
        }
        else {
            console.log('Opção inválida. Tente novamente.');
        }
    }
}

module.exports = {
    criarMenu
};
