import React, { Component } from 'react';
import { FlatList } from 'react-native';

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
    return <FlatList data={clubs}/>
  }
}