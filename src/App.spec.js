import React from 'react';
import { FlatList, Text } from 'react-native';
import App from './App';
import { shallow } from 'enzyme';

beforeEach(() => {
  jest.useFakeTimers();
})

it('shows list of clubs', () => {
  const clubs = [{}, {}, {}];
  fetch.mockResponse(JSON.stringify(clubs));

  const app = shallow(<App />);
  expect(app.find(FlatList).props().data.length).toBe(0);

  jest.runAllTicks();
  app.update();

  expect(app.find(FlatList).props().data.length).toBe(3);
  expect(fetch).toHaveBeenCalledWith('http://somewhere.com/api/clubs');
});

it('should show club name', () => {
  const clubs = [{ name: 'Arsenal' }];
  fetch.mockResponse(JSON.stringify(clubs));

  const app = shallow(<App />);
  jest.runAllTicks();
  app.update();

  const item = app.find(FlatList).props().renderItem({item: clubs[0]});
  const renderedItem = shallow(item);
  expect(renderedItem.text()).toContain('Arsenal');
});
