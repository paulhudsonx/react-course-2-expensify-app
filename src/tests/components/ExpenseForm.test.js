import React from "react";
import { shallow } from "enzyme";
import moment from "moment";

import ExpenseFm from "../../components/ExpenseFm";
import expenses from "../fixtures/expenses";

test(`should render ExpenseForm correctly`, () => {
  const wrapper = shallow(<ExpenseFm />);
  expect(wrapper).toMatchSnapshot();
});

test(`should render ExpenseForm with Expense correctly`, () => {
  const wrapper = shallow(<ExpenseFm expense={expenses[0]}/>);
  expect(wrapper).toMatchSnapshot();
});

test(`should render error for invalid form submission`, () => {
  const wrapper = shallow(<ExpenseFm />);
  expect(wrapper).toMatchSnapshot();
  const event = {
    preventDefault: () => {}
  };
  wrapper.find("form").simulate("submit", event);
  const error = wrapper.state("error");
  console.log(`Error message [${error}]`);
  expect(error.length).toBeGreaterThan(0);
  expect(error).toBe(`Please enter an amount and a description.`);
  expect(wrapper).toMatchSnapshot();
});

test(`should set description on input change`, () => {
  const value = `New description`;
  const wrapper = shallow(<ExpenseFm />);
  expect(wrapper).toMatchSnapshot();
  const event = {
    target: { value }
  };
  wrapper.find(`input`).at(0).simulate(`change`, event);
  expect(wrapper.state(`description`)).toBe(value);
});

test(`should set a note on textarea change`, () => {
  const value = `Mary had a little lamb`;
  const wrapper = shallow(<ExpenseFm />);
  expect(wrapper).toMatchSnapshot();
  const event = {
    target: { value }
  };
  wrapper.find(`textarea`).at(0).simulate(`change`, event); // 1st Text area
  expect(wrapper.state(`note`)).toBe(value);
});

test(`should set amount for a valid input`, () => {
  const amount = "23.50";
  const wrapper = shallow(<ExpenseFm />);
  expect(wrapper).toMatchSnapshot();
  const event = {
    target: { value: amount }
  };
  wrapper.find(`input`).at(1).simulate(`change`, event); // 2nd input element
  expect(wrapper.state(`amount`)).toBe(amount);
});

test(`should not set amount for invalid input`, () => {
  const amount = "12.122";
  const wrapper = shallow(<ExpenseFm />);
  expect(wrapper).toMatchSnapshot();
  const event = {
    target: { value: amount }
  };
  const amountBefore = wrapper.state(`amount`);
  wrapper.find(`input`).at(1).simulate(`change`, event); // 2nd input element
  expect(wrapper.state(`amount`)).toBe(amountBefore);
});

  //onSubmitSpy(`Paul`, `HudsonX`);
  //expect(onSubmitSpy).toHaveBeenCalledWith(`Paul`, `Hudson`);

test(`should call onSubmit prop for valid form submission`, () => {
  const onSubmitSpy = jest.fn(); // Creates Spy
  const wrapper = shallow(<ExpenseFm expense={expenses[0]} onSubmit={onSubmitSpy}/>);
  const event = {
    preventDefault: () => {}
  };
  wrapper.find(`form`).simulate(`submit`, event);
  expect(wrapper.state(`error`)).toBe(``);
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  })
});

test(`should set new date on date change`, () => {
  const now = moment();
  const wrapper = shallow(<ExpenseFm />);
  wrapper.find(`SingleDatePicker`).prop('onDateChange')(now);
  expect(wrapper.state(`createdAt`)).toEqual(now);
});

test(`should set calendar focus on date change`, () => {
  const focused = true;
  const wrapper = shallow(<ExpenseFm />);
  wrapper.find(`SingleDatePicker`).prop('onFocusChange')({focused});
  expect(wrapper.state(`calendarFocused`)).toBe(focused);
});

/*
test(`should set calendar focus on change`, () => {
  const wrapper = shallow(<ExpenseFm expense={expenses[0]}/>);
  wrapper.find(`SingleDatePicker`).simulate(`focusChange`, {focused: true});
  expect(wrapper.state(`error`)).toBe(``);

  expect(wrapper.state(`calendarFocused`)).toBe(true);

  expect(onFocusChangeSpy).toHaveBeenLastCalledWith({
    description: expenses[0].description,
    amount: expenses[0].amount,
    note: expenses[0].note,
    createdAt: expenses[0].createdAt
  })
});
*/
