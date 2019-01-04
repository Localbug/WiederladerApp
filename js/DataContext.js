import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import Expo, { SQLite } from 'expo';

const database = SQLite.openDatabase('testdb.db');

function erzeugeTabellen() {
    console.log('DataContext - Funktion erzeugeTabelle: TabellenStruktur wird erstellt ');
    database.transaction(tx => {
        tx.executeSql(
          'create table if not exists geschosse (id integer primary key not null, bezeichnung int, kaliber text);'
        );
      });
    /*
    const sqlErzeugeGeschosseTabelle = "CREATE TABLE IF NOT EXIST testdaten (id INTEGER PRIMARY KEY NOT NULL, bezeichnung TEXT, kaliber TEXT);"

    database.transaction(transaction =>
        transaction.executeSql(sqlErzeugeGeschosseTabelle)   
    );

    const DBObject = Expo.FileSystem.getInfoAsync('SQLite/<testdaten>');
    console.log("Pfad:", DBObject.uri);
    */
}

function nop(){
    console("IN nop");
}

function testDatenInDBErzeugen(){
    console.log('DataContext - Funktion testDatenInDBErzeugen: testDaten werden in DB gespeichern ');
    const text = "blubblub";
    database.transaction(
        tx => {
          tx.executeSql('insert into geschosse (bezeichnung, kaliber) values (0, ?)', [text]);
          
          tx.executeSql('select * from geschosse', [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null,
        this.nop
      );
    /*
    database.transaction(transaction =>
        transaction.executeSql(
            'INSERT INTO testdaten (bezeichnung, kaliber) VALUES ("bla","blub")',
            [],
            (_, result) => {
                alert('testdaten gespeichert - Anzahl Reihen: , ' + result.rows);
            })   
    )*/

    /*
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
        */
}

export default class DataContext extends Component {


    InitialisiereDatenbak() {
        erzeugeTabellen();
        testDatenInDBErzeugen();
        alert('DB Initialisiert und Testdaten erstellt!');
    }

    /*
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
        var ergebnis;
        alert('Lade aus DB..');

        database.transaction(transaction =>
            transaction.executeSql(
                sqlGeschosseAuslesen, 
                [],
                (transaction, result) => {
                    ergebnis = result.rows._array
                    alert('geladen: , ' + result.rows);
                })   
        );
        return ergebnis;
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
    */
}