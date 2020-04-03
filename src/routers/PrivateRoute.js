import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'

// component は Component に rename する
// ...の後のは変数名なので、...props であろうと ...rest であろうと問題ない
export const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
  <Route {...rest} component={props => (
    isAuthenticated ? (
      <div>
        <Header />
        <Component {...props}/>
      </div>
    ) : (
      <Redirect to="/"/>
    )
  )}/>
)

const mapStateToProps = (state) => ({
  isAuthenticated: !!state.auth.uid
  // !! は 対象を boolean にする。uid があれば true なければ false
})

export default connect(mapStateToProps)(PrivateRoute)