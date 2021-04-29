// Take ALL named exports from firebase onto a firebase object
import * as firebase from "firebase/firebase";

import moment from "moment";

const firebaseConfig = {
  apiKey: "AIzaSyD1Tul8CaP01lDWykp5OmmJlBFt8gNVLLk",
  authDomain: "expensify-775dd.firebaseapp.com",
  databaseURL:
    "https://expensify-775dd-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "expensify-775dd",
  storageBucket: "expensify-775dd.appspot.com",
  messagingSenderId: "844106346633",
  appId: "1:844106346633:web:c3826e10096dc9ad535658",
  measurementId: "G-JCHQWJ8JSP",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const database = firebase.database();
console.log(database);
export { firebase, database as default };
export const expenses = [
  {
    id: "1",
    description: "Gum",
    note: "",
    amount: 195,
    createdAt: moment(0),
  },
  {
    id: "2",
    description: "Rent",
    note: "",
    amount: 109500,
    createdAt: moment(0).subtract(4, "days").valueOf(),
  },
  {
    id: "3",
    description: "Credit Card",
    note: "",
    amount: 4500,
    createdAt: moment(0).add(4, "days").valueOf(),
  },
];

expenses.forEach((expense) => {
  console.log("Adding: ", expense);
  database.ref("expenses").push({
    description: expense.description,
    note: expense.note,
    amount: expense.amount,
    createdAt: expense.createdAt.valueOf(),
  });
});

database
  .ref("expenses")
  .once("value")
  .then((snapshot) => {
    const expenses = [];

    snapshot.forEach((childSnapshot) => {
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val(),
      });
    });
    console.log(expenses);
  });

database.ref("expenses").on("value", (snapshot) => {
  const expenses = [];

  snapshot.forEach((childSnapshot) => {
    expenses.push({
      id: childSnapshot.key,
      ...childSnapshot.val(),
    });
  });
  console.log(expenses);
});

database.ref("expenses").on("child_removed", (snapshot) => {
  console.log(`Removed: ${snapshot.key}`, snapshot.val());
});

database.ref("expenses").on("child_changed", (snapshot) => {
  console.log(`Changed: ${snapshot.key}`, snapshot.val());
});

/*database
  .ref()
  .once("value")
  .then((snapshot) => {
    const val = snapshot.val();
    console.log("Value: ", val);
  })
  .catch((e) => {
    console.log("Error fetching data: ", e);
  });

const onValueChange = database.ref().on("value", (snapshot) => {
  const val = snapshot.val();
  const job = val.job;
  console.log(`${val.name} is a ${job.title} at ${job.company}`);
  console.log(snapshot.val());
});

setTimeout(() => {
  database.ref("job").update({
    title: "Manager",
  });
}, 10000);*/

/*
setTimeout(() => {
  database.ref("age").off();
}, 10500);
*/

/*database
  .ref()
  .set({
    name: `Paul Hudson`,
    age: 57,
    stressLevel: 6,
    job: {
      title: `Software developer`,
      company: `Google`,
    },
    isSingle: false,
    location: {
      city: `Nuneaton`,
      country: `UK`,
    },
  })
  .then(() => {
    console.log(`Data is saved!`);
  })
  .catch((e) => {
    console.log(`This failed`, e);
  });

database
  .ref(`attributes`)
  .set({
    height: 172,
    weight: 68,
  })
  .then(() => {
    console.log(`Updated height & weight!`);
  })
  .catch((e) => {
    console.log(`Error occurred updating height & weight`, e);
  });

database.ref().update({
  stressLevel: 9,
  "job/company": `Amazon`,
  "location/city": `Seatle`,
});*/
