import {createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// combineReducers is going to allow us to create multiple functions that define
// how a Redux application changes

// take a look at the final state static object that is going to represent the various things
// we want to keep track of

// Working with multiple reducers



store.subscribe( () => { // track changes everytime the callback function rums
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  // passing in necessary data
  console.log(visibleExpenses);
})

// we also get the action object back from store data dispatch
// so if u dispatch an action object, it comes back as the return value
// from the call to dispatch , u can just create a var that stores it

const expenseOne = store.dispatch(addExpense({ description: 'Rent', amount: 100 , createdAt: -21000}));
const expenseTwo = store.dispatch(addExpense({ description: 'Coffee', amount: 300, createdAt: -1000 }));

// store.dispatch(removeExpense({ id: expenseOne.expense.id}));

// store.dispatch(editExpense(expenseTwo.expense.id ,{amount: 500}));
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter(''));
store.dispatch(sortByAmount()); // no need to pass values in
// store.dispatch(sortByDate());

// be able to use dispatch to change startDate
// store.dispatch(setStartDate(125));
// store.dispatch(setStartDate());
// store.dispatch(setEndDate(1250));

const demoState = {
  expenses: [{
    id: '3r343',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54500, // represented in pennies
    createdAt: 0
  }],
  filters: { // filters that
    text: 'rent', //
    sortBy: 'amount', // can be by Date depends on what u want to fliter
    startDate: undefined,
    endDate: undefined
  }

};


const user = {
  name: 'Gaby',
  age: 25
}

console.log( { // lets say we want to add all of properties from user
  // into this new empty object
  ...user,  // spreads out user
  location: 'NYC', // adding this new value
  age: 27 // overwrites original value
})

console.log(user);
