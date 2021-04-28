import React from "react";
import { shallow } from 'enzyme';

import {ExpensesSummary} from "../../components/ExpensesSummary";

import expenses from "../fixtures/expenses";

test(`should render ExpenseSummary correctly when 0 expenses`, () => {
  const param = {
    expenseCount: 0,
    expensesTotal: 0
  }
  const wrapper = shallow(<ExpensesSummary {...param}/>);
  expect(wrapper).toMatchSnapshot();
})

test(`should render ExpenseSummary correctly when 1 expenses`, () => {
  const param = {
    expenseCount: 1,
    expensesTotal: 25477
  }
  const wrapper = shallow(<ExpensesSummary {...param}/>);
  expect(wrapper).toMatchSnapshot();
})

test(`should render ExpenseSummary correctly when >1 expenses`, () => {
  const param = {
    expenseCount: 10,
    expensesTotal: 123123
  }
  const wrapper = shallow(<ExpensesSummary {...param}/>);
  expect(wrapper).toMatchSnapshot();
})
