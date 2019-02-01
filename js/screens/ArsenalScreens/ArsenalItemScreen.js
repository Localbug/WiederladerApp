import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, View, TouchableOpacity, StyleSheet, Text, Button } from 'react-native';
import DBContext from '../../DataContext';

//Detailansicht der ausgewählten ArsenalKomponente
export default class ArsenalItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const laborierung = navigation.getParam('ausgewaehltesArsenalItem');
    return {
      title: `${laborierung.bezeichnung} ${":"}`
    };
  };


  ItemLoeschen(laborierungsbezeichnung){
    db = new DBContext();
    db.loescheDatensatz("laborierungen", bezeichnung);
  }

  DatenInDBAktualisieren(tabelle, datenObjekt) {
    db = new DBContext();
    db.aktualisiereDatensatz(tabelle, datenObjekt);
  }

  

  render() {
    const ausgewaehltesArsenalItem = this.props.navigation.getParam('ausgewaehltesArsenalItem');

    switch (ausgewaehltesArsenalItem.datensatztyp) {
      case "Geschoss":
        return (
            <View style={styles.container}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Image
                  style={styles.image}
                  source = { require('../../../assets/GeschossIcon.png')}
                />

                <View style= {{position: 'absolute', top:5, right:5}}>
                  <Button
                    title= "bearbeiten"
                    onPress={() =>
                          this.props.navigation.navigate('ArsenalBearbeitenScreen', {
                            ausgewaehltesArsenalItem: ausgewaehltesArsenalItem,
                          })}
                  />
                </View>
              
                <View style= {{position: 'absolute', top:45, right:5}}>
                  <Button
                    title= " löschen     "
                    onPress={() => {
                      db = new DBContext();
                      db.loescheDatensatz("geschosse", ausgewaehltesArsenalItem.bezeichnung);
                      alert("Geschoss-Datensatz wurde gelöscht");
                      this.props.navigation.goBack(); //Ein Screen zurück springen 
                    }}
                  />
                </View>
              </View>

              <View style={styles.info}>
                <Text style={styles.text}>
                  {/* {ausgewaehltesArsenalItem.datensatztyp}{" "} */}
                  Bezeichnung:{ausgewaehltesArsenalItem.bezeichnung}
                </Text>
                <Text style={styles.smallText}>
                  Kaliber: {ausgewaehltesArsenalItem.kaliber}
                </Text>
                <Text style={styles.smallText}>
                  Gewicht: {ausgewaehltesArsenalItem.gewicht}gr
                </Text>
                <Text style={styles.smallText}>
                  BC: {ausgewaehltesArsenalItem.bc}
                </Text>
                <Text style={styles.smallText}>
                  Preis: {ausgewaehltesArsenalItem.preis}€
                </Text>
              </View>
            </View>
        );
      case "Pulver":
        return (
          <View style={styles.container}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Image
                style={styles.image}
                source = { require('../../../assets/pulverIcon.png')}
              />

              <View style= {{position: 'absolute', top:5, right:5}}>
                <Button
                  title= "bearbeiten"
                  onPress={() =>
                        this.props.navigation.navigate('ArsenalBearbeitenScreen', {
                          ausgewaehltesArsenalItem: ausgewaehltesArsenalItem,
                        })}
                />
              </View>
            
              <View style= {{position: 'absolute', top:45, right:5}}>
                <Button
                  title= " löschen     "
                  onPress={() => {
                    db = new DBContext();
                    db.loescheDatensatz("pulver", ausgewaehltesArsenalItem.bezeichnung);
                    alert("Pulver-Datensatz wurde gelöscht");
                    this.props.navigation.goBack(); //Ein Screen zurück springen 
                  }}
                />
              </View>
            </View>

            <View style={styles.info}>
              <Text style={styles.text}>
                {/* {ausgewaehltesArsenalItem.datensatztyp}{" "} */}
                Bezeichnung:{ausgewaehltesArsenalItem.bezeichnung}
              </Text>
              <Text style={styles.smallText}>
                Preis: {ausgewaehltesArsenalItem.preis}€
              </Text>
              <Text style={styles.smallText}>
                Notiz: {ausgewaehltesArsenalItem.notiz}
              </Text>
            </View>
          </View>
        );
      case "Huelse":
        return (
          <View style={styles.container}>
            <View style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
              <Image
                style={styles.image}
                source = { require('../../../assets/HuelseIcon.png')}
              />

              <View style= {{position: 'absolute', top:5, right:5}}>
                <Button
                  title= "bearbeiten"
                  onPress={() =>
                        this.props.navigation.navigate('ArsenalBearbeitenScreen', {
                          ausgewaehltesArsenalItem: ausgewaehltesArsenalItem,
                        })}
                />
              </View>
            
              <View style= {{position: 'absolute', top:45, right:5}}>
                <Button
                  title= " löschen     "
                  onPress={() => {
                    db = new DBContext();
                    db.loescheDatensatz("huelsen", ausgewaehltesArsenalItem.bezeichnung);
                    alert("Hülsen-Datensatz wurde gelöscht");
                    this.props.navigation.goBack(); //Ein Screen zurück springen 
                  }}
                />
              </View>
            </View>

            <View style={styles.info}>
              <Text style={styles.text}>
                {/* {ausgewaehltesArsenalItem.datensatztyp}{" "} */}
                Bezeichnung:{ausgewaehltesArsenalItem.bezeichnung}
              </Text>
              <Text style={styles.smallText}>
                Kaliber: {ausgewaehltesArsenalItem.kaliber}
              </Text>
              <Text style={styles.smallText}>
                Gewicht: {ausgewaehltesArsenalItem.gewicht}gr
              </Text>
              <Text style={styles.smallText}>
                Länge: {ausgewaehltesArsenalItem.laenge}mm
              </Text>
              <Text style={styles.smallText}>
                Preis: {ausgewaehltesArsenalItem.preis}€
              </Text>
            </View>
          </View>
        );
      default:
        return (
          <View style={styles.container}>
            <View style={styles.info}>
              <Text style={styles.smallText}>
                {" "}
                Kein Aussehen in ArsenalItemScreen zu{" "}
                {ausgewaehltesArsenalItem.datensatztyp} gefunden!!!
              </Text>
            </View>
          </View>);
    }
  }




    // return (
    //   <ScrollView
    //     style={styles.scrollview}
    //     contentContainerStyle={styles.container}
    //   >
    //     <Image style={styles.image} source={{ uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" }} />


    //     <View style={{ flexDirection: 'row' }}>
    //       <CheckBox
    //         value={laborierung.fertiggestellt}
    //         disabled={true}
    //         //onValueChange={() => this.setState({ checked: !this.state.checked })}
    //         //onValueChange={() => {laborierung.fertiggestellt = checked; this.DatenInDBAktualisieren(laborierung.bezeichnung)}} //TODO: Fertiggstellt Updaten
    //       />
    //       <Text style={{marginTop: 5}}> Laborierung fertiggestellt</Text>
    //     </View>
    

    //     <Text>Laborierung: {laborierung.bezeichnung}</Text>
    //     <Text>Kalieber: {laborierung.geschoss.kaliber}</Text>

    //     <Text>Geschoss:{laborierung.geschoss.bezeichnung}</Text>
    //     <Text>Geschossgewicht:{laborierung.geschoss.gewicht}gr</Text>
    //     <Text>Geschossbeschichtung:{laborierung.beschichtung.bezeichnung} - Dauer:{laborierung.beschichtung.dauer}h</Text>
    //     <Text>OAL:{laborierung.oal}</Text>

    //     <Text>Pulver:{laborierung.pulver.bezeichnung} - {laborierung.pulver.gewicht}</Text>

    //     <Text>Hülse:{laborierung.huelse.bezeichnung}</Text>
    //     <Text>Hülsenlänge:{laborierung.huelse.laenge}mm</Text>
    //     <Text>Hülsen bereits :{laborierung.huelse.anzahlWiedergeladen} mal wiedergeladen</Text>

    //     <Text>Zünder:{laborierung.zuender.bezeichnung}</Text>

    //     <Text>Notizen:{laborierung.notizen}</Text>
    //     <View
    //       style={{
    //         borderBottomColor: 'black',
    //         borderBottomWidth: 1,
    //       }}
    //     />
    //     <Text style= {{fontStyle: 'italic'}}>Tipp: Wähle die Laborierung im Schießstand-Tab, um einen Streukreis ermitteln zu können und ein Trefferbild aufzunehmen</Text>

    //      <View style= {{position: 'absolute', top:42, right:5}}>
    //       <Button
    //         title= "Laborierung löschen"
    //         onPress={() =>{
    //               this.LaborierungLoeschen(laborierung.bezeichnung);
    //               this.props.navigation.navigate('LaborieungScreen')
    //         }}
    //       />
    //     </View>

    //     <View style= {{position: 'absolute', top:2, right:5}}> 
    //       <Button
    //         title= "Resultate eingeben     "
    //         onPress={() =>{

    //             alert("Damit wurde die Laborierung auf Status: 'Fertiggestellt' aktualisiert"); 
    //             //this.DatenInDBAktualisieren(laborierung.bezeichnung) //TODO: Fertiggstellt Updaten

    //             this.props.navigation.navigate('SchießstandItemScreen', {
    //                   ausgewaehlteLaborierung: laborierung
    //             })
    //           }
    //         }
    //       />
    //     </View>
    //   </ScrollView>
    // );
  
}

const width = Dimensions.get('window').width * 0.3;

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
    flexDirection: 'column',
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
