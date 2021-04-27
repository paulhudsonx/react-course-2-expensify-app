import {v1 as uuid} from "uuid";

export const addExpense = (
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
export const removeExpense = ({id} = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
});

export const updateExpense = ({id} = {}, updates) => {
  console.log(`Updating ${id}`);
  return {
    type: 'UPDATE_EXPENSE',
    id,
    updates
  }
};
