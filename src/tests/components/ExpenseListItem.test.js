import React from "react";
import { shallow } from "enzyme"; // Renderer

import expenses from "../fixtures/expenses";
import { ExpenseListItem } from "../../components/ExpenseListItem"; // Unconnected version

test(`should render ExpenseListItem with an expense`, () => {
  const wrapper = shallow(<ExpenseListItem {...expenses[1]}/>);
  expect(wrapper).toMatchSnapshot();

});
