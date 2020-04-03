import moment from 'moment'
import expensesReducer from '../../reducers/expenses'
import expenses from '../fixtures/expenses'


test('should set default state', () => {
    const state = expensesReducer(undefined, { type: "@@INIT" })
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = { type: "REMOVE_EXPENSE", id: expenses[1].id }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ expenses[0], expenses[2] ]);
});

test('should not remove expense if id not found', () => {
    const action = { type: "REMOVE_EXPENSE", id: "-1" }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses);
});

test('should add an expense', () => {
    const expense = {
        id: "4",
        description: "Water bill",
        note: "",
        amount: 3500,
        createdAt: moment(0).add(5, "days").valueOf()
    }
    const action = { type: "ADD_EXPENSE", expense }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual([ ...expenses, expense ]);
});

test('should edit an expense', () => {
    const updates = {
        description: "New gum",
        note: "new note",
        amount: 591,
        createdAt: 0
    }
    const action = { type: "EDIT_EXPENSE", id: "1", updates }
    const state = expensesReducer(expenses, action)
    expect(state[0]).toEqual({...state[0], ...updates});
});

test('should not edit an expense if expense not found', () => {
    const updates = {
        description: "New gum",
        note: "new note",
        amount: 591,
        createdAt: 0
    }
    const action = { type: "EDIT_EXPENSE", id: "4", updates }
    const state = expensesReducer(expenses, action)
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
    const action = { type: "SET_EXPENSES", expenses }
    const state = expensesReducer([expenses[0], expenses[1]], action)
    expect(state).toEqual(expenses);
});