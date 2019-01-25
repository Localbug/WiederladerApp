import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, View, Button, StyleSheet, Text } from 'react-native';

//Detailansicht der ausgewählten Laborierung
export default class LaborierungItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const laborierung = navigation.getParam('ausgewaehlteLaborierung');
    return {
      title: `${laborierung.bezeichnung} ${":"}`
    };
  };

  LaborierungLoeschen(laborierungsbezeichnung){
    //TODO: Laborierung aus DB löschen
  }


  render() {
    const laborierung = this.props.navigation.getParam('ausgewaehlteLaborierung');
    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.container}
      >
        <Image style={styles.image} source={{ uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" }} />
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

        <Text>Notizen:{laborierung.notizen}</Text>
        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
        <Text style= {{fontStyle: 'italic'}}>Tipp: Wähle die Laborierung im Schießstand-Tab, um einen Streukreis ermitteln zu können und ein Trefferbild aufzunehmen</Text>



         <View style= {{position: 'absolute', top:42, right:5}}>
          <Button
            title= "Laborierung löschen"
            onPress={(item) =>{
                  LaborierungLoeschen(laborierung.bezeichnung);
                  this.props.navigation.navigate('LaborieungScreen')
            }}
          />
        </View>


        <View style= {{position: 'absolute', top:2, right:5}}>
          <Button
            title= "Resultate eingeben     "
            onPress={() =>
              this.props.navigation.navigate('Schießstandscreen', {
                    ausgewaehlteLaborierung: laborierung.bezeichnung
              })}
          />
        </View>


      </ScrollView>
    );
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
  }
});
