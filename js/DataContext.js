import { SQLite } from "expo";

const database = SQLite.openDatabase("testdb2.db");

function loescheTabelle(tabellenname) {
  console.log("DataContext - Funktion loescheTabelle: " + tabellenname);
  database.transaction(tx => {
    tx.executeSql("DROP TABLE " + tabellenname);
  });
}

function erzeugeTabellen() {
    console.log('DataContext - Funktion erzeugeTabelle: TabellenStrukturen werden erstellt ');
    database.transaction(tx => {
        tx.executeSql(
            'create table if not exists geschosse (id integer primary key not null, datensatztyp text, bezeichnung text, kaliber text, gewicht text, bc blob, preis real, bild blob);'
        );
        console.log("Tabelle geschosse erzeugt");

        tx.executeSql(
            'create table if not exists huelsen (id integer primary key not null, datensatztyp text, bezeichnung text, kaliber text, gewicht text, laenge real, anzahlWiedergeladen integer, preis real, bild blob);'
        );
        console.log("Tabelle huelsen erzeugt");

        tx.executeSql(
            'create table if not exists pulver (id integer primary key not null, datensatztyp text, bezeichnung text, notizen text, preis real, bild blob);'
        );
        console.log("Tabelle pulver erzeugt");

        tx.executeSql(
          'create table if not exists laborierungen (id integer primary key not null, datensatztyp text, bezeichnung text, geschossID Integer, huelseID Integer, zuenderID Integer, pulverID Integer, beschichtungID Integer, oal real, notizen text, preis real, bild blob);'
      );
      console.log("Tabelle laborierung erzeugt");
    });

} 

function testDatenInDBErzeugen() {
  geschossTestdaten = [
    {
      datensatztyp: "Geschoss",
      bezeichnung: "308WIN",
      kaliber: "308",
      gewicht: "168",
      bc: ".420",
      preis: "0,40",
      bild: "https://png.pngtree.com/svg/20161205/bullet_561433.png"
    },
    {
      datensatztyp: "Geschoss",
      bezeichnung: "223Rem",
      kaliber: "223",
      gewicht: "90",
      bc: ".400",
      preis: "0,25",
      bild: "https://png.pngtree.com/svg/20161205/bullet_561433.png"
    },
    {
      datensatztyp: "Geschoss",
      bezeichnung: "338WIN",
      kaliber: "338",
      gewicht: "250",
      bc: ".410",
      preis: "0,72",
      bild: { uri: "https://png.pngtree.com/svg/20161205/bullet_561433.png" }
    },
    {
      datensatztyp: "Geschoss",
      bezeichnung: "50BMG",
      kaliber: "50",
      gewicht: "320",
      bc: ".390",
      preis: "1,65",
      bild: { uri: "https://png.pngtree.com/svg/20161205/bullet_561433.png" }
    }
  ];
  huelsenTestdaten = [
    {
      datensatztyp: "Huelse",
      bezeichnung: "Lapua Hülse Charge18",
      kaliber: "308",
      gewicht: "240",
      laenge: "50,95",
      preis: "0,92",
      bild: "https://png.pngtree.com/svg/20161205/huelsenbild.png"
    },
    {
      datensatztyp: "Huelse",
      bezeichnung: "Hornady Training",
      kaliber: "308",
      gewicht: "220",
      laenge: "50,5",
      preis: "0,00",
      bild: { uri: "https://png.pngtree.com/svg/20161205/huelsenBild.png" }
    }
  ];
  pulverTestdaten = [
    {
      datensatztyp: "Pulver",
      bezeichnung: "VV N140",
      notizen: "progressiv",
      preis: "8,70",
      bild: "https://png.pngtree.com/svg/20161205/PulverBild.png"
    },
    {
      datensatztyp: "Pulver",
      bezeichnung: "VV N340",
      notizen: "Pressladung",
      preis: "9,20",
      bild: { uri: "https://png.pngtree.com/svg/20161205/PulverBild.png" }
    }
  ];
  laborierungTestdaten = [
    {
      datensatztyp: "Laborierung",
      bezeichnung: "Match-Patronen",
      geschossID: 1,
      huelseID: 1,
      zuenderID: 1,
      pulverID: 1,
      beschichtungID: 1,
      oal: "73,1",
      notizen: "wird schnell heiss",
      preis: "1,22",
      bild: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png"
    },
    {
      datensatztyp: "Laborierung",
      bezeichnung: "Versuchslaborierung1",
      geschossID: 1,
      huelseID: 1,
      zuenderID: 1,
      pulverID: 1,
      beschichtungID: 1,
      oal: "73,1",
      notizen: "versuch mit pressladung",
      preis: "0,71",
      bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" }
    }
  ];

  for (var i = 0; i < geschossTestdaten.length; i++) {
    speichereDatensatz(geschossTestdaten[i]);
  }
  for (var i = 0; i < huelsenTestdaten.length; i++) {
    speichereDatensatz(huelsenTestdaten[i]);
  }
  for (var i = 0; i < pulverTestdaten.length; i++) {
    speichereDatensatz(pulverTestdaten[i]);
  }
  for (var i = 0; i < laborierungTestdaten.length; i++) {
    speichereDatensatz(laborierungTestdaten[i]);
  }

}

