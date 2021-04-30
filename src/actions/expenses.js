import database from "../firebase/firebase";

// Component calls action generator
// Action generator returns object
// Component dispatches object
// Redux store changes

// Component calls action generator
// Action generator returns object
// Component dispatches object
// Redux store changes

export const addExpense = (expense) => ({
  type: "ADD_EXPENSE",
  expense,
});

export const startAddExpense = (expenseData = {}) => {
  return (dispatch) => {
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    // return value is promise chain return value
    const result = database
      .ref("expenses")
      .push(expense)
      .then((ref) => {
        dispatch(
          addExpense({
            id: ref.key,
            ...expense,
          })
        );
      });
    console.log(result);
    return result;
  };
};

// Action generator function to removeExpense
export const removeExpense = ({ id } = {}) => ({
  type: "REMOVE_EXPENSE",
  id,
});

export const updateExpense = ({ id } = {}, updates) => {
  console.log(`Updating ${id}`);
  return {
    type: "UPDATE_EXPENSE",
    id,
    updates,
  };
};
