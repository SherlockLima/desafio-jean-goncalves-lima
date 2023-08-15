class CaixaDaLanchonete {
    descontoDinheiro = 0.05;
    acrescimoCartaoCredito = 0.03;
    precos = {
        cafe: 3.00,
        chantily: 1.50,
        suco: 6.20,
        sanduiche: 6.50,
        queijo: 2.00,
        salgado: 7.25,
        combo1: 9.50,
        combo2: 7.50
    };

    itensPrincipais = ["cafe", "suco", "sanduiche", "salgado"];

    calcularValorDaCompra(formaDePagamento, itens) {
        let valorTotal = 0;
        let resultado = "";
        let temItemPrincipal = false;

        if (itens.length <= 0) {
            resultado = "Não há itens no carrinho de compra!"
            return resultado;
        }

        // Usado para tratamento de itens extras
        const codigos = [];

        for (let item of itens) {
            const codigo = item.split(',')[0];
            const quantidade = parseInt(item.split(',')[1]);

            if (!this.precos.hasOwnProperty(codigo)) {
                resultado = "Item inválido!";
                return resultado;
            }

            if (quantidade <= 0) {
                resultado = "Quantidade inválida!";
                return resultado;
            }

            // Usados para itens extras
            if (this.itensPrincipais.includes(codigo)) temItemPrincipal = true;
            codigos.push(codigo);

            valorTotal += this.precos[codigo] * quantidade;
        }

        // Tratamentos de items principais + extras
        if (!temItemPrincipal ||
            codigos.includes('chantily') && !codigos.includes('cafe') ||
            codigos.includes('queijo') && !codigos.includes('sanduiche') ) {
            resultado = "Item extra não pode ser pedido sem o principal";
            return resultado;
        }

        // Formas de pagamento e cálculo de valores
        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 1 - this.descontoDinheiro;
        }
        else if (formaDePagamento === 'credito') {
            valorTotal *= 1 + this.acrescimoCartaoCredito;
        }
        else if (formaDePagamento === 'debito'){
            valorTotal *= 1;
        } else {
            resultado = "Forma de pagamento inválida!";
            return resultado;
        }

        resultado = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
        return resultado;
    }
};

export { CaixaDaLanchonete };
