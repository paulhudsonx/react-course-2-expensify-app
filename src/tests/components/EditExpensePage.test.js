import React from "react";
import {shallow} from "enzyme"; // Renderer

import expenses from "../fixtures/expenses";
import {EditExpensePage} from "../../components/EditExpensePage";

let updateExpense, removeExpense, history, wrapper

beforeEach(() => {
  updateExpense = jest.fn()
  removeExpense = jest.fn()
  history = {
    push: jest.fn()
  }
  wrapper = shallow(<EditExpensePage expense={expenses[1]} updateExpense={updateExpense} removeExpense={removeExpense} history={history}/>)
})

test(`test render EditExpensePage correctly`, () => {
  expect(wrapper).toMatchSnapshot();
})

test(`should handle onSubmit`, () => {
  wrapper.find(`ExpenseForm`).prop(`onSubmit`)(expenses[1])
  expect(history.push).toHaveBeenLastCalledWith(`/`)
  expect(updateExpense).toHaveBeenLastCalledWith({id: expenses[1].id}, expenses[1]);
});

test(`should handle removeExpense`, () => {
  wrapper.find(`button`).simulate('click')
  expect(history.push).toHaveBeenLastCalledWith(`/`)
  expect(removeExpense).toHaveBeenLastCalledWith({id: expenses[1].id});
})
