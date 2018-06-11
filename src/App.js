import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

export default class App extends Component {
  state = {
    clubs: []
  };

  async componentDidMount() {
    const response = await fetch('http://somewhere.com/api/clubs');
    const clubs = await response.json();
    this.setState({clubs});
  }

  render() {
    const {clubs} = this.state;
    const sortedClubs = clubs.sort((club1, club2) => club1.position - club2.position);
    return (
      <View style={styles.container}>
        <FlatList data={sortedClubs}
                  renderItem={({item}) => <Text>{item.name}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 15
  }
});