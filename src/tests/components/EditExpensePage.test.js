import React from "react";
import { shallow } from "enzyme"; // Renderer

import expenses from "../fixtures/expenses";
import { EditExpensePage } from "../../components/EditExpensePage";

let startUpdateExpense, startRemoveExpense, history, wrapper;

beforeEach(() => {
  startUpdateExpense = jest.fn();
  startRemoveExpense = jest.fn();
  history = {
    push: jest.fn(),
  };
  wrapper = shallow(
    <EditExpensePage
      expense={expenses[1]}
      startUpdateExpense={startUpdateExpense}
      startRemoveExpense={startRemoveExpense}
      history={history}
    />
  );
});

test(`test render EditExpensePage correctly`, () => {
  expect(wrapper).toMatchSnapshot();
});

test(`should handle onSubmit`, () => {
  wrapper.find(`ExpenseForm`).prop(`onSubmit`)(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith(`/`);
  expect(startUpdateExpense).toHaveBeenLastCalledWith(
    { id: expenses[1].id },
    expenses[1]
  );
});

test(`should handle removeExpense`, () => {
  wrapper.find(`button`).simulate("click");
  expect(history.push).toHaveBeenLastCalledWith(`/`);
  expect(startRemoveExpense).toHaveBeenLastCalledWith({ id: expenses[1].id });
});
