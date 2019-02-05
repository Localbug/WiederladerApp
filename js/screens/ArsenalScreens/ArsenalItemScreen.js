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


  deUmlaut(value){
    value = value.toLowerCase();
    value = value.replace(/ä/g, 'ae');
    value = value.replace(/ö/g, 'oe');
    value = value.replace(/ü/g, 'ue');
    value = value.replace(/ß/g, 'ss');
    value = value.replace(/ /g, '-');
    value = value.replace(/\./g, '');
    value = value.replace(/,/g, '');
    value = value.replace(/\(/g, '');
    value = value.replace(/\)/g, '');
    return value;
  }
  
  ItemLoeschen(bezeichnung){
    const ausgewaehltesArsenalMenue = this.props.navigation.getParam('ausgewaehltesArsenalMenue');
    db = new DBContext();
    db.loescheDatensatz(this.deUmlaut(ausgewaehltesArsenalMenue.menueTitel), bezeichnung);
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
