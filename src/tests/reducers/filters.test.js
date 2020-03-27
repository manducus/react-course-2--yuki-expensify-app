import filtersReducer from '../../reducers/filters'
import moment from 'moment'


// redux dispatches action "@@INIT" to set up default values when the redux store kicks off
test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: "@@INIT"})
    expect(state).toEqual({
        text: "",
        sortBy: "date",
        startDate: moment().startOf("month"),
        endDate: moment().endOf("month")
    });
});

test('should set sortBy to amount', () => {
    const state = filtersReducer(undefined, { type: "SORT_BY_AMOUNT"})
    expect(state.sortBy).toEqual("amount");
});

test('should set sortBy to date', () => {
    const currentState = {
        text: "",
        startDate: undefined,
        endDate: undefined,
        sortBy: "amount"
    }
    const action = { type: "SORT_BY_DATE" }
    const state = filtersReducer(currentState, action)
    expect(state.sortBy).toEqual("date");
});

test('should set text filter', () => {
    const state = filtersReducer(undefined, { type: "SET_TEXT_FILTER", text: "testFilter" })
    expect(state.text).toEqual("testFilter");
});

test('should set startDate filter', () => {
    const startDate = moment()
    const state = filtersReducer(undefined, { type: "SET_START_DATE", startDate })
    expect(state.startDate).toEqual(startDate);
});

test('should set endDate filter', () => {
    const endDate = moment()
    const state = filtersReducer(undefined, { type: "SET_END_DATE", endDate })
    expect(state.endDate).toEqual(endDate);
});