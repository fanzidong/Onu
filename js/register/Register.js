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
  View,
  BackAndroid
} from 'react-native';

import ConfirmDialog from '../ui/ConfirmDialog';

let Dimensions = require('Dimensions');
let PixelRatio = require('PixelRatio');
let totalWidth = Dimensions.get('window').width;
let totalHeight = Dimensions.get('window').height;
let leftStartPoint = totalWidth * 0.1;
let componentWidth = totalWidth * 0.8;
let pixelRatio = PixelRatio.get();

export default class Register extends Component {

  state: {
    inputNum: string,
    inputPassword: string
  }
  constructor(props) {
    super(props);
    this.userPressConfirm = this.userPressConfirm.bind(this);
    this.state = {
      inputNum: '',
      inputPassword: '',
      needToConfirm: false
    }
  }

  getInitialState() {
    return {
      inputNum: '',
      inputPassword: '',
      needToConfirm: false
    };
  }

  tellConfimDialogItsStatus() {
    return this.state.needToConfirm;
  }

  updateNum(newText) {
    this.setState((state) => {
      return {
        inputNum: newText
      };
    });
  }
  updatePassword(newText) {
    this.setState(() => {
      return {
        inputPassword: newText
      };
    });
  }

  userPressConfirm() {
    this.setState((state) => {
      return {
        needToConfirm: true
      };
    })
  }

  userCanceled() {
    this.setState((state) => {
      return {
        needToConfirm: false
      };
    })
  }

  userConfirmed() {
    this.setState((state) => {
      return {
        needToConfirm: false
      }
    });

    this.props.navigator.replace({
      phoneNumber: this.state.inputNum,
      userPassword: this.state.userPassword,
      name: 'waiting'
    })
  }

  renderWithDialog() {
    return (
      <View style={styles.container}>
        <TextInput style={styles.numberInputStyle} placeholder={'请输入手机号'} onChangeText={(inputNum) => this.setState({inputNum})} />
        <Text style={styles.textPromptStyle}>
          您输入的手机号： {this.state.inputNum}
        </Text>
        <TextInput style={styles.passwordInputStyle} placeholder={'请输入密码'} secureTextEntry={true} onChangeText={(newText) => this.updatePassword(newText)}/>
        <Text style={styles.bigTextPrompt} onPress={this.userPressConfirm.bind(this)}>
          确定
        </Text>
        <ConfirmDialog userConfirmed={this.userConfirmed.bind(this)} userCanceled={this.userCanceled.bind(this)}
          amIStillAlive={this.tellConfimDialogItsStatus} promptToUser={'使用' + this.state.inputNum + '号码登录？'}  />
      </View>
    );
  }

  render() {
    if(this.state.needToConfirm) {
      return this.renderWithDialog();
    }

    return (
      <View style={styles.container}>
        <TextInput style={styles.numberInputStyle} placeholder={'请输入手机号'} onChangeText={(inputNum) => this.setState({inputNum})} />
        <Text style={styles.textPromptStyle}>
          您输入的手机号： {this.state.inputNum}
        </Text>
        <TextInput style={styles.passwordInputStyle} placeholder={'请输入密码'} secureTextEntry={true} onChangeText={(newText) => this.updatePassword(newText)}/>
        <Text style={styles.bigTextPrompt} onPress={this.userPressConfirm}>
          确定
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
  numberInputStyle: {
    top: 20,
    left: leftStartPoint,
    width: componentWidth,
    backgroundColor: 'gray',
    fontSize: 20
  },
  textPromptStyle: {
    top: 30,
    left: leftStartPoint,
    width: componentWidth,
    fontSize: 20
  },
  passwordInputStyle: {
    top: 50,
    left: leftStartPoint,
    width: componentWidth,
    backgroundColor: 'gray',
    fontSize: 20
  },
  bigTextPrompt: {
    top: 70,
    left: leftStartPoint,
    width: componentWidth,
    backgroundColor: 'gray',
    fontSize: 60,
    color: 'white',
    textAlign: 'center'
  },
});
