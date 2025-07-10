// selecionando elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//seleciona os elementos da lista
const expenseList = document.querySelector("ul")


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

// captura o evento de submit do formulario
form.onsubmit = (event) => {
//previne comportamento de recarregar a pagina
    event.preventDefault()
//cria um objeto com os detalhes da nova despesa
    const newExpense = {
        id: new Date().getTime(),
        expense: expense.value,
        category_id: category.value,
        category_name: category.options[category.selectedIndex].text,
        amount: amount.value,
        created_at: new Date(),
    }
    // chamando funçao de add item na lista
    expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
    try {
        //cria o elemento de li para add o item na lista(ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //cria o icone da categoria.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        // add as informacoes no item
        expenseItem.append(expenseIcon)

        // add item na lista
        expenseList.append(expenseItem)

    }catch (error){
        alert("Não foi possível atualizar lista de despesas.")
        console.log(error)
    }
}


