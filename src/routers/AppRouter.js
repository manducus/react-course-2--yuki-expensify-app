import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import AddExpensePage from '../components/AddExpensePage'
import EditExpensePage from '../components/EditExpensePage'
import ExpenseDashboardPage from '../components/ExpenseDashboardPage'
import Header from '../components/Header'
import HelpPage from '../components/HelpPage'
import NotFoundPage from '../components/NotFoundPage'


const AppRouter = () => (
    <BrowserRouter>
        <div>
            <Header />
            <Switch>
                <Route path="/" component={ExpenseDashboardPage} exact={true} />
                <Route path="/create" component={AddExpensePage} />
                <Route path="/edit/:id" component={EditExpensePage} />
                <Route path="/help" component={HelpPage} />
                <Route component={NotFoundPage} />
            </Switch>
        </div>
    </BrowserRouter>
)
// BrowserRouter の中には 1 child しか入らないので、複数 Route を入れる場合は div 等を緩衝材にする
// Not only is React-router rendering the component, it's also passing a few props down.
// Switch moves through route definitions in order and stops when it finds a match.


export default AppRouter