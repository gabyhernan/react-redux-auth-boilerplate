import { createStore } from 'redux';

//actionGenerators - are functions that RETURN action objects
// so the objects that we have been creating down below
// are going to get created in just ONE place, & we'll have a function
// we can call to generate the action objects

const incrementCount = ( {incrementBy = 1} ={} ) => ({ // implicintly returns the new Action Object
  // default to empty objects for the times things don't exist
  // since not every single of our calls is going to have have an 'incrementBy'

  // we are accesing incrementBy directly using object destructuring
  // we are also saying hey if incrementBy doesn't exist use 1
    type: 'INCREMENT',
    incrementBy // same as incrementBy: incrementBy
});

const decrementCount = ( {decrementBy = 1} = {} ) => ({
  type: 'DECREMENT',
  decrementBy
});

const setCount = ( { count } = {} ) => ({
  type: 'SET',
  count
});

const resetCount = ()  => ({
  type: 'RESET'
});

// actions describe the fact that something happened, but they DON'T SPECIFY
// how the application's state changes in response this is the job of a
// REDUCERS
// 1. Reducers are pure functions
// A pure function has certain qualities,
// first up the OUTPUT is ONLY DETERMINED by the INPUT

// This function's output what it returns is ONLY DETERMINED by the things
// that get passed in so the state, and the action.
// It doesn't use anything else from outside of the function scope &
// it DOENS'T change anything outside of the function scope either

// we don't want to interact with things outside of it's scope in reducers
// we don't want to change variables outside of the reducer scope
// we don't want to rely on values from variables outside of the reducers scope

// 2. NEVER CHANGE state or action
// we are going to get state & action passed into all our reducers
// we don't to DIRECTLY change these things, so you don't want to reassign or mutate them
// INSTEAD we should be READING off of both of those things,
 // returning an object that REPRESENTS the new state

 // mutating the state is going to cause undesired effect like in how we
 // we saw in this.setState()

// EXAMPLE OF WHAT IS NOT A PURE FUNCTION
let a = 10;  //
const add = (b) => {
  return a + b; // output of this func doesn't only depend on the input
}; //  depends on global variable which could change

const countReducer = (state = { count: 0}, action ) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
      count: state.count + action.incrementBy
   // we can now access incrementBy of from action knowing its going to
 // be set correctly since are checking the type our actionGenerator function
    };
    case 'DECREMENT':
      return {
      count: state.count - action.decrementBy
      };
    case 'SET':
      return { // we dont have to check if this exists because its not optional
        // we are gonna force those who SET to provide the value of 101
        count: action.count
      };
    case 'RESET':
      return {
        count: 0
      };

    default: // what do when it doesnt find a match
      return state;
  }

}

// createStore expects function to be inside
// first argument is going to be state which is the currentState
// we set up default right in the argument

const store = createStore(countReducer);





// How to watch for changes in the Redux store - store.subscribe()
// gets called with a single function & this functino gets called
// EVERY SINGLE TIME the store CHANGES
const unsubscribe = store.subscribe( () => {
  // method getState returns the current state objects
console.log(store.getState());
});

// Not only can we subscribe to the store but we can also remove an
// individual subscription

// the return value from subscribe is actually a function that we can
// call it to unsubscribe

// Changing data store with Actions
// Action - is an object that gets sent to the store. This object describes
// the TYPE of action we'd like to take

// In this example we might have an increment, decrement, reset  action
// store.dispatch({ //method that allows us to send off an action object
//   type: 'INCREMENT', // uppercase is a convention in redux for your action type names
//   incrementBy: 5
// });
store.dispatch(incrementCount({ incrementBy: 5}))


store.dispatch(incrementCount());

store.dispatch(resetCount());
// store.dispatch({
//   type: 'RESET'
// });

store.dispatch(decrementCount());

store.dispatch(decrementCount({ decrementBy: 10 }));
// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 10
// });


store.dispatch(setCount({count: 101 }));
// store.dispatch({
//   type: 'SET',
//   count: 101
// });



