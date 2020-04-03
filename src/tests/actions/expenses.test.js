import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, removeExpense, editExpense, setExpenses, startAddExpense, startSetExpenses, startRemoveExpense, startEditExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const uid = "testuid"
const defaultAuthState = { auth: { uid } }
const createMockStore = configureStore([thunk])

beforeEach((done) => {
    const expenseData = {}
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expenseData[id] = {description, note, amount, createdAt}
    })
    database.ref(`users/${uid}/expenses`).set(expenseData).then(() => done())
})

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: "12233dzf" })
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "12233dzf"
    })
})

test('should remove expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    // set default value

    const id = expenses[2].id
    store.dispatch(startRemoveExpense({id})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "REMOVE_EXPENSE",
            id
        });
        return database.ref(`users/${uid}/expenses/${id}`).once("value").then((snapshot) => {
            expect(snapshot.val()).toBeFalsy();
            done();
        })
    })
});

test('should setup edit expense action object', () => {
    const action = editExpense( "12233dzf", { description: "test test" } )
    expect(action).toEqual({
        type: "EDIT_EXPENSE",
        id: "12233dzf",
        updates: {
            description: "test test"
        }
    });
});
// .toEqual(value) - compare recursively all properties of object instances

test('should edit expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    const id = expenses[2].id
    const updates = {
        description: "test test"
    }
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "EDIT_EXPENSE",
            id,
            updates
        });
        return database.ref(`users/${uid}/expenses/${id}/description`).once("value").then((snapshot) => {
            expect(snapshot.val()).toBe(updates.description);
            done();
        })
    })
});

test('should setup add expense action object with provided value', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseData = {
        description: "Mouse",
        amount: 3000,
        note: "This one is better",
        createdAt: 1000
    }

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});
// this test case is no longer considered a success or a failure until after we call "done"

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore(defaultAuthState)
    const expenseDefaults = {
        description: "",
        note: "",
        amount: 0,
        createdAt: 0
    }

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "ADD_EXPENSE",
            expense: {
                id: expect.any(String),
                ...expenseDefaults
            }
        });

        return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    })
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses)
    expect(action).toEqual({
        type: "SET_EXPENSES",
        expenses
    });
});

test('should fetch the expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState)
    // この defaultAuthState は厳密には無くても問題ない
    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: "SET_EXPENSES",
            expenses
        });
        done();
    })
});
