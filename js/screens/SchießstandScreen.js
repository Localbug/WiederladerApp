import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  Button,
  ScrollView,
  TextInput,
  View
} from 'react-native';
import { Dropdown } from 'react-native-material-dropdown';
import LaborierungListItem from '../components/LaborierungListItem';
import DBContext from '../DataContext';

export default class SchießstandScreen extends Component {
  static navigationOptions = { header: null };

  state = { fertigeLaborierungen: [], waffen: [], schießstaende: [], isLoading: true, temperatur: "", wind: "" };

  _ladeFertigeLaborierungenDatenAusDB = async () => {
    try {
      db = new DBContext();
      db.ladeFertigeLaborierungen(ergebnis => this.setState({fertigeLaborierungen: ergebnis,  isLoading: false }));
      console.log('Fertige Laborierungen geladen und in State gesetzt: '+JSON.stringify(this.state.fertigeLaborierungen));
    } catch (error) {
      console.log('Fehler - Laborierenscreen: Laborierungen konnten nicht geladen werden! ');
      alert('Fehler: Keine laborierung DB Daten empfangen');
      this.setState({ isLoading: false });
    }
  };
  
  _ladeFertigeLaborierungenDatenAusDB_MOCK(){
    db = new DBContext();
    db.ladeFertigeLaborierungen_Mock(ergebnis => this.setState({fertigeLaborierungen: ergebnis,  isLoading: false }));
    console.log('Fertige Laborierungen aus Mock geladen und in State gesetzt: '+JSON.stringify(this.state.fertigeLaborierungen));
  };
  
  _ladeSchießsstandDatenAusDB_MOCK(){
    db = new DBContext();
    db.ladeMOCKSchießstandDaten(ergebnis => this.setState({schießstaende: ergebnis,  isLoading: false }));
    console.log('Schießsstände aus Mock geladen und in State gesetzt: '+JSON.stringify(this.state.schießstaende));
  };
 
  _ladeWaffenDatenAusDB_MOCK(){
    db = new DBContext();
    db.ladeMOCKWaffenDaten(ergebnis => this.setState({waffen: ergebnis,  isLoading: false }));
    console.log('Schießsstände aus Mock geladen und in State gesetzt: '+JSON.stringify(this.state.waffen));
  };

  _refresh = () => {
    this.setState({ isLoading: true });
    //this._ladeFertigeLaborierungenDatenAusDB();
    this._ladeFertigeLaborierungenDatenAusDB_MOCK();
    this._ladeSchießsstandDatenAusDB_MOCK();
    this._ladeWaffenDatenAusDB_MOCK();
  };

  componentDidMount() {
    //this._ladeFertigeLaborierungenDatenAusDB();
    this._ladeFertigeLaborierungenDatenAusDB_MOCK();
    this._ladeSchießsstandDatenAusDB_MOCK();
    this._ladeWaffenDatenAusDB_MOCK();
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

          <View style= {{paddingTop: 20}}>
            <View style= {{left: 15}}>
                <Dropdown
                  label='Schießstand auswählen'
                  data={this.state.schießstaende}
                />
              
                <Dropdown
                  label='Waffe auswählen'
                  data={this.state.waffen}
                />
            </View>

            <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Wetter: Temperatur in C"
                    placeholderTextColor = "#9E9E9E"
                    autoCapitalize = "none"
                    onChangeText = {(text) => {this.setState({ temperatur: text })}}/>
            <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "Wetter: -Wind Notiz- "
                    placeholderTextColor = "#9E9E9E"
                    autoCapitalize = "none"
                    onChangeText = {(text) => {this.setState({ wind: text })}}/>
          </View>

          <ScrollView style= {{position: 'absolute', top:280}}>
            <Text style={{left: 15}}>Bitte wähle eine der fertigen Laborierungen aus:</Text>
            <FlatList
              data={this.state.fertigeLaborierungen}
              keyExtractor={item => item.bezeichnung} 
              renderItem={({ item }) => (
                <LaborierungListItem 
                  ausgewaehlteLaborierung={item}
                  onPress={() =>
                    this.props.navigation.navigate('SchießstandItemScreen', {
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
          </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
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
  },
  input: {
    margin: 5,
    height: 30,
    borderColor: '#000',
    borderWidth: 1,
    paddingLeft: 15
  }
});
