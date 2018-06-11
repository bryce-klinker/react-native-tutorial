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
    const sortedClubs = clubs.sort((club1, club2) => club1.position - club2.position);
    return <FlatList data={sortedClubs}
                     renderItem={({item}) => <Text>{item.name}</Text>}
           />
  }
}