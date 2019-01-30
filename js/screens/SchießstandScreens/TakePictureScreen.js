import React, { Component } from 'react';
import { Dimensions, Image, View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import { Camera, Permissions } from 'expo';

//Detailansicht der ausgewählten Laborierung
export default class TakePictureScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const laborierung = navigation.getParam('ausgewaehlteLaborierung');
    console.log("ausgewählter Datensatz: "+JSON.stringify(laborierung));
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
    const laborierung = this.props.navigation.getParam('ausgewaehlteLaborierung');
    console.log('Button Pressed');
    if (this.camera) {
       console.log('Taking photo');
        //quality (number) -- Specify the quality of compression, from 0 to 1. 0 means compress for small size, 1 means compress for maximum quality.
        //base64 (boolean) -- Whether to also include the image data in Base64 format.
        //exif (boolean) -- Whether to also include the EXIF data for the image
        //width: 1920
       const options = { quality: 1, base64: false, fixOrientation: false, 
       exif: true};
       await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;            
           console.log(photo);   
           console.log("photo.uri: "+photo.uri);   
           laborierung.trefferbild = photo.uri;   //Bild wird in prop gespeichert und in Schießstandscreen zusammen mit den anderen Daten in DB gespeichert 
           console.log("Trefferbild wurde in laborierungObjekt gespeichert: "+JSON.stringify(laborierung));     
        });  
        this.props.navigation.goBack(); //Ein Screen zurück springen   
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

            <TouchableOpacity onPress={this.snapPhoto.bind(this)}>
                <Image style={{width: 300, height: 300, alignSelf: 'center', backgroundColor: 'transparent'}} source={require('../../../assets/FadenkreuzIcon.png')}          
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={this.snapPhoto.bind(this)}>
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
