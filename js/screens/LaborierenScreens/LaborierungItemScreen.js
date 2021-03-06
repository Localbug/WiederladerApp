import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, View, Button, StyleSheet, Text, CheckBox } from 'react-native';
import DBContext from '../../DataContext';

//Detailansicht der ausgewählten Laborierung
export default class LaborierungItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const laborierung = navigation.getParam('ausgewaehlteLaborierung');
    return {
      title: `${laborierung.bezeichnung} ${":"}`
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
        <Image style={styles.image} source={{ uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" }} />


        <View style={{ flexDirection: 'row' }}>
          <CheckBox
            value={laborierung.fertiggestellt}
            disabled={true}
            //onValueChange={() => {laborierung.fertiggestellt = checked; this.DatenInDBAktualisieren(laborierung.bezeichnung)}} //TODO: Fertiggstellt Updaten
          />
          <Text style={{marginTop: 5}}> Laborierung fertiggestellt</Text>
        </View>
    

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
            onPress={() =>{
                  this.LaborierungLoeschen(laborierung.bezeichnung);
                  this.props.navigation.navigate('LaborieungScreen')
            }}
          />
        </View>

        <View style= {{position: 'absolute', top:2, right:5}}> 
          <Button
            title= "Resultate eingeben     "
            onPress={() =>{

                alert("Damit wurde die Laborierung auf Status: 'Fertiggestellt' aktualisiert"); 
                //this.DatenInDBAktualisieren(laborierung.bezeichnung) //TODO: Fertiggstellt Updaten

                this.props.navigation.navigate('SchießstandItemScreen', {
                      ausgewaehlteLaborierung: laborierung
                })
              }
            }
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
