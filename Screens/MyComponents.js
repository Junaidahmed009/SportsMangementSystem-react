import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet,SafeAreaView } from 'react-native';
import { Appbar } from 'react-native-paper';

//TextBox
export const TextInputComponent = ({placeholder, textValue, onChangeText,CustomStyle}) => (
    <TextInput
      style={[styles.input,CustomStyle]}
      placeholder={placeholder}
      value={textValue}
      onChangeText={onChangeText}
      placeholderTextColor="#999"  // Placeholder color
      // keyboardType={Keyboardtype} // Show numeric keyboard
    />
);


//Button
export const ButtonComponent = ({ buttonTitle, onPress,CustomStyle }) => (
    <TouchableOpacity style={[styles.button,CustomStyle]} onPress={onPress}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
);

//AppBar
export const AppBarComponent = ({ handleBackPress,title, CustomStyle }) => (
  <Appbar.Header style={[styles.appbarSetting, CustomStyle]}>
    <Appbar.BackAction onPress={handleBackPress} color="#ffffff" />
    <Appbar.Content title={title} titleStyle={styles.appbarTitle} />
  </Appbar.Header>
);

//SAfeAreaview
export const SafeAreaViewComponent = ({ children, CustomStyle }) => (
  <SafeAreaView style={[styles.safeArea, CustomStyle]}>
    {children}
  </SafeAreaView>
);


const styles = StyleSheet.create({
  
  container: {
    padding: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc', 
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    color: 'black',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    // paddingHorizontal: 20,
    borderRadius: 50,  // More rounded button
    alignItems: 'center',
    // width: '90%',  // Smaller width for button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  appbarSetting: {
    backgroundColor: '#6200ee',
  },
  appbarTitle: {
    fontSize: 26,
    color: '#ffffff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  buttonspecific:{
     
  }
});


