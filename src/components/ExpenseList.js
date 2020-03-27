import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from './ExpenseListItem'
import selectExpenses from '../selectors/expenses'

// As the store changes, the component is going to get rerendered with new values.
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
                <p>No expenses</p>
            ) : (
                props.expenses.map((expense) => 
                    <ExpenseListItem key={expense.id} {...expense}/>
                )
            )
        }
    </div>
)

// maps the store state to component props
const mapStateToProps = (state) => {
    return {
        expenses: selectExpenses(state.expenses, state.filters)
    }
}

// connect((define what info from the store we want our component to be able to access) => {})
export default connect(mapStateToProps)(ExpenseList)