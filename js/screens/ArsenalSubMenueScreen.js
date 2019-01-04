//Screen, der ein Menüeintrag darstellt. Der sich über Klick im ArsenalScreen öffnen lässt
//--> Hier soll der Content der eigentlichen Seite geladen werden..

import React, { Component } from 'react';
import { ActivityIndicator, Button, FlatList, Dimensions, Image, ScrollView, View, StyleSheet, Text } from 'react-native';

import ArsenalListItem from './ArsenalScreens/ArsenalListItem';
import DBContext from '../../js/DataContext';
db = new DBContext();

var geschosse = new Object();
geschosse = { 
    'bezeichnung': "308WIN - Lapua Scenar mit Moly",
    'kaliber': "308",
    'bc': ".420",
    'preis': "0,30",
}

export default class ArsenalItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const ausgewaehltesArsenalMenue = navigation.getParam('ausgewaehltesArsenalMenue');
    return {
      title: `${ausgewaehltesArsenalMenue.menueTitel}`
    };
  };

  state = { data: [], isLoading: true};

  _DefaultTestDatenInDBLaden(){
    //db = new DBContext();
    db.initialTestDatenSpeichern();
    console.log('ArsenalSubMenuScreenErgenislog: Default Testdaten wurden in DB geladen ');
  };

  _EintraegeAusDBLaden(){
    //alert('Seite hat geladen!');
    //db = new DBContext();
    var ergebnise = db.ladeDaten();
    //console.log('Ergenislog: ', ergebnise[0].bezeichnung);
    //alert('Lade Ergbnis:', ergebnise.bezeichnung);
    this.setState({ isLoading: false, data: ergebnise });
  };

  _refresh = () => {
    this.setState({ isLoading: true });
    this._EintraegeAusDBLaden();
  };

  componentDidMount() {
    //this._DefaultTestDatenInDBLaden();
    //this._EintraegeAusDBLaden();
    console.log('ArsenalSubMenuScreenErgenislog: DB Initialisierung bei componentDidMount aufrufen.. ');
    db.InitialisiereDatenbak();
  }

  render() {
    const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');
    
    const daten = [
      { datensatz: 'Geschoss', 
        bezeichnung: '108WIN', 
        kaliber: '108', 
        gewicht: '168', 
        bc: '.420' ,
        preis: '0,28',
        picture: require('../../assets/GeschossIcon.png')},
      { datensatz: 'Geschoss', 
        bezeichnung: '208WIN', 
        kaliber: '208', 
        gewicht: '155', 
        bc: '.400' ,
        preis: '0,30',
        picture: require('../../assets/GeschossIcon.png')},
      { datensatz: 'Geschoss', 
        bezeichnung: '308WIN', 
        kaliber: '308', 
        gewicht: '178', 
        bc: '.410' ,
        preis: '0,32',
        picture: require('../../assets/GeschossIcon.png')},
      { datensatz: 'Geschoss', 
        bezeichnung: '408WIN', 
        kaliber: '408', 
        gewicht: '170', 
        bc: '.430' ,
        preis: '0,45',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
    ];
    const d = daten[0];

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

        <Text style= {{position: 'absolute', top:15, left:20, padding: 10}}> 
          gespeicherte Daten {d.bezeichnung} 
        //</Text>
    
        <View style={styles.container}>

          <FlatList
            //data={daten}
            data={this.state.data}
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


/*


        <View style={styles.FlatListcontainer}>
          <FlatList
            //data={this.state.data}
            //keyExtractor={item => item.bezeichnung}
            renderItem={({ item }) => (
              <ArsenalListItem
              //ausgewaehltesArsenalMenue={item}
                onPress={() =>Alert.alert('Arsenal Item angeklickt')}
                /*onPress={() =>
                  this.props.navigation.navigate('ItemDetailsScreen', {
                    ausgewaehltesArsenalMenue: item
                  })
                }
                />
                )}
                //onRefresh={this._refresh}
                //refreshing={this.state.isLoading}
                ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
                //ListEmptyComponent={() => (
                //  <Text style={styles.listEmpty}>Keine Daten geladen</Text>
                //)}
              />
            </View>

*/