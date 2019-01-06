//Screen, der ein Menüeintrag darstellt. Der sich über Klick im ArsenalScreen öffnen lässt
//--> Hier soll der Content der eigentlichen Seite geladen werden..

import React, { Component } from 'react';
import { ActivityIndicator, Button, FlatList, Dimensions, Image, ScrollView, View, StyleSheet, Text } from 'react-native';

import ArsenalListItem from './ArsenalScreens/ArsenalListItem';
import DBContext from '../../js/DataContext';
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
    //this._EintraegeAusDBLaden();
  };

  componentDidMount() {

    db.loescheTabelle('geschosse');

    db.InitialisiereDatenbak(); //Datenbanktabelle anlegen + Testdaten erzeugen

    //In State sollen Benutzereingaben des Formulars gespeichert und hier in der Datenbank gespeichert werden
    //
      const tempErgebnisausDB = [
        { datensatz: 'Geschoss', 
        bezeichnung: '308WIN', 
        kaliber: '308', 
        gewicht: '168', 
        bc: '.420' ,
        preis: '0,40',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '223Rem', 
        kaliber: '223', 
        gewicht: '90', 
        bc: '.400' ,
        preis: '0,25',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '338WIN', 
        kaliber: '338', 
        gewicht: '250', 
        bc: '.410' ,
        preis: '0,72',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '50BMG', 
        kaliber: '50', 
        gewicht: '320', 
        bc: '.390' ,
        preis: '1,65',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
      ];

    const erg = db.ladeDaten('geschosse');
    console.log('Ergebnis ist: '+ erg);

    this.setState({data: tempErgebnisausDB,  isLoading: false })
    console.log('Ergebnis in State gesetzt: '+JSON.stringify(this.state.data));

  }

  render() {
    const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');
    
    //Frage: Wenn ich die testdaten als const vor der Klasse deklariere, kann ich in Pfeilfunktion nicht auf Testdaten zugreifen. Warum muss die Deklaration hier drin statt finden?
    testdaten = [
      { datensatz: 'Geschoss', 
      bezeichnung: '308WIN', 
      kaliber: '308', 
      gewicht: '168', 
      bc: '.420' ,
      preis: '0,40',
      picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
      { datensatz: 'Geschoss', 
      bezeichnung: '223Rem', 
      kaliber: '223', 
      gewicht: '90', 
      bc: '.400' ,
      preis: '0,25',
      picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
      { datensatz: 'Geschoss', 
      bezeichnung: '338WIN', 
      kaliber: '338', 
      gewicht: '250', 
      bc: '.410' ,
      preis: '0,72',
      picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
      { datensatz: 'Geschoss', 
      bezeichnung: '50BMG', 
      kaliber: '50', 
      gewicht: '320', 
      bc: '.390' ,
      preis: '1,65',
      picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
    ];


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
                    ausgewaehltesArsenalMenue: ausgewaehltesArsenalMenue
                  })}
          />
        </View>

        <Text style= {{position: 'absolute', top:5, left:20, padding: 10}}> 
          Liste aller hinzugefügten {ausgewaehltesArsenalMenue.menueTitel} 
        </Text>
    
        <View style={styles.container}>
          <FlatList
            //data={DatensatzDerAußerhalbDerKlasseDefiniertwurde} //Frage: Warum kann ich nicht auf globale Variablen zugreifen
            data={this.state.data} //Frage: Ich bekomm die testdaten nicht in den State
            keyExtractor={item => item.bezeichnung}
            renderItem={({ item }) => (
              <ArsenalListItem
                ausgewaehltesArsenalItem={item}
                onPress={() =>
                  this.props.navigation.navigate('ItemDetailsScreen', {
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
