import expensesReducer from "../../reducers/expenses";

import expenses from "../fixtures/expenses";

test("Should set default state", () => {
  const state = expensesReducer(undefined, {type: "@@INIT"});
  expect(state).toEqual([]);
});

test("Should remove expense by Id", ()=>{
  const action = {
    type: "REMOVE_EXPENSE",
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test("Should remove expense if id not found", ()=>{
  const action = {
    type: "REMOVE_EXPENSE",
    id: "-1"
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test("Should add expense", ()=>{
  const expense = {
    id: 4,
    description: "Added Expense",
    note: "",
    amount: 2500,
    createdAt: 0
  };
  const action = {
    type: "ADD_EXPENSE",
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test("Should edit expense", () => {
  const updates = {
    description: "Updated Expense",
    note: "XYZ",
    amount: 9999,
    createdAt: 1000
  }
  const action = {
    id: "2",
    type: "UPDATE_EXPENSE",
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], {...expenses[1], ...updates}, expenses[2]]);
});

test("Should not edit expense if expense not found", () => {
  const updates = {
    description: "Updated Expense",
    note: "XYZ",
    amount: 9999,
    createdAt: 1000
  }
  const action = {
    id: "-1",
    type: "UPDATE_EXPENSE",
    updates
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

