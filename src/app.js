import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter, { history } from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login, logout } from "./actions/auth";
import selectExpenses from "./selectors/expenses";

import "normalize.css/normalize.css";
import "./styles/styles.scss";
import "react-dates/lib/css/_datepicker.css";

import { firebase } from "./firebase/firebase";
import LoadingPage from "./components/LoadingPage";

//import "./firebase/firebase";
//import "./playground/promises";

const store = configureStore();

//store.dispatch(addExpense({description: 'Water Bill', amount: 4500}));
//store.dispatch(addExpense({description: 'Gas Bill', amount: 1000, createdAt: 1000}));
//store.dispatch(addExpense({description: 'Virgin Media', amount: 109500}));

const state = store.getState();
const visibleExpenses = selectExpenses(state.expenses, state.filters);

//console.log(visibleExpenses);

/*
setTimeout(()=> {
  store.dispatch(setTextFilter('gas'));
}, 3000);
*/
const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(<LoadingPage />, document.getElementById("app"));

let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById("app"));
    hasRendered = true;
  }
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log(`User logged in: ${user.uid}`);
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses()).then(() => {
      renderApp();
      if (history.location.pathname === `/`) {
        history.push(`/dashboard`);
      }
    });
  } else {
    store.dispatch(logout());
    console.log(`User logged out`);
    renderApp();
    history.push(`/`);
  }
});
