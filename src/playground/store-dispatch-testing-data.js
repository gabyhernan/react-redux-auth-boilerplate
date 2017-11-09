store.dispatch(addExpense( {description: 'Water Bill', amount: 5000 }));
store.dispatch(addExpense( {description: 'Gas Bill', amount: 3000 , createdAt: 1000}));
store.dispatch(addExpense( {description: 'Rent', amount: 109500 }));


// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
// store.dispatch(setTextFilter('bill'));
// }, 3000)

const state = store.getState(); // getting current state
const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
console.log(visibleExpenses);

console.log(store.getState());
