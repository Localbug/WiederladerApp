import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text } from 'react-native';

export default class LaborierungItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const laborierung = navigation.getParam('ausgewaehlteLaborierung');
    return {
      title: `${laborierung.name.first} ${laborierung.name.last}`
    };
  };

  render() {
    const laborierung = this.props.navigation.getParam('ausgewaehlteLaborierung');
    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.container}
      >
        <Image style={styles.image} source={{ uri: laborierung.picture.large }} />
        <Text>{laborierung.name.first}</Text>
      </ScrollView>
    );
  }
}

const width = Dimensions.get('window').width * 0.75;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  scrollview: {
    backgroundColor: '#fff'
  },
  image: {
    width: width,
    height: width,
    marginBottom: 20
  }
});
