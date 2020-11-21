import React from 'react';
import ReactDOM from 'react-dom';
import { fireEvent, render, waitFor } from '@testing-library/react-native'
import GalleryScene from '../GalleryScene/GalleryScene'
import GalleryItem from '../GalleryScene/GalleryItem';

//TODO: needs some more improvments for testing scrolling behavior
describe('Testing GalleryScene', () => {
    it(`Sth is wrong with Gallery Snapshot or scrolling stuff`, async() => {
      const onLoadMore = jest.fn();
      const galleryRef = React.createRef()
      const componentTree = render(<GalleryScene ref={galleryRef} notifyLoadMore={onLoadMore}/>)
      expect(componentTree).toMatchSnapshot()
      const {getByTestId} = componentTree
      const list = getByTestId('scrollable-list')
      expect(list).not.toBeNull()
      let element = galleryRef.current
      let initialCount = element.state.documentData.length

      element.scrollToBottom()
      let i = 9
      await waitFor(()=>{
        if (i < 36){
          i = i + 3
        }
        let elem = getByTestId(`touchable${i}`)
        expect(elem)
      },{interval:100,timeout: 4500})
    })
})
