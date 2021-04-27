/*
const person = {
  name: 'Paul',
  age: 57,
  location: {
    city: 'Nuneaton',
    temp: 15
  }
};

const {name: firstName = 'Anonymous', age} = person;

console.log(`${firstName} is ${age}`);

const {city, temp:temperature} = person.location;

if (city && temperature) {
  console.log(`It's ${temperature} in ${city}`);
}

const book = {
  title: 'Egi is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};
const {name: publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);
*/

const address = ['3 Johns Close', 'Burbage', 'Hinckley', 'LE10 2LY'];
const [street, city, state, postCode] = address;
console.log(`You are in ${city} ${state}`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75'];
const [itemName,,mediumPrice] = item;
console.log(`A medium ${itemName} costs ${mediumPrice}`);

