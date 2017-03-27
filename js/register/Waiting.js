/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

export default class Waiting extends Component {

  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigator.push({
      name: 'register'
    });
  }

  render() {
    return (
      <View style={styles.contianer}>
        <Text style={styles.textPromptStyle}>
          注册使用手机号： {this.props.phoneNumber}
        </Text>
        <Text style={styles.textPromptStyle}>
          注册使用密码： {this.props.userPassword}
        </Text>
        <Text style={styles.bigTextPrompt} onPress={this.goBack}>
          返回
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  textPromptStyle: {
    fontSize: 20
  },
  bigTextPrompt: {
    top: 70,
    width: 300,
    backgroundColor: 'gray',
    fontSize: 60,
    color: 'white',
    textAlign: 'center'
  },
});
