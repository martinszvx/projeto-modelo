const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function criarMenu(titulo, opcoes) {
    console.log(`\n==============================`);
    console.log(`    ${titulo.toUpperCase()}    `);
    console.log(`==============================`);

    opcoes.forEach((opt, index) => {
        console.log(`${index + 1}. ${opt.texto}`);
    });
    console.log(`0. Sair`);
    console.log(`==============================`);

    rl.question('Escolha uma opção: ', (escolha) => {
        if (escolha === '0') {
            console.log('Saindo do menu...');
            rl.close();
            return;
        }

        const indice = parseInt(escolha) - 1;
        const opcaoSelecionada = opcoes[indice];

        if (opcaoSelecionada && typeof opcaoSelecionada.acao === 'function') {
            opcaoSelecionada.acao(rl, () => criarMenu(titulo, opcoes)); 
        } else {
            console.log('Opção inválida!');
            criarMenu(titulo, opcoes);
        }
    });
}

module.exports = { criarMenu };

