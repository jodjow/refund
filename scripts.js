// selecionando elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

//seleciona os elementos da lista
const expenseList = document.querySelector("ul")
const expensesQuantity = document.querySelector("aside header p span")


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

//metodo de add novo item na lista
function expenseAdd(newExpense) {
    try {
        //cria o elemento de li para add o item na lista(ul).
        const expenseItem = document.createElement("li")
        expenseItem.classList.add("expense")

        //cria o icone da categoria.
        const expenseIcon = document.createElement("img")
        expenseIcon.setAttribute("src",`img/${newExpense.category_id}.svg`)
        expenseIcon.setAttribute("alt", newExpense.category_name)

        //cria a info da despesa
        const expenseInfo = document.createElement("div")
        expenseInfo.classList.add("expense-info")

        //cria o nome da despesa
        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        //cria categoria da despesa
        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.category_name

        //add name e category na div das informacoes da despesa
        expenseInfo.append(expenseName, expenseCategory)

        //cria valor da despesa
        const expenseAmount = document.createElement("span")
        expenseAmount.classList.add("expense-amount")
        expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

        //cria o icone de remover 
        const removeIcon = document.createElement("img")
        removeIcon.classList.add("remove-icon")
        removeIcon.setAttribute("src", "img/remove.svg")
        removeIcon.setAttribute("alt", "remover")


        // add as informacoes no item
        expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

        // add item na lista
        expenseList.append(expenseItem)

        //atualiza os totais
        updateTotals()

    }catch (error){
        alert("Não foi possível atualizar lista de despesas.")
        console.log(error)
    }
}

//atualiza todal de despesas
function updateTotals(){
    try {
        //recupera todos os itens(li) da lista(ul)
        const items = expenseList.children
        
        //atualiza a quantidades de itens da lista
        expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`
    }catch(error) {
        console.log(error)
        alert("Não foi possível atualizar os totais.")
    }
}

