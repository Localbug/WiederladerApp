import { SQLite } from "expo";

const database = SQLite.openDatabase("testdb2.db");

function loescheTabelle(tabellenname) {
  //console.log("DataContext - Funktion loescheTabelle: " + tabellenname);
  database.transaction(tx => {
    tx.executeSql("DROP TABLE " + tabellenname);
    console.log("loescheTabelle: " + tabellenname);
  });
}

function erzeugeTabellen() {
    //console.log('DataContext - Funktion erzeugeTabelle: TabellenStrukturen werden erstellt ');
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
          'create table if not exists laborierungen (id integer primary key not null, datensatztyp text, bezeichnung text, geschossID Integer, huelseID Integer, zuenderID Integer, pulverID Integer, beschichtungID Integer, oal real, notizen text, preis real, fertiggestellt integer, bild blob, streukreis real, trefferbild blob);'
        );
        console.log("Tabelle laborierungen erzeugt");
    });
} 

function testDatenInDBErzeugen() {
  geschossTestdaten = [
    {
      datensatztyp: "Geschoss",
      bezeichnung: "INIT_308WIN",
      kaliber: "308",
      gewicht: "168",
      bc: ".420",
      preis: "0,40",
      bild: "https://png.pngtree.com/svg/20161205/bullet_561433.png"
    },
    {
      datensatztyp: "Geschoss",
      bezeichnung: "INIT_223Rem",
      kaliber: "223",
      gewicht: "90",
      bc: ".400",
      preis: "0,25",
      bild: "https://png.pngtree.com/svg/20161205/bullet_561433.png"
    },
    {
      datensatztyp: "Geschoss",
      bezeichnung: "INIT_338WIN",
      kaliber: "338",
      gewicht: "250",
      bc: ".410",
      preis: "0,72",
      bild: { uri: "https://png.pngtree.com/svg/20161205/bullet_561433.png" }
    },
    {
      datensatztyp: "Geschoss",
      bezeichnung: "INIT_50BMG",
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
      bezeichnung: "INIT_Lapua Hülse Charge18",
      kaliber: "308",
      gewicht: "240",
      laenge: "50,95",
      preis: "0,92",
      bild: "https://png.pngtree.com/svg/20161205/huelsenbild.png"
    },
    {
      datensatztyp: "Huelse",
      bezeichnung: "INIT_Hornady Training",
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
      bezeichnung: "INIT_VV N140",
      notizen: "progressiv",
      preis: "8,70",
      bild: "https://png.pngtree.com/svg/20161205/PulverBild.png"
    },
    {
      datensatztyp: "Pulver",
      bezeichnung: "INIT_VV N340",
      notizen: "Pressladung",
      preis: "9,20",
      bild: { uri: "https://png.pngtree.com/svg/20161205/PulverBild.png" },
    }
  ];

  laborierungTestdaten = [
    {
      datensatztyp: "Laborierung",
      bezeichnung: "INIT_Match-Patronen",
      geschossID: 1,
      huelseID: 1,
      zuenderID: 1,
      pulverID: 1,
      beschichtungID: 1,
      oal: "73,1",
      notizen: "wird schnell heiss",
      preis: "1,22",
      fertiggestellt: true,
      bild: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png",
      streukreis: 15.0,
      trefferbild: ""
    },
    {
      datensatztyp: "Laborierung",
      bezeichnung: "INIT_Versuchslaborierung1",
      geschossID: 1,
      huelseID: 1,
      zuenderID: 1,
      pulverID: 1,
      beschichtungID: 1,
      oal: "73,1",
      notizen: "versuch mit pressladung",
      preis: "0,71",
      fertiggestellt: false,
      bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
      streukreis: "",
      trefferbild: ""
    },
    {
      datensatztyp: "Laborierung",
      bezeichnung: "INIT_Trainings Munition",
      geschossID: 1,
      huelseID: 1,
      zuenderID: 1,
      pulverID: 1,
      beschichtungID: 1,
      oal: "73,1",
      notizen: "günstige Komponenten",
      preis: "0,45",
      fertiggestellt: true,
      bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
      streukreis: 28.5,
      trefferbild: ""
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
  // console.log(
  //   "DataContext - Funktion speichere einzelnen Datensatz:" +
  //     JSON.stringify(datenObject)+ ' zu datensatztyp:'+datenObject.datensatztyp
  // );
    database.transaction(
        tx => {
            switch(datenObject.datensatztyp) {
                case 'Geschoss':
                    tx.executeSql('insert into geschosse (datensatztyp, bezeichnung, kaliber, gewicht, bc, preis, bild) values (?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.kaliber, datenObject.gewicht, datenObject.bc, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Geschoss DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.kaliber+' - '+datenObject.gewicht,+' - '+datenObject.bc+' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Huelse':
                    tx.executeSql('insert into huelsen (datensatztyp, bezeichnung, kaliber, laenge, gewicht, anzahlWiedergeladen, preis, bild) values (?, ?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.kaliber,  datenObject.laenge, datenObject.gewicht, datenObject.anzahlWiedergeladen, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Huelse DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.kaliber+' - '+datenObject.laenge+' - ' +datenObject.gewicht+ ' - ' +datenObject.anzahlWiedergeladen +' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Pulver':
                    tx.executeSql('insert into pulver (datensatztyp, bezeichnung, notizen, preis, bild) values (?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.notizen, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Pulver DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - ' +datenObject.notizen+' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Laborierung':
                    tx.executeSql('insert into laborierungen (datensatztyp, bezeichnung, geschossID, huelseID, zuenderID, pulverID, beschichtungID, oal, notizen, preis, fertiggestellt, bild, streukreis, trefferbild) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.geschossID, datenObject.huelseID, datenObject.zuenderID, datenObject.pulverID, datenObject.beschichtungID, datenObject.oal, datenObject.notizen, datenObject.preis, datenObject.fertiggestellt, datenObject.bild, datenObject.streukreis, datenObject.trefferbild] );
                    console.log('Erzeuge Laborierung DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.geschossID+' - '+datenObject.huelseID+' - '+datenObject.beschichtungID+' - '+datenObject.oal+' - '+datenObject.pulverID+' - '+datenObject.beschichtungID+' - '+datenObject.notizen+' - '+datenObject.preis+' - '+datenObject.fertiggestellt+' - '+datenObject.bild+' - '+datenObject.streukreis+' - '+datenObject.trefferbild);
                    break;
                default:
                    console.log("Fehler in DataContext - Funktion speichere! Kein Case zu Tabellenname: "+datenObject.datensatztyp +' gefunden');
                }
        },
        null
    );

}

function ladeDBdaten(tabellenname, callback) {

  if (tabellenname = "laborierungen"){
    console.log("Context.ladeDBdaten soll Laborierungen laden, deshalb wird es an Methode ladeLaborierungen weiter delegiert, denn Laborierungen müssen aus mehreren Tabellen zusammengebaut werden!");
    this.ladeLaborierungen(callback); //Callback wird weitergegeben
  }

  //console.log("Lade Tabellenname: "+tabellenname);
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

function ladeLaborierungen(callback){

  let laborierungsarray;
  console.log("ladeLaborierungen: Hier wird nun laborierung gesucht.. ");

  database.transaction(tx => {
    tx.executeSql("select * from laborierungen", [], (_, { rows }) => {
      console.log("DataContext - erstelleLaborierung läd Laborierungsgrundgerüst:"+JSON.stringify(rows._array));

      //Für jeden einzelnen LaborierungsDatensatz die Untertabellen laden und als Object einfügen
      for (var i = 0; i = rows._array.length; i++) {
        
        let laborierung = rows._array[i];
        let laborierungsGeschoss;

        geschoss1 = new Object();
        geschoss1.bezeichnung = "Sierra Match King 168er";
        geschoss1.kaliber = "308WIN";
        geschoss1.gewicht = "168";
  
        let labo =  
        {
          datensatztyp: "Laborierung",
          bezeichnung: "ErstellteLabo",
          geschoss: geschoss1,
          huelse: geschoss1,
          zuender: geschoss1,
          pulver: geschoss1,
          beschichtung: geschoss1,
          oal: "73,0",
          notizen: "Laborierung wurde generiert",
          preis: "0,75",
          fertiggestellt: true,
          bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
          streukreis: "",
          trefferbild: ""
        }

        console.log("zusammengebaute Labo in Array Pushen: "+JSON.stringify(labo));
        laborierungsarray.push(labo);

        // //Geschossdaten dazu laden:
        // database.transaction(tx => {
        //   tx.executeSql("select * from geschosse where id = 1", [], (_, { rows }) => { //TODO: id dynamisch machen, irgenwo muss die id ja her kommen..
        //     let geschoss = rows._array;
        //     console.log("DataContext - erstelleLaborierung läd aus geschosse Datendatz:"+JSON.stringify(geschoss));
        //     laborierungsGeschoss = geschoss;
        //   });
        // });

      }
  
    })
  })
  console.log("laborierungsarray: "+JSON.stringify(laborierungsarray));
  callback(laborierungsarray);
};



function ladeFertigeLaborierungen(callback) {
  //console.log("DATA-Context: Lade Fertige Laborierungen aus Datenbank");
  const tabellenname = "laborierungen"; //Frage: aus Tabelle laborierungen kann nichts geladen werden. Mit Tabelle geschosse funktioniert es allerdings!

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

function löscheZeile(tabellenname, bezeichnung) {
  // console.log(
  //   "DataContext - Funktion löscheZeile: Es wird in Tabelle: " +
  //     tabellenname +
  //     " der Datensatz mit Bezeichner: " +
  //     bezeichnung +
  //     " gelöscht!"
  // );
  database.transaction(tx => {
    tx.executeSql(
      "DELETE FROM " + tabellenname + " WHERE bezeichnung=" + bezeichnung,
      [],
      (_, { rows }) => {
        console.log(
          "Aus Tabelle: " + tabellenname + " wurde ID:" + bezeichnung + " gelöscht!"
        );
      }
    );
  }, null);
}

export default class DataContext {
  // myVariable = 123; //Instanzvariable
  // constructor() {
  //   this.variable = 5678; //Instanzvariable über Konstruktur - JS-Standard
  // }

  InitialisiereDatenbak() {
    loescheTabelle('geschosse');
    loescheTabelle('huelsen');
    loescheTabelle('pulver');
    loescheTabelle('laborierungen');
    erzeugeTabellen();
    testDatenInDBErzeugen();
  }

  loescheDatensatz(Tabellenname, Bezeichnung) {
    //TODO: gegen SQLInjection sichern
    //console.log("DataContext - löscheDatensatz: "+Bezeichnung+" aus Tabelle: "+Tabellenname);
    löscheZeile(Tabellenname, Bezeichnung);
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

  ladeFertigeLaborierungen(callback) {
    return ladeFertigeLaborierungen(callback);
  }

  ladeFertigeLaborierungen_Mock(callback) {
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
        fertiggestellt: true,
        bild: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png",
        streukreis: 16.0,
        trefferbild: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FWiederladerApp-66a899d5-30e8-4956-9f4e-6c5dd4d4ec20/Camera/8b45a213-2524-4de3-a245-ee4e1d3a00cc.jpg",
      
      },
      {
        datensatztyp: "Laborierung",
        bezeichnung: "Hornady MatchKing HPBT",
        geschoss: geschoss2,
        huelse: huelse,
        zuender: zuender,
        pulver: pulver,
        beschichtung: beschichtung,
        oal: "73,1",
        notizen: "versuch mit pressladung",
        preis: "0,71",
        fertiggestellt: true,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        streukreis: 19.5,
        trefferbild: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FWiederladerApp-66a899d5-30e8-4956-9f4e-6c5dd4d4ec20/Camera/f6146b00-b89a-4d98-a594-9706c0fb0b67.jpg"
      },
      {
        datensatztyp: "Laborierung",
        bezeichnung: "Surplus Training",
        geschoss: geschoss2,
        huelse: huelse,
        zuender: zuender,
        pulver: pulver,
        beschichtung: beschichtung,
        oal: "72,0",
        notizen: "günstiger Preis",
        preis: "0,45",
        fertiggestellt: true,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        streukreis: 20.5,
        trefferbild: "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FWiederladerApp-66a899d5-30e8-4956-9f4e-6c5dd4d4ec20/Camera/7d9142eb-4c50-42d8-a15a-529b69512aad.jpg"
      },
      {
        datensatztyp: "Laborierung",
        bezeichnung: "Hornady Fertigkeit",
        geschoss: geschoss2,
        huelse: huelse,
        zuender: zuender,
        pulver: pulver,
        beschichtung: beschichtung,
        oal: "72,0",
        notizen: "günstiger Preis",
        preis: "0,75",
        fertiggestellt: true,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        streukreis: "",
        trefferbild: ""
      },
      {
        datensatztyp: "Laborierung",
        bezeichnung: "Match 300m",
        geschoss: geschoss2,
        huelse: huelse,
        zuender: zuender,
        pulver: pulver,
        beschichtung: beschichtung,
        oal: "73,0",
        notizen: "stärker geladen",
        preis: "0,75",
        fertiggestellt: true,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        streukreis: "",
        trefferbild: ""
      }
    ];
    return callback(laborierungTestdaten);
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
        fertiggestellt: true,
        bild: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png",
        trefferbild: ""
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
        fertiggestellt: false,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        trefferbild: ""
      },
      {
        datensatztyp: "Laborierung",
        bezeichnung: "Trainings Munition",
        geschoss: geschoss2,
        huelse: huelse,
        zuender: zuender,
        pulver: pulver,
        beschichtung: beschichtung,
        oal: "72,0",
        notizen: "günstiger Preis",
        preis: "0,49",
        fertiggestellt: false,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        trefferbild: ""
      }
    ];
    return callback(laborierungTestdaten);
  }
}