function speichereDatensatz(datenObject) {
  console.log(
    "DataContext - Funktion speichere einzelnen Datensatz:" +
      JSON.stringify(datenObject)+ ' zu Tabelle:'+datenObject.datensatztyp
  );

    database.transaction(
        tx => {
            switch(datenObject.datensatztyp) {
                case 'Geschoss':
                    tx.executeSql('insert into geschosse (datensatztyp, bezeichnung, kaliber, gewicht, bc, preis, bild) values (?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.kaliber, datenObject.gewicht, datenObject.bc, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Geschoss DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.kaliber+' - '+datenObject.gewicht,+' - '+datenObject.bc+' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Huelse':
                    tx.executeSql('insert into huelsen (datensatztyp, bezeichnung, kaliber, laenge, gewicht, anzahlWiedergeladen, preis, bild) values (?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.kaliber,  datenObject.laenge, datenObject.gewicht, datenObject.anzahlWiedergeladen, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Huelse DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.kaliber+' - ' +datenObject.gewicht+ ' - ' +datenObject.anzahlWiedergeladen +' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Pulver':
                    tx.executeSql('insert into pulver (datensatztyp, bezeichnung, notizen, preis, bild) values (?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.notizen, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Pulver DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - ' +datenObject.notizen+' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Laborierung':
                    tx.executeSql('insert into pulver (datensatztyp, bezeichnung, geschossID, huelseID, zuenderID, pulverID, beschichtungID, notizen, preis, bild) values (?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.geschossID, datenObject.huelseID, datenObject.zuenderID, datenObject.pulverID, datenObject.beschichtungID, datenObject.notizen, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Laborierung DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.geschossID+' - '+datenObject.huelseID+' - '+datenObject.beschichtungID+' - '+datenObject.pulverID+' - '+datenObject.beschichtungID+' - '+datenObject.notizen+' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                default:
                    console.log("Fehler in DataContext - Funktion speichere! Kein Case zu Tabellenname: "+datenObject.datensatztyp +' gefunden');
                }
        },
        null
    );

}

function ladeDBdaten(tabellenname, callback) {

  console.log("Lade Tabellenname: "+tabellenname);

  database.transaction(tx => {
    tx.executeSql("select * from " + tabellenname, [], (_, { rows }) => {
      console.log(
        "DataContext - ladeDBdaten aus Tabelle:" +
          tabellenname +
          " - Ergebnis: " +
          JSON.stringify(rows._array)
      );
      callback(rows._array);
    });
  });
}


function löscheZeile(tabellenname, id) {
  console.log(
    "DataContext - Funktion löscheZeile: Es wird in Tabelle:" +
      tabellenname +
      "die ID:" +
      id +
      " gelöscht!"
  );
  database.transaction(tx => {
    tx.executeSql(
      "DELETE FROM " + tabellenname + " WHERE id=" + id,
      [],
      (_, { rows }) => {
        console.log(
          "Aus Tabelle: " + tabellenname + " wurde ID:" + id + " gelöscht!"
        );
      }
    );
  }, null);
}

export default class DataContext {
  myVariable = 123; //Instanzvariable
  constructor() {
    this.variable = 5678; //Instanzvariable über Konstruktur - JS-Standard
  }

  InitialisiereDatenbak() {
    loescheTabelle('geschosse');
    loescheTabelle('huelsen');
    loescheTabelle('pulver');
    loescheTabelle('laborierungen');
    erzeugeTabellen();
    testDatenInDBErzeugen();
  }

  loescheDatensatz(Tabellenname, ID) {
    //TODO: gegen SQLInjection sichern
    löscheZeile(Tabellenname, ID);
  }

  loescheTabelle(Tabellenname) {
    //TODO: gegen SQLInjection sichern
    loescheTabelle(Tabellenname);
  }

  speichereDatensatz(datenObject) {
    //TODO: gegen SQLInjection sichern
    //console.log("DataContext: Speichere in Tabelle: "+tabellenname);
    speichereDatensatz(datenObject);
  }

  ladeDaten(Tabellenname, callback) {
    //TODO: gegen SQLInjection sichern
    return ladeDBdaten(Tabellenname, callback);
  }

  ladeMOCKLaborierungsDaten(callback) {

      geschoss1 = new Object();
      geschoss1.bezeichnung = "Sierra Match King 168er";
      geschoss1.kaliber = "308WIN";
      geschoss1.gewicht = "168";

      geschoss2 = new Object();
      geschoss2.bezeichnung = "Lapua Scenar L";
      geschoss2.kaliber = "308WIN";
      geschoss1.gewicht = "155";

      huelse = new Object();
      huelse.bezeichnung = "Lapua2019";
      huelse.laenge = "50,8";
      huelse.anzahlWiedergeladen = "3";

      pulver = new Object();
      pulver.bezeichnung = "VV N140";
      pulver.gewicht = "42";

      zuender = new Object();
      zuender.bezeichnung = "CCI BR2";

      beschichtung = new Object();
      beschichtung.bezeichnung = "Moly";
      beschichtung.dauer = "2";


      var laborierungTestdaten = [
      {
        datensatztyp: "Laborierung",
        bezeichnung: "Match-Patronen",
        //geschossID: {name: "Geschossname", kaliber: "308"},
        geschoss: geschoss1,
        huelse: huelse,
        zuender: zuender,
        pulver: pulver,
        beschichtung: beschichtung,
        oal: "73,1",
        notizen: "wird schnell heiss",
        preis: "1,22",
        bild: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png"
      },
      {
        datensatztyp: "Laborierung",
        bezeichnung: "Versuchslaborierung1",
        geschoss: geschoss2,
        huelse: huelse,
        zuender: zuender,
        pulver: pulver,
        beschichtung: beschichtung,
        oal: "73,1",
        notizen: "versuch mit pressladung",
        preis: "0,71",
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" }
      }
    ];
    return callback(laborierungTestdaten);
  }



}
