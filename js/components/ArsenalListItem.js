import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

//Listeneintrag Anzeige für ArsenalSubMenü-Listenanzeige
export default function(props) {
  const { ausgewaehltesArsenalItem, onPress } = props;

  switch (ausgewaehltesArsenalItem.datensatztyp) {
    case "Geschoss":
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source = { require('../../assets/GeschossIcon.png')}
            />
            <View style={styles.info}>
              <Text style={styles.text}>
                {ausgewaehltesArsenalItem.datensatztyp}{" "}
                {ausgewaehltesArsenalItem.bezeichnung}
              </Text>
              <Text style={styles.smallText}>
                Kaliber: {ausgewaehltesArsenalItem.kaliber} - Gewicht:{ausgewaehltesArsenalItem.gewicht}gr
              </Text>
              <Text style={styles.smallText}>
                BC: {ausgewaehltesArsenalItem.bc} - Preis:{ausgewaehltesArsenalItem.preis}€
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    case "Pulver":
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source = { require('../../assets/pulverIcon.png')}
            />
            <View style={styles.info}>
              <Text style={styles.text}>
                {ausgewaehltesArsenalItem.datensatztyp}{" "}
                {ausgewaehltesArsenalItem.bezeichnung}
              </Text>
              <Text style={styles.smallText}>
                Notizen: {ausgewaehltesArsenalItem.notizen}
              </Text>
              <Text style={styles.smallText}>
                Preis:{ausgewaehltesArsenalItem.preis}€/100g
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      );
    case "Huelse":
      return (
        <TouchableOpacity onPress={onPress}>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source = { require('../../assets/HuelseIcon.png')}
            />
            <View style={styles.info}>
              <Text style={styles.text}>
                {ausgewaehltesArsenalItem.datensatztyp}{" "}
                {ausgewaehltesArsenalItem.bezeichnung}
              </Text>
              <Text style={styles.smallText}>
                Kaliber: {ausgewaehltesArsenalItem.kaliber} - Länge:{ausgewaehltesArsenalItem.laenge}mm
              </Text>
              <Text style={styles.smallText}>
                BC: {ausgewaehltesArsenalItem.bc} - Preis:{ausgewaehltesArsenalItem.preis}€
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
    padding: 0
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
