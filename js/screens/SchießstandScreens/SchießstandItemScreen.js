import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import DBContext from '../../DataContext';


//Detailansicht der ausgewählten Laborierung
export default class SchießstandItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    //const laborierung = navigation.getParam('ausgewaehlteLaborierung');
    return {
      title: "Ergenisse Eintragen:"//title: `${laborierung.bezeichnung} ${":"}`
    };
  };

  LaborierungLoeschen(laborierungsbezeichnung){
    db = new DBContext();
    db.loescheDatensatz("laborierungen", laborierungsbezeichnung);
  }

  DatenInDBAktualisieren(tabelle, datenObjekt) {
    db = new DBContext();
    db.aktualisiereDatensatz(tabelle, datenObjekt);
  }
  
  render() {
    const laborierung = this.props.navigation.getParam('ausgewaehlteLaborierung');

    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.container}
      >
        <Text>Laborierung: {laborierung.bezeichnung}</Text>
        <Text>Kalieber: {laborierung.geschoss.kaliber}</Text>

        <Text>Geschoss:{laborierung.geschoss.bezeichnung}</Text>
        <Text>Geschossgewicht:{laborierung.geschoss.gewicht}gr</Text>
        <Text>Geschossbeschichtung:{laborierung.beschichtung.bezeichnung} - Dauer:{laborierung.beschichtung.dauer}h</Text>
        <Text>OAL:{laborierung.oal}</Text>

        <Text>Pulver:{laborierung.pulver.bezeichnung} - {laborierung.pulver.gewicht}</Text>

        <Text>Hülse:{laborierung.huelse.bezeichnung}</Text>
        <Text>Hülsenlänge:{laborierung.huelse.laenge}mm</Text>
        <Text>Hülsen bereits :{laborierung.huelse.anzahlWiedergeladen} mal wiedergeladen</Text>

        <Text>Zünder:{laborierung.zuender.bezeichnung}</Text>

        <Text>Streukreis in mm:</Text>
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
            <NumericInput 
                //value={this.state.value} 
                initValue = {20.0}
                //onChange={value => this.setState({value})} 
                onChange={value => {console.log(value); laborierung.streukreis = value;}}
                totalWidth={220} 
                totalHeight={70} 
                iconSize={25}
                step={0.5}
                valueType='real'
                rounded 
                textColor='#B0228C' 
                iconStyle={{ color: 'white' }} 
                rightButtonBackgroundColor='#EA3788' 
                leftButtonBackgroundColor='#E56B70'/>

            <TouchableOpacity style={{paddingLeft: 10}} 
                onPress={() => this.props.navigation.navigate('TakePictureScreen', {ausgewaehlteLaborierung: laborierung})}>
                <Text style={{fontSize: 10}}>Treffer aufnehmen:</Text>
                <Image style={{width: 40, height: 40}} source={require('../../../assets/takePicIcon.png')}          
                />
            </TouchableOpacity>
        </View>

        <View style={styles.textAreaContainer} >
            <Text>Schießstandnotizen:</Text>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder= {laborierung.notizen}
              placeholderTextColor="grey"
              numberOfLines={5}
              multiline={true}
              onChange={value =>laborierung.notizen = value}
            />
        </View>

        <Text>Trefferbild:</Text>
        <Image style={{width: 250, height: 250, alignSelf: 'center'}} 
            source= {{uri: laborierung.trefferbild }}
        />

        <TouchableOpacity
          style = {styles.submitButton}
          onPress={(item) =>{
            this.DatenInDBAktualisieren("laborierungen", laborierung);
            this.props.navigation.navigate('Schießstandscreen')
            //this.props.navigation.goBack(null);
          }}>
          <Text style = {styles.submitButtonText}> Speichern </Text>
        </TouchableOpacity>

      </ScrollView>
    );
  }

  newMethod() {
    return 'Schießstandscreen';
  }
}

const width = Dimensions.get('window').width * 0.15;

const styles = StyleSheet.create({
  BtnContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 30
  },
  container: {
    padding: 20
  },
  scrollview: {
    backgroundColor: '#fff'
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: width,
    marginBottom: 20
  },
  textAreaContainer: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 50,
  },
  submitButton: {
      backgroundColor: '#E56B70',
      padding: 10,
      margin: 15,
      height: 40,
  },
  submitButtonText:{
      color: 'white'
  }
});
