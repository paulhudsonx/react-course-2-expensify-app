// Take ALL named exports from firebase onto a firebase object
import * as firebase from "firebase";

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
  measurementId: process.env.MEASUREMENT_ID,
};

console.log(config);

// Initialize Firebase
firebase.initializeApp(config);

const database = firebase.database();
console.log(database);
export { firebase, database as default };
/*export const expenses = [
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
});*/

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
