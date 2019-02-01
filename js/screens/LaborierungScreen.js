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

  _ladeDatenausDB(){
    db.ladeDaten('laborierungen', ergebnis => {
      console.log("!Geladene Laborierung: "+JSON.stringify(ergebnis));
      this.setState({data: ergebnis,  isLoading: false })
    });
  }

  _ladeLaborierungDatenAusDB_MOCK(){
    db = new DBContext();
    db.ladeMOCKLaborierungsDaten(ergebnis => this.setState({data: ergebnis,  isLoading: false }));
    console.log('Laborierungen geladen und in State gesetzt: '+JSON.stringify(this.state.data));
  };


  _ladeUnfertigeLaborierungenausDB(){
    db.ladeUnfertigeLaborierungen(ergebnis => {
      console.log("!Geladene unfertige Laborierungen: "+JSON.stringify(ergebnis));
      this.setState({data: ergebnis,  isLoading: false })
    });
  }

  _ladeSortierteLaborierungenausDB(){
    db.ladeLaborierungenSortiertNachStreukreis(ergebnis => {
      console.log("!Geladene und geordnete Laborierungen: "+JSON.stringify(ergebnis));
      this.setState({data: ergebnis,  isLoading: false })
    });
  }

  _refresh = () => {
    this.setState({ isLoading: true });
    this._ladeLaborierungDatenAusDB();
    //this._ladeDatenausDB();
  };

  componentDidMount() {
    this._ladeLaborierungDatenAusDB_MOCK();
    //this._ladeDatenausDB();
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
            title= "    neue erstellen     "
            onPress={() =>
                  this.props.navigation.navigate('LaborierungHinzufügenScreen', {})
            }
          />
        </View>

        <View style= {{position: 'absolute', top:70, left:5}}>
          <Button
            title= "bester Streukreis"
            onPress={() => {
              this.setState({isLoading: true });
              this._ladeSortierteLaborierungenausDB();
              this.props.navigation.navigate('LaborierenScreen');
            }}
          />
        </View>
        <View style= {{position: 'absolute', top:70, right:5}}>
          <Button
            title= "unfertige anzeigen"
            onPress={() => {
              this.setState({isLoading: true });
              this._ladeUnfertigeLaborierungenausDB();
              this.props.navigation.navigate('LaborierenScreen');
            }}
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
