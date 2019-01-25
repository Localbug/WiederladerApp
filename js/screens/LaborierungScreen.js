import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  View
} from 'react-native';

import LaborierungListItem from '../components/LaborierungListItem';
import DBContext from '../DataContext';

export default class LaborierungScreen extends Component {
  static navigationOptions = { header: null };

  state = { data: [], isLoading: true };


   laborierungTestdaten = [
    {
      datensatztyp: "Laborierung",
      bezeichnung: "Match-Patronen",
      geschossID: 1,
      huelseID: 1,
      zuenderID: 1,
      pulverID: 1,
      beschichtungID: 1,
      oal: "73,1",
      notizen: "wird schnell heiss",
      preis: "1,22",
      bild: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png"
    },
    {
      datensatztyp: "Laborierung",
      bezeichnung: "Versuchslaborierung1",
      geschossID: 1,
      huelseID: 1,
      zuenderID: 1,
      pulverID: 1,
      beschichtungID: 1,
      oal: "73,1",
      notizen: "versuch mit pressladung",
      preis: "0,71",
      bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" }
    }
  ];


 _ladeLaborierungDatenAusDB = async () => {
  try {
    //Frage: Warum kann ich tabelle laborierung nicht genau so laden wie tabelle geschosse in ArsenalSubMenueScreen?
    db = new DBContext();
    db.ladeDaten('laborierungen', ergebnis => this.setState({data: ergebnis,  isLoading: false }));
    console.log('Laborierungen geladen und in State gesetzt: '+JSON.stringify(this.state.data));

  } catch (error) {
    console.log('Fehler - Laborierenscreen: Laborierungen konnten nicht geladen werden! ');
    alert('Fehler: Keine laborierung DB Daten empfangen');
    this.setState({ isLoading: false });
  }
};

_ladeLaborierungDatenAusDB_MOCK(){

  db = new DBContext();
  db.ladeMOCKLaborierungsDaten(ergebnis => this.setState({data: ergebnis,  isLoading: false }));
  
  //Frage: Warum bekomm ich nicht mal in diesem Mock ohne die DB das Array in den State?
  console.log('Laborierungen geladen und in State gesetzt: '+JSON.stringify(this.state.data));
  console.log('Laborierungen geladen und in State gesetzt: '+JSON.stringify(this.state.data[0]));

};





  _refresh = () => {
    this.setState({ isLoading: true });
    this._ladeLaborierungDatenAusDB();
  };

  componentDidMount() {
    //this._ladeLaborierungDatenAusDB();
    this._ladeLaborierungDatenAusDB_MOCK();
  }

  render() {
    //const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');

    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="darkorange" />
        </View>
      );
    return (



      <View style={styles.container}>
        <View style= {{position: 'absolute', top:30, right:5}}>
          <Button
            title= "neue erstellen"
            onPress={() =>
                  this.props.navigation.navigate('LaborierungHinzufügenScreen', {
                    //ausgewaehltesArsenalMenue: ausgewaehltesArsenalMenue,
                  })}
          />
        </View>




        <View style= {{position: 'absolute', top:100}}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.bezeichnung} //item.email
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
