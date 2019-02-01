import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, CheckBox } from 'react-native';

//Laborierung Kurzansicht für ListenView
export default function(props) {
  const { ausgewaehlteLaborierung, onPress } = props;
  //console.log("LaborierenListe läd Datensatz: "+JSON.stringify(ausgewaehlteLaborierung));
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" }}
        />
        <View style={styles.info}>
          <Text style={styles.text}>
            {ausgewaehlteLaborierung.bezeichnung}
          </Text>
          <Text style={styles.smallText}> {ausgewaehlteLaborierung.geschoss.bezeichnung} </Text>
          <Text style={styles.smallText}> Streukreis:{ausgewaehlteLaborierung.streukreis} </Text> 
          <View style={{flexDirection:'row'}}>
            <Text style={styles.smallText}> Fertiggestellt:</Text> 
            <CheckBox title='Fertiggestellt' value={ausgewaehlteLaborierung.fertiggestellt} disabled={true}/>
          </View>
          <Text style={styles.smallText}> Anzahl:{ausgewaehlteLaborierung.anzahl} </Text> 
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginRight: 10
  },
  info: {
    flexDirection: 'column',
    //justifyContent: 'space-evenly'
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 20
  },
  smallText: {
    fontSize: 16,
    fontWeight: '100'
  }
});
