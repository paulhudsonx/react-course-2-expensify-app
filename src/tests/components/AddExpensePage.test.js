import React from "react";
import { shallow } from "enzyme"; // Renderer

import expenses from "../fixtures/expenses";
import { AddExpensePage } from "../../components/AddExpensePage";

let startAddExpense, history, wrapper;

beforeEach(() => {
  startAddExpense = jest.fn();
  history = {
    push: jest.fn(),
  };
  wrapper = shallow(
    <AddExpensePage startAddExpense={startAddExpense} history={history} />
  );
});

test(`test render AddExpensePage correctly`, () => {
  expect(wrapper).toMatchSnapshot();
});

test(`should handle onSubmit`, () => {
  wrapper.find(`ExpenseForm`).prop(`onSubmit`)(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith(`/`);
  expect(startAddExpense).toHaveBeenLastCalledWith(expenses[1]);
});
