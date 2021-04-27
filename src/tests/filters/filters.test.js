import moment from "moment";
import {setStartDate, setEndDate, sortByAmount, sortByDate, setTextFilter} from "../../actions/filters";

test("Should generate set start date action", () => {
  const action = setStartDate(moment(0));

  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0)
  })
});

test("Should generate set end date action", () => {
  const action = setEndDate(moment(0));

  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0)
  })

});

test("Should generate sort by amount action", ()=>{
  const result = sortByAmount();
  expect(result).toEqual({
    type: "SET_SORT_BY",
    sortBy: "amount"
  })
});

test("Should generate sort by date action", ()=>{
  const result = sortByDate();
  expect(result).toEqual({
    type: "SET_SORT_BY",
    sortBy: "date"
  })

});

test("Should generate text filter action", () => {
  const text = "bill";
  const result = setTextFilter(text);
  expect(result).toEqual({
    type: "UPDATE_TEXT_FILTER",
    text: text
  })
});

test("Should generate no text filter action", () => {
  const result = setTextFilter();
  expect(result).toEqual({
    type: "UPDATE_TEXT_FILTER",
    text: ""
  })
});
