import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function(props) {
  const { ausgewaehltesArsenalItem, onPress } = props;

  switch (ausgewaehltesArsenalItem.datensatz) {
    case "Geschoss":
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={ ausgewaehltesArsenalItem.picture}
              //source={{ uri:  ausgewaehltesArsenalItem.picture }}
            />
            <View style={styles.info}>
              <Text style={styles.text}>
                {ausgewaehltesArsenalItem.datensatz}{" "}
                {ausgewaehltesArsenalItem.bezeichnung}
              </Text>
              <Text style={styles.smallText}>
                Kaliber: {ausgewaehltesArsenalItem.kaliber} - Gewicht:{ausgewaehltesArsenalItem.gewicht}
              </Text>
              <Text style={styles.smallText}>
                BC: {ausgewaehltesArsenalItem.bc} - Preis:{ausgewaehltesArsenalItem.preis}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
      break;
    case "Hülse":
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <View style={styles.info}>
              <Text style={styles.text}>
                {ausgewaehltesArsenalItem.bezeichnung}{" "}
                {ausgewaehltesArsenalItem.kaliber}
              </Text>
              <Text style={styles.smallText}>
                {ausgewaehltesArsenalItem.datensatz}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
      break;
    default:
      return (<TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.info}>
            <Text style={styles.smallText}>
              {" "}
              Kein Aussehen in ArsenalListItem zu{" "}
              {ausgewaehltesArsenalItem.datensatz} gefunden!!!
            </Text>
          </View>
        </View>
      </TouchableOpacity>);
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 5,
    marginRight: 3,
  },
  info: {
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  text: {
    fontSize: 20
  },
  smallText: {
    fontSize: 16,
    fontWeight: "100"
  }
});
