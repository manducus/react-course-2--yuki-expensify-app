import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
    <header>
        <h1>Expensify</h1>
        <p><NavLink exact to="/" activeClassName="is-active">Home page</NavLink></p>
        <p><NavLink to="/create" activeClassName="is-active">create expense page</NavLink></p>
        <p><NavLink to="/help" activeClassName="is-active">help page</NavLink></p>
    </header>
)
// NavLink adds styling attributes to the rendered element when it matches the current URL

export default Header