const expensesReducerDefaultState = [];

/*
  Manipulates the expenses array
 */
const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      return [...state, action.expense];
    case "REMOVE_EXPENSE":
      console.log(`Removing action.id ${action.id}`);
      return state.filter(({ id }) => id !== action.id);
    case "UPDATE_EXPENSE":
      return state.map((e) => {
        if (e.id === action.id) {
          console.log(`Updating action.id ${action.id}`);
          console.log("Action updates +++");
          console.log(e);
          console.log(action);
          console.log({ ...e, ...action.updates });
          console.log("Action updates ---");
          return { ...e, ...action.updates };
        } else {
          return e;
        }
      });

    case "SET_EXPENSES":
      return action.expenses;

    default:
      return state;
  }
};

export default expensesReducer;
