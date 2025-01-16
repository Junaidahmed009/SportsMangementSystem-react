import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Api from '../Api';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';

export default function UserInstructions() {
  const navigation = useNavigation();
  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([]);
  const [text, setText] = useState('');
  // const [showTextBox, setShowTextBox] = useState(false);
  // const [showSecondButton, setShowSecondButton] = useState(false);

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
          Alert.alert(
            'Error fetching dropdown data',
            `Status: ${error.response.status}`,
          );
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
      const Sportsid = value1;
      const response = await Api.fetchrules(Sportsid);
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const rulesText = response.data
            .map(rule => rule.rules_of_game)
            .join(', ');
          // setShowTextBox(true);
          // setShowSecondButton(true);
          setText(rulesText);
        } else {
          Alert.alert('No rules found.');
          setText('');
        }
      } else {
        Alert.alert(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Rules found for given Sport.');
      } else if (error.response) {
        Alert.alert('Error fetching rules', `Status: ${error.response.status}`);
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
      setText('No Rules Found.');
    }
  };

  const handleBackPress = () => {
    navigation.navigate('UserHome');
  };

  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Games Instructions'}
        handleBackPress={handleBackPress}
      />
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

        <TextInput
          style={styles.textInput}
          multiline
          onChangeText={setText}
          value={text}
          readOnly
        />
      </View>
    </SafeAreaViewComponent>
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
    justifyContent: 'space-between',
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10, // Rounded corners
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
    paddingHorizontal: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
