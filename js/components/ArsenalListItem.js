import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function(props) {
  const { ausgewaehltesArsenalItem, onPress } = props;

  console.log("!!!!!ArsenalListItem anzeige für DatensatzTyp: " +JSON.stringify(ausgewaehltesArsenalItem));

  switch (ausgewaehltesArsenalItem.datensatztyp) {
    case "Geschoss":
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              //Frage: Wie kann ich ein Bild aus assert über den State setzen? Require kann keine Variablen übernehmen. Pfad muss wohl static sein
              //source={{ uri: 'https://image.freepik.com/freie-ikonen/benutzerprofil-bearbeiten-taste_318-32453.jpg'}}
              source = { require('../../assets/GeschossIcon.png')}
            />
            <View style={styles.info}>
              <Text style={styles.text}>
                {ausgewaehltesArsenalItem.datensatztyp}{" "}
                {ausgewaehltesArsenalItem.bezeichnung}
              </Text>
              <Text style={styles.smallText}>
                Kaliber: {ausgewaehltesArsenalItem.kaliber} - Gewicht:{ausgewaehltesArsenalItem.gewicht}
              </Text>
              <Text style={styles.smallText}>
                BC: {ausgewaehltesArsenalItem.bc} - Preis:{ausgewaehltesArsenalItem.preis}
              </Text>
              <Text style={styles.smallText}>
                pic: {ausgewaehltesArsenalItem.bild}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    case "Hülse":
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              //Frage: Wie kann ich ein Bild aus assert über den State setzen? Require kann keine Variablen übernehmen. Pfad muss wohl static sein
              //source={{ uri: 'https://image.freepik.com/freie-ikonen/benutzerprofil-bearbeiten-taste_318-32453.jpg'}}
              source = { require('../../assets/HuelseIcon.png')}
            />
            <View style={styles.info}>
              <Text style={styles.text}>
                {ausgewaehltesArsenalItem.datensatztyp}{" "}
                {ausgewaehltesArsenalItem.bezeichnung}
              </Text>
              <Text style={styles.smallText}>
                Kaliber: {ausgewaehltesArsenalItem.kaliber} - Länge:{ausgewaehltesArsenalItem.laenge}
              </Text>
              <Text style={styles.smallText}>
                BC: {ausgewaehltesArsenalItem.bc} - Preis:{ausgewaehltesArsenalItem.preis}
              </Text>
              <Text style={styles.smallText}>
                pic: {ausgewaehltesArsenalItem.bild}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

      );
    default:
      return (<TouchableOpacity onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.info}>
            <Text style={styles.smallText}>
              {" "}
              Kein Aussehen in ArsenalListItem zu{" "}
              {ausgewaehltesArsenalItem.datensatztyp} gefunden!!!
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
