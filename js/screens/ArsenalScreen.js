//Screen, in dem sich die SectionList mit den verschiedenen Menüeinträgen befindet
import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import ArsenalMenueEintrag from '../components/ArsenalMenueEintrag';


function SettingsItem(props) {
  return <Text style={styles.item}>{props.text}</Text>;
}

function SettingsHeader(props) {
  return <Text style={styles.section}>{props.text}</Text>;
}

export default class ArsenalScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'WiederladerAPP'
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
          {
            title: 'Munition:',
            data: [
              { key: '1', menueTitel: 'Geschosse', bild: '../../assets/TODO_BildÜbergeben' },
              { key: '2', menueTitel: 'Hülsen', bild: '../../assets/TODO_BildÜbergeben' },
              { key: '3', menueTitel: 'Pulver', bild: '../../assets/TODO_BildÜbergeben' },
              { key: '4', menueTitel: 'Zünder', bild: '../../assets/TODO_BildÜbergeben' }]
          },
          {
            title: 'Waffen:',
            data: [{ key: '5', menueTitel: 'Waffen ', bild: '../../assets/TODO_BildÜbergeben' },
                  { key: '6', menueTitel: 'Auflagen ', bild: '../../assets/TODO_BildÜbergeben'}]
          },
          {
            title: 'Zubehör & Sonstiges:',
            data: [
              { key: '7', menueTitel: 'Schießstände', bild: '../../assets/TODO_BildÜbergeben'},
              { key: '8', menueTitel: 'Beschichtungen', bild: '../../assets/TODO_BildÜbergeben' },
              { key: '9', menueTitel: 'ReinigungsMedia', bild: '../../assets/TODO_BildÜbergeben'  },
              { key: '10', menueTitel: 'Matritzen', bild: '../../assets/TODO_BildÜbergeben' }]
          }
          ]}
          renderItem={({ item }) => (
            <ArsenalMenueEintrag
              ausgewaehltesArsenalMenue={item}
              onPress={() =>
                this.props.navigation.navigate('ArsenalSubMenueScreen', { 
                  ausgewaehltesArsenalMenue: item 
                })
              }
            />
          )}
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

