import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

//Laborierung Kurzansicht für ListenView
export default function(props) {
  const { ausgewaehlteLaborierung, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          //source={{ uri: ausgewaehlteLaborierung.picture.thumbnail }}
          source={{ uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" }}
        />
        <View style={styles.info}>
          <Text style={styles.text}>
            Variable1
          </Text>
          <Text style={styles.smallText}> Variable2 </Text>
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
    borderRadius: 60,
    marginRight: 10
  },
  info: {
    flexDirection: 'column',
    justifyContent: 'space-evenly'
  },
  text: {
    fontSize: 20
  },
  smallText: {
    fontSize: 16,
    fontWeight: '100'
  }
});
