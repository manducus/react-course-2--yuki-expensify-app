import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { addExpense, removeExpense, editExpense, startAddExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureStore([thunk])

test('should setup remove expense action object', () => {
    const action = removeExpense({ id: "12233dzf" })
    expect(action).toEqual({
        type: "REMOVE_EXPENSE",
        id: "12233dzf"
    })
})

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


test('should setup add expense action object with provided value', () => {
    const action = addExpense(expenses[2])
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({})
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

        return database.ref(`expenses/${actions[0].expense.id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        done();
    })
});
// this test case is no longer considered a success or a failure until after we call "done"

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({})
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

        return database.ref(`expenses/${actions[0].expense.id}`).once("value")
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseDefaults);
        done();
    })
});

// test('should setup add expense action object with default value', () => {
//     const action = addExpense()
//     expect(action).toEqual({
//         type: "ADD_EXPENSE",
//         expense: {
//             description: "",
//             note: "",
//             amount: 0,
//             createdAt: 0,
//             id: expect.any(String)
//         }
//     });
// });
// Action generators for expenses

// ADD_EXPENSE
// const addExpense = (
//     {
//         description = "",
//         note = "",
//         amount = 0,
//         createdAt = 0
//     } = {}
// ) => ({
//     type: "ADD_EXPENSE",
//     expense: {
//         id: uuid(),
//         description,
//         note,
//         amount,
//         createdAt
//     }
// })

// // REMOVE_EXPENSE
// const removeExpense = ({id} = {}) => ({
//     type: "REMOVE_EXPENSE",
//     id
// })

// // EDIT_EXPENSE
// const editExpense = (id, updates) => ({
//     type: "EDIT_EXPENSE",
//     id,
//     updates
// })
