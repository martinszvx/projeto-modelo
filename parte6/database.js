const fs = require('fs');

function definirCaminho(nomeArquivo) {
    return `${__dirname}/dados/${nomeArquivo}.json`;
}

function lerArquivo (nomeArquivo) {
    const caminho = definirCaminho(nomeArquivo);
    if (!fs.existsSync(caminho)) {
        return [];
    }
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    return JSON.parse(conteudo || '[]'); 
}

function salvarArquivo (nomeArquivo, dados) {
    const stringData = JSON.stringify(dados,null,2);
    const caminho = definirCaminho(nomeArquivo);
    fs.writeFileSync(caminho, stringData);
}
module.exports = {lerArquivo, salvarArquivo};
