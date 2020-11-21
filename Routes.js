import React from 'react'
import { Router, Scene } from 'react-native-router-flux'
import GalleryScene from './GalleryScene/GalleryScene.js'
import ImageScene from './ImageScene/ImageScene.js'
import { Actions } from 'react-native-router-flux';

function navigateTo(key,data) {
   console.log('dddd',data)
   switch (key) {
      case "image":
         Actions.image(data);
         break;
      case "gallery":
         Actions.gallery(data);
         break;
      default:
         break;
   }
}

const Routes = () => (
   <Router>
      <Scene key = "root">
         <Scene key = "gallery" navigateTo={navigateTo} component = {GalleryScene} title = "Gallery" initial = {true}/>
         <Scene key = "image" navigateTo={navigateTo} component = {ImageScene} title = "Image"/>
      </Scene>
   </Router>
)
export default Routes