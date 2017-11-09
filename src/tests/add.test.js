const add = (a,b) => a + b ;
const generateGreeting = (name = 'Annonymous') => `Hello ${name}`;

// we get access to testing global variables that Jest provides
// most important one is test, whcih lets up set up a test case

// test function has two required args
// first one name describing what it should do
// second one - code to run for the test case
// so we will always be passing a string as first args, arrow func as second
test('should add two numbers', () => {
const result = add(3,4);

expect(result).toBe(7);
 // what we have done here is created an assertion, we asserted something about
}); // a given value in our program

// Jest gives us an assertion library - it gives us access to a function
// & we can use this function to make assertions about values in our program
test('should greet user with their name', () => {
  const greetRes = generateGreeting('Gaby');
  expect(greetRes).toBe('Hello Gaby');
});

test('should generate greeting for no name', () => {
  const result = generateGreeting();
  expect(result).toBe('Hello Annonymous');
});
