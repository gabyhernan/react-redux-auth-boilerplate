import React from 'react';
import { shallow } from 'enzyme';
import {LoginPage} from '../../components/LoginPage';


test('should render Header correctly' , () => {
  const wrapper = shallow(<LoginPage />); // we pass in JSX trying to render
  expect(wrapper).toMatchSnapshot();

// better documented example in Header.test.js
});


test('should call startLogin on button click', () => {
  const startLoginSpy = jest.fn();
  const wrapper = shallow(<LoginPage startLogin={startLoginSpy} />);

  wrapper.find('button').simulate('click');
  expect(startLoginSpy).toHaveBeenCalled();

});
