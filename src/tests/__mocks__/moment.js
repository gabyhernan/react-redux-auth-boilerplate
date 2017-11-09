// creating mock library for moment.js
// you dont import moment js it will create a stack error
const moment = require.requireActual('moment');

export default (timestamp = 0, ) => { // recreating the fumc that we call inside moment lib
// setting timestamp to 0 makes sure that if we are asking for
// a point in time it is a FIXED point in time
  return moment(timestamp)


};
