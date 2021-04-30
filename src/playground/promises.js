const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`This is my resolved data`);
    //reject(`Something went wrong`);
  }, 1500);
});

console.log("before");

// Promise chaining - return value from then is passed as data to next then in chain

promise
  .then((data) => {
    console.log("1", data);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`This is my other promise`);
        //reject(`Something went wrong`);
      }, 1500);
    });
  })
  .then((data) => {
    console.log(`Does this run?`, data);
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });
console.log("after");
