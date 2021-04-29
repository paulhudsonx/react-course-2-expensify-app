import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSTION__ || compose;
const configureStore = () => {
  return createStore(
    combineReducers({
      expenses: expensesReducer,
      filters: filtersReducer,
    }),
    applyMiddleware(thunk)
  );
};

export default configureStore;
