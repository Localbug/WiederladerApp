//Screen, der ein Menüeintrag darstellt. Der sich über Klick im ArsenalScreen öffnen lässt
//--> Hier soll der Content der eigentlichen Seite geladen werden..

import React, { Component } from 'react';
import { Button, FlatList, Dimensions, Image, ScrollView, View, StyleSheet, Text } from 'react-native';

import LaborierungListItem from '../components/LaborierungListItem';

export default class ArsenalItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const ausgewaehltesArsenalMenue = navigation.getParam('ausgewaehltesArsenalMenue');
    return {
      title: `${ausgewaehltesArsenalMenue.menueTitel}`
    };
  };

  state = { data: [], isLoading: true };

  _fetchData = async () => {

    var geschosse = new Object ();
    geschosse = { 
        'bezeichnung': "308WIN - Lapua Scenar mit Moly",
        'kaliber': "308",
        'bc': ".420",
        'preis': "0,30",
    }
    this.setState({ data: geschosse, isLoading: false });

  };

  _refresh = () => {
    this.setState({ isLoading: true });
    this._fetchData();
  };

  componentDidMount() {
    this._fetchData();
  }




  render() {
    const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');

    return (

      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.container}
      >

        <View style= {{position: 'absolute', top:5, right:5}}>
          <Button
            title= "hinzufügen"
            onPress={() =>
                  this.props.navigation.navigate('ArsenalHinzufügenScreen', {
                    ausgewaehltesArsenalMenue: ausgewaehltesArsenalMenue
                  })}
          />
        </View>

        <Text style= {{position: 'absolute', top:5, left:20, padding: 10}}> 
          Liste aller hinzugefügten {ausgewaehltesArsenalMenue.menueTitel} 
        </Text>

        
        <View style={styles.FlatListcontainer}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.bezeichnung}
            renderItem={({ item }) => (
              <LaborierungListItem
                ausgewaehlteLaborierung={item}
                onPress={() =>Alert.alert('Item angeklickt')}
                /*onPress={() =>
                  this.props.navigation.navigate('LaborierungItemScreen', {
                    ausgewaehlteLaborierung: item
                  })
                }*/
              />
            )}
            //onRefresh={this._refresh}
            //refreshing={this.state.isLoading}
            ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
            ListEmptyComponent={() => (
              <Text style={styles.listEmpty}>Keine Daten geladen</Text>
            )}
          />
        </View>


      </ScrollView>

    )
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
  },
  button:{
      marginTop: 5, 
  },
  FlatListcontainer: {
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
