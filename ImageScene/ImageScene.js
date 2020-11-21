// Imports: Dependencies
import React, { Component } from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  Image,
  Platform,
  PermissionsAndroid,
  Alert,
  ActivityIndicator, 
  View,
  Button} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';
//import CacheableImage from 'react-native-cacheable-image'
import ImageZoom from 'react-native-image-pan-zoom';
// Screen Dimensions
const { height, width } = Dimensions.get('window');
// Screen: Infinite Scroll
// Screen: Infinite Scroll

getPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Image Download Permission',
        message: 'Your permission is required to save images to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    Alert.alert(
      'Save remote Image',
      'Grant Me Permission to save Image',
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
    return false;
  } catch (err) {
    Alert.alert(
      'Save remote Image',
      'Failed to save Image: ' + err.message,
      [{text: 'OK', onPress: () => console.log('OK Pressed')}],
      {cancelable: false},
    );
    return false;
  }
};

export default class ImageScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
    };
    this.imageUrl = `https://picsum.photos/id/${this.props.imageId}/600`
  }
  // Component Did Mount
  componentDidMount = () => {
    try {
    }
    catch (error) {
      console.log(error);
    }
  };
  
  renderHeader = () => {
    try {
      return (
        <View style={styles.buttonWrapper}>
          <Button title={'save'} style={styles.saveBtn} onPress={()=>{this.handleDownload(this.imageUrl)}}/>
          <Button title={'share'} style={styles.shareBtn} onPress={()=>{this.handleShare(this.imageUrl)}}/>
        </View>
      )
    }
    catch (error) {
      console.log(error);
    }
  };
  // Render Footer
  renderFooter = () => {
    try {
      return ({})
    }
    catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
      {this.renderHeader()}
      <ImageZoom
      style={styles.container}
      cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={width}
      imageHeight={height}>
          <Image style={{width:width, height:width}}
          source={{uri:this.imageUrl}}/>
      </ImageZoom>
      </SafeAreaView>
    )
  }

  handleShare = (url) => {
    let options = {
      title: 'Share image',
      url: url,
      failOnCancel: false,
    }
    Share.open(options)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      err && console.log(err);
    });
  }

  handleDownload = async (url) => {
    // if device is android you have to ensure you have permission
    if (Platform.OS === 'android') {
      const granted = await getPermissionAndroid();
      if (!granted) {
        return;
      }
    }
    this.setState({saving: true});
    RNFetchBlob.config({
      fileCache: true,
      appendExt: 'png',
    })
      .fetch('GET', url)
      .then(res => {
        CameraRoll.save(res.data, 'photo')
          .then(() => {
            Alert.alert(
              'Save remote Image',
              'Image Saved Successfully',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          })
          .catch(err => {
            Alert.alert(
              'Save remote Image',
              'Failed to save Image: ' + err.message,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          })
          .finally(() => this.setState({saving: false}));
      })
      .catch(error => {
        this.setState({saving: false});
        Alert.alert(
          'Save remote Image',
          'Failed to save Image: ' + error.message,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      });
  };
}
// Styles
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
  },
  headerText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
    marginBottom: 12,
  },
  saveBtn:{
    backgroundColor: 'transparent',
    color: 'blue',
    minWidth: 100,
    minHeight: 100,
    margin: 10,
  },
  shareBtn:{
    backgroundColor: '#00000000',
    color: 'blue',
    minWidth: 100,
    minHeight: 100,
    margin: 10,
  },
  buttonWrapper:{
    //flex: 2,
    flexDirection: 'row',
    justifyContent: "space-evenly",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#00000000'
  },
  itemContainer: {
    height: 80,
    width: width,
    borderWidth: .2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    color: '#000',
  },
  item: {
    backgroundColor: '#cccccc',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    aspectRatio: 1,
  },
  title: {
    fontSize: 32,
  },
});