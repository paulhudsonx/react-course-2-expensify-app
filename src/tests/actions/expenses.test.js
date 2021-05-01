import database from "../../firebase/firebase";

import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  addExpense,
  startAddExpense,
  removeExpense,
  updateExpense,
  startUpdateExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";

const middlewares = [thunk]; // add your middlewares like `redux-thunk`
const createMockStore = configureMockStore(middlewares);

const uid = "TestUserId";
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
  console.log("before expense tests");
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  const expenseData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expenseData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expenseData)
    .then(() => {
      done();
    });
});

test("should setup remove expense action", () => {
  const action = removeExpense({ id: "123abc" });

  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "123abc",
  });
});

test("should setup edit expense action", () => {
  const updates = { note: "this is a note" };
  const action = updateExpense({ id: "123abc" }, updates);
  expect(action).toEqual({
    type: "UPDATE_EXPENSE",
    id: "123abc",
    updates: { note: "this is a note" },
  });
});

test("Should setup add expense with provided values", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2],
  });
});

// done is a Jest function that turns the test into an asynchronous test
test("should add expense to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: "Mouse",
    amount: 5000,
    note: "This one is better",
    createdAt: 1000,
  };

  // All actions need to be dispatched to the mock store
  const db = database;

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value")
        .catch((e) => {
          console.log("here!");
        }); // return's promise
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should add expense with defaults to database and store", (done) => {
  const store = createMockStore(defaultAuthState);
  const expenseDefaults = {
    description: "",
    note: "",
    amount: 0,
    createdAt: 0,
  };

  // All actions need to be dispatched to the mock store

  store
    .dispatch(startAddExpense(defaultAuthState))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          id: expect.any(String),
          ...expenseDefaults,
        },
      });

      //      const database = firebase.database();

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value"); // return's promise
      //expect(1).toBe(2);
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseDefaults);
      done();
    });
});
/*test("Should setup add expense with default values", () => {
  const action = addExpense();
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: {
      description: "",
      note: "",
      amount: 0,
      createdAt: 0,
      id: expect.any(String)
    }
  })
});*/

it("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

it("should fetch the expenses from firebase", (done) => {
  const store = createMockStore(defaultAuthState);

  // All actions need to be dispatched to the mock store

  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
    done();
  });
});

it("should remove expenses from firebase", (done) => {
  const store = createMockStore(defaultAuthState);

  const id = expenses[1].id;

  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value"); // return's promise
      // ? check was actually removed
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeNull();
      done();
    })
    .catch((e) => {
      console.log(e);
    });
});

it("should edit expenses in firebase", (done) => {
  const store = createMockStore(defaultAuthState);

  const updates = {
    description: "BMW 540",
    note: "This is better",
    amount: 4500000,
    createdAt: 0,
  };

  // All actions need to be dispatched to the mock store
  const id = expenses[0].id;

  store
    .dispatch(startUpdateExpense({ id }, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "UPDATE_EXPENSE",
        id,
        updates,
      });

      //      const database = firebase.database();

      return database.ref(`users/${uid}/expenses/${id}`).once("value"); // return's promise
      //expect(1).toBe(2);
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(updates);
      done();
    });
});
