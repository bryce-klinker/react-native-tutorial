import React from 'react';
import { FlatList } from 'react-native';

const App = ({ clubs }) => {
  return <FlatList data={clubs}/>
};

export default App;
