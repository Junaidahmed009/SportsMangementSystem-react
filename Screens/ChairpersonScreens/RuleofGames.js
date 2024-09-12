import React, { useState, useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../Api';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';

export default function RuleofGames() {
  const navigation = useNavigation();
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await Api.fetchSports();
        // Check if the data exists and is an array
        if (Array.isArray(response.data)) {
          const sportOptions = response.data.map(sport => ({
            label: sport.games, // Make sure 'games' matches the actual field name in the response
            value: sport.id,    // Make sure 'id' matches the actual field name in the response
          }));
          setItems1(sportOptions);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching dropdown data:', error);
      }
    };

    fetchData();
  }, []);

  const handleBackPress = () => {
    navigation.navigate('Chairperson');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header style={styles.appbarsetting}>
        <Appbar.BackAction onPress={handleBackPress} color="#ffffff" />
        <Appbar.Content title="Chairperson" titleStyle={styles.appbarTitle} />
      </Appbar.Header>

      <View style={styles.contentContainer}>
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

        <TextInput
          style={styles.textInput}
          multiline
          placeholder="Type your text here..."
          onChangeText={setText}
          value={text}
        />

        <TouchableOpacity style={styles.buttonContainer}>
          <Button title="Submit" onPress={() => console.log('Submit button pressed')} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between', // Space between dropdown, text input, and button
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20, // Space between dropdown and text input
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,  // Takes up remaining space
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20, // Space between text input and button
    textAlignVertical: 'top',  // Ensures the text aligns to the top in multiline mode
  },
  buttonContainer: {
    marginTop: 10, // Space above the button
    alignSelf: 'center'
  },
});
