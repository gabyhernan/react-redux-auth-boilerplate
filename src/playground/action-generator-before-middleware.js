// action generators for expenses
import uuid from 'uuid';

// Steps of action generators
// 1. Component calls action generator
// 2. Action generator returns an object
// 3.  Component takes objct & passes it to dispatch
// 4. Redux store runs the reducers & it changes

// We need to tweak how our action generators work to integrate with db
// With asynchronous actions things look a little bit different
// 1. Component calls action generator
// 2. Action generator returns a FUNCTION
// 3. Component dispatches FUNCTION
// 4. Funcion runs (has the ability to dispatch other actions
// & do whatever it wants, so we put DB code here, and we have ability
// to dispatch another action, a standard one that returns an object ,
// and that will manipulate the redux store)

//  By default Redux DOES NOT allow you to dispatch functions.
// This is why you have to set up a module which is a piece of redux middleware
// that adds support for this behavior

// ADD_EXPENSE /
export const addExpense = (
{
 description = '',
 note = '',
 amount = 0,
 createdAt = 0
  } = {}
   ) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuid(),
    description, // using property shorthand values
    note,
    amount,
    createdAt
  }
});
// REMOVE_EXPENSE

export const removeExpense = ( {id} = {} ) => ({
    type: 'REMOVE_EXPENSE',
      id
});
// EDIT_EXPENSE
export const editExpense = ( id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});
