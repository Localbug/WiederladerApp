import { SQLite } from "expo";
//import { join } from "path";

const database = SQLite.openDatabase("testdb2.db");

function loescheTabelle(tabellenname) {
  //console.log("DataContext - Funktion loescheTabelle: " + tabellenname);
  database.transaction(tx => {
    tx.executeSql("DROP TABLE " + tabellenname);
    console.log("loescheTabelle: " + tabellenname);
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
  //TODO: gegen SQL Injection absichern
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
          'create table if not exists laborierungen (id integer primary key not null, datensatztyp text, bezeichnung text, geschossID Integer, huelseID Integer, zuenderID Integer, pulverID Integer, beschichtungID Integer, oal real, notizen text, preis real, fertiggestellt integer, anzahl integer, bild blob, streukreis real, trefferbild blob);'
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
      anzahl: 20,
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
      anzahl: 10,
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
      anzahl: 50,
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

function gibtEsEintragBereitsInDB(tabellenname, bezeichnung){
  console.log(
    "DataContext.gibtEsEintragBereitsInDB: Prüfe in Tabelle: "+
      tabellenname +" bereits Bezeichnung: " +bezeichnung);

  database.transaction(tx => {
    //tx.executeSql("select * from "+tabellenname +" Where kaliber = "+bezeichnung, [], (_, { rows }) => {
    tx.executeSql("select * from "+tabellenname+" Where bezeichnung = '"+bezeichnung+"'", [], (_, { rows }) => {
      console.log(
        "DataContext.gibtEsEintragBereitsInDB: Es gibt in Tabelle: "+
          tabellenname +" bereits Bezeichnung: " +bezeichnung
      );
      return true;
    });
  });
  return false;
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
                    if(gibtEsEintragBereitsInDB("geschosse", datenObject.bezeichnung)){
                      alert("Bezeichner bereits in Datenbank! Bitte anderen wählen!");
                      return;
                    }
                    tx.executeSql('insert into geschosse (datensatztyp, bezeichnung, kaliber, gewicht, bc, preis, bild) values (?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.kaliber, datenObject.gewicht, datenObject.bc, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Geschoss DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.kaliber+' - '+datenObject.gewicht,+' - '+datenObject.bc+' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Huelse':
                    if(gibtEsEintragBereitsInDB("huelsen", datenObject.bezeichnung)){
                      alert("Bezeichner bereits in Datenbank! Bitte anderen wählen!");
                      return;
                    }
                    tx.executeSql('insert into huelsen (datensatztyp, bezeichnung, kaliber, laenge, gewicht, anzahlWiedergeladen, preis, bild) values (?, ?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.kaliber,  datenObject.laenge, datenObject.gewicht, datenObject.anzahlWiedergeladen, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Huelse DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.kaliber+' - '+datenObject.laenge+' - ' +datenObject.gewicht+ ' - ' +datenObject.anzahlWiedergeladen +' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Pulver':
                    if(gibtEsEintragBereitsInDB("pulver", datenObject.bezeichnung)){
                      alert("Bezeichner bereits in Datenbank! Bitte anderen wählen!");
                      return;
                    }
                    tx.executeSql('insert into pulver (datensatztyp, bezeichnung, notizen, preis, bild) values (?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.notizen, datenObject.preis, datenObject.bild] );
                    console.log('Erzeuge Pulver DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - ' +datenObject.notizen+' - '+datenObject.preis+' - '+datenObject.bild);
                    break;
                case 'Laborierung':
                    if(gibtEsEintragBereitsInDB("laborierungen", datenObject.bezeichnung)){
                      alert("Bezeichner bereits in Datenbank! Bitte anderen wählen!");
                      return;
                    }
                    tx.executeSql('insert into laborierungen (datensatztyp, bezeichnung, geschossID, huelseID, zuenderID, pulverID, beschichtungID, oal, notizen, preis, fertiggestellt, anzahl, bild, streukreis, trefferbild) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
                    [datenObject.datensatztyp, datenObject.bezeichnung, datenObject.geschossID, datenObject.huelseID, datenObject.zuenderID, datenObject.pulverID, datenObject.beschichtungID, datenObject.oal, datenObject.notizen, datenObject.preis, datenObject.fertiggestellt, datenObject.anzahl, datenObject.bild, datenObject.streukreis, datenObject.trefferbild] );
                    console.log('Erzeuge Laborierung DB Eintrag: '+datenObject.datensatztyp +' - '+datenObject.bezeichnung+' - '+datenObject.geschossID+' - '+datenObject.huelseID+' - '+datenObject.beschichtungID+' - '+datenObject.oal+' - '+datenObject.pulverID+' - '+datenObject.beschichtungID+' - '+datenObject.notizen+' - '+datenObject.preis+' - '+datenObject.fertiggestellt+' - '+datenObject.anzahl+" - "+datenObject.bild+' - '+datenObject.streukreis+' - '+datenObject.trefferbild);
                    break;
                default:
                    console.log("Fehler in DataContext - Funktion speichere! Kein Case zu Tabellenname: "+datenObject.datensatztyp +' gefunden');
                }
        },
        null
    );
}

function ladeDBdaten(tabellenname, callback) {

  if (tabellenname == "laborierungen"){
    console.log("Context.ladeDBdaten soll Laborierungen laden, deshalb wird es an Methode ladeLaborierungen weiter delegiert, denn Laborierungen müssen aus mehreren Tabellen zusammengebaut werden!");
    this.ladeLaborierungen(this.callback); //Callback wird weitergegeben
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


function ladeWhereClauseAusDB(tabellenname, WhereClause, callback) {

  console.log("Context.ladeWhereClauseAusDB soll aus Tabelle: "+tabellenname+" WhereClause: "+WhereClause+ " laden.");

  database.transaction(tx => {
    tx.executeSql("select * from " +tabellenname +"WHERE "+WhereClause +";", [], (_, { rows }) => {
      console.log(
        "DataContext.ladeWhereClauseAusDB - aus Tabelle: "+tabellenname+" wurde über WhereClause: "+WhereClause+ " folgender Datensatz geladen: "+
          JSON.stringify(rows._array)
      );
      callback(rows._array);
    });
  });
}

function berechnePatronenPreis(laborierung){
  let huelsenPreis = laborierung.huelse.preis/15;

  let PulverPreis = laborierung.pulver.preis/100/15.4324 
  PulverPreis = PulverPreis * laborierung.pulver.gewicht; //Preis je 100g -> 1g = 15,4324gr

  laborierung.preis = laborierung.geschoss.preis + huelsenPreis + PulverPreis +zuender.preis

  return laborierung.preis;
}


function ladeReferenzenInLaborierung(laborierung, callback){

  let suchBedingung;
  suchBedingung = "bezeichnung = '"+laborierung.geschossID+"'";
  this.ladeWhereClauseAusDB("geschosse", suchBedingung, result => (laborierung.geschoss = result));

  suchBedingung = "bezeichnung = '"+laborierung.huelsenID+"'";
  this.ladeWhereClauseAusDB("huelsen", suchBedingung, result => (laborierung.huelse = result));

  suchBedingung = "bezeichnung = '"+laborierung.pulverID+"'";
  this.ladeWhereClauseAusDB("pulver", suchBedingung, result => (laborierung.pulver = result));

  suchBedingung = "bezeichnung = '"+laborierung.zuenderID+"'";
  this.ladeWhereClauseAusDB("zuender", suchBedingung, result => (laborierung.zuender = result));

  suchBedingung = "bezeichnung = '"+laborierung.beschichtungID+"'";
  this.ladeWhereClauseAusDB("beschichtungen", suchBedingung, result => (laborierung.beschichtung = result));

  console.log("DataContext.ladeReferenzenInLaborierung hat Laborierung erstellt: "+JSON.stringify(laborierung));
  callback(laborierung);
}


function ladeLaborierungen(callback){
  let laborierungsarray;
  console.log("ladeLaborierungen: Hier wird Laborierung gesucht.. und aus Referenzen zusammengebaut");

  database.transaction(tx => {
    tx.executeSql("select * from laborierungen", [], (_, { rows }) => {
      console.log("DataContext - erstelleLaborierung läd Laborierungsgrundgerüst:"+JSON.stringify(rows._array));

      //Für jeden einzelnen LaborierungsDatensatz, die Untertabellen laden und als Object einfügen
      for (var i = 0; i = rows._array.length; i++) {
        let laborierung = rows._array[i];
        
        this.ladeReferenzenInLaborierung( laborierung, function(result){this.laborierung = result;})

        laborierung.preis = berechnePatronenPreis(laborierung); //Patronenpreis aus Komponenten berechnen

        // let laborierungsGeschoss;
        // geschoss = new Object();
        // geschoss.bezeichnung = "Sierra Match King 168er";
        // geschoss.kaliber = "308WIN";
        // geschoss.gewicht = "168";
  
        // let laborierung =  
        // {
        //   datensatztyp: "Laborierung",
        //   bezeichnung: "ErstellteLabo",
        //   geschoss: geschoss,
        //   huelse: huelse,
        //   zuender: zuender,
        //   pulver: pulver,
        //   beschichtung: beschichtung,
        //   oal: "73,0",
        //   notizen: "Laborierung wurde generiert",
        //   preis: "0,75",
        //   fertiggestellt: true,
        //   anzahl: 5,
        //   bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        //   streukreis: "",
        //   trefferbild: ""
        // }
        console.log("zusammengebaute Labo in Array Pushen: "+JSON.stringify(laborierung));
        laborierungsarray.push(laborierung);
      }
    })
  })
  console.log("laborierungsarray: "+JSON.stringify(laborierungsarray));
  callback(laborierungsarray);
};


function ladeFertigeLaborierungen(callback) {
  database.transaction(tx => {
    tx.executeSql("select * from laborierungen WHERE fertiggestellt = 1", [], (_, { rows }) => {
      console.log(
        "DataContext - lade fertige Laborierungen aus DB:"+
          JSON.stringify(rows._array)
          //TODO: Laborierungen aus Referenzen zusammenbauen
      );
      callback(rows._array);
    });
  });
}


function ladeUnfertigeLaborierungen(callback) {
  database.transaction(tx => {
    tx.executeSql("select * from laborierungen WHERE fertiggestellt = 0", [], (_, { rows }) => {
      console.log(
        "DataContext - lade unfertige Laborierungen aus DB:"+
          JSON.stringify(rows._array)
          //TODO: Laborierungen aus Referenzen zusammenbauen
      );
      callback(rows._array);
    });
  });
}


function ladeLaborierungenSortiertNachStreukreis(callback) {
  database.transaction(tx => {
    tx.executeSql("select * from laborierungen ORDER BY streukreis DESC", [], (_, { rows }) => {
      console.log(
        "DataContext - lade Laborierungen sortiert nach Streukreis aus DB:"+
          JSON.stringify(rows._array)
          //TODO: Laborierungen aus Referenzen zusammenbauen
      );
      callback(rows._array);
    });
  });
}



export default class DataContext {

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

  ladeUnfertigeLaborierungen(callback) {
    return ladeUnfertigeLaborierungen(callback);
  }

  ladeLaborierungenSortiertNachStreukreis(callback) {
    return ladeLaborierungenSortiertNachStreukreis(callback);
  }


  aktualisiereDatensatz(tabellenname, datenObject){
    //TODO: gegen SQLInjection sichern
    console.log("Update DB-Tabelle: "+tabellenname+" mit Datensatz: "+JSON.stringify(datenObject));
    loescheDatensatz(tabellenname, datenObject);
    speichereDatensatz(datenObject)
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
        anzahl: 20,
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
        anzahl: 30,
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
        anzahl: 50,
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
        anzahl: 50,
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
        anzahl: 40,
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
        anzahl: 35,
        bild: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png",
        streukreis: "16,5",
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
        oal: "72,5",
        notizen: "versuch mit pressladung",
        preis: "0,68",
        fertiggestellt: true,
        anzahl: 10,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        streukreis: "28.0",
        trefferbild: ""
      },
      {
        datensatztyp: "Laborierung",
        bezeichnung: "Versuchslaborierung2",
        geschoss: geschoss2,
        huelse: huelse,
        zuender: zuender,
        pulver: pulver,
        beschichtung: beschichtung,
        oal: "73,1",
        notizen: "versuch mit pressladung",
        preis: "0,71",
        fertiggestellt: false,
        anzahl: 15,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        streukreis: "",
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
        anzahl: 50,
        bild: { uri: "http://icons.iconarchive.com/icons/icons8/windows-8/256/Military-Ammo-Tin-icon.png" },
        streukreis: "",
        trefferbild: ""
      }
    ];
    return callback(laborierungTestdaten);
  }



  ladeMOCKSchießstandDaten(callback) {
    var schießsstandTestdaten = [
      {
        datensatztyp: "Schießsstand",
        bezeichnung: "Polizeistand Stuttgart 25m",
        value: "Polizeistand Stuttgart 25m",
      },
      {
        datensatztyp: "Schießsstand",
        bezeichnung: "Bundeswehr Stetten 1200m",
        value: "Bundeswehr Stetten 1200m",
      },
      {
        datensatztyp: "Schießsstand",
        bezeichnung: "Schützenhaus 100m",
        value: "Schützenhaus 100m",
      }
    ];
    return callback(schießsstandTestdaten);
  }

  
  ladeMOCKWaffenDaten(callback) {
    var waffenTestdaten = [
      {
        datensatztyp: "Waffe",
        bezeichnung: "Voere M2",
        value: "Voere M2",
      },
      {
        datensatztyp: "Waffe",
        bezeichnung: "Remington 700 24Zoll",
        value: "Remington 700 24Zoll",
      },
      {
        datensatztyp: "Waffe",
        bezeichnung: "CZ75 Viper",
        value: "CZ75 Viper",
      }
    ];
    return callback(waffenTestdaten);
  }


}
