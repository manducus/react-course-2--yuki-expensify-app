import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let startEditExpense, startRemoveExpense, history, expense, wrapper

beforeEach(() => {
    startEditExpense = jest.fn()
    startRemoveExpense = jest.fn()
    history = {
        push: jest.fn()
    }
    expense = expenses[0]
    wrapper = shallow(
        <EditExpensePage
            startEditExpense={startEditExpense}
            startRemoveExpense={startRemoveExpense}
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
    expect(startEditExpense).toHaveBeenCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenCalledWith("/");
});

test('should handle startRemoveExpense', () => {
    wrapper.find("button").simulate("click")
    expect(startRemoveExpense).toHaveBeenCalledWith({ id: expense.id });
    expect(history.push).toHaveBeenCalledWith("/");
});