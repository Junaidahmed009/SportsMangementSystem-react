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

  useEffect(() => {
    fetchDropdownData();
  }, []);

  const fetchDropdownData = async () => {
    try {
      const response = await Api.getsportsandmanger();
      const { Sports, EventManagers } = response.data;
      const sportsList = Sports.map((sport) => ({
        label: sport.games,
        value: sport.id
      }));
      const eventManagersList = EventManagers.map((manager) => ({
        label: `${manager.name} (${manager.registration_no})`,
        value: manager.id
      }));
      setItems1(sportsList);
      setItems2(eventManagersList);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const SaveData = async () => {

    if (!value1 || !value2) {
      Alert.alert('Please select values from both dropdowns.');
      return;
    }
    if (!text) {
      Alert.alert('Please enter a value in the text box.');
      return;
    }
    const data = {
      sports_id: value1,
      managed_by: value2,
      no_of_teams: text,
    };

    try {
      const response = await Api.savedata(data);
      if (response.status === 201) {
        Alert.alert('Data saved successfully.', '', [
          {
            text: 'OK',
            onPress: () => {
              navigation.navigate('Chairperson');
            },
          },
        ]);
      } else {
        Alert.alert('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Alert.alert('Error', 'No session found.');
        } else if (error.response.status === 400) {
          Alert.alert('Error', 'The game is already managed by Event manager.');
        } else if (error.response.status === 409) {
          Alert.alert('Error', 'The game is already added in the latest session and managed by someone.');
        } else {
          Alert.alert('An error occurred while saving the data. Please try again.');
        }
      } else {
        // Handle network or other unexpected errors
        Alert.alert('Failed to connect to server.');
      }
    }
  };







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
        <View style={{ zIndex: 2000 }}>
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
        </View>
        <View style={{ zIndex: 1000, marginTop: 10 }}>
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
        </View>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
          value={text}
          placeholder="Number of Teams"
          placeholderTextColor="#999"  // Placeholder color
          keyboardType="numeric"  // Show numeric keyboard
        />
        <TouchableOpacity style={styles.button} onPress={SaveData}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
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
