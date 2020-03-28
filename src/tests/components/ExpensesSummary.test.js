import React from 'react'
import { shallow } from 'enzyme'
import toJSON from 'enzyme-to-json'
import { ExpensesSummary } from '../../components/ExpensesSummary'

test('should correctly render ExpensesSummary with multiple expenses', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={2} expensesTotal={9434}/>)
  expect(toJSON(wrapper)).toMatchSnapshot();
});

test('should correctly render ExpensesSummary with 1 expense', () => {
  const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={9434}/>)
  expect(toJSON(wrapper)).toMatchSnapshot();
});
