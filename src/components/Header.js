import React from 'react'
import { NavLink } from 'react-router-dom'
import { startLogout } from '../actions/auth'
import { connect } from 'react-redux'

export const Header = ({ startLogout }) => (
    <header>
        <h1>Expensify</h1>
        <p><NavLink exact to="/dashboard" activeClassName="is-active">Home page</NavLink></p>
        <p><NavLink to="/create" activeClassName="is-active">create expense page</NavLink></p>
        <button onClick={startLogout}>Logout</button>
    </header>
)
// NavLink adds styling attributes to the rendered element when it matches the current URL

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
})

export default connect(undefined, mapDispatchToProps)(Header)