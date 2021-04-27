import moment from "moment";

const compareFnFactory = (sortBy) => {
  switch (sortBy) {
    case 'date':
      return (a, b) => {
        if (a.createdAt < b.createdAt) {
          return -1;
        } else if (a.createdAt > b.createdAt) {
          return +1;
        } else {
          return 0;
        }
      }
    case 'amount':
      return (a, b) => {
        if (a.amount < b.amount) {
          return -1;
        } else if (a.amount > b.amount) {
          return +1;
        } else {
          return 0;
        }
      }
    default:
      return undefined;
  }
}

const selectExpenses = (expenses, {text, sortBy, startDate, endDate}) => {

  const compareFn = compareFnFactory(sortBy);

  return expenses.filter((expense) => {
    console.log(`matching ${text}`);

    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true;
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'true') : true;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    return compareFn(a, b);
  });
};

export default selectExpenses;
