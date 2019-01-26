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

import { Dropdown } from 'react-native-material-dropdown';
/*
const DropDown = require('react-native-dropdown');
const {
  Select,
  Option,
  OptionList,
  updatePosition
} = DropDown;
*/

import LaborierungListItem from '../components/LaborierungListItem';
import DBContext from '../DataContext';

export default class SchießstandScreen extends Component {
  static navigationOptions = { header: null };

  state = { data: [], isLoading: true };


 _ladeFertigeLaborierungenDatenAusDB = async () => {
  try {
    //Frage: Warum kann ich tabelle laborierung nicht genau so laden wie tabelle geschosse in ArsenalSubMenueScreen?
    db = new DBContext();
    db.ladeFertigeLaborierungen(ergebnis => this.setState({data: ergebnis,  isLoading: false }));
    console.log('Fertige Laborierungen geladen und in State gesetzt: '+JSON.stringify(this.state.data));

  } catch (error) {
    console.log('Fehler - Laborierenscreen: Laborierungen konnten nicht geladen werden! ');
    alert('Fehler: Keine laborierung DB Daten empfangen');
    this.setState({ isLoading: false });
  }
};

_ladeFertigeLaborierungenDatenAusDB_MOCK(){
  db = new DBContext();
  db.ladeFertigeLaborierungen_Mock(ergebnis => this.setState({data: ergebnis,  isLoading: false }));
  
  console.log('Fertige Laborierungen aus Mock geladen und in State gesetzt: '+JSON.stringify(this.state.data));
};





  _refresh = () => {
    this.setState({ isLoading: true });
    this._ladeFertigeLaborierungenDatenAusDB();
    //this._ladeFertigeLaborierungenDatenAusDB_MOCK();
  };

  componentDidMount() {
    //this._ladeFertigeLaborierungenDatenAusDB();
    this._ladeFertigeLaborierungenDatenAusDB_MOCK();
  }

  render() {
    //const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');

    if (this.state.isLoading)
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="darkorange" />
        </View>
      );



      let dpData = [{
        value: 'Banana',
      }, {
        value: 'Mango',
      }, {
        value: 'Pear',
      }];




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

        <Dropdown
          label='Schießstand'
          data={dpData}
        />

        <View style= {{position: 'absolute', top:100}}>
         <Text>Hier in Schießstand</Text>
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


/*

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Select
            width={250}
            ref="SELECT1"
            optionListRef={this._getOptionList.bind(this)}
            defaultValue="Select a Province in Canada ..."
            onSelect={this._canada.bind(this)}>
            <Option>Alberta</Option>
            <Option>British Columbia</Option>
            <Option>Manitoba</Option>
            <Option>New Brunswick</Option>
            <Option>Newfoundland and Labrador</Option>
            <Option>Northwest Territories</Option>
            <Option>Nova Scotia</Option>
            <Option>Nunavut</Option>
            <Option>Ontario</Option>
            <Option>Prince Edward Island</Option>
            <Option>Quebec</Option>
            <Option>Saskatchewan</Option>
            <Option>Yukon</Option>
          </Select>

          <Text>Selected provicne of Canada: {this.state.canada}</Text>
          
          <OptionList ref="OPTIONLIST"/>
      </View>


*/