import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, View, Button, StyleSheet, Text, FormInput, TextInput, TouchableOpacity, Icon, Ionicons, MaterialCommunityIcons } from 'react-native';
import NumericInput from 'react-native-numeric-input'
import { Camera, Permissions } from 'expo';
import DBContext from '../../DataContext';


//Detailansicht der ausgewählten Laborierung
export default class SchießstandItemScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const laborierung = navigation.getParam('ausgewaehlteLaborierung');
    return {
      title: "Ergenisse Eintragen:"//title: `${laborierung.bezeichnung} ${":"}`
    };
  };

  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  //Kamera Freigabe
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  async snapPhoto() {       
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
       const options = { quality: 1, base64: true, fixOrientation: true, 
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;            
           console.log(photo);            
           });     
     }
    }

  LaborierungLoeschen(laborierungsbezeichnung){
    //TODO: Laborierung Löschen funktioniert nicht!

    db = new DBContext();
    db.loescheDatensatz("laborierungen", laborierungsbezeichnung);
  }

  erzeugeArrayMitScrollRange(){
    let dataSource = [];
    for (var i = 0; i <= 500; i++) {
      dataSource.push(i);
    }
    return dataSource;
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }}
          ref={ (ref) => {this.camera = ref} }
          type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.captureButton} onPress={this.snapPhoto.bind(this)}>
                <Image style={{width: 100, height: 100}} source={require('../../../assets/takePicIcon.png')}          
                />
            </TouchableOpacity>


          </Camera>
        </View>
      );
    }
  }

/*
  render() {
    const laborierung = this.props.navigation.getParam('ausgewaehlteLaborierung');

    return (
      <ScrollView
        style={styles.scrollview}
        contentContainerStyle={styles.container}
      >
        <Text>Laborierung: {laborierung.bezeichnung}</Text>
        <Text>Kalieber: {laborierung.geschoss.kaliber}</Text>

        <Text>Geschoss:{laborierung.geschoss.bezeichnung}</Text>
        <Text>Geschossgewicht:{laborierung.geschoss.gewicht}gr</Text>
        <Text>Geschossbeschichtung:{laborierung.beschichtung.bezeichnung} - Dauer:{laborierung.beschichtung.dauer}h</Text>
        <Text>OAL:{laborierung.oal}</Text>

        <Text>Pulver:{laborierung.pulver.bezeichnung} - {laborierung.pulver.gewicht}</Text>

        <Text>Hülse:{laborierung.huelse.bezeichnung}</Text>
        <Text>Hülsenlänge:{laborierung.huelse.laenge}mm</Text>
        <Text>Hülsen bereits :{laborierung.huelse.anzahlWiedergeladen} mal wiedergeladen</Text>

        <Text>Zünder:{laborierung.zuender.bezeichnung}</Text>

        <Text>Streukreis in mm:</Text>
        <NumericInput 
            //value={this.state.value} 
            initValue = {20.0}
            //onChange={value => this.setState({value})} 
            onChange={value => console.log(value)} 
            totalWidth={240} 
            totalHeight={50} 
            iconSize={25}
            step={0.5}
            valueType='real'
            rounded 
            textColor='#B0228C' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#EA3788' 
            leftButtonBackgroundColor='#E56B70'/>

        <View style={styles.textAreaContainer} >
            <Text>Schießstandnotizen:</Text>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder= {laborierung.notizen}
              placeholderTextColor="grey"
              numberOfLines={5}
              multiline={true}
            />
        </View>
 



        <View style={{ flex: 1 }}>
          <Camera style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </Camera>
        </View>



        <View
          style={{
            borderBottomColor: 'black',
            borderBottomWidth: 1,
          }}
        />
      </ScrollView>
    );
  }
*/
  newMethod() {
    return 'Schießstandscreen';
  }
}

const width = Dimensions.get('window').width * 0.15;

const styles = StyleSheet.create({
  BtnContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingTop: 30
  },
  container: {
    //alignItems: 'center',
    //justifyContent: 'flex-start',
    //textAlign: 'left',
    padding: 20
  },
  scrollview: {
    backgroundColor: '#fff'
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: width,
    marginBottom: 20
  },
  textAreaContainer: {
    borderColor: "grey",
    borderWidth: 1,
    padding: 5
  },
  textArea: {
    height: 50,
    //justifyContent: "flex-start"
  }
});
