/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  BackAndroid,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Register from './js/register/Register';
import Waiting from './js/register/Waiting';

export default class Onu extends Component {

  configureScene(route) {
    return Navigator.SceneConfigs.FadeAndroid;
  }

  renderScene(route, navigator) {
    let Component = route.Component;
    this._navigator = navigator;
    console.log(1)
    switch(route.name) {
      case 'register':
        return <Register navigator={navigator} route={route} />;
      case 'waiting':
        return <Waiting phoneNumber={route.phoneNumber} userPassword={route.userPassword} navigator={navigator} />
    }
  }

  componentDidMount() {
    var navigator = this._navigator;
    BackAndroid.addEventListener('NaviModuleListener', () => {
      if(navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
      }
      return false;
    });
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('NaviModuleListener');
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Navigator initialRoute = {{name: 'register'}} configureScene={this.configureScene} renderScene={this.renderScene} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Onu', () => Onu);
