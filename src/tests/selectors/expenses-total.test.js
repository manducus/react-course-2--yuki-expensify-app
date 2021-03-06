import getExpensesTotal from '../../selectors/expense-total'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
  expect(getExpensesTotal([])).toBe(0);
});

test('should correctly add up a single expense', () => {
  expect(getExpensesTotal([expenses[0]])).toBe(expenses[0].amount)
});

test('should correctly add up multiple expenses', () => {
  let sum = 0
  expenses.forEach((expense) => {
    return sum += expense.amount
  })
  expect(getExpensesTotal(expenses)).toBe(sum)
});