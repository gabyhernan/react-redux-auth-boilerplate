// can only be called a single time , with a single arg, pass in an object if
// you need to pass multiple pieces of data


// most of the time promises going to be created by library
const promise = new Promise( (resolve, reject) => {
   // simulate some type of arbitrary delay
   setTimeout( () => {
     resolve({
        name : 'Gaby',
        age: 25
     });

     reject('something went wrong!');
   }, 2500);
});

console.log('before');

//  .then lets us register a callback, this callback is going to fire
// when & if the promise resolves
promise.then((data) => {
  console.log('1',data);
  return new Promise( (resolve, reject) => { // being able to return promises reduces the need for
    // those nested callbacks
   // simulate some type of arbitrary delay
   setTimeout( () => {
     resolve('This is my other promise');
     // reject('something went wrong!');
   }, 2500);
});
}).then( (str) => { // example of promise chaining,
  // you can pass data from one sucess data callback to the other
  console.log('does this run', str)
}).catch( (e) => {
  console.log('Error: ', e);
});

console.log('after');

// different ways to write promise syntax
promise.then((data) => {
  console.log('2',data);
}, (error) => { // will work the same as .catch
// what to do if our promise gets rejected
  console.log('error: ', error);
});



