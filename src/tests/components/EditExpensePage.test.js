import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let editExpense, removeExpense, history, expense, wrapper

beforeEach(() => {
    editExpense = jest.fn()
    removeExpense = jest.fn()
    history = {
        push: jest.fn()
    }
    expense = expenses[0]
    wrapper = shallow(
        <EditExpensePage
            editExpense={editExpense}
            removeExpense={removeExpense}
            history={history}
            expense={expense}
        />
    )
});

test('should render EditExpensePage', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should handle editExpense', () => {
    wrapper.find("ExpenseForm").prop("onSubmit")(expense)
    expect(editExpense).toHaveBeenCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenCalledWith("/");
});

test('should handle removeExpense', () => {
    wrapper.find("button").simulate("click")
    expect(removeExpense).toHaveBeenCalledWith({ id: expense.id });
    expect(history.push).toHaveBeenCalledWith("/");
});