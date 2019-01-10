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
        'create table if not exists geschosse (id integer primary key not null, datensatztyp text, bezeichnung text, kaliber text, gewicht text, bc blob, preis real, bild blob);'
        );
    });
}

function nop(){
    console("IN nop");
}

function testDatenInDBErzeugen(){
    
    testdaten = [
        { datensatz: 'Geschoss', 
        bezeichnung: '308WIN', 
        kaliber: '308', 
        gewicht: '168', 
        bc: '.420' ,
        preis: '0,40',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '223Rem', 
        kaliber: '223', 
        gewicht: '90', 
        bc: '.400' ,
        preis: '0,25',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '338WIN', 
        kaliber: '338', 
        gewicht: '250', 
        bc: '.410' ,
        preis: '0,72',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
        { datensatz: 'Geschoss', 
        bezeichnung: '50BMG', 
        kaliber: '50', 
        gewicht: '320', 
        bc: '.390' ,
        preis: '1,65',
        picture: {uri: 'https://png.pngtree.com/svg/20161205/bullet_561433.png'}},
    ];
    
    
    console.log('DataContext - Funktion testDatenInDBErzeugen: TestDaten werden in DB gespeichern ');

    database.transaction(
        tx => {
            for(var i=0;i<testdaten.length;i++){
                tx.executeSql('insert into geschosse (datensatztyp, bezeichnung, kaliber, gewicht, bc, preis, bild) values (?, ?, ?, ?, ?, ?, ?)', 
                [testdaten[i].datensatztyp, testdaten[i].bezeichnung, testdaten[i].kaliber, testdaten[i].gewicht, testdaten[i].bc, testdaten[i].preis, testdaten[i].bild] );
                console.log('Erstellter Testdatensatz'+i+" - "+testdaten[i].datensatztyp+'&'+testdaten[i].bezeichnung +'&'+testdaten[i].kaliber+'&'+testdaten[i].gewicht +'&'+testdaten[i].bc+'&'+testdaten[i].preis +'&'+testdaten[i].bild);
            }
        //tx.executeSql('select * from geschosse', [], (_, { rows }) =>
        //  console.log(JSON.stringify(rows))
        //);
        },
        null,
        this.nop
    );

}



function speichereDatensatz(tabellenname, datenObject){
    console.log('DataContext - Funktion speichereDatensatz: Daten aus Datenobject werden gespeichert ');

    //TODO: Je nach Tabellenname muss unterschiedlicher Insert ausgeführt werden!
    database.transaction(
        tx => {
            tx.executeSql('insert into geschosse (datensatztyp, bezeichnung, kaliber, gewicht, bc, preis, bild) values (?, ?, ?, ?, ?, ?, ?)', 
            [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.kaliber, datenObject.gewicht, datenObject.bc, datenObject.preis, datenObject.bild] );
            console.log('Erstellter Testdatensatz - '+datenObject.datensatztyp +'&'+datenObject.bezeichnung+'&'+datenObject.kaliber+'&'+datenObject.gewicht,+'&'+datenObject.bc+'&'+datenObject.preis+'&'+datenObject.bild);
        },
        null,
        this.nop
    );
}

function ladeDBdaten(tabellenname){
    var ergebnis1;
    var ergebnis2 = database.transaction(
        tx => {
        tx.executeSql('select * from '+tabellenname, [], (_, { rows }) =>{
                ergebnis1 = rows._array;
                //Frage: Wie kann hier der State der ArsenalItemScreen Komponente gesetzt werden //ArsenalScreenKomponent.setState(data: rows._array);
                console.log("Hier ist das Object vorhanden!? "+JSON.stringify(ergebnis1));
            }
        );
        },
        null,
        this.nop
    );
    //Frage: Warum sind die ergebnisse undefined. Wie bekomm ich das Ergenis aus der Pfeilfunktion oben heraus?
    console.log("Hier ist das Object undefined!? "+JSON.stringify(ergebnis1));
    console.log("Hier ist das Object undefined!? "+JSON.stringify(ergebnis2));
    return ergebnis1;
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

    //var variablenname //Frage: Warum kann man in Klassen keine Variablen anlegen?

    InitialisiereDatenbak() {
        erzeugeTabellen();
        testDatenInDBErzeugen();
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