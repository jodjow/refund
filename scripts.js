// selecionando elementos do formulário
const amount = document.getElementById("amount")

//capturando evento input para formatar valor
amount.oninput = () => {
    //obtendo o valor autual do input e removendo os valores nao numericos
    let value = amount.value.replace(/\D/g, "")

    // transformando valor em centavos
    value = Number(value) / 100

    //atualizando valor do input
        amount.value = value = formatCurrencyBRL(value)
}

// formatando moeda BRL
function formatCurrencyBRL(value){
    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
    return value
}
