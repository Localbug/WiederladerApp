import React, { Component } from 'react';
import {Button, TextInput, TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import DBContext from '../../../js/DataContext';


function SettingsItem(props) {
  return <Text style={styles.item}>{props.text}</Text>;
}

function SettingsHeader(props) {
  return <Text style={styles.section}>{props.text}</Text>;
}

function DatenInDBSpeichern(_geschossDatensatz) {
  const bgeschossDatensatz = new Object;
  bgeschossDatensatz.bezeichnung = "bezeichnung";//this.state.bezeichnung;
  bgeschossDatensatz.kaliber = "kaliber";//this.state.kaliber;
  bgeschossDatensatz.gewicht = "gewicht";//this.state.gewicht;
  bgeschossDatensatz.bc = "bc";//this.state.bc;
  bgeschossDatensatz.preis = "preis";//this.state.preis;

  console.log("speichere geschossdaten: "+JSON.stringify(_geschossDatensatz));
  db = new DBContext();
  db.speichereDatensatz('geschosse', _geschossDatensatz);
}


export default class ArsenalHinzufuegenScreen extends Component {
  state = {
    bezeichnung: '',
    kaliber: '',
    gewicht: '',
    bc: '',
    preis: ''
  }

  handleBezeichnung = (text) => {
    this.setState({ bezeichnung: text })
  }
  handleKaliber = (text) => {
      this.setState({ kaliber: text })
  }
  handleGewicht = (text) => {
    this.setState({ gewicht: text })
  }
  handleBc = (text) => {
      this.setState({ bc: text })
  }
  handlePreis = (text) => {
    this.setState({ preis: text })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.container}>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Name / Bezeichnung z.B: SMK 168 Moly"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleBezeichnung}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Kaliber z.B: .308Win"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleBezeichnung}/>
                          
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Gewicht in Grain z.B: 168"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleKaliber}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Balistik-Koeffizient z.B 0.420"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleBc}/>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Preis in €/Stück z.B 0.48"
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePreis}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress={() =>
              {
                //alert("Button geklickt...Hier soll DB angelegt und FakeDaten hinzugefügt werden")

                const InterngeschossDatensatz = new Object;
                InterngeschossDatensatz.bezeichnung = this.state.bezeichnung;
                InterngeschossDatensatz.kaliber = this.state.kaliber;
                InterngeschossDatensatz.gewicht = this.state.gewicht;
                InterngeschossDatensatz.bc = this.state.bc;
                InterngeschossDatensatz.preis = this.state.preis;

                DatenInDBSpeichern(InterngeschossDatensatz);


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
    );
  }
}

const styles = StyleSheet.create({
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
