import React from 'react'
import { connect } from 'react-redux'
import { startLogin } from '../actions/auth'

export const LoginPage = ({ startLogin }) => (
    <div>
        <h1>Expensify App</h1>
        <p>It's time to get your expenses under control.</p>
        <button onClick={startLogin}>Login with Google</button>
    </div>
)

const matpDispatchToProps = (dispatch) => ({
  startLogin: () => dispatch(startLogin())
})

export default connect(undefined, matpDispatchToProps)(LoginPage)