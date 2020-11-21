// Imports: Dependencies
import React from 'react';
import {Image } from 'react-native';
import {Dimensions, TouchableOpacity, StyleSheet, Text } from 'react-native';
//import CacheableImage from 'react-native-cacheable-image'

// Screen Dimensions
const { height, width } = Dimensions.get('window');
// Screen: Infinite Scroll

export default GalleryItem = (id,title,navigateTo) => {
  let imgId = id && id.id ? id.id : id
  let imgTitle = id && id.title ? id.title : title
  let navFunc = id && id.navigateTo ? id.navigateTo : navigateTo
  return (
      <TouchableOpacity
        testID={`touchable${imgId}`}
        style={styles.item}
        onPress={()=> navFunc("image",{imageId:imgId,imgTitle})}>
        {/*<CacheableImage
            style={styles.image}
            source={{uri:`https://picsum.photos/id/${id}/200`}}
            checkNetwork
            networkAvailable
        >
        </CacheableImage>*/}
          <Image
            style={styles.image}
            id={imgId}
          source={{uri:`https://picsum.photos/id/${imgId}/200`}}>
          </Image>
      </TouchableOpacity>
    )};

  // Styles
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#cccccc',
    marginVertical: 8,
    marginHorizontal: 16,
    flex: 1,
    aspectRatio: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
    overflow: 'hidden'
  },
  image:{
    width: '100%',
    height: '100%',
  },
});