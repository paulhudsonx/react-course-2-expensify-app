import {createStore, combineReducers} from "redux";
import {v1 as uuid} from 'uuid';

const demoState = {
  expenses: [{
    id: 'xyz',
    description: 'January rent',
    note: 'Final payment',
    amount: 54500,
    createdAt: 0
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined
  }
};

const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0
  } = {}) => (
  {
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt
    }
  });

// Action generator function to removeExpense
const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

const updateExpense = ({id} = {}, updates) => {
  console.log(`Updating ${id}`);
  return {
    type: 'UPDATE_EXPENSE',
    id,
    updates
  }
};

const setTextFilter = ({text = ''} = {}) => {
  console.log(`Text [${text}]`);
  return {
    type: 'UPDATE_TEXT_FILTER',
    text
  }
};

const sortByDate = () => ({
  type: 'SET_SORT_BY',
  sortBy: 'date'
});

const sortByAmount = () => ({
  type: 'SET_SORT_BY',
  sortBy: 'amount'
});

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
});
const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
});

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {

  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      console.log(`Removing action.id ${action.id}`);
      return state.filter(({id}) => id !== action.id);
    case 'UPDATE_EXPENSE':
      return state.map((e) => {
        if (e.id === action.id) {
          console.log(`Updating action.id ${action.id}`);
          return {...e, ...action.updates};
        } else {
          return state;
        }
      });

    default:
      return state;
  }
};

const filtersReducerDefaultState = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
};

const filtersReducer = (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_START_DATE': {
      return {...state, startDate: action.startDate}
    }
    case 'SET_END_DATE': {
      return {...state, endDate: action.endDate}
    }
    case 'SET_SORT_BY': {
      return {...state, sortBy: action.sortBy}
    }
    case 'UPDATE_TEXT_FILTER': {
      console.log(`Update text filter ${state} with ${action.text}`);
      return {...state, text: action.text}
    }
    default:
      return state;
  }
};

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

const getVisibleExpenses = (expenses, {text, sortBy, startDate, endDate}) => {

  const compareFn = compareFnFactory(sortBy);

  return expenses.filter((expense) => {
    console.log(`matching ${text}`);

    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate;
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate;
    const textMatch = expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  }).sort((a, b) => {
    return compareFn(a, b);
  });
};

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filtersReducer
  })
);

store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
});

const expense1 = store.dispatch(addExpense({description: 'Rent', amount: 400, createdAt: 1000}));
const expense2 = store.dispatch(addExpense({description: 'Coffee', amount: 300, createdAt: 130}));

//store.dispatch(removeExpense(expense1.expense));

//store.dispatch(updateExpense(expense2.expense, {description: 'Tea'}));

//store.dispatch(setTextFilter({text: 'ffe'}));
//store.dispatch(setTextFilter());

store.dispatch(sortByAmount());
store.dispatch(sortByDate());


//store.dispatch(setStartDate(0));
//store.dispatch(setStartDate());
//store.dispatch(setEndDate());
//store.dispatch(setEndDate(1250));

const user = {
  name: 'Jen',
  age: 24
};

console.log({...user});
