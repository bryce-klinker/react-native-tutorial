import React from 'react';
import { FlatList } from 'react-native';
import App from './App';
import { shallow } from 'enzyme';

it('shows list of clubs', () => {
  const clubs = [{}, {}, {}];
  const app = shallow(<App clubs={clubs}/>);
  expect(app.find(FlatList).props().data.length).toBe(3);
});
