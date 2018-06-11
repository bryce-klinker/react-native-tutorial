import React, { Component } from 'react';
import { FlatList, Text } from 'react-native';

export default class App extends Component {
  state = {
    clubs: []
  };

  async componentDidMount() {
    const response = await fetch('http://somewhere.com/api/clubs');
    const clubs = await response.json();
    this.setState({ clubs });
  }

  render() {
    const { clubs } = this.state;
    return <FlatList data={clubs}
                     renderItem={({item}) => <Text>{item.name}</Text>}
           />
  }
}