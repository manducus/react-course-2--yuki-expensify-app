import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AppRouter, { history } from './routers/AppRouter'
import configureStore from './store/configureStore'
import { startSetExpenses } from './actions/expenses'
import { login, logout } from './actions/auth'
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { firebase } from './firebase/firebase'
// normalize.css starts all of the elements in all browsers off with the exact same styles

const store = configureStore()

// <Provider /> makes the Redux store available to the rest of the app.
const jsx = (
    <Provider store={store}>
        <AppRouter />
    </Provider>
)

ReactDOM.render(<p>Loading...</p>, document.getElementById("app"))

// 必要な時のみレンダリングを一度だけ行うようにする
let hasRendered = false
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById("app"))
        hasRendered = true
    }
}

// login時はlogin page にいた時だけリダイレクトさせたい
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        store.dispatch(login(user.uid))
        store.dispatch(startSetExpenses()).then(() => {
            renderApp()
            if (history.location.pathname === "/") {
                history.push("/dashboard")
            }
            // only bootstraps the application
        })
    } else {
        store.dispatch(logout())
        renderApp()
        history.push("/")
    }
})