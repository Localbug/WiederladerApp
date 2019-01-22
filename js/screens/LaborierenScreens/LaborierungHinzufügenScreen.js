import React, { Component } from 'react';
import {Button, TextInput, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import DBContext from '../../../js/DataContext';


function SettingsItem(props) {
  return <Text style={styles.item}>{props.text}</Text>;
}

function SettingsHeader(props) {
  return <Text style={styles.section}>{props.text}</Text>;
}

function DatenInDBSpeichern(datenObjekt) {
  //console.log("speichere Datensatz: "+JSON.stringify(datenObjekt));
  db = new DBContext();
  db.speichereDatensatz(datenObjekt);
}


export default class LaborierungHinzufuegenScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const titel = "Laborierung erstellen"//navigation.getParam('ausgewaehltesArMenue');
    return {
      title: `${titel}`
    };
  };

  state = {
    ausgewaehltesArsenalMenue: ({ navigation }) => {navigation.getParam('ausgewaehltesArsenalMenue')},
    laborierungBezeichnung: '', geschossDatensatz: '', huelsenDatensatz: '', pulverDatensatz: '', zuenderDatensatz: '',
    beschichtungDatensatz: '', oAL: '', notizen: ''
  }


  //Setze State aus Geschoss-HinzufügenScreen:
  handleLaborierungBezeichnung = (text) => {this.setState({ laborierungBezeichnung: text })}
  handleLaborierungGeschossDatensatz = (text) => {
    //TODO: Suche aus Eingabe entsprechender Datensatz aus Arsenal Datenbank
    this.setState({ geschossDatensatz: text })
  }
  handleLaborierungHuelsenDatensatz = (text) => {
    //Suche aus Eingabe entsprechender Datensatz aus Arsenal Datenbank
    this.setState({ huelsenDatensatz: text })
  }
  handleLaborierungPulverDatensatz = (text) => { 
    //Suche aus Eingabe entsprechender Datensatz aus Arsenal Datenbank
    this.setState({ pulverDatensatz: text }) 
  }
  handleLaborierungZuenderDatensatz = (text) => {
    //Suche aus Eingabe entsprechender Datensatz aus Arsenal Datenbank
    this.setState({ zuenderDatensatz: text })
  }
  handleLaborierungBeschichtungDatensatz = (text) => {
    //Suche aus Eingabe entsprechender Datensatz aus Arsenal Datenbank
    this.setState({ beschichtungDatensatz: text })
  }
  handleLaborierungoAL = (text) => {this.setState({ oAL: text })}
  handleLaborierungNotizen = (text) => {this.setState({ notizen: text })}

  renderLaborierungHinzufuegenScreen(){
    return(
      <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollviewcontainer}>
        <View style={styles.container}>
          <View style = {styles.container}>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Laborierung - Name / Bezeichnung"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungBezeichnung}/>
              
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Geschoss Bezeichnung aus Arsenal" //TODO: Dropdownliste aller verfügbaren Geschosse
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungGeschossDatensatz}/>
                            
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Hülsen Bezeichnung aus Arsenal" //TODO: Dropdownliste aller verfügbaren Geschosse
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungHuelsenDatensatz}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Pulver Bezeichnung aus Arsenal" //TODO: Dropdownliste aller verfügbaren Geschosse
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungPulverDatensatz}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Zünder Bezeichnung aus Arsenal" //TODO: Dropdownliste aller verfügbaren Geschosse
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungZuenderDatensatz}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Beschichtung Bezeichnung aus Arsenal" //TODO: Dropdownliste aller verfügbaren Geschosse
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungBeschichtungDatensatz}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "OAL: Gesamtlänge in mm der Patrone"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungoAL}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Notizen zur Laborierung"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungNotizen}/>

              <TouchableOpacity
                style = {styles.submitButton}
                onPress={(item) =>{
                  const laborierungDatensatz = new Object;
                  laborierungDatensatz.datensatztyp = 'Laborierung'; //"geschosse";
                  laborierungDatensatz.bezeichnung = this.state.geschossBezeichnung;
                  laborierungDatensatz.kaliber = this.state.geschossKaliber;
                  laborierungDatensatz.gewicht = this.state.geschossGewicht;
                  laborierungDatensatz.bc = this.state.geschossBc;
                  laborierungDatensatz.preis = this.state.geschossPreis;
                  laborierungDatensatz.bild = {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelUVBNfFUlKOJ24E8_kO_dWNuHAUoAcV_VscC6OwBGMdSmWM4'};
                  //datenInDBSpeichern("geschosse", geschossDatensatz);
                  DatenInDBSpeichern(laborierungDatensatz);
                  alert("hier zurückspringen");
                  this.props.navigation.navigate('LaborierungsScreen')
                }}>
                <Text style = {styles.submitButtonText}> Hinzufügen </Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }


  render() {
    console.log("Laborierung HinzufügenScreen zeigen");
    return this.renderLaborierungHinzufuegenScreen();
  }
}

const styles = StyleSheet.create({
  
  scrollviewcontainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  scrollview: {
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 30
  },
  section: {
    backgroundColor: 'whitesmoke',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgrey',
    fontSize: 18,
    padding: 5
  },
  item: {
    color: 'dimgrey',
    fontSize: 18,
    padding: 5
  },
  input: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1
  },
  submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
  },
  submitButtonText:{
      color: 'white'
  }
});
