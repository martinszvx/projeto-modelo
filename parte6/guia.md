# Guia Passo a Passo: Evolução da Parte 5 para a Parte 6

Na etapa anterior, nós conseguimos introduzir a **Interatividade** usando o módulo nativo `readline`. Criamos um menu dinâmico para cadastrar novos clientes pelo terminal.

Porém, você deve ter notado que, para fazer várias perguntas seguidas no `app.js`, acabamos criando um código aninhado (o famoso *Callback Hell*). O Node.js trabalha por padrão de forma assíncrona com entradas e saídas, exigindo que passássemos funções de *callback* em cascata, além de precisarmos de uma função de `retornar()` para forçar o redesenho do menu usando recursividade.

Nesta **Parte 6**, vamos simplificar drasticamente a leitura de dados usando uma biblioteca externa chamada **`readline-sync`**. Com ela, nosso fluxo volta a ser **linear e síncrono** — o código vai parar e esperar a digitação na mesma linha —, tornando tudo muito mais limpo e fácil de manter.

---

## Passo 1: Atualizando a Interface do Usuário (`menu.js`)

Na Parte 5, usávamos o módulo embutido `readline` e precisávamos criar e configurar uma interface. Agora, com o `readline-sync`, não precisamos de muita preparação prévia.

> ⚠️ **Atenção:** Como o `readline-sync` é uma dependência de terceiros (módulo externo do Node), caso você esteja criando o projeto do zero, será necessário instalá-lo via NPM executando o comando `npm install readline-sync` na raiz do seu projeto.

Abra o arquivo **`menu.js`** e observe as mudanças que faremos:

### 1.1 Trocando o Módulo
Remova a importação antiga e a constante `rl` que criava a interface via `createInterface`. Vamos importar apenas o módulo síncrono novo:

```javascript
// menu.js
const readline = require('readline-sync');
```

### 1.2 Substituindo a Recursividade por um Loop (`while`)
Antes, para que o menu reaparecesse após uma ação, invocávamos a função `criarMenu` de dentro dela mesma (via callback `retornar`). Agora, usaremos um clássico loop infinito `while (true)` que manterá a tela sendo atualizada até que o comando de interrupção (`break`) seja chamado.

Dentro de `criarMenu`, ajuste o código da seguinte forma:

```javascript
function criarMenu(titulo, opcoes) {
    while (true) { // Loop para manter o menu aberto
        console.log(`\n==============================`);
        console.log(`    ${titulo.toUpperCase()}    `);
        console.log(`==============================`);
        
        opcoes.forEach((opt, index) => {
            console.log(`${index + 1}. ${opt.texto}`);
        });
        console.log(`0. Sair`);
        console.log(`==============================`);

        // Mudança Importante: O código PAUSA nesta linha até a resposta do usuário
        const escolha = readline.question("Escolha uma opcao: ");

        if (escolha === '0') {
            console.log("Encerrando sistema...");
            break; // O loop é finalizado e o script se encerra
        }

        const indice = parseInt(escolha) - 1;
        const opcaoSelecionada = opcoes[indice];

        if (opcaoSelecionada && typeof opcaoSelecionada.acao === 'function') {
            // Agora a execução da ação recebe apenas a referência do leitor síncrono.
            // Sem necessidade do callback de 'retornar'!
            opcaoSelecionada.acao(readline);
        } else {
            console.log("⚠️ Opcao invalida!");
        }
    }
}
```

---

## Passo 2: O Fim do *Callback Hell* no Ponto de Entrada (`app.js`)

O impacto positivo do novo módulo será visto em todo o seu esplendor dentro do `app.js`. Vamos remover todas as chamadas aninhadas (aquelas escadinhas de chaves e parênteses) por uma coleta linear e direta.

Abra o seu arquivo **`app.js`**:

### 2.1 Refatorando a Ação de "Cadastrar Cliente"
Nossa função de ação antes possuía os parâmetros `(rl, retornar)`. Na Parte 6, ela recebe apenas a instância do leitor síncrono, nomeado aqui como `(rs)`. Veja a mudança radical nas variáveis:

```javascript
    {
        texto: "Cadastrar Cliente",
        acao: (rs) => {
            // Lógica Linear: Pergunta por pergunta, atribuídas diretamente a variáveis!
            const nome = rs.question("Digite o Nome: ");
            const email = rs.question("Digite o Email: ");
            const cat = rs.question("Categoria (VIP/COMUM): ");

            const novoCliente = moduloClientes.criarCliente(nome, email, cat);
            moduloClientes.cadastrarCliente(novoCliente);
            
            console.log("\n✅ Cliente cadastrado com sucesso!");
            
            // Note que a antiga chamada `retornar();` sumiu.
        }
    },
```

### 2.2 Refatorando a Ação de "Listar Clientes"
Na opção de listar, já que não precisamos interagir com o teclado, sequer precisamos receber parâmetros na função anônima. Removemos também o callback de encerramento.

```javascript
    {
        texto: "Listar Clientes",
        acao: () => { // Função sem parâmetros
            const lista = moduloClientes.listarClientes();
            console.log("\n--- LISTA DE CLIENTES ---");
            console.table(lista);
            
            // A antiga chamada `retornar();` também foi removida daqui!
        }
    }
```

### 2.3 Melhorando as Configurações Iniciais
Por fim, uma pequena melhoria visual e de organização no fim do arquivo. Foi criada uma constante específica para abrigar o título do menu no topo do script:

```javascript
// Criamos a variável antes do array de opções
const tituloSistema = "Gestao Comercial Senac";

// ...

// E chamamos ela para inicializar a aplicação no final do arquivo
menu.criarMenu(tituloSistema, minhasOpcoes);
```

---

## Resumo dos Ganhos na Parte 6
Ao migrarmos da leitura assíncrona (`readline`) para a leitura síncrona (`readline-sync`), obtivemos as seguintes vantagens:
1. **Código Limpo e Mais Curto:** Dissemos adeus à complexidade do *callback hell* no arquivo `app.js`.
2. **Alta Escalabilidade:** Se precisarmos adicionar 5 novas perguntas no cadastro (como CPF, telefone e endereço), bastará adicionar 5 linhas em vez de criar 5 níveis a mais de identação no código.
3. **Controle de Fluxo Consistente:** O uso do `while` na criação do menu evita o acúmulo de processamento causado pela recursividade.