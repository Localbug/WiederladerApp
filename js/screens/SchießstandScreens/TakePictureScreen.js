import React, { Component } from 'react';
import { Dimensions, Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import { Camera, Permissions } from 'expo';
import DBContext from '../../DataContext';


//Detailansicht der ausgewählten Laborierung
export default class TakePictureScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const laborierung = navigation.getParam('ausgewaehlteLaborierung');
    return {
      title: "Trefferbild aufnahmen:"//title: `${laborierung.bezeichnung} ${":"}`
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
                <Image style={{width: 100, height: 100, alignSelf: 'center'}} source={require('../../../assets/takePicIcon.png')}          
                />
            </TouchableOpacity>


          </Camera>
        </View>
      );
    }
  }

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
