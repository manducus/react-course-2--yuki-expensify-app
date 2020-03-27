import React from 'react'
import moment from 'moment'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { ExpenseListFilters } from '../../components/ExpenseListFilters'
import { filters, altFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
    setTextFilter = jest.fn()
    sortByDate = jest.fn()
    sortByAmount = jest.fn()
    setStartDate = jest.fn()
    setEndDate = jest.fn()
    wrapper = shallow(
        <ExpenseListFilters
            filters = {filters}
            setTextFilter = {setTextFilter}
            sortByDate = {sortByDate}
            sortByAmount = {sortByAmount}
            setStartDate = {setStartDate}
            setEndDate = {setEndDate}
        />
    )
});

test('should render ExpenseListFilters correctly', () => {
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
    wrapper.setProps({ filters: altFilters })
    expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should handle text change', () => {
    const e = {
        target: {
            value: "gas"
        }
    }
    wrapper.find("input").simulate("change", e)
    expect(setTextFilter).toHaveBeenCalledWith(e.target.value);
});

test('should sort by date', () => {
    wrapper.setProps({ filters: altFilters })
    const e = {
        target: {
            value: "date"
        }
    }
    wrapper.find("select").simulate("change", e)
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const e = {
        target: {
            value: "amount"
        }
    }
    wrapper.find("select").simulate("change", e)
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
    const startDate = moment(0).add(4, "years")
    const endDate = moment(0).add(8, "years")
    wrapper.find("withStyles(DateRangePicker)").prop("onDatesChange")({ startDate, endDate })
    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should handle date focus change', () => {
    const calendarFocused = "startDate"
    wrapper.find("withStyles(DateRangePicker)").prop("onFocusChange")(calendarFocused)
    expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});