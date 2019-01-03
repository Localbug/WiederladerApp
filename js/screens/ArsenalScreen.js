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
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
          {
            title: 'Munition:',
            data: [
              { key: '1', menueTitel: 'Geschosse', picture: '../../assets/PfeilIcon' },
              { key: '2', menueTitel: 'Hülsen', picture: '../../assets/PfeilIcon' },
              { key: '3', menueTitel: 'Pulver', picture: '../../assets/PfeilIcon' },
              { key: '4', menueTitel: 'Zünder', picture: '../../assets/PfeilIcon' }]
          },
          {
            title: 'Waffen:',
            data: [{ key: '5', menueTitel: 'Waffen ', picture: '../assets/PfeilIcon.PNG' },
                  { key: '6', menueTitel: 'Auflage ', picture: '../../assets/PfeilIcon.PNG' }]
          },
          {
            title: 'Zubehör & Sonstiges:',
            data: [
              { key: '7', menueTitel: 'Schießstand', picture: '../../assets/PfeilIcon' },
              { key: '8', menueTitel: 'Beschichtungen', picture: '../../assets/PfeilIcon'  },
              { key: '9', menueTitel: 'ReinigungsMedia', picture: '../../assets/PfeilIcon'  },
              { key: '10', menueTitel: 'Matritzen', picture: '../../assets/PfeilIcon'  }]
          }
        ]}
        renderItem={({ item }) => (
          <ArsenalMenueEintrag
            ausgewaehltesArsenalMenue={item}
            onPress={() =>
              this.props.navigation.navigate('ArsenalSubMenueScreen', { //Über Property menuScreen statt direkt über 'Screenname'
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

