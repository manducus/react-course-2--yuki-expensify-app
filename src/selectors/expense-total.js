export default (expenses) => (
  expenses
  .map(expense => expense.amount)
  .reduce((accumulator, currentValue) => (accumulator + currentValue), 0)
)