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
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const {
      description = "",
      note = "",
      amount = 0,
      createdAt = 0,
    } = expenseData;

    const expense = { description, note, amount, createdAt };

    // return value is promise chain return value
    const result = database
      .ref(`users/${uid}/expenses`)
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

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/expenses/${id}`)
      .remove()
      .then((ref) => {
        dispatch(removeExpense({ id }));
      });
  };
};

export const updateExpense = ({ id } = {}, updates) => {
  console.log(`Updating ${id}`);
  return {
    type: "UPDATE_EXPENSE",
    id,
    updates,
  };
};

export const startUpdateExpense = ({ id } = {}, updates) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    return database
      .ref(`users/${uid}/expenses/${id}`)
      .update(updates)
      .then((ref) => {
        dispatch(updateExpense({ id }, updates));
      });
  };
};

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: "SET_EXPENSES",
  expenses,
});

/*
 * Fetches expense data from Firebase and sets them on the Redux store
 */
export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;

    // return value is promise chain return value
    const result = database
      .ref(`users/${uid}/expenses`)
      .once("value")
      .then((snapshot) => {
        const expenses = [];

        snapshot.forEach((childSnapshot) => {
          expenses.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        dispatch(setExpenses(expenses));
      });
    console.log(result);
    return result;
  };
};
