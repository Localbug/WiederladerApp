import React, { Component } from 'react';
import {Button, TextInput, TouchableOpacity, ScrollView, StyleSheet, Text, View } from 'react-native';
import DBContext from '../../DataContext';


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


export default class ArsenalBearbeitenScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const ausgewaehltesArsenalItem = navigation.getParam('ausgewaehltesArsenalItem');
    return {
      title: `${ausgewaehltesArsenalItem.bezeichnung} bearbeiten`
    };
  };

  state = {
    ausgewaehltesArsenalItem: ({ navigation }) => {navigation.getParam('ausgewaehltesArsenalItem')},
    geschossBezeichnung: '', geschossKaliber: '', geschossGewicht: '', geschossBc: '', geschossPreis: '',
    huelseBezeichnung: '', huelseKaliber: '', huelseGewicht: '', huelseLaenge: '', huelseAnzahlWiedergeladen: '', huelsePreis: '',
    pulverBezeichnung: '', pulverPreis: '', pulverNotizen: ''
  }

  //Setze State aus Geschoss-HinzufügenScreen:
  handleGeschossBezeichnung = (text) => {this.setState({ geschossBezeichnung: text })}
  handleGeschossKaliber = (text) => {this.setState({ geschossKaliber: text })}
  handleGeschossGewicht = (text) => {this.setState({ geschossGewicht: text })}
  handleGeschossBc = (text) => { this.setState({ geschossBc: text }) }
  handleGeschossPreis = (text) => {this.setState({ geschossPreis: text })}
  //Setze State aus Hülse-HinzufügenScreen:
  handleHuelseBezeichnung = (text) => {this.setState({ huelseBezeichnung: text })}
  handleHuelseKaliber = (text) => {this.setState({ huelseKaliber: text })}
  handleHuelseGewicht = (text) => {this.setState({ huelseGewicht: text })}
  handleHuelseLaenge = (text) => { this.setState({ huelseLaenge: text }) }
  handleHuelseAnzahlWiedergeladen  = (text) => { this.setState({ huelseAnzahlWiedergeladen: text }) }
  handleHuelsePreis = (text) => {this.setState({ huelsePreis: text })}
  //Setze State aus Pulver-HinzufügenScreen:
  handlePulverBezeichnung = (text) => {this.setState({ pulverBezeichnung: text })}
  handlePulverPreis = (text) => {this.setState({ pulverPreis: text })}
  handlePulverNotizen = (text) => {this.setState({ pulverNotizen: text })}

  renderGeschosse(){
    return(
      <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollviewcontainer}>
        <View style={styles.container}>
          <View style = {styles.container}>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = {this.ausgewaehltesArsenalItem.bezeichnung}
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossBezeichnung}/>
              
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = {this.ausgewaehltesArsenalItem.kaliber}
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossKaliber}/>
                            
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = {this.ausgewaehltesArsenalItem.gewicht}
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossGewicht}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = {this.ausgewaehltesArsenalItem.bc}
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossBc}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = {this.ausgewaehltesArsenalItem.preis}
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossPreis}/>
              
              <TouchableOpacity
                style = {styles.submitButton}
                onPress={(item) =>{
                  const geschossDatensatz = new Object;
                  geschossDatensatz.datensatztyp = 'Geschoss'; //"geschosse";
                  geschossDatensatz.bezeichnung = this.state.geschossBezeichnung;
                  geschossDatensatz.kaliber = this.state.geschossKaliber;
                  geschossDatensatz.gewicht = this.state.geschossGewicht;
                  geschossDatensatz.bc = this.state.geschossBc;
                  geschossDatensatz.preis = this.state.geschossPreis;
                  geschossDatensatz.bild = {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'};
                  DatenInDBSpeichern(geschossDatensatz);
                  this.props.navigation.goBack(); //Ein Screen zurück springen 
                }}>
                <Text style = {styles.submitButtonText}> Speichern </Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
  
  renderHülsen(){
    return(
      <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollviewcontainer}>
        <View style={styles.container}>
          <View style = {styles.container}>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Name / Bezeichnung z.B: Lapua 308 Charge01"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleHuelseBezeichnung}/>
              
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Kaliber z.B: .308Win"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleHuelseKaliberg}/>
                            
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Gewicht in Grain z.B: 150"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleHuelseGewicht}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Länge in mm"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleHuelseLaenge}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Anzahl wiedergeladen"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleHuelseAbzahlWiedergeladen}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Preis in €/Stück z.B 0.90"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleHuelsePreis}/>
              
              <TouchableOpacity
                style = {styles.submitButton}
                onPress={() =>{
                  const huelsenDatensatz = new Object;
                  huelsenDatensatz.datensatztyp = "Huelse";
                  huelsenDatensatz.bezeichnung = this.state.huelsenBezeichnung;
                  huelsenDatensatz.kaliber = this.state.huelsenKaliber;
                  huelsenDatensatz.gewicht = this.state.huelsenGewicht;
                  huelsenDatensatz.laegnge = this.state.huelsenLaenge;
                  huelsenDatensatz.anzahlWiedergeladen = this.state.huelseAnzahlWiedergeladen
                  huelsenDatensatz.preis = this.state.huelsenPreis;
                  huelsenDatensatz.bild = {uri: 'https://cdn2.iconfinder.com/data/icons/military-9/500/642-512.png'};
                  DatenInDBSpeichern(huelsenDatensatz);
                  this.props.navigation.goBack(); //Ein Screen zurück springen 
                }}>
                <Text style = {styles.submitButtonText}> Speichern </Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  renderPulver(){
    return(
      <ScrollView style={styles.scrollview} contentContainerStyle={styles.scrollviewcontainer}>
        <View style={styles.container}>
          <View style = {styles.container}>
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Name / Bezeichnung z.B: VV N140"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handlePulverBezeichnung}/>              

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Preis in pro 100g in Euro z.B 8.70"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handlePulverPreis}/>
              
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "notizen.."
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handlePulverNotizen}/>

              <TouchableOpacity
                style = {styles.submitButton}
                onPress={() =>{
                  const pulverDatensatz = new Object;
                  pulverDatensatz.datensatztyp = "Pulver";
                  pulverDatensatz.bezeichnung = this.state.pulverBezeichnung;
                  pulverDatensatz.notizen = this.state.pulverNotizen;
                  pulverDatensatz.preis = this.state.pulverPreis;
                  pulverDatensatz.bild = {uri: 'https://pillquan.de/wp-content/uploads/2016/09/icon-dosierung-pulver.png'};
                  DatenInDBSpeichern(pulverDatensatz);
                  this.props.navigation.goBack(); //Ein Screen zurück springen 
                }}>
                <Text style = {styles.submitButtonText}> Speichern </Text>
              </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    );
  }


  render() {
    const ausgewaehltesArsenalItem = this.props.navigation.getParam('ausgewaehltesArsenalItem');
    console.log("Arsenalbearbeiten für:" +ausgewaehltesArsenalItem.datensatztyp);
    
    switch(ausgewaehltesArsenalItem.datensatztyp) {
      case 'Geschoss':
        return this.renderGeschosse()
        break;
      case 'Hülse':
        return this.renderHülsen()
        break;
      case 'Pulver':
        return this.renderPulver()
        break;
      case 'Zünder':
        return this.renderZuender()
        break;
      case 'Waffe':
        return this.renderWaffen()
        break;
      case 'Auflage':
        return this.renderAuflagen()
        break;
      case 'Schießstand':
        return this.renderSchießstand()
        break;
      case 'Beschichtung':
        return this.renderBeschichtungen()
        break;
      case 'ReinigungsMedia':
        return this.renderReinigungsMedia()
        break;
      case 'Matritze':
        return this.renderMatritzen()
        break;
      default:
        alert("Zu Auswahl: "+ausgewaehltesArsenalItem.datensatztyp +" konnte keine RenderMethode gefunden werden!")
        console.log("Fehler in ArsenalHinzufügenScreen - Zu Auswahl: "+ausgewaehltesArsenalItem.datensatztyp +" konnte keine RenderMethode gefunden werden!")
    }
    
    return(
      <View>
        <Text>
           - Nichts zu sehen - Hier soll View aus Rendermethoden geladen werden
        </Text>
      </View>

    );
  }
}

const styles = StyleSheet.create({
  
  scrollviewcontainer: {
    justifyContent: 'center',
  },
  scrollview: {
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 5
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
