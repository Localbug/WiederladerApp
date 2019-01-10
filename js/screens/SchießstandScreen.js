import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';

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
