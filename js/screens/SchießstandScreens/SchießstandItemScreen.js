import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, View, Button, StyleSheet, Text, FormInput, TextInput } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import ScrollPicker from 'react-native-wheel-scroll-picker';
import DBContext from '../../DataContext';


//Detailansicht der ausgewählten Laborierung
export default class SchießstandItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const laborierung = navigation.getParam('ausgewaehlteLaborierung');
    return {
      title: "Ergenisse Eintragen:"//title: `${laborierung.bezeichnung} ${":"}`
    };
  };

  LaborierungLoeschen(laborierungsbezeichnung){
    //TODO: Laborierung Löschen funktioniert nicht!

    db = new DBContext();
    db.loescheDatensatz("laborierungen", laborierungsbezeichnung);
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
        <NumericInput 
            //value={this.state.value} 
            initValue = {20.0}
            //onChange={value => this.setState({value})} 
            onChange={value => console.log(value)} 
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={0.5}
            valueType='real'
            rounded 
            textColor='#B0228C' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/>

        <ScrollPicker
          dataSource={[
              'a',
              'b',
              'c',
              'd',
          ]}
          selectedIndex={1}
          renderItem={(data, index, isSelected) => {
              //
          }}
          onValueChange={(data, selectedIndex) => {
              //
          }}
          wrapperHeight={180}
          wrapperWidth={150}
          wrapperBackground={'#FFFFFF'}
          itemHeight={60}
          highlightColor={'#d8d8d8'}
          highlightBorderWidth={2}
          activeItemColor={'#222121'}
          itemColor={'#B4B4B4'}
        />

        <View style={styles.textAreaContainer} >
            <Text>Schießstandnotizen:</Text>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder= {laborierung.notizen}
              placeholderTextColor="grey"
              numberOfLines={5}
              multiline={true}
            />
        </View>
 

        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
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
    //alignItems: 'center',
    //justifyContent: 'flex-start',
    //textAlign: 'left',
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
    //justifyContent: "flex-start"
  }
});
