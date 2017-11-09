import {authReducer} from '../../reducers/auth';



test('should set uid for login', () => {
  const user = {
  uid: 'bla123'
};

  const action = {
    type: 'LOGIN',
    uid: user.uid
  }

  const state = authReducer(user, action);
  expect(state.uid).toEqual(action.uid);
});


test('should clear uid for logout', () => {
  const action = {
    type: 'LOGOUT'
  }

  const state = authReducer({uid: 'anything'}, action);
  expect(state).toEqual({});
});
