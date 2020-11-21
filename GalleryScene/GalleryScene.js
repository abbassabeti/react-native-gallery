// Imports: Dependencies
import React, { Component } from 'react';
import { ActivityIndicator, Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import GalleryItem from './GalleryItem.js';
// Screen Dimensions
const { height, width } = Dimensions.get('window');

export default class GalleryScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      documentData: [],
      lastVisible: null,
      loading: false,
      refreshing: false,
    };
    this.limit= 36
    //this.flatList = React.createRef()
    this.scrollToBottom = this.scrollToBottom.bind(this)
  }
  // Component Did Mount
  componentDidMount = () => {
    try {
      this.retrieveData();
    }
    catch (error) {
      console.log(error);
    }
  };
  // Retrieve Data
  retrieveData = async () => {
    try {
      // Set State: Loading
      this.setState({
        loading: true,
      });
      
      let documentData = Array.from({ length: this.limit }, (_, i) => {return {id: i+1,title:'sth'}});

      let lastVisible = documentData[documentData.length - 1].id;
      // Set State
      this.setState({
        documentData: documentData,
        lastVisible: lastVisible,
        loading: false,
      });
    }
    catch (error) {
      console.log(error);
    }
  };
  // Retrieve More
  retrieveMore = async () => {
    try {
      console.log('reached here')
      // Set State: Refreshing
      this.setState({
        refreshing: true,
      });
      let notifyLoadMore = this.props.onLoadMore
      if (notifyLoadMore){
        notifyLoadMore()
      }

      let documentData = Array.from({ length: this.limit }, (_, i) => {return {id: i+this.state.documentData.length,title:'sth'}});
      let lastVisible = documentData[documentData.length - 1].id;
      // Set State
      this.setState({
        documentData: [...this.state.documentData, ...documentData],
        lastVisible: lastVisible,
        refreshing: false,
      });
    }
    catch (error) {
      console.log(error);
    }
  };
  // Render Header
  renderHeader = () => {
    try {
      return (
        <Text style={styles.headerText}>Images</Text>
      )
    }
    catch (error) {
      console.log(error);
    }
  };
  // Render Footer
  renderFooter = () => {
    try {
      // Check If Loading
      if (this.state.loading) {
        return (
          <ActivityIndicator />
        )
      }
      else {
        return null;
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  scrollToBottom = () => {
    this.flatList.scrollToEnd({animated: true})
  }

  renderItem = ({item}) => {
    return GalleryItem(item.id,item.title,this.props.navigateTo)
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          ref={ref => this.flatList = ref}
          testID={'scrollable-list'}
          data={this.state.documentData}
          renderItem={(item)=>this.renderItem(item)}
          keyExtractor={(item, index) => String(index)}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.retrieveMore}
          onEndReachedThreshold={2}
          numColumns={3}
          refreshing={this.state.refreshing}
        />
      </SafeAreaView>
    )
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    paddingBottom: 0
  },
  headerText: {
    fontFamily: 'System',
    fontSize: 36,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
    marginBottom: 12,
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
  title: {
    fontSize: 32,
  },
});