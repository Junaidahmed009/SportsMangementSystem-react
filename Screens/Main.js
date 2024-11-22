import {View, Text} from 'react-native';

import * as React from 'react';
//npx react-native run-android
// npx react-native start --reset-cache

import {PaperProvider} from 'react-native-paper';
import Signup from './UsersAccount/Signup';
import Cahirpersonnav from './ChairpersonScreens/ChairpersonHome';
import Navigation from './Navigation';
import ForgetPassword from './UsersAccount/ForgetPassword';
import Home from './Home/UserHome';

export default function Main() {
  return (
    <PaperProvider>
      {/* <Home></Home> */}
      {/* <Cahirpersonnav></Cahirpersonnav> */}
      {/* <Signup></Signup> */}
      <Navigation></Navigation>
      {/* <ForgetPassword></ForgetPassword> */}
    </PaperProvider>
  );
}
