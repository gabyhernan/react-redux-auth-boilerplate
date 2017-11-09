  database.ref().set({
      name: 'Gaby Hernandez',
      age: 25,
      stressLevel: 7,
      job: {
        title: 'Software Developer',
        company: 'Glossier'
      },
      location: {
        city: 'NYC',
        country: 'United States'
      }
  }).then(() => {
    console.log('Data is saved');
  }).catch( (e) => {
    console.log('this failed', e);
  });


database.ref('location/city').set('Miami');

// removing items from db
 database.ref();
  .remove()
  .then(() => {
    console.log('Remove succeeded');
  }).catch((e) => {
    console.log('Remove failed', e)
  });

// removing data using set
// just pass null as the value
database.ref('isSingle').set(null);
//--------------------------------------------------
// using update method - we can make multiple firebase calls at once
// update has to be called with an object
// the other data isn't going to go away like set() does
// you can also delete values in update setting the value as null
database.ref().update({
  name: 'Teri',
  age: 31,
  job: 'Art Director',
  isSingle: null
})

// update object ONLY updates at the ROOT
//  When we start going into nested objects, it's not going to update 'City'
// It's updating 'location' to be this new object which means you will loose all
// data store on the object
database.ref().update({
  job: 'software manager',
  location: {
    city: 'Miami'
  }
})


// How to update a nested object using update without loosing the data
database.ref().update({
  job: 'Manager',
  'location/city': 'LA' //  you need quotes cuz of forward slash
})

// update also supports promises

database.ref().update({
  stressLevel: 9,
  'job/company': 'Amazon',
  'location/city': 'Seattle'
})
//------------------------------------
// fetching data from firebase

// 2 ways to do it
// 1. We can fetch data a single time
// 2. We can fetch data by subscribing , this allows us to get notified of changes

// .once takes an event type as its only arg
// returns a promise

database.ref('location/city')
  .once('value')
  .then( (snapshot) => {
   const val = snapshot.val(); // extracting data
   console.log(val);
  })
  .catch( (e) => {
    console.log( 'Error fetching data', e);
  })

// .on - will notify us of changes in our database it is like
// we are subscribing to it


// by setting up var for your function you can then specify
// this functon to unsubscrobe & it will only affect the
// specific data that was changed

const onValueChange = database.ref().on('value', (snapshot) => {
    console.log(snapshot.val());
  }, (e) => { // third function for errror handling
    console.log('Error with data fetching', e);
  });

// we dont use promises here because we want this to run everytime the db
// changes, promises can only be resolved or rejected a SINGLE time
setTimeout( () => {
  database.ref('age').set(26)
}, 3000)

// we can choose to unsubscribe if watching for changes to db is no longer
// needed and can waste resources
// using the .off methd
setTimeout( () => {
  database.ref().off(onValueChange); // cancels susbscription to db
}, 7000)

setTimeout( () => {
  database.ref('age').set(30)
}, 10000)

// CHALLENGE TIME

const dataValueChange = database.ref().on('value', (snapshot) => {
 const val = snapshot.val()
 console.log(val);
 console.log(`${val.name} is a ${val.job.title} at ${val.job.company}!`);

}, (e) => {
  console.log('error fetching data')
})



/// -------------------------------------------
// Arrays Data in Firebase
// Firebase DOES NOT support arrays

// if we send arrays to db firebase, instead of working with an array
// our data gets converted into an object like structure

// .push - when we use push firebase is automatically going to create a new
// property on our reference, it is going generate a random ID for us
// and it is going to take what we pass into push and set it

database.ref('notes').push({
  title: 'Course Topics',
  body: 'Progressive Web Apps, Vue'
});

// // this is how we are going to  work with list based data inside firebase
database.ref('notes/-Ky1yoiXun4G6AABb8NO').update({
  body: 'Buy food'
});

// CHALLENGE TIME
// set up "expenses" with 3 times (description, note, amount, createdAt)

database.ref('expenses').push({
  description: 'shirt',
  amount: '1343',
  note: 'black ',
  createdAt: 'Nov 3rd'
});



// Red the data off the expense ref

database.ref('expenses')
  .once('value')
  .then( (snapshot) => {
    // we have to take this data and manipulate it a lil bit
   const expenses = [];
    // iterate over all of the child snapshots & toss them in this array
    snapshot.forEach( (childSnapshot) => {
      // add things on to expenses
      // every snapshot has access to key which is that uniqueId firebase creates
      expenses.push({
        id: childSnapshot.key,
        // spreadout whatever comes back from child snapshot
        // so we dont have to write it every single time
        ...childSnapshot.val()
      });
    });

    console.log(expenses);
  })
  .catch( (e) => {
    console.log('error fetching data', e);
  });

database.ref('expenses').on('value', (snapshot) => {
  const expenses = [];
  // iterate over child snapshots
  snapshot.forEach( (childSnapshot) => {
      // add to expenses array
      expenses.push({
        id: childSnapshot.key,
        ...childSnapshot.val()
      });
  });

  console.log(expenses);

}, (e) => {
   console.log('error fetching data', e);
})

// subscribe to the child_removed event
// which will fire when one of our expenses gets deleted

database.ref('expenses').on('child_removed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_changed - fires when one of your children changes
database.ref('expenses').on('child_changed', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
});

// child_added - fires every time a child gets added
database.ref('expenses').on('child_added', (snapshot) => {
  console.log(snapshot.key, snapshot.val());
}); // will fire one time already for all of the data added to that location
// then if you add another child then it will fire out again


// Integrating Database to App
// We are going to integrate firebase into the application using  async redux action.
// Async actions allow us to dispatch actions to the redux store
// that just don't change the store, in this case it will also change firebase

// Our components do not need to have any communicaton with firebase
// Components should be unaware of where the data is coming from
// Comps should be concerned with the presentation of info & basic user interaction

// Instead what we are going to do is change our ACTIONS
