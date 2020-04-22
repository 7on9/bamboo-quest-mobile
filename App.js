/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  Platform,
  Image,
  FlatList,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {walnimal} from './walnimal';

let arr = walnimal.map((item, idx) => ({...item, id: idx}));
const App = () => {
  const width = APP_SIZE.widthScreen / 2;
  const height = width * 1.25;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <FlatList
          data={arr}
          keyExtractor={item => item.img}
          renderItem={({item, index}) => {
            if (!(index % 2) && index != arr.length - 1) {
              return (
                <View
                  style={{
                    width: APP_SIZE.widthScreen,
                    height,
                    margin: 1,
                    flexDirection: 'row',
                  }}
                  key={index}>
                  <Image
                    width={width}
                    height={height}
                    source={{uri: walnimal[index].img}}
                    style={{margin: 1, width, height}}
                    resizeMode="contain"
                  />
                  <Image
                    width={width}
                    height={height}
                    source={{uri: walnimal[index + 1].img}}
                    style={{margin: 1, width, height}}
                  />
                </View>
              );
            }
          }}
        />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    backgroundColor: 'red',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export const APP_SIZE = {
  widthWindow: Dimensions.get('window').width,
  heightWindow: Dimensions.get('window').height,
  widthScreen: Dimensions.get('screen').width,
  heightScreen: Dimensions.get('window').height,
  statusBarHeight: Platform.select({ios: 30, android: StatusBar.currentHeight}),
  appBarHeight: Platform.select({ios: 44, android: 56}),
};

export default App;
