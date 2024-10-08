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
        if (error.response) {
          Alert.alert('Error fetching dropdown data', `Status: ${error.response.status}`);
        } else {
          Alert.alert('Network error', 'Failed to connect to server.');
        }
      }
    };

    fetchDropDownData();
  }, []);

  const fetchRules = async () => {
    if (!value1) {
      Alert.alert('Please select a game from the dropdown.');
      return;
    }
    try {
       const Sportsid=value1;
      const response = await Api.fetchrules(Sportsid);
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const rulesText = response.data.map(rule => rule.rules_of_game).join(', ');
          setShowTextBox(true);
          setShowSecondButton(true);
          setText(rulesText);
        } else {
          Alert.alert('No rules found.');
          setText('');
        }
      } else {
        
        Alert.alert(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status===404) {
        Alert.alert('No Rules found for given Sport.') 
      }else if(error.response){
        Alert.alert('Error fetching rules', `Status: ${error.response.status}`);
      }
       else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
      setText('Error fetching rules.');
    }
  };
  
  const UpdateData = async () => {
    if (!text.trim()) {
      Alert.alert('Please write something in the text box.');
      return;
    }
  
    const saverules = {
      sportrs_id: value1,
      rules_of_game: text,
    };
  
    try {
      const response = await Api.rulesofgames(saverules);
      if (response.status === 201) {
        Alert.alert(
          'Sucess',
          'Rules have been updated.',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Chairperson'),
            },
          ],
          { cancelable: false }
        );
      } else {
        Alert.alert(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response) {
        // Handle server error
        Alert.alert('Error saving data', `Status: ${error.response.status}`);
        console.error('Error response:', error.response);
      } else if (error.request) {
        // Handle network error
        Alert.alert('Network error', 'Failed to connect to server.');
        console.error('Error request:', error.request);
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
