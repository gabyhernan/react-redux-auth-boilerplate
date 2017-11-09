import React from 'react';
import { shallow } from 'enzyme';
import LoadingPage from '../../components/LoadingPage';


test('should render LoadingPage while data is being fetched from db ', () => {
  const wrapper = shallow(<LoadingPage />);
  expect(wrapper).toMatchSnapshot();
});
