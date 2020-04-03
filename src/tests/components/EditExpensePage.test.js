import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { EditExpensePage } from '../../components/EditExpensePage'
import expenses from '../fixtures/expenses'

let editExpense, startRemoveExpense, history, expense, wrapper

beforeEach(() => {
    editExpense = jest.fn()
    startRemoveExpense = jest.fn()
    history = {
        push: jest.fn()
    }
    expense = expenses[0]
    wrapper = shallow(
        <EditExpensePage
            editExpense={editExpense}
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
    expect(editExpense).toHaveBeenCalledWith(expense.id, expense);
    expect(history.push).toHaveBeenCalledWith("/");
});

test('should handle startRemoveExpense', () => {
    wrapper.find("button").simulate("click")
    expect(startRemoveExpense).toHaveBeenCalledWith({ id: expense.id });
    expect(history.push).toHaveBeenCalledWith("/");
});