import React from "react";
import { shallow } from 'enzyme';
import { ExpenseList } from "../../components/ExpenseList"; // Unconnected version

import expenses from "../fixtures/expenses";

test(`should render ExpenseList with expenses`, () => {
  const wrapper = shallow(<ExpenseList expenses={expenses}/>);
  expect(wrapper).toMatchSnapshot();
});

test(`should render ExpenseList empty expenses`, () => {
  const wrapper = shallow(<ExpenseList expenses={[]}/>);
  expect(wrapper).toMatchSnapshot();
});


