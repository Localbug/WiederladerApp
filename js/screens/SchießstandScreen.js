import React, { Component } from 'react';
import { SectionList, Button,  StyleSheet, Text, View } from 'react-native';
import DBContext from '../../js/DataContext';


function SettingsItem(props) {
  return <Text style={styles.item}>{props.text}</Text>;
}

function SettingsHeader(props) {
  return <Text style={styles.section}>{props.text}</Text>;
}

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {
              title: 'Version',
              data: [{ key: '1', info: '0.2' }]
            },
            {
              title: 'Impressum',
              data: [
              { key: '2', Entwickler: 'Fabian Dorner' },
              { key: '3', AppName: 'WiederladerApp'} ]
            }
          ]}
          renderItem={({ item }) => <SettingsItem text={item.info} />}
          renderSectionHeader={({ section }) => (
            <SettingsHeader text={section.title} />
          )}
        />

          <View style= {{position: 'absolute', bottom:5, right:5}}>
            <Button
              title= "DB zurücksetzen"
              onPress={() =>
                {
                  db = new DBContext();
                  db.InitialisiereDatenbak();
                  alert("Datenbank zurückgesetzt und mit Testdaten initislisiert!")
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
