import { addExpense, removeExpense, updateExpense} from "../../actions/expenses";

test("should setup remove expense action", () => {
  const action = removeExpense({id: "123abc"});

  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })

});

test("should setup edit expense action", () => {
  const updates = { note: "this is a note"};
  const action = updateExpense({id: "123abc"}, updates);
  expect(action).toEqual({
    type: "UPDATE_EXPENSE",
    id: "123abc",
    updates: { note: "this is a note"}
  })
});

test("Should setup add expense with provided values", () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: "This was last months rent"
  }

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      ...expenseData,
      id: expect.any(String)
    }

  })
});

test("Should setup add expense with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  })
});
