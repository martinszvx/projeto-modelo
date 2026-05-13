function calcularTotalComDesconto(valorBruto, percentuarDesconto) {
    const taxaDeDesconto = percentuarDesconto / 100;
    const valorDeDesconto = valorBruto * taxaDeDesconto;
    const valorFinal = valorBruto - taxaDeDesconto;

    return valorFinal
    
}

module.exports = {
    calcularTotalComDesconto
};