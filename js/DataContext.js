import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { SQLite } from 'expo';

const database = SQLite.openDatabase('WiederladerDB.db');


export default class DataContext extends Component {

    
    initialTestDatenSpeichern() {
        const sqlGeschossDatensatzSpeichern ="INSERT INTO Geschosse (bezeichnung, kaliber) VALUES (?,?)"

        database.transaction(transaction =>
            transaction.executeSql(
                sqlGeschossDatensatzSpeichern, 
                ["TestGeschossGewehrName", "223WIN"],
                (transaction, result) => Console.log("Zeile/ID: ",result.insertId," in DB angelegt"))   
        );
        database.transaction(transaction =>
            transaction.executeSql(
                sqlGeschossDatensatzSpeichern, 
                ["TestGeschossPistoleName", "375MAG"],
                (transaction, result) => Console.log("Zeile/ID: ",result.insertId," in DB angelegt"))   
        );
        
        //alert('Es wurde, ' + G_data[0].bezeichnung + 'gespeichert');

    }

    speichereDaten(G_data) {
        const sqlGeschossDatensatzSpeichern ="INSERT INTO Geschosse (bezeichnung, kaliber) VALUES (?,?)"

        database.transaction(transaction =>
            transaction.executeSql(
                sqlGeschossDatensatzSpeichern, 
                [G_data.bezeichnung, G_data.kaliber],
                (transaction, result) => Console.log(result.insertId))   
        );
        alert('Es wurde, ' + G_data.bezeichnung + 'gespeichert');

    }

    ladeDaten() {
        const sqlGeschosseAuslesen = "SELECT * FROM Geschosse);"

        database.transaction(transaction =>
            transaction.executeSql(
                sqlGeschosseAuslesen, 
                [],
                (transaction, result) => {ergebnis = result.rows._array})   
        );
    }


    löscheZeile(id) {
        const sqlGeschosseZeileLöschen = "DELETE FROM Geschosse WHERE id=?"

        database.transaction(transaction =>
            transaction.executeSql(
                sqlGeschosseZeileLöschen, 
                [id])   
        );
    }


    erzeugeTabellen() {
        alert("in erzeugen");
        
        const sqlErzeugeGeschosseTabelle = "CREATE TABLE IF NOT EXIST Geschosse (id INTEGER PRIMARY KEY NOT NULL, bezeichnung TEXT, kaliber TEXT);"

        database.transaction(transaction =>
            transaction.executeSql(sqlErzeugeGeschosseTabelle)   
        );
    }


        
     daten = [
        { datensatz: 'Geschoss', 
        bezeichnung: '108WIN', 
        kaliber: '108', 
        gewicht: '168', 
        bc: '.420' ,
        preis: '0,28',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '208WIN', 
        kaliber: '208', 
        gewicht: '155', 
        bc: '.400' ,
        preis: '0,30',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '308WIN', 
        kaliber: '308', 
        gewicht: '178', 
        bc: '.410' ,
        preis: '0,32',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '408WIN', 
        kaliber: '408', 
        gewicht: '170', 
        bc: '.430' ,
        preis: '0,45',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
    ];

}