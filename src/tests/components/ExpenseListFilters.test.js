import React from "react"
import moment from "moment";
import {shallow} from 'enzyme'
import {ExpenseListFilters} from "../../components/ExpenseListFilters";
import {filters, altFilters} from "../fixtures/filters";

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test(`should render ExpenseListFilters correctly`, () => {
  expect(wrapper).toMatchSnapshot()
})

test(`should render ExpenseListFilters with alt data correctly`, () => {
  // Use Enzyme setProps to setup filters
  wrapper.setProps({
    filters: altFilters
  })
  expect(wrapper).toMatchSnapshot()
})

test(`should handle text change`, () => {
  const value = `Text123`;
  const event = {
    target: {
      value
    }
  };
  wrapper.find(`input`).simulate('change', event);
  expect(setTextFilter).toHaveBeenLastCalledWith(value);
})
test(`should handle sort by date`, () => {
  // User altFilters to set sort by to amount
  wrapper.setProps({
    filters: altFilters
  })
  const value = `date`
  const event = {
    target: {
      value
    }
  }
  wrapper.find(`select`).simulate('change', event)
  expect(sortByDate).toHaveBeenCalledTimes(1);
})
test(`should handle sort by amount`, () => {
  const value = `amount`
  const event = {
    target: {
      value
    }
  }
  wrapper.find(`select`).simulate('change', event)
  expect(sortByAmount).toHaveBeenCalledTimes(1);
})
test(`should handle date changes`, () => {
  const startDate = moment().startOf(`month`)
  const endDate = moment().endOf(`month`)
  wrapper.find(`DateRangePicker`).prop('onDatesChange')({startDate, endDate})
  expect(setStartDate).toHaveBeenLastCalledWith(startDate)
  expect(setEndDate).toHaveBeenLastCalledWith(endDate)
})
test(`should handle date focus changes`, () => {
  // Assert something about state
  const calendarFocused = `endDate`
  wrapper.find(`DateRangePicker`).prop(`onFocusChange`)(calendarFocused)
  expect(wrapper.state(`calendarFocused`)).toBe(calendarFocused)
})
