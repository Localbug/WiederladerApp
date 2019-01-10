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
  console.log("speichere Datensatz: "+JSON.stringify(datenObjekt));
  db = new DBContext();
  //TODO: datensatzTyp muss extrahiert und der speichereDatensatzmethode übergeben werden
  const tabellenName = datenObjekt.datensatztyp; //.toLowerCase();
  console.log("TODO!!!!!!!!!!!!datensatzTyp- tabellenname: "+tabellenName);
  const pulverBezeichnung = datenObjekt.pulverBezeichnung; //.toLowerCase();
  console.log("TODO!!!!!!!!!!!!pulverBezeichnung: "+pulverBezeichnung);
  db.speichereDatensatz('geschosse', datenObjekt);
}


export default class ArsenalHinzufuegenScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const ausgewaehltesArsenalMenue = navigation.getParam('ausgewaehltesArsenalMenue');
    return {
      title: `${ausgewaehltesArsenalMenue.menueTitel} hinzufügen`
    };
  };

  state = {
    ausgewaehltesArsenalMenue: ({ navigation }) => {navigation.getParam('ausgewaehltesArsenalMenue')},
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
                placeholder = "Name / Bezeichnung z.B: SMK 168 Moly"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossBezeichnung}/>
              
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Kaliber z.B: .308Win"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossBezeichnung}/>
                            
              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Gewicht in Grain z.B: 168"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossKaliber}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Balistik-Koeffizient z.B 0.420"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossBc}/>

              <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Preis in €/Stück z.B 0.48"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleGeschossPreis}/>
              
              <TouchableOpacity
                style = {styles.submitButton}
                onPress={() =>{
                  const geschossDatensatz = new Object;
                  geschossDatensatz.datensatzTyp = this.state.ausgewaehltesArsenalMenue.menueTitel;
                  geschossDatensatz.bezeichnung = this.state.geschossBezeichnung;
                  geschossDatensatz.kaliber = this.state.geschossKaliber;
                  geschossDatensatz.gewicht = this.state.geschossGewicht;
                  geschossDatensatz.bc = this.state.geschossBc;
                  geschossDatensatz.preis = this.state.geschossPreis;
                  DatenInDBSpeichern(geschossDatensatz);
                }}>
                <Text style = {styles.submitButtonText}> Hinzufügen </Text>
              </TouchableOpacity>
          </View>

          <View style= {{position: 'absolute', bottom:5, right:5}}>
            <Button
              title= "In DB hinzufügen"
              onPress={() =>
                {
                  //alert("Button geklickt...Hier soll DB angelegt und FakeDaten hinzugefügt werden")
                  const testdaten = { 
                      datensatz: 'Geschoss', 
                      bezeichnung: 'AusFormular308WIN', 
                      kaliber: '308WIN'};

                  db = new DBContext();
                  db.erzeugeTabellen();
                  //db.initialTestDatenSpeichern();
                  db.speichereDaten(testdaten);
                }}
            />
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
                  huelsenDatensatz.datensatzTyp = this.state.ausgewaehltesArsenalMenue.menueTitel;
                  huelsenDatensatz.bezeichnung = this.state.huelsenBezeichnung;
                  huelsenDatensatz.kaliber = this.state.huelsenKaliber;
                  huelsenDatensatz.gewicht = this.state.huelsenGewicht;
                  huelsenDatensatz.laegnge = this.state.huelsenLaenge;
                  huelsenDatensatz.laegnge = this.state.huelseAnzahlWiedergeladen
                  huelsenDatensatz.preis = this.state.huelsenPreis;
                  DatenInDBSpeichern(huelsenDatensatz);
                }}>
                <Text style = {styles.submitButtonText}> Hinzufügen </Text>
              </TouchableOpacity>
          </View>

          <View style= {{position: 'absolute', bottom:5, right:5}}>
            <Button
              title= "In DB hinzufügen"
              onPress={() =>
                {
                  //alert("Button geklickt...Hier soll DB angelegt und FakeDaten hinzugefügt werden")
                  const testdaten = { 
                      datensatz: 'Geschoss', 
                      bezeichnung: 'AusFormular308WIN', 
                      kaliber: '308WIN'};

                  db = new DBContext();
                  db.erzeugeTabellen();
                  //db.initialTestDatenSpeichern();
                  db.speichereDaten(testdaten);
                }}
            />
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
                  pulverDatensatz.datensatzTyp = this.state.ausgewaehltesArsenalMenue.menueTitel;
                  pulverDatensatz.bezeichnung = this.state.pulverBezeichnung;
                  pulverDatensatz.notizen = this.state.pulverNotizen;
                  pulverDatensatz.preis = this.state.pulverPreis;
                  DatenInDBSpeichern(pulverDatensatz);
                }}>
                <Text style = {styles.submitButtonText}> Hinzufügen </Text>
              </TouchableOpacity>
          </View>

          <View style= {{position: 'absolute', bottom:5, right:5}}>
            <Button
              title= "In DB hinzufügen"
              onPress={() =>
                {
                  //alert("Button geklickt...Hier soll DB angelegt und FakeDaten hinzugefügt werden")
                  const testdaten = { 
                      datensatz: 'Geschoss', 
                      bezeichnung: 'AusFormular308WIN', 
                      kaliber: '308WIN'};

                  db = new DBContext();
                  db.erzeugeTabellen();
                  //db.initialTestDatenSpeichern();
                  db.speichereDaten(testdaten);
                }}
            />
          </View>
        </View>
      </ScrollView>
    );
  }



  render() {
    const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');
    console.log("HinzufügenScreen für:" +ausgewaehltesArsenalMenue.menueTitel);
    
    switch(ausgewaehltesArsenalMenue.menueTitel) {
      case 'Geschosse':
        return this.renderGeschosse()
        break;
      case 'Hülsen':
        return this.renderHülsen()
        break;
      case 'Pulver':
        return this.renderPulver()
        break;
      case 'Zünder':
        return this.renderZuender()
        break;
      case 'Waffen':
        return this.renderWaffen()
        break;
      case 'Auflagen':
        return this.renderAuflagen()
        break;
      case 'Schießstand':
        return this.renderSchießstand()
        break;
      case 'Beschichtungen':
        return this.renderBeschichtungen()
        break;
      case 'ReinigungsMedia':
        return this.renderReinigungsMedia()
        break;
      case 'Matritzen':
        return this.renderMatritzen()
        break;
      default:
        alert("Zu Auswahl: "+ausgewaehltesArsenalMenue.menueTitel +" konnte keine RenderMethode gefunden werden!")
        Console.log("Zu Auswahl: "+ausgewaehltesArsenalMenue.menueTitel +" konnte keine RenderMethode gefunden werden!")
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
