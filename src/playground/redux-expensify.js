import { addExpense, removeExpense, editExpense } from '../actions/expenses'



store.subscribe(() => {
    const state = store.getState()
    const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
    console.log(visibleExpenses)
})

const expenseOne =  store.dispatch(addExpense({ description: "Rent", amount: 100, createdAt: 1000 }))
// get dispatched to the expense reducer and to the filters reducer
// dispatch() returns the action object

const expenseTwo =  store.dispatch(addExpense({ description: "Coffee", amount: 300, createdAt: 2000 }))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))

// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter("rent"))// or no value to clear it out
// store.dispatch(setTextFilter())

store.dispatch(sortByAmount())
store.dispatch(sortByDate())

// store.dispatch(setStartDate(125))
// store.dispatch(setStartDate())

// store.dispatch(setEndDate(1250))

const demoState = {
    expenses: [{
        id: "gsfjgoo",
        description: "January Rent",
        note: "demo",
        amount: 54500,
        createdAt: 0
    }],
    filters: {
        text: "rent",
        sortBy: "amount", // date or amount
        startDate: undefined,
        endDate: undefined
    }
}