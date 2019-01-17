import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View
} from 'react-native';

import LaborierungListItem from '../components/LaborierungListItem';

export default class LaborierungScreen extends Component {
  static navigationOptions = { header: null };

  state = { data: [], isLoading: true };

  _fetchData = async () => {
    try {
      const response = await fetch('https://randomuser.me/api/?results=20');
      const responseJSON = await response.json();
      this.setState({ data: responseJSON.results, isLoading: false });
    } catch (error) {
      alert('Keine Internetverbindung');
      this.setState({ isLoading: false });
    }
  };

  _refresh = () => {
    this.setState({ isLoading: true });
    this._fetchData();
  };

  componentDidMount() {
    this._fetchData();
  }

  render() {
    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="darkorange" />
        </View>
      );
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={item => item.email}
          renderItem={({ item }) => (
            <LaborierungListItem
              ausgewaehlteLaborierung={item}
              onPress={() =>
                this.props.navigation.navigate('LaborierungItemScreen', {
                  ausgewaehlteLaborierung: item
                })
              }
            />
          )}
          onRefresh={this._refresh}
          refreshing={this.state.isLoading}
          ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
          ListEmptyComponent={() => (
            <Text style={styles.listEmpty}>Keine Daten geladen</Text>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 30
  },
  listSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'lightsalmon',
    marginVertical: 5
  },
  listEmpty: {
    paddingTop: 100,
    fontSize: 32,
    textAlign: 'center'
  }
});
