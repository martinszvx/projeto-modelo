# Guia Passo a Passo: Evolução da Parte 4 para a Parte 5

Na etapa anterior, nós já demos um grande passo ao implementar a **Persistência de Dados** com o nosso `database.js`, garantindo que os clientes sejam salvos de forma segura em um arquivo JSON.

No entanto, nossos algoritmos ainda rodam de forma linear e com dados "chumbados" (hardcoded): o `app.js` executa do topo ao fim, cadastrando clientes predefinidos diretamente no código.

Nesta **Parte 5**, vamos transformar nosso projeto em um sistema interativo de verdade introduzindo a **Interatividade**: Vamos criar um Menu CLI (Command Line Interface) dinâmico, onde o usuário do sistema vai navegar pelas opções e digitar os dados de novos clientes usando o teclado.

---

## Passo 1: Criando a Interface do Usuário (`menu.js`)

Para que o sistema receba dados dinâmicos do teclado, usaremos o módulo nativo `readline`. Ele trabalhará com *Callbacks* (funções passadas como parâmetros) pois a leitura de dados do teclado no Node.js ocorre de forma assíncrona.

> ⚠️ **Atenção ao Terminal:** Durante este guia, faremos vários testes executando o arquivo. É preciso observar a localização no terminal para o comando correto: se o seu terminal estiver aberto na raiz do projeto, o comando será `node parte5/menu.js`. Se o terminal já estiver posicionado dentro da pasta `parte5`, use apenas `node menu.js`.

Vamos construir este arquivo passo a passo para entender cada pedaço. Crie um arquivo chamado **`menu.js`**.

### 1.1 Configurando o `readline` e Testando a Entrada
Primeiro, importe o módulo e crie a interface que liga o teclado (stdin) com a tela (stdout). Adicione este código no seu arquivo vazio:

```javascript
// menu.js
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Teste rápido temporário:
rl.question("Qual o seu nome? ", (nome) => {
    console.log(`Olá, ${nome}! Funcionou.`);
    rl.close(); // Fecha o programa
});
```
*💡 **Teste:** Execute no terminal o comando `node menu.js` ou `node parte5/menu.js` (lembre-se que é preciso verificar em que pasta o terminal está para executar o comando). Digite seu nome e aperte Enter. Entendeu como o programa para a execução e fica "escutando" você digitar?*

### 1.2 Desenhando o Menu no Console
Agora, **apague o teste rápido** que acabamos de fazer (as últimas 5 linhas). Vamos criar a função que desenha o layout do menu na tela, iterando sobre uma lista de opções:

```javascript
function criarMenu(titulo, opcoes) {
    console.log(`\n==============================`);
    console.log(`    ${titulo.toUpperCase()}    `);
    console.log(`==============================`);
    
    opcoes.forEach((opt, index) => {
        console.log(`${index + 1}. ${opt.texto}`);
    });
    console.log(`0. Sair`);
    console.log(`==============================`);
}

// Testando o desenho visual do menu:
const testeOpcoes = [ { texto: "Cadastrar Cliente" }, { texto: "Listar Clientes" } ];
criarMenu("Meu Menu Teste", testeOpcoes);
```
*💡 **Teste:** Execute `node menu.js` novamente. O menu visual deve aparecer formatado e numerado automaticamente na tela!*

### 1.3 Capturando a Escolha do Usuário
**Apague as duas linhas de teste** do final do arquivo (`testeOpcoes...`). Vamos colocar o `rl.question` **dentro** da nossa função `criarMenu` para ele perguntar o que queremos fazer logo após desenhar as opções:

```javascript
// ... continuação de criarMenu
    // (Logo abaixo da linha "0. Sair" do console.log)
    rl.question("Escolha uma opção: ", (escolha) => {
        console.log(`Você digitou a opção: ${escolha}`);
        
        if (escolha === '0') {
            console.log("Encerrando sistema...");
            rl.close();
        } else {
            // Por enquanto só avisamos que escolheu algo
            console.log("Opção escolhida. (Ainda não implementada)");
            rl.close();
        }
    });
}

// Teste final de captura:
criarMenu("Menu Com Captura", [{ texto: "Fazer algo" }]);
```
*💡 **Teste:** Execute o arquivo e digite 0. Depois execute de novo e digite 1. Veja como os `if/else` controlam o fluxo.*

### 1.4 Navegando e Executando Ações (A Lógica Final)
Agora vamos transformar aquele nosso "Ainda não implementada" na lógica de verdade. Precisamos buscar a opção correspondente no Array `opcoes` e executar a função atrelada àquela opção. 
**Apague o teste do final do arquivo** e atualize o miolo do seu `rl.question`:

```javascript
    rl.question("Escolha uma opção: ", (escolha) => {
        if (escolha === '0') {
            console.log("Encerrando sistema...");
            rl.close();
            return;
        }

        // Pegamos o índice do array (se digitou 1, o índice no Array é 0)
        const indice = parseInt(escolha) - 1;
        const opcaoSelecionada = opcoes[indice];

        // Verifica se a opção existe e se tem uma função de ação atrelada a ela
        if (opcaoSelecionada && typeof opcaoSelecionada.acao === 'function') {
            // Executa a ação lá do app.js e passa uma função para retornar ao menu quando terminar (RECURSIVIDADE!)
            opcaoSelecionada.acao(rl, () => criarMenu(titulo, opcoes));
        } else {
            console.log("⚠️ Opção inválida!");
            criarMenu(titulo, opcoes); // Chama o menu de novo se errar
        }
    });
}
```

### 1.5 Exportando o Módulo
Para finalizar o `menu.js` e deixá-lo pronto para o nosso **Passo 2**, não podemos esquecer de exportar a função principal no final do arquivo:

```javascript
module.exports = { criarMenu };
```

---

## Passo 2: Refatorando o Ponto de Entrada (`app.js`)

Por fim, vamos reescrever completamente nosso **`app.js`**. Diga adeus aos testes sequenciais fixos e dê boas-vindas ao nosso novo Menu Dinâmico! Vamos fazer isso em etapas para entender como o nosso novo `menu.js` se comunica com as funcionalidades.

Abra o seu **`app.js`** e **apague todo o conteúdo atual**.
Cole este código abaixo e teste a aplicação.

```javascript
// app.js
const menu = require('./menu');
const moduloClientes = require('./clientes');

const minhasOpcoes = [
    {
        texto: "Cadastrar Cliente",
        acao: (rl, retornar) => {
            // Pergunta 1: Nome
            rl.question("Digite o Nome: ", (nome) => {
                // Pergunta 2: Email (dentro do callback da primeira)
                rl.question("Digite o Email: ", (email) => {
                    // Pergunta 3: Categoria
                    rl.question("Categoria (VIP/COMUM): ", (cat) => {
                        
                        // Agora sim, com todos os dados, chamamos o módulo
                        const novoCliente = moduloClientes.criarCliente(nome, email, cat);
                        moduloClientes.cadastrarCliente(novoCliente);

                        console.log("\n✅ Processo finalizado!");
                        retornar(); // Volta para o menu principal
                    });
                });
            });
        }
    },
    {
        texto: "Listar Clientes",
        acao: (rl, retornar) => {
            const lista = moduloClientes.listarClientes();
            console.log("\n--- CLIENTES CADASTRADOS ---");
            console.table(lista);
            retornar();
        }
    }
];

menu.criarMenu("Sistema Comercial Senac", minhasOpcoes);
```