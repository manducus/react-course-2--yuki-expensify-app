import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'
import { addExpense } from './actions/expenses'
import getVisibleExpenses from './selectors/expenses'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'

// normalize.css starts all of the elements in all browsers off with the exact same styles

const store = configureStore()

store.dispatch(addExpense({ description: "Water bill", amount: 4500, createdAt: 1000 }))
store.dispatch(addExpense({ description: "Gas bill", amount: 90, createdAt: 1050 }))
store.dispatch(addExpense({ description: "Rent", amount: 109500, createdAt: 1000 }))


const state = store.getState()
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters)
console.log(visibleExpenses)

// <Provider /> makes the Redux store available to the rest of the app.
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(jsx, document.getElementById("app"))
// only bootstraps the application