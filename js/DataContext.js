import React, { Component } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import Expo, { SQLite } from 'expo';

const database = SQLite.openDatabase('testdb.db');


function loescheTabelle(tabellenname) {
    console.log('DataContext - Funktion loescheTabelle: '+tabellenname);
    database.transaction(tx => {
        tx.executeSql(
          'DROP TABLE '+ tabellenname
        );
      });
}

function erzeugeTabellen() {
    console.log('DataContext - Funktion erzeugeTabelle: TabellenStruktur wird erstellt ');
    database.transaction(tx => {
        tx.executeSql(
          'create table if not exists geschosse (id integer primary key not null, bezeichnung int, kaliber text);'
        );
      });
}

function nop(){
    console("IN nop");
}

function testDatenInDBErzeugen(){
    
    testdaten = [
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
    
    
    console.log('DataContext - Funktion testDatenInDBErzeugen: TestDaten werden in DB gespeichern ');
    //console.log('DataContext - Testdatensatz1: ' +testdaten[0].bezeichnung +'&'+testdaten[0].kaliber);
    database.transaction(
        tx => {
            for(var i=0;i<testdaten.length;i++){
                tx.executeSql('insert into geschosse (bezeichnung, kaliber) values (?, ?)', [testdaten[i].bezeichnung, testdaten[i].kaliber] );
                console.log('Erstellter Testdatensatz'+i+" - "+testdaten[i].bezeichnung +'&'+testdaten[i].kaliber);
            }
          //tx.executeSql('insert into geschosse (bezeichnung, kaliber) values (0, ?)', [testdaten[0].bezeichnung, testdaten[0].kaliber] );
          
          //tx.executeSql('select * from geschosse', [], (_, { rows }) =>
          //  console.log(JSON.stringify(rows))
          //);
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



function speichereDatensatz(tabellenname, datenObject){
    console.log('DataContext - Funktion speichereDatensatz: Daten aus Datenobject werden gespeichert ');
    const bezeichnung = datenObject.bezeichnung;
    const kaliber = datenObject.kaliber;
    console.log('Zu speichernde Daten:'+ datenObject.bezeichnung +'&' +datenObject.kaliber);
    database.transaction(
        tx => {
          tx.executeSql('insert into geschosse (bezeichner, kaliber) values ("Bla", "Blub")', []);  
          //tx.executeSql('insert into ? (bezeichner, kaliber) values (?, ?)', [tabellenname, datenObject.bezeichnung, datenObject.kaliber]);
          console.log("!!!!!!!!!!!!!!!!!!!!!");
          //tx.executeSql('select * from geschosse', [], (_, { rows }) =>
          //  console.log(JSON.stringify(rows))
          //);
        },
        null,
        this.nop
      );
}

function ladeDBdaten(tabellenname){
    console.log('DataContext - Funktion ladeDBdaten: ladeDBdaten werden aus DB geladen ');
    var ergebnis;
    database.transaction(
        tx => {
          tx.executeSql('select * from '+tabellenname, [], (_, { rows }) =>{
                console.log(JSON.stringify(rows))
                ergebnis = JSON.stringify(rows)
            }
          );
        },
        null,
        this.nop
      );
    return ergebnis;
}


function löscheZeile(tabellenname, id){
    console.log('DataContext - Funktion löscheZeile: Es wird in Tabelle:'+tabellenname+"die ID:"+id+" gelöscht!");
    database.transaction(
        tx => {
          tx.executeSql("DELETE FROM "+tabellenname+" WHERE id="+id, [], (_, { rows }) =>{
            console.log("Aus Tabelle: "+tabellenname+" wurde ID:"+id+" gelöscht!")}
          );
        },
        null,
        this.nop
      );
}


export default class DataContext extends Component {

    InitialisiereDatenbak() {
        erzeugeTabellen();
        testDatenInDBErzeugen();
        //alert('DB Initialisiert und Testdaten erstellt!');
    }

    loescheDatensatz(Tabellenname, ID){
        //TODO: gegen SQLInjection sichern
       löscheZeile(Tabellenname, ID);
    }

    loescheTabelle(Tabellenname){
        //TODO: gegen SQLInjection sichern
        loescheTabelle(Tabellenname);
    }

    speichereDatensatz(tabellenname, datenObject){
        //TODO: gegen SQLInjection sichern
        speichereDatensatz(tabellenname, datenObject);
    }

    ladeDaten(Tabellenname){
        //TODO: gegen SQLInjection sichern
        return ladeDBdaten(Tabellenname);
    }
   
}