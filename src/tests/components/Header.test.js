import React from 'react';
import { shallow } from 'enzyme';
import  ReactShallowRenderer from 'react-test-renderer/shallow';
import {Header} from '../../components/Header';
import { startLogout} from '../../actions/auth';
// react-test-renderer -  allows us to render our components inside of
// regular JS code & then we can assert something about what got rendered

// Two ways we can test react components
//  1. shallow rendering - for simple components where you are not worried
// about user interaction of lifecycle events , only renders the given compoment

//  2. full DOM rendering - renders child components better for more complex
// components

// Snapshots allow us to track changes to data over time

// for ex so we are able to take a snapshot of Header at its current point & time
// we are going to be able to get notified if it changes
// so if it changes to a way we dont want we know, and the changes are ok we get notified also

// there is a Jest mehod  from expext called toMatchSnapshot

test('should render Header correctly' , () => {
  const wrapper = shallow(<Header startLogout={() => {}} />); // we pass in JSX trying to render
  expect(wrapper).toMatchSnapshot();
  // to make Enzyme work with the snapshot testing functionality
  // there is one little utility library called enzyme-to-json
  // it exports a single function and we use it to extract the meaningful
  // stuff in our snapshot instead of getting all the code for Enzyme library

// we can actually set up enzyme-to-json to work automatically
// in our jest.config.json file

  // Enzyme example- .find enzyme method is similar to jQuery .find
  // expect(wrapper.find('h1').text()).toBe(' Expensify ');


  // const renderer = new ReactShallowRenderer();
  // renderer.render(<Header />);
  // define JSX we are trying to render
  // expect(renderer.getRenderOutput()).toMatchSnapshot();
  // getRenderOutput() going to return the rendered output JSX u put in
  // toMatchSnapshot() is going to take a snapshot & let us now when changes happen in our component
// 1st time test is passed it is going to pass, cuz there is no existing snapshot
});


// use spies for button
// should call startLogout on button click
test('should call startLogout on button click', () => {
  const startLogoutSpy = jest.fn();
  const wrapper = shallow(<Header startLogout={startLogoutSpy} />);

  wrapper.find('button').simulate('click');
  expect(startLogoutSpy).toHaveBeenCalled();

});

// Loginpage test file -> should startLogin on butotn click
