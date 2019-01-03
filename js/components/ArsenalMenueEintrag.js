import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function(props) {
  const { ausgewaehltesArsenalMenue, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          //source={{ uri: '../assets/PfeilIcon'  }}
           source={{ uri: ausgewaehltesArsenalMenue.picture }}
        />
        <View style={styles.info}>
          <Text style={styles.text}> {ausgewaehltesArsenalMenue.menueTitel} </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 5
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
