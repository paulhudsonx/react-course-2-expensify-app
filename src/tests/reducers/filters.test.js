import filtersReducer from "../../reducers/filters";
import moment from "moment";

test("should setup default filter values", () => {
  const state = filtersReducer(undefined, {type: "@@INIT"});
  expect(state).toEqual({
    text: "",
    sortBy: "date",
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });
});

test("Should set sortBy to amount", () => {
  const currentState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
  }
  const state = filtersReducer(currentState, {type: "SET_SORT_BY", sortBy: "amount"});
  expect(state.sortBy).toBe("amount");
});

test("Should set sortBy tp date", () => {
  const currentState = {
    text: '',
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
  const state = filtersReducer(currentState, {type: "SET_SORT_BY", sortBy: "date"});
  expect(state.sortBy).toBe("date");
});

test("Should set text filter", ()=> {
  const currentState = {
    text: '',
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
  const text = "bill";
  const state = filtersReducer(currentState, {type: "UPDATE_TEXT_FILTER", text: text});
  expect(state.text).toBe(text);
});

test("Should set startDate filter", ()=> {
  const currentState = {
    text: '',
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
  const startDate = moment();
  const state = filtersReducer(currentState, {type: "SET_START_DATE", startDate: startDate});
  expect(state.startDate).toEqual(startDate);
});

test("Should set endDate filter", ()=> {
  const currentState = {
    text: '',
    sortBy: "amount",
    startDate: undefined,
    endDate: undefined
  }
  const endDate = moment();
  const state = filtersReducer(currentState, {type: "SET_END_DATE", endDate: endDate});
  expect(state.endDate).toEqual(endDate);
});
