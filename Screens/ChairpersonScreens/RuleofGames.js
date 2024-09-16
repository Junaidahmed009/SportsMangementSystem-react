import React, { useState, useEffect } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View, Text } from 'react-native';
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
  const [showTextBox, setShowTextBox] = useState(false);
  const [showSecondButton, setShowSecondButton] = useState(false);

  useEffect(() => {
    const fetchDropDownData = async () => {
      try {
        const response = await Api.fetchSports();
        if (response.status === 200) {
          if (Array.isArray(response.data)) {
            const sportOptions = response.data.map(sport => ({
              label: sport.games,
              value: sport.id,
            }));
            setItems1(sportOptions);
          } else {
            console.error('Expected an array but got:', response.data);
          }
        } else {
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          console.error('Error 404: No sports found for Drop down.');
        } else {
          console.error('Error fetching dropdown data:', error);
        }
      }
    };

    fetchDropDownData();
  }, []);

  const fetchRules = async () => {
    if (!value1) {
      Alert.alert('Please select one game from DropDown.');
      return;
    }

    try {
      const data = {
        sportrs_id: value1
      };
      const response = await Api.fetchrules(data);
      if (response.status === 200) {
        if (Array.isArray(response.data)) {
          const rulesText = response.data.map(rule => rule.rules_of_game).join(', ');
          setShowTextBox(true);
          setShowSecondButton(true);
          setText(rulesText);
        } else {
          console.error('Expected an array but got:', response.data);
          Alert.alert('Error', 'No rules found.');
        }
      } else {
        console.error('Unexpected status code:', response.status);
        Alert.alert('Error', `Unexpected status code: ${response.status}`);
      }

    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          Alert.alert('Error', 'No rules found for the given sport (404).');
        } else {
          Alert.alert('Error', `Error code: ${error.response.status}`);
          console.error('Error status:', error.response.status);
        }
      } else {
        Alert.alert('Error', 'Failed to connect to server.');
      }

      setText('Error fetching rules.');
    }
  };


  const UpdateData = async () => {
    if (!text) {
      Alert.alert('Please write something in the TextBox.');
      return;
    }
    const saverules = {
      sportrs_id: value1,
      rules_of_game: text,
    };

    try {
      const response = await Api.rulesofgames(saverules);
      if (response.status === 201) {
        Alert.alert('Data saved successfully.');
        Alert.alert(
          'Rules Updated.',
          [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Chairperson');
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert('Unexpected response status: ' + response.status);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert('An error occurred while saving the data. Please try again.');
        console.error('Error response:', error.response);
      } else {
        Alert.alert('Failed to connect to server.');
      }
    } finally {
      // Any cleanup actions can go here
    }
  };


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

        <TouchableOpacity style={styles.button} onPress={fetchRules}>
          <Text style={styles.buttonText}>Get Rules</Text>
        </TouchableOpacity>

        {showTextBox && (
          <TextInput
            style={styles.textInput}
            multiline
            onChangeText={setText}
            value={text}
          />
        )}

        {showSecondButton && (
          <TouchableOpacity style={styles.button} onPress={UpdateData}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

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
    justifyContent: 'space-between',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,  // Rounded corners
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  dropdownContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
  textInput: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
    color: 'black',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6200ee',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});