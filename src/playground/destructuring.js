// OBJECT DESTRUCTURING
const person = {
  name: 'Gaby',
  age: 25,
  location: {
    city: 'NYC',
    temp: 69
  }
};

// Ability to set up default values
const {name:firstName = 'Anonymous', age } = person;
// equivalent to this down below
// const name = person.name;
// const age = person.age;

console.log(`${firstName} is ${age}. `);

// const {temp, city} = person.location;

// Destructuring allows you to rename the local variable we create
const {temp:temperature, city} = person.location;
// using colon after referring your obj , you are renaming the local var
// but you won't longer have access to temp
if(city && temperature) {
console.log(`It's ${temperature} in ${city}`);
}

// CHALLENGE TIME!!!
const book = {
  title: 'Ego is the Enemy',
  author: 'Ryan Holiday',
  publisher: {
    name: 'Penguin'
  }
};

const {name:publisherName = 'Self-Published'} = book.publisher;

console.log(publisherName);

// ARRAY DESTRUCTURING
// like objects you can set defaults
const address = ['94 Diamond', 'Brooklyn', 'NY', '11222'];

// what goes inside of array is an ordered list of var names
const [street, cityAdress, state = 'Kansas', zip] = address;
// unlike objects these names don't exist, so it is matching it up by POSITION

console.log(`You are in ${cityAdress} ${state}`);
// console.log(`You are in ${address[1]} ${address[2]}`);
// problem with this it is not very clear as what is happening

// if you dont want to set name values for every single value in the array
// you can just go leave a comma, let it know to skip that position
// if u want to leave the last one you don't have to write it
// const [, city, state, zip] = address;

// CHALLENGE TIME!!
const item = ['Coffee (iced)', '$2.00', '$2.50', '$3.00'];

// Console log 'a medium coffee costs 2.50'
const [coffeeType, , mediumSizePrice] = item;
console.log(`A medium ${coffeeType} costs ${mediumSizePrice}.`);
