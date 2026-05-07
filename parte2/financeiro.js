function calcularTotalComDesconto(valorBruto, percentualDesconto) {
    const taxaDeDesconto = percentualDesconto / 100;
    const valorDeDesconto = valorBruto * taxaDeDesconto;
    const valorFinal = valorBruto - valorDeDesconto;

    return valorFinal;
}

module.exports = {
    calcularTotalComDesconto
};