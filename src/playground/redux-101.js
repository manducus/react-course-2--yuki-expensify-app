import { createStore } from 'redux'

// Action generators - function that return action objects

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: "INCREMENT",
    incrementBy
})

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy
})


const setCount = ({ count } = {}) => ({
    type: "SET",
    count
})

const resetCount = () => ({
    type: "RESET"
})

// Reducers
// 1. Reducers are pure functions
//    The output is only determined by the input.
//       let a = 10;
//       const add = (b) => {
//           return a + b;
//       };
//    This is not a pure function, because what it returns doesn't just depend on the input.
//    It also depends on global variable "a" which could indeed change.
//       let result;
//       const add = (a, b) => {
//           result = a + b;
//       };
//    This is also not a pure function, because this function is interacting with
//    things outside of its scope.
// 2. Never change state or action
//    Recommend just returning it on the new object instead mutating the state directly
const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            }
    
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            }
        
        case "SET":
            return {
                count: action.count
            }
        
        case "RESET":
            return {
                count: 0
            }
        
        default:
            return state
    }
}
// set default state object = {count:0}
// action is an object that gets sent to the store by store.dispatch() method

const store = createStore(countReducer)

const unsubscribe =  store.subscribe(() => {
    console.log(store.getState())
    // fetch the current state object
})
// function inside () gets called every single time the store changes
// return value from subscribe() is a function that unsubscribes the change listner

store.dispatch(incrementCount({ incrementBy: 5 }))
store.dispatch(incrementCount())

store.dispatch(resetCount())

store.dispatch(decrementCount())

store.dispatch(decrementCount({ decrementBy: 10 }))

store.dispatch(setCount())