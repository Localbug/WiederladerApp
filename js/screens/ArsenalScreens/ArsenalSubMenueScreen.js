//Screen, der ein Menüeintrag darstellt. Der sich über Klick im ArsenalScreen öffnen lässt
//--> Hier soll der Content der eigentlichen Seite geladen werden..

import React, { Component } from 'react';
import { ActivityIndicator, Button, FlatList, Dimensions, Image, ScrollView, View, StyleSheet, Text } from 'react-native';

import ArsenalListItem from './ArsenalListItem';
import DBContext from '../../DataContext';
db = new DBContext();

export default class ArsenalItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const ausgewaehltesArsenalMenue = navigation.getParam('ausgewaehltesArsenalMenue');
    return {
      title: `${ausgewaehltesArsenalMenue.menueTitel}`
    };
  };

  state = { data: [], isLoading: true};

  _refresh = () => {
    this.setState({ isLoading: true });
    db.ladeDaten('geschosse', ergebnis => this.setState({data: ergebnis,  isLoading: false }));
  };

  componentDidMount() {
    const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');
    
    //Frage: Warum kann ich lediglich tabelle 'geschosse' aus der Datenbank laden. Aufruf aller weiteren Tabellen liefert ein leeres Ergebnis?
    console.log("Lade DB-Daten für Menue: "+ausgewaehltesArsenalMenue.menueTitel)
    switch(ausgewaehltesArsenalMenue.menueTitel){
      case "Geschosse":
         db.ladeDaten('geschosse', ergebnis => this.setState({data: ergebnis,  isLoading: false }));
         break;
      case "Hülsen":
         db.ladeDaten('huelsen', ergebnis => this.setState({data: ergebnis,  isLoading: false }));
         break;
      case "Pulver":
         db.ladeDaten('pulver', ergebnis => this.setState({data: ergebnis,  isLoading: false }));
         break;
      default:
        console.log('Fehler in ArsenalSubMenu componenteDidMount - Kein Case zu menuTitel '+ausgewaehltesArsenalMenue.menueTitel+ " gefunden.");
    }
    console.log('Ergebnis in State gesetzt: '+JSON.stringify(this.state.data));

  }

  render() {
    const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');

    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="darkorange" />
        </View>
      );

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
                    ausgewaehltesArsenalMenue: ausgewaehltesArsenalMenue,
                  })}
          />
        </View>

        <Text style= {{position: 'absolute', top:5, left:20, padding: 10}}> 
          Liste aller {ausgewaehltesArsenalMenue.menueTitel} 
        </Text>
    
        <View style={styles.container}>
          <FlatList
            data={this.state.data} // Aus State die DBAbfrage laden
            keyExtractor={item => item.bezeichnung}
            renderItem={({ item }) => (
              <ArsenalListItem
                ausgewaehltesArsenalItem={item}
                onPress={() =>
                  this.props.navigation.navigate('ItemDetailsScreen', { //TODO: Detailsansicht mit bearbeiten Modus und Löschenbutton erstellen
                    ausgewaehltesArsenalItem: item
                  })
                }
              />
            )}
            onRefresh={this._refresh}
            refreshing={this.state.isLoading}
            ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
            ListEmptyComponent={() => (
              <Text style={styles.listEmpty}>Keine Daten vorhanden</Text>
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