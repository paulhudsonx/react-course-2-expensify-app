import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";

import expensesReducer from "../reducers/expenses";
import filtersReducer from "../reducers/filters";
import authReducer from "../reducers/auth";

const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const reducers = combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer,
  auth: authReducer,
});

const enhancers = composeEnhancers(applyMiddleware(thunk));

const configureStore = () => {
  return createStore(reducers, enhancers);
};

export default configureStore;
