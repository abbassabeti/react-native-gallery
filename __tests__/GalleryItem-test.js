import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import GalleryItem from '../GalleryScene/GalleryItem';
import { exp } from 'react-native-reanimated';


describe('Testing GalleryItem', () => {
    it(`GalleryItem test failed in snapshot or finding element`, () => {
      let k = 0
      let method = jest.fn()
      const componentTree = render(<GalleryItem id={4} title={'test'} navigateTo={/*()=>{k++}*/method}/>)
      const {getByTestId} = componentTree;
      const element = getByTestId(`touchable${4}`)
      fireEvent.press(element)
      expect(method).toBeCalled()
      expect(componentTree).toMatchSnapshot()
    })
})