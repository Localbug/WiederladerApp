import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function(props) {
  const { ausgewaehlteLaborierung, onPress } = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: ausgewaehlteLaborierung.picture.thumbnail }}
        />
        <View style={styles.info}>
          <Text style={styles.text}>
            {ausgewaehlteLaborierung.name.first} {ausgewaehlteLaborierung.name.last}
          </Text>
          <Text style={styles.smallText}>{ausgewaehlteLaborierung.email}</Text>
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
    borderRadius: 40,
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
