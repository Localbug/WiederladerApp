import React, { Component } from 'react';
import {Button, SectionList, StyleSheet, Text, View } from 'react-native';
import {erzeugeTabellen} from '../../../js/DataContext';
import DBContext from '../../../js/DataContext';

function SettingsItem(props) {
  return <Text style={styles.item}>{props.text}</Text>;
}

function SettingsHeader(props) {
  return <Text style={styles.section}>{props.text}</Text>;
}

function testfunc() {
  //alert("Test");
}


export default class ArsenalHinzufuegenScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              title: 'ArsenalHinzufuegenScreen',
              data: [{ key: '1', info: '1.0' }]
            },
            {
              title: 'blabala',
              data: [
                { key: '2', info: 'Beispiel GmbH' },
                { key: '3', info: 'copyright 2018' }
              ]
            }
          ]}
          renderItem={({ item }) => <SettingsItem text={item.info} />}
          renderSectionHeader={({ section }) => (
            <SettingsHeader text={section.title} />
          )}
        />

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
                db.initialTestDatenSpeichern();
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
  }
});
