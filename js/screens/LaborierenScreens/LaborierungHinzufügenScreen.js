import React, { Component } from 'react';
import {Button, TextInput, TouchableOpacity, ScrollView, StyleSheet, Text, CheckBox, View } from 'react-native';
import NumericInput from 'react-native-numeric-input'
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
    beschichtungDatensatz: '', oAL: '', anzahl: '', notizen: '', fertiggestellt: false
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
  handleLaborierungAnzahl = (text) => {this.setState({ anzahl: text })}
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


              <View style={{
                flex: 1,
                flexDirection: 'row',
                padding: 10
              }}>
                  <Text style={{fontSize: 18}}>  Anzahl:   </Text>
                  <NumericInput 
                    initValue = {20}
                    onChange={value => {console.log(value); this.state.anzahl = value; }}
                    totalWidth={120} 
                    totalHeight={40} 
                    iconSize={25}
                    step={5}
                    valueType='integer'
                    rounded 
                    textColor='#7a42f4' 
                    iconStyle={{ color: 'white' }} 
                    rightButtonBackgroundColor='#7a42f4' 
                    leftButtonBackgroundColor='#7a92f4'/>
              </View>

              <View style={styles.textAreaContainer} >
                  <Text>Laborierung-Notizen:</Text>
                  <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    //placeholder= {laborierung.notizen}
                    placeholderTextColor="grey"
                    numberOfLines={5}
                    multiline={true}
                    onChange={this.handleLaborierungNotizen}
                  />
              </View>

              {/* <TextInput style = {styles.input}
                underlineColorAndroid = "transparent"
                placeholder = "Notizen zur Laborierung"
                placeholderTextColor = "#9a73ef"
                autoCapitalize = "none"
                onChangeText = {this.handleLaborierungNotizen}/> */}

              <View style={{ flexDirection: 'row', backgroundColor: '#7a42f4', left: 15 }}>
                <CheckBox
                  value={this.state.fertiggestellt}
                  disabled={false}
                  //onValueChange={() => this.setState({ checked: !this.state.checked })}
                  //onValueChange={alert("Checkbox geändert")}
                  onValueChange={() => this.setState({ fertiggestellt: !this.state.fertiggestellt })}
                />
                <Text style={{marginTop: 5}}> Laborierung fertiggestellt</Text>
              </View>

              <TouchableOpacity
                style = {styles.submitButton}
                onPress={(item) =>{
                  const laborierungDatensatz = new Object;
                  laborierungDatensatz.datensatztyp = 'Laborierung'; //"geschosse";
                  laborierungDatensatz.bezeichnung = this.state.laborierungBezeichnung;
                  laborierungDatensatz.geschossDatensatz = this.state.geschossDatensatz;
                  laborierungDatensatz.huelsenDatensatz = this.state.huelsenDatensatz;
                  laborierungDatensatz.pulverDatensatz = this.state.pulverDatensatz;
                  laborierungDatensatz.zuenderDatensatz = this.state.zuenderDatensatz;
                  laborierungDatensatz.beschichtungDatensatz = this.state.beschichtungDatensatz;
                  laborierungDatensatz.oAL = this.state.oAL;
                  laborierungDatensatz.fertiggestellt = this.state.fertiggestellt;
                  laborierungDatensatz.anzahl = this.state.anzahl;
                  laborierungDatensatz.notizen = this.state.notizen;
                  laborierungDatensatz.bild = {uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelUVBNfFUlKOJ24E8_kO_dWNuHAUoAcV_VscC6OwBGMdSmWM4'};
                  DatenInDBSpeichern(laborierungDatensatz); //Daten in DB speichern
                  this.props.navigation.goBack(); //Ein Screen zurück springen   
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
    //flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
    //justifyContent: 'center',
    //padding: 5
  },
  scrollview: {
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //paddingTop: 15
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
  },
  textAreaContainer: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 10
  },
});
