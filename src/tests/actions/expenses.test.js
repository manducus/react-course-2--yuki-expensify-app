import { addExpense, removeExpense, editExpense } from '../../actions/expenses'

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
    const expenseData = {
        description: "Rent",
        amount: 109500,
        createdAt: 1000,
        note: "This was last month rent"
    }
    const action = addExpense(expenseData)
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
});

test('should setup add expense action object with default value', () => {
    const action = addExpense()
    expect(action).toEqual({
        type: "ADD_EXPENSE",
        expense: {
            description: "",
            note: "",
            amount: 0,
            createdAt: 0,
            id: expect.any(String)
        }
    });
});
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
