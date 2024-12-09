import {View, TextInput, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaViewComponent, AppBarComponent} from '../MyComponents';
import Api from '../Api';
import {useNavigation} from '@react-navigation/native';

export default function RuleofCricket() {
  const navigation = useNavigation();
  const handleUserHome = () => {
    navigation.navigate('CricketManagerhome');
  };
  const [rules, setRules] = useState(''); // Fix typo in `setRules`
  useEffect(() => {
    fetchRules();
  }, []);
  const fetchRules = async () => {
    try {
      //  const Sportsid = value1;
      const response = await Api.fetchCricketrules();
      if (response.status === 200) {
        if (Array.isArray(response.data) && response.data.length > 0) {
          const rulesText = response.data
            .map(rule => rule.rules_of_game)
            .join('\n');
          setRules(rulesText);
        } else {
          Alert.alert('No rules found.');
          setRules(' ');
        }
      } else {
        Alert.alert(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        Alert.alert('No Rules found for Cricket.');
      } else {
        Alert.alert('Network error', 'Failed to connect to server.');
      }
      setRules('Error fetching rules.');
    }
  };
  return (
    <SafeAreaViewComponent>
      <AppBarComponent
        title={'Cricket Rules'}
        handleBackPress={handleUserHome}
      />
      <View style={styles.container}>
        <TextInput
          placeholder="No Rules Found"
          style={styles.textBox}
          value={rules}
          multiline={true} // Allow multiline display
          editable={false} // Make the TextInput read-only
        />
      </View>
    </SafeAreaViewComponent>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  textBox: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    color: '#333',
    height: 200, // Fixed height for better appearance
    textAlignVertical: 'top', // Align text at the top
    height: 600, // Fixed height for text box
    textAlignVertical: 'top', // Align text at the top
    fontSize: 16, // Adjust font size for readability
  },
});
