import React from "react";
import { shallow } from "enzyme"; // Renderer

import ExpenseDashboardPage from "../../components/ExpenseDashboardPage";
import expenses from "../fixtures/expenses";
import {ExpenseListItem} from "../../components/ExpenseListItem";

test(`should render expense dashboard page`, () => {
  const wrapper = shallow(<ExpenseDashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
