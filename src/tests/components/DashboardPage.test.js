import React from 'react';
import { shallow } from 'enzyme';
import  ReactShallowRenderer from 'react-test-renderer/shallow';
import DashboardPage from '../../components/DashboardPage';

test('should render DashboardPage ', () => {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});
