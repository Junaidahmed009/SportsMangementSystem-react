import React, { useState, useEffect } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

export default function EventManagerSelection() {
  const navigation = useNavigation();
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([]);
  const [text, setText] = useState('');

  const handleBackPress = () => {
    navigation.navigate('Chairperson');
  };

return (
  <SafeAreaView style={styles.container}>
    <Appbar.Header style={styles.appbarsetting}>
      <Appbar.BackAction onPress={handleBackPress} color="#ffffff" />
      <Appbar.Content title="Manager Selection" titleStyle={styles.appbarTitle} />
    </Appbar.Header>
    <View style={styles.viewContainer}>
      <DropDownPicker
        open={open1}
        value={value1}
        items={items1}
        setOpen={setOpen1}
        setValue={setValue1}
        setItems={setItems1}
        placeholder="Select Game"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <DropDownPicker
        open={open2}
        value={value2}
        items={items2}
        setOpen={setOpen2}
        setValue={setValue2}
        setItems={setItems2}
        placeholder="Event Managers"
        style={styles.dropdown}
        dropDownContainerStyle={styles.dropdownContainer}
      />
      <TextInput
        style={styles.textInput}
        onChangeText={setText}
        value={text}
        placeholder="Number of Teams"
        placeholderTextColor="#999"  // Placeholder color
      />
      <TouchableOpacity style={styles.button} onPress={() => console.log('Save pressed')}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'aliceblue',
  },
  appbarsetting: {
    backgroundColor: '#6200ee',
  },
  appbarTitle: {
    fontSize: 26,
    color: '#ffffff',
  },
  viewContainer: {
    flex: 1,
    justifyContent: 'center',  // Center elements vertically
    alignItems: 'center',  // Center elements horizontally
    padding: 20,
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    width: '100%',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,  // More rounded button
    alignItems: 'center',
    width: '50%',  // Smaller width for button
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
