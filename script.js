document.addEventListener('DOMContentLoaded', loadExpenses);

function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addExpenseToDOM(expense));
    updateTotal();
}

function addItem() {
    const itemName = document.getElementById('item-name').value;
    const itemAmount = parseFloat(document.getElementById('item-amount').value);

    if (itemName === '' || isNaN(itemAmount)) {
        alert('Please enter valid item name and amount');
        return;
    }

    const expense = { name: itemName, amount: itemAmount };
    addExpenseToDOM(expense);
    saveExpense(expense);
    updateTotal();

    document.getElementById('item-name').value = '';
    document.getElementById('item-amount').value = '';
}

function addExpenseToDOM(expense) {
    const expenseList = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.textContent = `${expense.name}: ₹${expense.amount.toFixed(2)}`;
    expenseList.appendChild(li);
}

function saveExpense(expense) {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

function updateTotal() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    document.getElementById('total-amount').textContent = total.toFixed(2);
}

function clearAll() {
    localStorage.removeItem('expenses');
    document.getElementById('expense-list').innerHTML = '';
    document.getElementById('total-amount').textContent = '0.00';
}
